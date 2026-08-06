//file: app/components/console/CompanyConsoleHeader.tsx

type CompanyConsoleHeaderProps = {
  name: string;
  tagline: string;
  statusLabel: string;
};

export default function CompanyConsoleHeader({
  name,
  tagline,
  statusLabel,
}: CompanyConsoleHeaderProps) {
  return (
    <header className="border-b border-slate-200 pb-6 sm:pb-7">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
          Company workspace
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl">
            {name}
          </h1>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-500"
            />

            {statusLabel}
          </span>
        </div>

        <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {tagline}
        </p>
      </div>
    </header>
  );
}