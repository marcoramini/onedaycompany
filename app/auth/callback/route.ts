import { NextResponse } from "next/server";

import { createClient } from "../../lib/supabase/server";

function getSafeNextPath(
  value: string | null,
) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/company/complete";
  }

  return value;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  const next = getSafeNextPath(
    requestUrl.searchParams.get("next"),
  );

  if (!code) {
    const errorUrl = new URL(
      "/auth/error",
      requestUrl.origin,
    );

    errorUrl.searchParams.set(
      "message",
      "The authentication code is missing.",
    );

    return NextResponse.redirect(errorUrl);
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(
      code,
    );

  if (error) {
    console.error(
      "OAuth code exchange failed.",
      error,
    );

    const errorUrl = new URL(
      "/auth/error",
      requestUrl.origin,
    );

    errorUrl.searchParams.set(
      "message",
      "We couldn't complete sign-in.",
    );

    return NextResponse.redirect(errorUrl);
  }

  return NextResponse.redirect(
    new URL(next, requestUrl.origin),
  );
}