//file: app/page.tsx

import Landing from "./components/Landing";
import { createClient } from "./lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Landing
      workspaceHref={
        user ? "/console" : undefined
      }
    />
  );
}