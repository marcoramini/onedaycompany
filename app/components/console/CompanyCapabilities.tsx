import type { CompanyExecutionPlan } from "../../lib/executionPlanSchema";
import { companyCapabilities } from "../../types/companyCapability";
import CompanyTaskBoard from "./CompanyTaskBoard";

type CompanyCapabilitiesProps = {
  companyName: string;
  offer: {
    name: string;
    description: string;
    outcome: string;
    status: string;
  } | null;
  customerCount: number;
  companyContext: {
    mission: string;
    problem: string;
    solution: string;
    idealCustomers: string[];
  };
  currentFocus?: string;
  plan: CompanyExecutionPlan | null;
  foundation: React.ReactNode;
  journey: React.ReactNode;
};

const initialCompletedActivities = 5;

export default function CompanyCapabilities({
  companyName,
  offer,
  customerCount,
  companyContext,
  currentFocus,
  plan,
  foundation,
  journey,
}: CompanyCapabilitiesProps) {
  const totalActivities = companyCapabilities.reduce(
    (total, capability) => total + capability.requiredActivityCount,
    0,
  );
  const launchProgress = Math.round(
    (initialCompletedActivities / totalActivities) * 100,
  );

  return (
    <section aria-labelledby="launch-readiness-title" className="mt-6">
      <LaunchProgress
        completedActivities={initialCompletedActivities}
        totalActivities={totalActivities}
        launchProgress={launchProgress}
        currentFocus={currentFocus}
      />

      <div className="mt-5 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <CompanyTaskBoard
            companyName={companyName}
            offer={offer}
            customerCount={customerCount}
            companyContext={companyContext}
            plan={plan}
          />

          <div className="mt-8">{foundation}</div>
        </div>

        {journey}
      </div>
    </section>
  );
}

function LaunchProgress({
  completedActivities,
  totalActivities,
  launchProgress,
  currentFocus,
}: {
  completedActivities: number;
  totalActivities: number;
  launchProgress: number;
  currentFocus?: string;
}) {
  return (
    <article className="rounded-[1.4rem] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_12px_35px_rgba(15,23,42,0.045)] sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-violet-700">
                Launch readiness
              </p>
              <h2 id="launch-readiness-title" className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {launchProgress}% ready to launch
              </h2>
            </div>
            <p className="hidden text-sm font-semibold text-slate-500 sm:block">
              {completedActivities} of {totalActivities} activities
            </p>
          </div>
          <div
            className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100"
            aria-label={`${launchProgress}% launch readiness`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={launchProgress}
          >
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#6d28d9,#8b5cf6)]"
              style={{ width: `${launchProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-violet-50 px-4 py-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-violet-700">
            Recommended next
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {currentFocus ?? "Build your public presence"}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Choose any task card to view its activities.
          </p>
        </div>
      </div>
    </article>
  );
}
