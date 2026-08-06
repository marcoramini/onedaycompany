//file: app/components/console/ConsoleMobileHeader.tsx

import Link from "next/link";
import type { ReactNode } from "react";

type ConsoleMobileHeaderProps = {
  companyId: string;
  companySwitcher: ReactNode;
  accountArea?: ReactNode;
};

export default function ConsoleMobileHeader({
  companyId,
  companySwitcher,
  accountArea,
}: ConsoleMobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={`/console/${companyId}`}
          aria-label="Open company workspace"
          className="inline-flex min-w-0 items-center gap-2"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-700 text-sm font-bold text-white"
          >
            O
          </span>

          <span className="truncate text-base font-semibold tracking-tight text-slate-950">
            OneDay
            <span className="text-violet-700">
              Company
            </span>
          </span>
        </Link>

        {accountArea ? (
          <div className="shrink-0">
            {accountArea}
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
        <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Company workspace
        </p>

        <div className="min-w-0">
          {companySwitcher}
        </div>
      </div>
    </header>
  );
}