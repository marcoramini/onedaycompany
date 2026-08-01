import type { ReactNode } from "react";

import type { Company } from "../types/business";

type OpportunityCardProps = {
  company: Company;
  onChooseCompany: () => void;
  onRefineProposal: () => void;
  onTryDifferentDirection: () => void;
  isGenerating?: boolean;
};

const startupCostLabels: Record<
  Company["startupCost"],
  string
> = {
  "very-low": "Very low",
  low: "Low",
  moderate: "Moderate",
};

export default function OpportunityCard({
  company,
  onChooseCompany,
  onRefineProposal,
  onTryDifferentDirection,
  isGenerating = false,
}: OpportunityCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <section className="border-b border-slate-200 px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          A first proposal for your company
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          {company.name}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-slate-600 sm:text-2xl">
          {company.tagline}
        </p>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500">
          Based on what you shared, this is the direction
          we believe has the strongest potential. You can
          refine it or ask us to explore another proposal.
        </p>
      </section>

      <div className="grid gap-0 lg:grid-cols-2">
        <Section title={`Why ${company.name}`}>
          <p>{company.mission}</p>
        </Section>

        <Section title="The problem">
          <p>{company.problem}</p>
        </Section>

        <Section title="How it helps">
          <p>{company.solution}</p>
        </Section>

        <Section title="Starting cost">
          <p className="text-2xl font-semibold text-slate-950">
            {startupCostLabels[company.startupCost]}
          </p>
        </Section>
      </div>

      <section className="border-t border-slate-200 bg-violet-50 px-6 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
          First offer
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          {company.firstOffer.name}
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
          {company.firstOffer.description}
        </p>

        <div className="mt-6 rounded-2xl bg-white p-5">
          <p className="text-sm font-semibold text-slate-950">
            Customer outcome
          </p>

          <p className="mt-2 leading-relaxed text-slate-600">
            {company.firstOffer.outcome}
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 px-6 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          First customers
        </p>

        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {company.idealCustomers.map((customer) => (
            <li
              key={customer}
              className="rounded-2xl border border-slate-200 p-5 text-slate-700"
            >
              {customer}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid border-t border-slate-200 lg:grid-cols-2">
        <Section title="Why now">
          <p>{company.whyNow}</p>
        </Section>

        <Section title="Where it could go">
          <p>{company.futureExpansion}</p>
        </Section>
      </div>

      <section className="border-t border-slate-200 px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
            Make this proposal yours
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {company.name} already has a strong foundation.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Continue with this proposal, refine a few details, or explore a
            completely different direction.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onChooseCompany}
              disabled={isGenerating}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-slate-950 px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              Continue with {company.name}
            </button>

            <button
              type="button"
              onClick={onRefineProposal}
              disabled={isGenerating}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-violet-300 bg-white px-7 py-4 font-semibold text-violet-700 transition hover:-translate-y-0.5 hover:border-violet-500 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              Refine this proposal
            </button>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={onTryDifferentDirection}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating
                ? "Shaping another company..."
                : "Show me something different"}

              {!isGenerating ? (
                <span aria-hidden="true">→</span>
              ) : null}
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="border-b border-slate-200 px-6 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:px-10">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </h2>

      <div className="mt-4 text-lg leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}