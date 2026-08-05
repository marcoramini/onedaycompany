import type { NextRequest } from "next/server";

import { updateSession } from "./app/lib/supabase/proxy";

export async function proxy(
  request: NextRequest,
) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Exclude static Next.js files and common public assets.
     * Supabase session refresh remains active on application
     * pages and API routes.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};