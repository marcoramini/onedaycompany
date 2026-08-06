import { redirect } from "next/navigation";

import SignInScreen from "../components/auth/SignInScreen";
import { createClient } from "../lib/supabase/server";

export default async function SignInPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  /*
   * An authenticated returning user does not need
   * to see the provider screen again.
   */
  if (user) {
    redirect("/console");
  }

  return <SignInScreen />;
}