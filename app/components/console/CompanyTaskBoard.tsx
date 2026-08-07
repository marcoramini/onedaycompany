"use client";

import { useState } from "react";

import { getMomentumSteps } from "../../lib/companyMomentum";
import type {
  CompanyExecutionPlan,
  ExecutionActivity,
  ExecutionStep,
} from "../../lib/executionPlanSchema";
import type { CompanyCapabilityId } from "../../types/companyCapability";

type CompanyTaskBoardProps = {
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
  plan: CompanyExecutionPlan | null;
};

type RefinementTarget = {
  kind: "step" | "activity";
  title: string;
  description: string;
  stepTitle: string;
};

const visibleCapabilityIds = [
  "first-offer",
  "public-presence",
  "promotional-launch",
  "customer-operations",
  "first-customers",
  "company-foundation",
] as const satisfies readonly CompanyCapabilityId[];

export default function CompanyTaskBoard({
  companyName,
  offer,
  customerCount,
  companyContext,
  plan,
}: CompanyTaskBoardProps) {
  const [expandedCapability, setExpandedCapability] =
    useState<CompanyCapabilityId | null>(null);
  const [refinementTarget, setRefinementTarget] =
    useState<RefinementTarget | null>(null);
  const steps = plan ? getMomentumSteps(plan) : [];
  const stepByCapability = new Map(
    steps.map((step) => [step.capabilityId, step]),
  );
  const availableCapabilityIds = plan
    ? visibleCapabilityIds.filter((capabilityId) =>
        stepByCapability.has(capabilityId),
      )
    : [...visibleCapabilityIds];
  const hasOddCardCount =
    availableCapabilityIds.length % 2 !== 0;
  const orderedCapabilityIds = hasOddCardCount
    ? [
        ...availableCapabilityIds.filter(
          (capabilityId) =>
            capabilityId === "public-presence",
        ),
        ...availableCapabilityIds.filter(
          (capabilityId) =>
            capabilityId !== "public-presence",
        ),
      ]
    : availableCapabilityIds;

  function toggle(capabilityId: CompanyCapabilityId) {
    setExpandedCapability((current) =>
      current === capabilityId ? null : capabilityId,
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {orderedCapabilityIds.map((capabilityId) => {
        const step = stepByCapability.get(capabilityId);
        const isExpanded = expandedCapability === capabilityId;

        return (
          <TaskCard
            key={capabilityId}
            capabilityId={capabilityId}
            step={step}
            isExpanded={isExpanded}
            onToggle={() => toggle(capabilityId)}
            onRefine={() =>
              setRefinementTarget({
                kind: "step",
                title:
                  step?.title ??
                  getCapabilityLabel(capabilityId),
                description:
                  step?.reason ??
                  "Refine how this part of the company should be implemented.",
                stepTitle:
                  step?.title ??
                  getCapabilityLabel(capabilityId),
              })
            }
            onRefineActivity={(activity) =>
              setRefinementTarget({
                kind: "activity",
                title: activity.title,
                description: activity.description,
                stepTitle:
                  step?.title ??
                  getCapabilityLabel(capabilityId),
              })
            }
            className={
              hasOddCardCount &&
              capabilityId === "public-presence"
                ? "md:col-span-2"
                : ""
            }
          >
            <TaskSummary
              capabilityId={capabilityId}
              companyName={companyName}
              offer={offer}
              customerCount={customerCount}
              step={step}
            />
          </TaskCard>
        );
      })}
      {refinementTarget ? (
        <RefinementPanel
          target={refinementTarget}
          companyName={companyName}
          companyContext={companyContext}
          onClose={() => setRefinementTarget(null)}
        />
      ) : null}
    </div>
  );
}

function TaskCard({
  capabilityId,
  step,
  isExpanded,
  onToggle,
  onRefine,
  onRefineActivity,
  className,
  children,
}: {
  capabilityId: CompanyCapabilityId;
  step?: ExecutionStep;
  isExpanded: boolean;
  onToggle: () => void;
  onRefine: () => void;
  onRefineActivity: (
    activity: ExecutionActivity,
  ) => void;
  className: string;
  children: React.ReactNode;
}) {
  const completed = getCompletedActivities(step);
  const total = step?.activities.length ?? 0;
  const percentage = total
    ? Math.round((completed / total) * 100)
    : 0;

  return (
    <article className={`self-start rounded-[1.4rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.045)] sm:p-6 ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-violet-700">
          {getCapabilityLabel(capabilityId)}
        </p>
        <div className="min-w-24 text-right">
          <p className="text-xs font-semibold text-slate-700">
            {percentage}% complete
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-violet-600"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {children}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <TextAction
          label={
            isExpanded
              ? "Hide activities"
              : completed
                ? "Continue activities"
                : "View activities"
          }
          icon="chevron"
          onClick={onToggle}
          expanded={isExpanded}
        />
        <TextAction
          label="Refine step"
          icon="sparkle"
          onClick={onRefine}
        />
      </div>

      {isExpanded ? (
        <>
          <ActivityList
            step={step}
            onRefineActivity={onRefineActivity}
          />
          <div className="mt-5">
            <TextAction
              label="Close activities"
              icon="chevron"
              onClick={onToggle}
              expanded
            />
          </div>
        </>
      ) : null}
    </article>
  );
}

function ActivityList({
  step,
  onRefineActivity,
}: {
  step?: ExecutionStep;
  onRefineActivity: (
    activity: ExecutionActivity,
  ) => void;
}) {
  if (!step) {
    return (
      <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-500">
        The detailed activities have not been saved for this company yet.
      </div>
    );
  }

  return (
    <ol className="mt-5 space-y-3 border-t border-slate-100 pt-5">
      {step.activities.map((activity) => (
        <li key={activity.id} className="rounded-2xl bg-slate-50 px-4 py-4">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ${activity.status === "completed" ? "bg-emerald-500" : "border-2 border-violet-400 bg-white"}`}
            />
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                {activity.title}
              </h4>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {activity.description}
              </p>
              <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2.5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-emerald-700">
                  Done when
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-900">
                  {activity.completionCriterion}
                </p>
              </div>
              <div className="mt-3">
                <TextAction
                  label="Refine activity"
                  icon="sparkle"
                  onClick={() =>
                    onRefineActivity(activity)
                  }
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TextAction({
  label,
  icon,
  onClick,
  expanded = false,
}: {
  label: string;
  icon: "chevron" | "sparkle";
  onClick: () => void;
  expanded?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={
        icon === "chevron" ? expanded : undefined
      }
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
    >
      {icon === "sparkle" ? (
        <span aria-hidden="true">✦</span>
      ) : null}
      {label}
      {icon === "chevron" ? (
        <span
          aria-hidden="true"
          className={`text-base transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      ) : null}
    </button>
  );
}

function RefinementPanel({
  target,
  companyName,
  companyContext,
  onClose,
}: {
  target: RefinementTarget;
  companyName: string;
  companyContext: CompanyTaskBoardProps["companyContext"];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/20 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Close refinement panel"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="refinement-panel-title"
        className="relative flex h-full w-full max-w-[30rem] flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-[-24px_0_70px_rgba(15,23,42,0.16)]"
      >
        <header className="border-b border-slate-100 px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-violet-700">
                Refine {target.kind}
              </p>
              <h2
                id="refinement-panel-title"
                className="mt-2 text-xl font-semibold tracking-tight text-slate-950"
              >
                {target.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close refinement panel"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600"
            >
              ×
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-5 px-5 py-5 sm:px-6">
          <section className="rounded-2xl bg-violet-50 px-4 py-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-violet-700">
              Company context
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {companyName}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              This refinement will use the company mission, problem, solution, offer, and {companyContext.idealCustomers.length} customer profiles.
            </p>
          </section>

          <section>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-400">
              Current definition
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {target.stepTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {target.description}
            </p>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-amber-700">
              Impact-aware refinement
            </p>
            <p className="mt-2 text-xs leading-5 text-amber-900">
              The assistant will identify affected steps and completed outputs, suggest a lower-impact alternative when useful, and prepare a reviewable change set.
            </p>
          </section>

          <div>
            <label
              htmlFor="refinement-direction"
              className="text-sm font-semibold text-slate-900"
            >
              What would you like to change?
            </label>
            <textarea
              id="refinement-direction"
              rows={5}
              placeholder="Describe the result you want, the constraint to add, or what no longer feels right."
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
            <button
              type="button"
              disabled
              title="The structured refinement contract will be implemented next"
              className="mt-3 min-h-11 w-full cursor-not-allowed rounded-xl bg-violet-200 px-4 text-sm font-semibold text-violet-500"
            >
              Generate change proposal · Next step
            </button>
          </div>
        </div>

        <footer className="border-t border-slate-100 px-5 py-4 sm:px-6">
          <button
            type="button"
            disabled
            className="min-h-11 w-full cursor-not-allowed rounded-xl bg-slate-100 px-4 text-sm font-semibold text-slate-400"
          >
            Review changes
          </button>
          <p className="mt-2 text-center text-[0.68rem] leading-5 text-slate-400">
            Nothing changes without your explicit acceptance.
          </p>
        </footer>
      </aside>
    </div>
  );
}

function TaskSummary({
  capabilityId,
  companyName,
  offer,
  customerCount,
  step,
}: {
  capabilityId: CompanyCapabilityId;
  companyName: string;
  offer: CompanyTaskBoardProps["offer"];
  customerCount: number;
  step?: ExecutionStep;
}) {
  if (capabilityId === "first-offer" && offer) {
    return (
      <>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-950">{offer.name}</h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-slate-500">
            {formatStatus(offer.status)}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{offer.description}</p>
        <div className="mt-5 rounded-2xl bg-emerald-50/80 px-4 py-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-700">Intended outcome</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{offer.outcome}</p>
        </div>
      </>
    );
  }

  if (capabilityId === "public-presence") {
    return (
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_15rem] sm:items-center">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {step?.title ?? "Build your first company page"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Give {companyName} a public place where people can understand the offer and take one clear action.
          </p>
        </div>
        <div className="relative min-h-40 overflow-hidden rounded-2xl border border-violet-100 bg-[linear-gradient(145deg,#ede9fe,#ffffff_45%,#e0e7ff)] p-4 shadow-inner">
          <div className="rounded-xl bg-white/90 p-3 shadow-lg">
            <div className="h-2 w-16 rounded-full bg-violet-200" />
            <div className="mt-4 h-3 w-4/5 rounded-full bg-slate-800/80" />
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200" />
            <div className="mt-1.5 h-2 w-3/4 rounded-full bg-slate-200" />
            <div className="mt-4 h-6 w-24 rounded-lg bg-violet-600" />
          </div>
        </div>
      </div>
    );
  }

  const summaries: Record<CompanyCapabilityId, { title: string; description: string }> = {
    "company-foundation": {
      title: step?.title ?? "Complete your launch requirements",
      description: step?.reason ?? "Handle the remaining company-specific requirements at the right moment.",
    },
    "first-customers": {
      title: step?.title ?? "Prepare for your first customers",
      description: step?.reason ?? "Choose the first people who should recognize themselves in the offer.",
    },
    "first-offer": {
      title: "Shape your first offer",
      description: "Turn the starting idea into something clear to request, book, or buy.",
    },
    "brand-identity": {
      title: "Create your identity",
      description: "Logo actions are available from the company header.",
    },
    "public-presence": {
      title: step?.title ?? "Build your first company page",
      description: `Give ${companyName} a public place where people can understand the offer and take one clear action.`,
    },
    "promotional-launch": {
      title: step?.title ?? "Prepare the first promotion",
      description: step?.reason ?? "Choose the first channel, message, and material that will introduce the company.",
    },
    "customer-operations": {
      title: step?.title ?? "Be ready for customer interest",
      description: step?.reason ?? `Prepare a path suited to the ${customerCount || "starting"} customer profiles.`,
    },
  };
  const summary = summaries[capabilityId];

  return (
    <>
      <h3 className="text-lg font-semibold tracking-tight text-slate-950">{summary.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{summary.description}</p>
    </>
  );
}

function getCompletedActivities(step?: ExecutionStep) {
  return step?.activities.filter((activity) => activity.status === "completed").length ?? 0;
}

function getCapabilityLabel(capabilityId: CompanyCapabilityId) {
  const labels: Record<CompanyCapabilityId, string> = {
    "company-foundation": "Launch requirements",
    "first-customers": "First customers",
    "first-offer": "First offer",
    "brand-identity": "Brand identity",
    "public-presence": "Public presence",
    "promotional-launch": "Promotional launch",
    "customer-operations": "Customer operations",
  };
  return labels[capabilityId];
}

function formatStatus(value: string) {
  return value.trim().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
}
