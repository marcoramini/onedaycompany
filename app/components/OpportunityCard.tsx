import type { ReactNode } from "react";

import type { Company } from "../types/business";

type OpportunityCardProps = {
  company: Company;
  onChooseCompany: () => void;
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
  onTryDifferentDirection,
  isGenerating = false,
}: OpportunityCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <section className="border-b border-slate-200 px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          Welcome to your new company
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          {company.name}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-slate-600 sm:text-2xl">
          {company.tagline}
        </p>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500">
          Built around what you already know, enjoy, and care
          about. This is the company you can start bringing to
          life today.
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

      <section className="border-t border-slate-200 px-6 py-10 text-center sm:px-10 sm:py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
          Your company starts today
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Let&apos;s turn {company.name} into something real.
        </h2>

        <button
          type="button"
          onClick={onChooseCompany}
          disabled={isGenerating}
          className="mt-7 w-full rounded-full bg-slate-950 px-7 py-4 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Let&apos;s build {company.name}
        </button>

        <div className="mt-4">
          <button
            type="button"
            onClick={onTryDifferentDirection}
            disabled={isGenerating}
            className="text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-950 hover:decoration-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating
              ? "Shaping another company..."
              : "Try a different direction"}
          </button>
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