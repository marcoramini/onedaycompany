import { NextResponse } from "next/server";

import { getWorkspaceGeneration } from "../../../../lib/workspace-generation/repository";
import { runWorkspaceGeneration } from "../../../../lib/workspace-generation/orchestrator";
import { createClient } from "../../../../lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ companyId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const authorization = await authorize(context);
  if (authorization instanceof NextResponse) return authorization;

  const generation = await getWorkspaceGeneration(authorization.supabase, authorization.companyId);
  return NextResponse.json({ generation });
}

export async function POST(request: Request, context: RouteContext) {
  const authorization = await authorize(context);
  if (authorization instanceof NextResponse) return authorization;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const userContext = typeof body === "object" && body !== null && "userContext" in body
    ? (body as { userContext?: unknown }).userContext
    : null;
  if (typeof userContext !== "string" || !userContext.trim()) {
    return NextResponse.json({ error: "Company context is required." }, { status: 400 });
  }

  const generation = await runWorkspaceGeneration({
    supabase: authorization.supabase,
    companyId: authorization.companyId,
    userContext,
  });
  return NextResponse.json({ generation });
}

async function authorize(context: RouteContext) {
  const { companyId } = await context.params;
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { data: company, error } = await supabase
    .from("companies")
    .select("id")
    .eq("id", companyId)
    .eq("owner_id", user.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: "We couldn't verify this company." }, { status: 500 });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });
  return { supabase, companyId };
}
