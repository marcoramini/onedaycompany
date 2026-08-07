type CompanyOverviewProps = {
  mission: string;
  problem: string;
  solution: string;
  idealCustomers: string[];
};

export default function CompanyOverview({
  mission,
  problem,
  solution,
  idealCustomers,
}: CompanyOverviewProps) {
  return (
    <section aria-labelledby="company-overview-title">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-violet-700">
            Foundation
          </p>
          <h2
            id="company-overview-title"
            className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
          >
            Your company at a glance
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
          The starting knowledge already saved in this workspace.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <FoundationCard
          mission={mission}
          problem={problem}
          solution={solution}
        />
        <CustomersCard customers={idealCustomers} />
      </div>
    </section>
  );
}

function FoundationCard({
  mission,
  problem,
  solution,
}: {
  mission: string;
  problem: string;
  solution: string;
}) {
  return (
    <WorkspaceCard label="Company" tone="violet">
      <ContentBlock label="Mission" value={mission} />
      <ContentBlock label="Problem" value={problem} />
      <ContentBlock label="Solution" value={solution} />
    </WorkspaceCard>
  );
}

function CustomersCard({ customers }: { customers: string[] }) {
  return (
    <WorkspaceCard label="Customers" tone="blue">
      {customers.length ? (
        <ul className="space-y-3">
          {customers.map((customer) => (
            <li key={customer} className="flex gap-3 text-sm leading-6 text-slate-600">
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500"
              />
              {customer}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState text="Customer directions will appear here." />
      )}
    </WorkspaceCard>
  );
}

function WorkspaceCard({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "violet" | "blue";
  children: React.ReactNode;
}) {
  const tones = {
    violet: "bg-violet-50 text-violet-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <article className="min-h-72 rounded-[1.4rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.045)] sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold ${tones[tone]}`}>
          {label[0]}
        </span>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
      </div>
      {children}
    </article>
  );
}

function ContentBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 first:mt-0">
      <h3 className="text-sm font-semibold text-slate-950">{label}</h3>
      <p className="mt-1.5 text-sm leading-6 text-slate-600">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm leading-6 text-slate-500">
      {text}
    </div>
  );
}
