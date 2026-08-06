//file: app/components/console/CompanyJourney.tsx

type CompanyJourneyProps = {
  hasCompanyFoundation: boolean;
  hasFirstOffer: boolean;
};

type JourneyStep = {
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
};

export default function CompanyJourney({
  hasCompanyFoundation,
  hasFirstOffer,
}: CompanyJourneyProps) {
  const steps: JourneyStep[] = [
    {
      title: "Company direction chosen",
      description:
        "Your company identity and starting direction are saved.",
      status: hasCompanyFoundation
        ? "completed"
        : "current",
    },
    {
      title: "First offer created",
      description:
        "Your first offer gives the company something concrete to bring to customers.",
      status: hasFirstOffer
        ? "completed"
        : hasCompanyFoundation
          ? "current"
          : "upcoming",
    },
    {
      title: "Shape your first offer",
      description:
        "Clarify what the customer receives, how it is delivered and why it matters.",
      status: hasFirstOffer
        ? "current"
        : "upcoming",
    },
    {
      title: "Define your first customers",
      description:
        "Identify the people most likely to benefit from what you are building.",
      status: "upcoming",
    },
    {
      title: "Establish your brand",
      description:
        "Create a clear identity that makes the company recognizable and credible.",
      status: "upcoming",
    },
    {
      title: "Publish your website",
      description:
        "Give the company a public place where people can understand the offer and respond.",
      status: "upcoming",
    },
    {
      title: "Reach your first customer",
      description:
        "Take the first direct action that can create a real customer conversation.",
      status: "upcoming",
    },
  ];

  const currentStep =
    steps.find(
      (step) => step.status === "current",
    ) ?? steps[steps.length - 1];

  return (
    <section
      aria-labelledby="company-journey-title"
      className="py-7 sm:py-8"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Company journey
          </p>

          <h2
            id="company-journey-title"
            className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
          >
            Bring your company to life
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-slate-500 sm:text-right">
          Follow one practical objective at a time.
        </p>
      </div>

      <CurrentObjective
        step={currentStep}
      />

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {steps.map((step, index) => (
          <JourneyStepRow
            key={step.title}
            step={step}
            isLast={
              index === steps.length - 1
            }
          />
        ))}
      </div>
    </section>
  );
}

function CurrentObjective({
  step,
}: {
  step: JourneyStep;
}) {
  return (
    <article className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
        Current objective
      </p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {step.title}
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {step.description}
          </p>
        </div>

        <span className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-violet-700 shadow-sm">
          Ready to continue
        </span>
      </div>
    </article>
  );
}

function JourneyStepRow({
  step,
  isLast,
}: {
  step: JourneyStep;
  isLast: boolean;
}) {
  return (
    <div
      className={[
        "grid gap-4 px-5 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:items-center sm:px-6",
        isLast
          ? ""
          : "border-b border-slate-100",
      ].join(" ")}
    >
      <StepMarker status={step.status} />

      <div>
        <h3
          className={[
            "text-sm font-semibold",
            step.status === "upcoming"
              ? "text-slate-500"
              : "text-slate-950",
          ].join(" ")}
        >
          {step.title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {step.description}
        </p>
      </div>

      <StepStatus status={step.status} />
    </div>
  );
}

function StepMarker({
  status,
}: {
  status: JourneyStep["status"];
}) {
  if (status === "completed") {
    return (
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
      >
        <CheckIcon />
      </span>
    );
  }

  if (status === "current") {
    return (
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-700 text-white"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
    </span>
  );
}

function StepStatus({
  status,
}: {
  status: JourneyStep["status"];
}) {
  const label =
    status === "completed"
      ? "Completed"
      : status === "current"
        ? "Current"
        : "Upcoming";

  return (
    <span
      className={[
        "w-fit rounded-full px-3 py-1 text-xs font-semibold",
        status === "completed"
          ? "bg-emerald-50 text-emerald-700"
          : status === "current"
            ? "bg-violet-50 text-violet-700"
            : "bg-slate-100 text-slate-500",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12.5 4 4L19 7" />
    </svg>
  );
}