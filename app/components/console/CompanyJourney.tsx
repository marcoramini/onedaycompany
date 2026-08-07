import { getMomentumSteps } from "../../lib/companyMomentum";
import type {
  CompanyExecutionPlan,
  ExecutionStep,
} from "../../lib/executionPlanSchema";

type CompanyJourneyProps = {
  hasCompanyFoundation: boolean;
  hasFirstOffer: boolean;
  plan: CompanyExecutionPlan | null;
};

export default function CompanyJourney({
  hasCompanyFoundation,
  hasFirstOffer,
  plan,
}: CompanyJourneyProps) {
  const visibleSteps = plan
    ? getMomentumSteps(plan).filter(
        (step) => step.capabilityId !== "brand-identity",
      )
    : [];

  return (
    <aside className="xl:sticky xl:top-8">
      <section
        aria-labelledby="company-progress-title"
        className="rounded-[1.4rem] border border-slate-200/80 bg-white px-5 py-6 shadow-[0_12px_35px_rgba(15,23,42,0.045)]"
      >
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-400">
          Your progress
        </p>
        <h2 id="company-progress-title" className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
          Company path
        </h2>

        <div className="mt-6 space-y-5">
          {visibleSteps.length ? (
            visibleSteps.map((step) => (
              <ProgressRow key={step.id} step={step} />
            ))
          ) : (
            <FallbackProgress
              hasCompanyFoundation={hasCompanyFoundation}
              hasFirstOffer={hasFirstOffer}
            />
          )}
        </div>
      </section>
    </aside>
  );
}

function ProgressRow({ step }: { step: ExecutionStep }) {
  const completed = step.activities.filter(
    (activity) => activity.status === "completed",
  ).length;
  const total = step.activities.length;
  const percentage = total
    ? Math.round((completed / total) * 100)
    : 0;

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-5 text-slate-800">
          {step.title}
        </h3>
        <span className="shrink-0 text-xs font-semibold text-violet-700">
          {percentage}%
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={`${step.title}: ${percentage}% complete`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className={`h-full rounded-full ${percentage === 100 ? "bg-emerald-500" : "bg-violet-600"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate-500">
        {completed} of {total} activities completed
      </p>
    </div>
  );
}

function FallbackProgress({
  hasCompanyFoundation,
  hasFirstOffer,
}: {
  hasCompanyFoundation: boolean;
  hasFirstOffer: boolean;
}) {
  return (
    <>
      <FallbackRow label="Company foundation" complete={hasCompanyFoundation} />
      <FallbackRow label="First offer" complete={hasFirstOffer} />
      <p className="text-xs leading-5 text-slate-500">
        The detailed company path has not been saved yet.
      </p>
    </>
  );
}

function FallbackRow({ label, complete }: { label: string; complete: boolean }) {
  return (
    <div>
      <div className="flex justify-between gap-3 text-sm font-semibold text-slate-800">
        <span>{label}</span>
        <span className="text-violet-700">{complete ? "100%" : "0%"}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${complete ? "w-full bg-emerald-500" : "w-0 bg-violet-600"}`}
        />
      </div>
    </div>
  );
}
