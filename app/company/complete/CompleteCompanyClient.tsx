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

type CreationPhase = "documents" | "brand";

export default function CompleteCompanyClient({
  userName,
}: CompleteCompanyClientProps) {
  const router = useRouter();

  const creationStartedRef = useRef(false);

  const [creationState, setCreationState] =
    useState<CreationState>("creating");

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);
  const [creationPhase, setCreationPhase] =
    useState<CreationPhase>("documents");

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
      setCreationPhase("documents");
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

  useEffect(() => {
    if (creationState !== "creating") return;
    const phaseTimer = window.setTimeout(() => setCreationPhase("brand"), 3_500);
    return () => window.clearTimeout(phaseTimer);
  }, [creationState]);

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

        <ol aria-live="polite" className="mx-auto mt-8 max-w-md space-y-3 text-left">
          <CreationStep
            label="Creating your company documentation"
            state={creationPhase === "documents" ? "active" : "complete"}
          />
          <CreationStep
            label="Visual Asset Agent is creating your first identity"
            state={creationPhase === "brand" ? "active" : "waiting"}
          />
          <CreationStep label="Creating your first public page" state="future" />
        </ol>
      </section>
    </main>
  );
}

function CreationStep({ label, state }: { label: string; state: "active" | "complete" | "waiting" | "future" }) {
  return (
    <li className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${state === "active" ? "border-violet-200 bg-white text-slate-950 shadow-sm" : "border-transparent text-slate-500"}`}>
      <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${state === "complete" ? "bg-emerald-100 text-emerald-700" : state === "active" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-400"}`}>
        {state === "complete" ? "✓" : state === "active" ? <span className="h-2 w-2 animate-pulse rounded-full bg-violet-600" /> : "·"}
      </span>
      <span className="font-medium">{label}</span>
      {state === "future" ? <span className="ml-auto text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Soon</span> : null}
    </li>
  );
}
