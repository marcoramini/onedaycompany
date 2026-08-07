//file: app/components/console/CompanySwitcher.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [isOpen, setIsOpen] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState<string | null>(null);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const cancelDeleteRef =
    useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!isDeleteOpen) {
      return;
    }

    cancelDeleteRef.current?.focus();

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape" &&
        !isDeleting
      ) {
        setIsDeleteOpen(false);
        setDeleteError(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isDeleteOpen, isDeleting]);

  async function handleDeleteCompany() {
    if (!activeCompany || isDeleting) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(
        `/api/companies/${activeCompany.id}`,
        {
          method: "DELETE",
        },
      );

      const responseBody =
        (await response.json()) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          responseBody.error ??
            "We couldn't delete this company.",
        );
      }

      setIsDeleteOpen(false);
      router.replace("/console");
      router.refresh();
    } catch (error) {
      console.error(
        "Company deletion failed.",
        error,
      );

      setDeleteError(
        error instanceof Error
          ? error.message
          : "We couldn't delete this company.",
      );
      setIsDeleting(false);
    }
  }

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

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                setDeleteError(null);
                setIsDeleteOpen(true);
              }}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50"
              >
                <TrashIcon />
              </span>

              <span>Delete this company</span>
            </button>
          </div>
        </div>
      ) : null}

      {isDeleteOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 px-4 py-8 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isDeleting
            ) {
              setIsDeleteOpen(false);
              setDeleteError(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${menuId}-delete-title`}
            aria-describedby={`${menuId}-delete-description`}
            className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:p-7"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600"
            >
              <TrashIcon />
            </span>

            <h2
              id={`${menuId}-delete-title`}
              className="mt-5 text-2xl font-semibold tracking-tight text-slate-950"
            >
              Delete {activeCompany.name}?
            </h2>

            <p
              id={`${menuId}-delete-description`}
              className="mt-3 text-sm leading-6 text-slate-600"
            >
              This permanently deletes the company and its saved offer. This action cannot be undone.
            </p>

            {deleteError ? (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {deleteError}
              </p>
            ) : null}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                ref={cancelDeleteRef}
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setIsDeleteOpen(false);
                  setDeleteError(null);
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Keep company
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  void handleDeleteCompany();
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-70"
              >
                {isDeleting
                  ? "Deleting company…"
                  : "Delete permanently"}
              </button>
            </div>
          </section>
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

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="m6 7 1 13h10l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  );
}
