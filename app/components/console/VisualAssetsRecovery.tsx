"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VisualAssetsRecovery({ companyId }: { companyId: string }) {
  const router = useRouter();
  const startedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    async function generate() {
      try {
        const response = await fetch(`/api/companies/${companyId}/visual-assets`, { method: "POST" });
        const text = await response.text();
        const body = text ? JSON.parse(text) as { error?: string } : {};
        if (!response.ok) throw new Error(body.error ?? "We couldn't create your visual identity.");
        router.refresh();
      } catch (generationError) {
        setError(generationError instanceof Error ? generationError.message : "We couldn't create your visual identity.");
      }
    }

    void generate();
  }, [companyId, router]);

  return (
    <div className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-700" : "border-violet-200 bg-violet-50 text-violet-700"}`} role="status">
      {error ?? "Creating the logo and workspace background. You can continue working while the Visual Asset Agent finishes."}
    </div>
  );
}
