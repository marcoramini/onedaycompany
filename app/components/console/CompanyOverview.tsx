//file: app/components/console/CompanyOverview.tsx

type CompanyOverviewOffer = {
  name: string;
  description: string;
  outcome: string;
  status: string;
};

type CompanyOverviewProps = {
  mission: string;
  problem: string;
  solution: string;
  initialOffer: CompanyOverviewOffer | null;
};

export default function CompanyOverview({
  mission,
  problem,
  solution,
  initialOffer,
}: CompanyOverviewProps) {
  return (
    <section
      aria-labelledby="company-overview-title"
      className="py-7 sm:py-8"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Overview
          </p>

          <h2
            id="company-overview-title"
            className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
          >
            Your company foundation
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-slate-500 sm:text-right">
          The starting knowledge already saved in your
          company workspace.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <OverviewSection
          label="Mission"
          value={mission}
        />

        <OverviewSection
          label="Problem"
          value={problem}
        />

        <OverviewSection
          label="Solution"
          value={solution}
        />

        <OfferSection
          offer={initialOffer}
        />
      </div>
    </section>
  );
}

type OverviewSectionProps = {
  label: string;
  value: string;
};

function OverviewSection({
  label,
  value,
}: OverviewSectionProps) {
  return (
    <div className="grid gap-2 border-b border-slate-100 px-5 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:px-6">
      <h3 className="text-sm font-semibold text-slate-950">
        {label}
      </h3>

      <p className="max-w-4xl text-sm leading-6 text-slate-600">
        {value}
      </p>
    </div>
  );
}

function OfferSection({
  offer,
}: {
  offer: CompanyOverviewOffer | null;
}) {
  return (
    <div className="grid gap-3 px-5 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:px-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          First offer
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Persisted company asset
        </p>
      </div>

      {offer ? (
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-slate-950">
              {offer.name}
            </p>

            <OfferStatus status={offer.status} />
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {offer.description}
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Intended outcome
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-700">
              {offer.outcome}
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-sm font-medium text-slate-600">
            No first offer has been saved yet.
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            This workspace will show the company&apos;s
            first persisted offer here.
          </p>
        </div>
      )}
    </div>
  );
}

function OfferStatus({
  status,
}: {
  status: string;
}) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(value: string) {
  return value
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}