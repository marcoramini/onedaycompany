import { NextResponse } from "next/server";

import { createClient } from "../../../../lib/supabase/server";

type OpenCompanyRouteProps = {
  params: Promise<{
    companyId: string;
  }>;
};

export async function POST(
  _request: Request,
  { params }: OpenCompanyRouteProps,
) {
  const { companyId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error: "Authentication required.",
      },
      {
        status: 401,
      },
    );
  }

  const {
    data: company,
    error: companyError,
  } = await supabase
    .from("companies")
    .update({
      last_opened_at: new Date().toISOString(),
    })
    .eq("id", companyId)
    .eq("owner_id", user.id)
    .select("id")
    .maybeSingle();

  if (companyError) {
    console.error(
      "Company last-opened update failed.",
      companyError,
    );

    return NextResponse.json(
      {
        error:
          "We couldn't update the active company.",
      },
      {
        status: 500,
      },
    );
  }

  if (!company) {
    return NextResponse.json(
      {
        error: "Company not found.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    companyId: company.id,
  });
}