//file: app/components/console/ConsoleSidebar.tsx

import Link from "next/link";
import type { ReactNode } from "react";

import ConsoleNavigation from "./ConsoleNavigation";
import ConsoleUserArea from "./ConsoleUserArea";

type ConsoleSidebarProps = {
  companyId: string;
  companySwitcher: ReactNode;
  userName: string;
  userEmail: string | null;
};

export default function ConsoleSidebar({
  companyId,
  companySwitcher,
  userName,
  userEmail,
}: ConsoleSidebarProps) {
  const consoleHref = `/console/${companyId}`;

  return (
    <aside className="sticky top-0 flex h-screen min-h-screen flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-5">
        <Link
          href={consoleHref}
          className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-950"
          aria-label="Open company workspace"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700 text-sm font-bold text-white"
          >
            O
          </span>

          <span>
            OneDay
            <span className="text-violet-700">
              Company
            </span>
          </span>
        </Link>
      </div>

      <div className="border-b border-slate-100 px-4 py-4">
        <p className="mb-2 px-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Company workspace
        </p>

        {companySwitcher}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        <ConsoleNavigation
          companyId={companyId}
        />
      </div>

      <div className="border-t border-slate-200 p-4">
        <ConsoleUserArea
          userName={userName}
          userEmail={userEmail}
        />
      </div>
    </aside>
  );
}