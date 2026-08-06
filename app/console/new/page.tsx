//file: app/console/new/page.tsx

"use client";

import { useRouter } from "next/navigation";

import NewCompanyFlow from "../../components/NewCompanyFlow";

export default function NewCompanyFromWorkspacePage() {
  const router = useRouter();

  return (
    <NewCompanyFlow
      onExit={() => {
        router.push("/console");
      }}
    />
  );
}