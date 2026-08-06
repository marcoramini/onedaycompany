//file: app/components/console/OpenedCompanyTracker.tsx

"use client";

import { useEffect } from "react";

type OpenedCompanyTrackerProps = {
  companyId: string;
};

export default function OpenedCompanyTracker({
  companyId,
}: OpenedCompanyTrackerProps) {
  useEffect(() => {
    const controller = new AbortController();

    async function registerCompanyOpen() {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/open`,
          {
            method: "POST",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          console.error(
            "Company open tracking failed.",
            {
              companyId,
              status: response.status,
            },
          );
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Company open tracking failed.",
          error,
        );
      }
    }

    void registerCompanyOpen();

    return () => {
      controller.abort();
    };
  }, [companyId]);

  return null;
}