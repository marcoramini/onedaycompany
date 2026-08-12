"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  clearPendingCompany,
  getPendingCompany,
} from "../../api/companies/pendingCompany";
import type { WorkspaceGenerationState } from "../../lib/workspace-generation/contracts";

type CompleteCompanyClientProps = { userName: string };
type CreationState = "creating" | "error";
type ApiBody<T> = T & { error?: string };

export default function CompleteCompanyClient({ userName }: CompleteCompanyClientProps) {
  const router = useRouter();
  const creationStartedRef = useRef(false);
  const generationStartedRef = useRef(false);
  const [creationState, setCreationState] = useState<CreationState>("creating");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [generationContext, setGenerationContext] = useState<string | null>(null);
  const [generation, setGeneration] = useState<WorkspaceGenerationState | null>(null);

  const startWorkspaceGeneration = useCallback(async (id: string, userContext: string) => {
    if (generationStartedRef.current) return;
    generationStartedRef.current = true;
    try {
      const response = await fetch(`/api/companies/${id}/workspace-generation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userContext }),
      });
      const body = await readApiResponse<{ generation?: WorkspaceGenerationState }>(response);
      if (!response.ok || !body.generation) throw new Error(body.error ?? "We couldn't prepare your workspace.");
      setGeneration(body.generation);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We couldn't prepare your workspace.");
      setCreationState("error");
    } finally {
      generationStartedRef.current = false;
    }
  }, []);

  const persistCompany = useCallback(async () => {
    const pendingCompany = getPendingCompany();
    if (!pendingCompany) {
      setErrorMessage("We couldn't find a company waiting to be saved in this browser session.");
      setCreationState("error");
      return;
    }
    setCreationState("creating");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: pendingCompany.company, beginningContext: pendingCompany.beginningContext }),
      });
      const body = await readApiResponse<{ company?: { id: string } }>(response);
      if (!response.ok || !body.company?.id) throw new Error(body.error ?? "We couldn't save your company.");
      setCompanyId(body.company.id);
      setGenerationContext(pendingCompany.beginningContext);
      clearPendingCompany();
      void startWorkspaceGeneration(body.company.id, pendingCompany.beginningContext);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We couldn't save your company.");
      setCreationState("error");
    }
  }, [startWorkspaceGeneration]);

  useEffect(() => {
    if (creationStartedRef.current) return;
    creationStartedRef.current = true;
    void persistCompany();
  }, [persistCompany]);

  useEffect(() => {
    if (!companyId || creationState !== "creating") return;
    const poll = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/workspace-generation`, { cache: "no-store" });
        const body = await readApiResponse<{ generation?: WorkspaceGenerationState }>(response);
        if (!response.ok) throw new Error(body.error ?? "We couldn't check workspace progress.");
        if (body.generation) setGeneration(body.generation);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "We couldn't check workspace progress.");
        setCreationState("error");
      }
    };
    void poll();
    const timer = window.setInterval(() => void poll(), 800);
    return () => window.clearInterval(timer);
  }, [companyId, creationState]);

  useEffect(() => {
    if (generation?.status === "completed" && companyId) router.replace(`/console/${companyId}`);
  }, [companyId, generation?.status, router]);

  const retry = () => {
    setCreationState("creating");
    setErrorMessage(null);
    if (companyId) {
      if (!generationContext) {
        setErrorMessage("We couldn't recover the company context needed to continue.");
        setCreationState("error");
        return;
      }
      void startWorkspaceGeneration(companyId, generationContext);
      return;
    }
    creationStartedRef.current = false;
    void persistCompany();
  };

  if (creationState === "error") {
    return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10"><section className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">Your company is still safe</p><h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">We couldn&apos;t open the workspace</h1><p role="alert" className="mt-5 leading-7 text-slate-600">{errorMessage}</p><button type="button" onClick={retry} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-violet-700">Try again</button><button type="button" onClick={() => router.replace("/")} className="mt-4 block w-full text-sm font-medium text-slate-500 transition hover:text-slate-950">Return to OneDayCompany</button></section></main>;
  }

  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10"><section className="w-full max-w-xl text-center"><div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-violet-200 border-t-violet-700" /><p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">Welcome, {userName}</p><h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Opening your company workspace</h1><ol aria-live="polite" className="mx-auto mt-8 max-w-md space-y-3 text-left">{generation?.stages.map((stage) => <CreationStep key={stage.stage} label={stageLabel(stage.stage)} state={stage.status} />) ?? <CreationStep label="Saving your company" state="running" />}</ol></section></main>;
}

function CreationStep({ label, state }: { label: string; state: "pending" | "running" | "completed" | "failed" }) {
  const tone = state === "completed" ? "bg-emerald-100 text-emerald-700" : state === "running" ? "bg-violet-100 text-violet-700" : state === "failed" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-400";
  return <li className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${state === "running" ? "border-violet-200 bg-white text-slate-950 shadow-sm" : "border-transparent text-slate-500"}`}><span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${tone}`}>{state === "completed" ? "✓" : state === "running" ? <span className="h-2 w-2 animate-pulse rounded-full bg-violet-600" /> : state === "failed" ? "!" : "·"}</span><span className="font-medium">{label}</span>{state === "pending" ? <span className="ml-auto text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Next</span> : null}</li>;
}

function stageLabel(stage: WorkspaceGenerationState["stages"][number]["stage"]) {
  return { foundation: "Shaping your company foundation", "first-offer": "Defining your first offer", "launch-planning": "Organizing your simplest path to launch", "workspace-assembly": "Preparing your company workspace" }[stage];
}

async function readApiResponse<T>(response: Response): Promise<ApiBody<T>> {
  const text = await response.text();
  if (!text.trim()) {
    throw new Error(
      response.ok
        ? "The server returned an empty response. Please try again."
        : `The server couldn't complete the request (HTTP ${response.status}). Please try again.`,
    );
  }

  try {
    return JSON.parse(text) as ApiBody<T>;
  } catch {
    throw new Error(`The server returned an invalid response (HTTP ${response.status}). Please try again.`);
  }
}
