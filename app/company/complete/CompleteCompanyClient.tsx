"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import {
  clearPendingCompany,
  getPendingCompany,
} from "../../api/companies/pendingCompany";

type CompleteCompanyClientProps = {
  userName: string;
};

type CreationState =
  | "creating"
  | "error";

export default function CompleteCompanyClient({
  userName,
}: CompleteCompanyClientProps) {
  const router = useRouter();

  const creationStartedRef = useRef(false);

  const [creationState, setCreationState] =
    useState<CreationState>("creating");

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const persistCompany = useCallback(
    async () => {
      const pendingCompany =
        getPendingCompany();

      if (!pendingCompany) {
        setErrorMessage(
          "We couldn't find a company waiting to be saved in this browser session.",
        );
        setCreationState("error");
        return;
      }

      setCreationState("creating");
      setErrorMessage(null);

      try {
        const response = await fetch(
          "/api/companies",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              company: pendingCompany.company,
              beginningContext:
                pendingCompany.beginningContext,
            }),
          },
        );

        const responseBody =
          (await response.json()) as {
            company?: {
              id: string;
            };
            error?: string;
          };

        if (
          !response.ok ||
          !responseBody.company?.id
        ) {
          throw new Error(
            responseBody.error ??
              "We couldn't save your company.",
          );
        }

        clearPendingCompany();

        router.replace(
          `/console/${responseBody.company.id}`,
        );
      } catch (error) {
        console.error(
          "Company persistence failed.",
          error,
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "We couldn't save your company.",
        );

        setCreationState("error");
      }
    },
    [router],
  );

  useEffect(() => {
    /*
     * React Strict Mode can invoke effects more than
     * once during development. The ref avoids sending
     * two immediate requests from the same mount.
     *
     * Server-side idempotency still protects against
     * refreshes and separate retries.
     */
    if (creationStartedRef.current) {
      return;
    }

    creationStartedRef.current = true;

    void persistCompany();
  }, [persistCompany]);

  if (creationState === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
        <section className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
            Your company is still safe
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            We couldn&apos;t open the workspace
          </h1>

          <p
            role="alert"
            className="mt-5 leading-7 text-slate-600"
          >
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() => {
              creationStartedRef.current = true;
              void persistCompany();
            }}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Try saving again
          </button>

          <button
            type="button"
            onClick={() => router.replace("/")}
            className="mt-4 block w-full text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            Return to OneDayCompany
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-violet-200 border-t-violet-700" />

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          Welcome, {userName}
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          Opening your company workspace
        </h1>

        <p
          aria-live="polite"
          className="mt-4 text-lg text-slate-600"
        >
          Saving your company and preparing its
          foundation.
        </p>
      </section>
    </main>
  );
}