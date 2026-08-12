import { NextResponse } from "next/server";

import { createClient } from "../../../../lib/supabase/server";
import { ensureInitialVisualAssetsForCompany } from "../../../../lib/visual-asset-agent/createInitialVisualAssets";

export const runtime = "nodejs";
export const maxDuration = 300;

type RouteContext = { params: Promise<{ companyId: string }> };

export async function POST(_request: Request, context: RouteContext) {
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

  try {
    await ensureInitialVisualAssetsForCompany(supabase, companyId);
    return NextResponse.json({ completed: true });
  } catch (generationError) {
    console.error("Initial visual asset recovery failed.", generationError);
    return NextResponse.json(
      { error: generationError instanceof Error ? generationError.message : "We couldn't create the visual assets." },
      { status: 500 },
    );
  }
}
