import { createServerClient } from "@supabase/ssr";
import { serverFetch } from "../network/serverFetch";
import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function updateSession(
  request: NextRequest,
) {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    /*
     * Keep public routes available during local setup.
     * Authentication routes will fail explicitly when used
     * without the required environment variables.
     */
    return NextResponse.next({
      request,
    });
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      global: {
        fetch: serverFetch,
      },

      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(name, value);
            },
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(
                name,
                value,
                options,
              );
            },
          );
        },
      },
    },
  );

  /*
   * getClaims validates the access token and refreshes
   * the authentication cookies when necessary.
   *
   * Do not remove this call even if its return value
   * is not currently used.
   */
  await supabase.auth.getClaims();

  const { data, error } =
    await supabase.auth.getClaims();

  const claims = data?.claims;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith(
      "/company/complete",
    ) ||
    request.nextUrl.pathname.startsWith(
      "/console",
    );

  if (
    isProtectedRoute &&
    (error || !claims?.sub)
  ) {
    const redirectUrl =
      request.nextUrl.clone();

    redirectUrl.pathname = "/";
    redirectUrl.search = "";

    return NextResponse.redirect(
      redirectUrl,
    );
  }

  return response;
}