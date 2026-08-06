//file: app/auth/signout/route.ts

import { revalidatePath } from "next/cache";
import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "../../lib/supabase/server";

export async function POST(
  request: NextRequest,
) {
  const supabase = await createClient();

  const { data } =
    await supabase.auth.getClaims();

  if (data?.claims) {
    const { error } =
      await supabase.auth.signOut({
        scope: "local",
      });

    if (error) {
      console.error(
        "Supabase sign-out failed.",
        error,
      );
    }
  }

  revalidatePath("/", "layout");

  return NextResponse.redirect(
    new URL("/", request.url),
    {
      status: 302,
    },
  );
}