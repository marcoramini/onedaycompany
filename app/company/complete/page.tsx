import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";
import CompleteCompanyClient from "./CompleteCompanyClient";

export default async function CompleteCompanyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <CompleteCompanyClient
      userName={
        user.user_metadata.full_name ??
        user.user_metadata.name ??
        user.email ??
        "there"
      }
    />
  );
}