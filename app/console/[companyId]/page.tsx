import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { createClient } from "../../lib/supabase/server";

type CompanyConsolePageProps = {
  params: Promise<{
    companyId: string;
  }>;
};

type PersistedOffer = {
  id: string;
  name: string;
  description: string;
  outcome: string;
  status: string;
};

type PersistedCompany = {
  id: string;
  name: string;
  tagline: string;
  mission: string;
  status: string;
  active_stage: string;
  offers: PersistedOffer[];
};

export default async function CompanyConsolePage({
  params,
}: CompanyConsolePageProps) {
  const { companyId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const {
    data: company,
    error,
  } = await supabase
    .from("companies")
    .select(`
      id,
      name,
      tagline,
      mission,
      status,
      active_stage,
      offers (
        id,
        name,
        description,
        outcome,
        status
      )
    `)
    .eq("id", companyId)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "Company console loading failed.",
      error,
    );

    throw new Error(
      "We couldn't load this company workspace.",
    );
  }

  if (!company) {
    notFound();
  }

  const typedCompany =
    company as PersistedCompany;

  const initialOffer =
    typedCompany.offers[0] ?? null;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <form
  action="/auth/signout"
  method="post"
>
  <button
    type="submit"
    className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
  >
    Sign out
  </button>
</form>
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
                Company workspace
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {typedCompany.name}
              </h1>

              <p className="mt-4 max-w-2xl text-xl leading-8 text-slate-600">
                {typedCompany.tagline}
              </p>
            </div>

            <span className="self-start rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-800">
              Foundation started
            </span>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Your company foundation
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Your company is now saved
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              {typedCompany.mission}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <FoundationItem
                label="Company direction"
                status="Ready"
              />

              <FoundationItem
                label="First offer"
                status={
                  initialOffer
                    ? "Ready"
                    : "Not started"
                }
              />

              <FoundationItem
                label="Brand identity"
                status="Next"
              />

              <FoundationItem
                label="Landing page"
                status="Upcoming"
              />
            </div>
          </article>

          <aside className="rounded-[2rem] border border-violet-200 bg-violet-50 px-6 py-8 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Your next step
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Shape your first offer
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Turn the starting offer into something
              clear, valuable and ready to present to
              a real customer.
            </p>

            {initialOffer ? (
              <div className="mt-6 rounded-2xl bg-white p-5">
                <p className="font-semibold text-slate-950">
                  {initialOffer.name}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {initialOffer.outcome}
                </p>
              </div>
            ) : null}

            <button
              type="button"
              disabled
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white opacity-50"
            >
              Continue building
            </button>

            <p className="mt-3 text-center text-sm text-slate-500">
              The focused workspace is coming next.
            </p>
          </aside>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            Return to OneDayCompany
          </Link>
        </div>
      </div>
    </main>
  );
}

type FoundationItemProps = {
  label: string;
  status: string;
};

function FoundationItem({
  label,
  status,
}: FoundationItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 px-5 py-4">
      <p className="font-medium text-slate-950">
        {label}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {status}
      </p>
    </div>
  );
}