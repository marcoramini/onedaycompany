//file: app/components/console/ConsoleShell.tsx

import type { ReactNode } from "react";

type ConsoleShellProps = {
  sidebar: ReactNode;
  mobileHeader: ReactNode;
  children: ReactNode;
};

export default function ConsoleShell({
  sidebar,
  mobileHeader,
  children,
}: ConsoleShellProps) {
  return (
    <div className="min-h-screen bg-[#f8f8fc] text-slate-950">
      <div className="lg:hidden">
        {mobileHeader}
      </div>

      <div className="lg:grid lg:min-h-screen lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="hidden lg:block">
          {sidebar}
        </div>

        <main className="min-w-0">
          <div className="mx-auto w-full max-w-[96rem] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
