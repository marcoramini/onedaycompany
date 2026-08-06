//file: app/console/page.tsx 

import Link from "next/link";
import { redirect } from "next/navigation";

import {
  getLastOpenedCompanyId,
} from "../lib/companies/companyQueries";
import { createClient } from "../lib/supabase/server";

export default async function ConsoleEntryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  let companyId: string | null;

  try {
    companyId =
      await getLastOpenedCompanyId(
        supabase,
        user.id,
      );
  } catch (error) {
    console.error(
      "Console entry failed.",
      error,
    );

    throw new Error(
      "We couldn't open your company workspace.",
    );
  }

  if (companyId) {
    redirect(`/console/${companyId}`);
  }

  return <EmptyCompanyWorkspace />;
}

function EmptyCompanyWorkspace() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fcfcff] px-4 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-violet-100/70 blur-3xl"
      />

      <section className="relative w-full max-w-xl rounded-[2rem] border border-violet-100 bg-white px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,29,149,0.09)] sm:px-10 sm:py-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl text-violet-700">
          ✦
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          Your workspace is ready
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Let&apos;s start your first company
        </h1>

        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-slate-600">
          Begin with something you know, love, have
          experienced or would be proud to create.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-violet-700"
        >
          Start my company
        </Link>
      </section>
    </main>
  );
}