//file: app/start/page.tsx

"use client";

import { useRouter } from "next/navigation";

import NewCompanyFlow from "../components/NewCompanyFlow";

export default function StartCompanyPage() {
  const router = useRouter();

  return (
    <NewCompanyFlow
      onExit={() => {
        router.push("/");
      }}
    />
  );
}