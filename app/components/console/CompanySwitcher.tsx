//file: app/components/console/CompanySwitcher.tsx

"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type {
  CompanySwitcherItem,
} from "../../lib/companies/companySwitcher";

type CompanySwitcherProps = {
  activeCompanyId: string;
  companies: CompanySwitcherItem[];
};

export default function CompanySwitcher({
  activeCompanyId,
  companies,
}: CompanySwitcherProps) {
  const [isOpen, setIsOpen] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const menuId = useId();

  const activeCompany =
    companies.find(
      (company) =>
        company.id === activeCompanyId,
    ) ?? companies[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(
      event: PointerEvent,
    ) {
      const target = event.target;

      if (
        target instanceof Node &&
        !containerRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen]);

  if (!activeCompany) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen((currentValue) => {
            return !currentValue;
          });
        }}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left shadow-sm transition hover:border-violet-200 hover:shadow-md sm:px-4"
      >
        <CompanyAvatar
          name={activeCompany.name}
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-slate-950">
            {activeCompany.name}
          </span>

          <span className="mt-0.5 block truncate text-xs text-slate-500">
            Active company
          </span>
        </span>

        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Select company"
          className="absolute left-0 top-[calc(100%+0.75rem)] z-50 w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:min-w-80"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Your companies
            </p>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {companies.map((company) => {
              const isActive =
                company.id ===
                activeCompanyId;

              return (
                <Link
                  key={company.id}
                  href={`/console/${company.id}`}
                  role="menuitem"
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-3 transition",
                    isActive
                      ? "bg-violet-50"
                      : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  <CompanyAvatar
                    name={company.name}
                    isActive={isActive}
                  />

                  <span className="min-w-0 flex-1">
                    <span
                      className={[
                        "block truncate text-sm font-semibold",
                        isActive
                          ? "text-violet-800"
                          : "text-slate-950",
                      ].join(" ")}
                    >
                      {company.name}
                    </span>

                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                      {company.tagline}
                    </span>
                  </span>

                  {isActive ? (
                    <CheckIcon />
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-100 p-2">
            <Link
              href="/console/new"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-lg"
              >
                +
              </span>

              <span>
                Start another company
              </span>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type CompanyAvatarProps = {
  name: string;
  isActive?: boolean;
};

function CompanyAvatar({
  name,
  isActive = false,
}: CompanyAvatarProps) {
  const initial =
    name.trim()[0]?.toUpperCase() ?? "C";

  return (
    <span
      aria-hidden="true"
      className={[
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
        isActive
          ? "bg-violet-700 text-white"
          : "bg-violet-100 text-violet-800",
      ].join(" ")}
    >
      {initial}
    </span>
  );
}

function ChevronIcon({
  isOpen,
}: {
  isOpen: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={[
        "h-4 w-4 shrink-0 text-slate-400 transition-transform",
        isOpen ? "rotate-180" : "",
      ].join(" ")}
    >
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0 text-violet-700"
    >
      <path
        d="m5 12.5 4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}