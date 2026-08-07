import { NextResponse } from "next/server";

import { createClient } from "../../../lib/supabase/server";

type CompanyRouteProps = {
  params: Promise<{
    companyId: string;
  }>;
};

export async function DELETE(
  _request: Request,
  { params }: CompanyRouteProps,
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
    data: deletedCompany,
    error: companyError,
  } = await supabase
    .from("companies")
    .delete()
    .eq("id", companyId)
    .eq("owner_id", user.id)
    .select("id")
    .maybeSingle();

  if (companyError) {
    console.error(
      "Company deletion failed.",
      companyError,
    );

    return NextResponse.json(
      {
        error: "We couldn't delete this company.",
      },
      {
        status: 500,
      },
    );
  }

  if (!deletedCompany) {
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
    deletedCompanyId: deletedCompany.id,
  });
}
