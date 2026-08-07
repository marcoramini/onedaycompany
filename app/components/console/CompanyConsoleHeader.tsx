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
    <header className="relative overflow-hidden rounded-[1.75rem] border border-violet-100 bg-white shadow-[0_20px_60px_rgba(76,29,149,0.08)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(196,181,253,0.48),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(224,231,255,0.9),transparent_32%),linear-gradient(120deg,#ffffff_18%,#faf8ff_62%,#f1f5ff)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-[-3rem] h-72 w-72 rounded-full border-[3rem] border-white/55"
      />

      <div className="relative grid min-h-64 gap-8 px-6 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="flex h-full flex-col justify-between gap-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-violet-700">
              Company workspace
            </p>

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200/80 bg-white/85 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-500"
              />

              {statusLabel}
            </span>
          </div>

          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl xl:text-6xl">
              {name}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-xl sm:leading-8">
              {tagline}
            </p>
          </div>
        </div>

        <div className="justify-self-start lg:justify-self-end">
          <div className="relative flex h-36 w-44 items-center justify-center rounded-[2rem] border border-white/80 bg-white/55 shadow-[0_24px_70px_rgba(76,29,149,0.12)] backdrop-blur-sm">
            <span className="text-6xl font-semibold tracking-[-0.08em] text-violet-700/80">
              {getCompanyInitials(name)}
            </span>
            <span className="absolute bottom-4 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-violet-700/60">
              Company logo
            </span>
          </div>
          <div className="mt-2 flex justify-center gap-1.5">
            <LogoAction label="Upload logo" icon="upload" />
            <LogoAction label="Generate logo" icon="generate" />
            <LogoAction label="Edit logo" icon="edit" />
          </div>
        </div>
      </div>
    </header>
  );
}

function LogoAction({
  label,
  icon,
}: {
  label: string;
  icon: "upload" | "generate" | "edit";
}) {
  return (
    <span className="group relative">
      <button
        type="button"
        disabled
        aria-label={`${label} — Soon`}
        className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-white/80 bg-white/80 text-violet-500 shadow-sm"
      >
        <LogoActionIcon icon={icon} />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-10 z-20 w-max max-w-36 rounded-lg bg-slate-950 px-2.5 py-1.5 text-center text-[0.65rem] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100"
      >
        {label} · Soon
      </span>
    </span>
  );
}

function LogoActionIcon({
  icon,
}: {
  icon: "upload" | "generate" | "edit";
}) {
  if (icon === "upload") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </svg>
    );
  }

  if (icon === "generate") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m18 14 .7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4 20 4.2-1 10.6-10.6a2 2 0 0 0-2.8-2.8L5.4 16.2 4 20Z" />
      <path d="m14.5 7.1 2.8 2.8" />
    </svg>
  );
}

function getCompanyInitials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "C";
}
