"use client";

import type { Company } from "../types/business";
import type {
  CompanyExecutionPlan,
  ExecutionStep,
} from "../lib/executionPlanSchema";

type ExecutionPlanScreenProps = {
  company: Company;
  plan: CompanyExecutionPlan;
  onBack: () => void;
  onStartStep: (step: ExecutionStep) => void;
};

export default function ExecutionPlanScreen({
  company,
  plan,
  onBack,
  onStartStep,
}: ExecutionPlanScreenProps) {
  const firstStep = plan.steps[0];

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-8 text-[#171717] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-10 text-sm font-medium text-black/55 transition hover:text-black"
        >
          ← Back to {company.name}
        </button>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <section className="lg:sticky lg:top-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
              Your company path
            </p>

            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Let&apos;s make {company.name} real.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-black/62">
              {plan.introduction}
            </p>

            {firstStep ? (
              <button
                type="button"
                onClick={() =>
                  onStartStep(firstStep)
                }
                className="mt-8 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black"
              >
                Start the first step
              </button>
            ) : null}
          </section>

          <section
            aria-label="Company execution plan"
            className="space-y-4"
          >
            {plan.steps.map((step, index) => {
              const isFirst = index === 0;

              return (
                <article
                  key={step.id}
                  className={`rounded-3xl border p-6 sm:p-7 ${
                    isFirst
                      ? "border-violet-300 bg-white shadow-[0_18px_60px_rgba(70,42,130,0.09)]"
                      : "border-black/10 bg-white/65"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        isFirst
                          ? "bg-violet-700 text-white"
                          : "bg-black/[0.06] text-black/55"
                      }`}
                    >
                      {step.order}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-xl font-semibold tracking-[-0.02em]">
                          {step.title}
                        </h2>

                        {isFirst ? (
                          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                            Start here
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-3 leading-7 text-black/60">
                        {step.reason}
                      </p>

                      <div className="mt-5 rounded-2xl bg-black/[0.035] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                          What you will create
                        </p>
                        <p className="mt-2 leading-7 text-black/72">
                          {step.expectedOutcome}
                        </p>
                      </div>

                      {isFirst ? (
                        <button
                          type="button"
                          onClick={() =>
                            onStartStep(step)
                          }
                          className="mt-5 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                        >
                          Start this step →
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    </main>
  );
}
