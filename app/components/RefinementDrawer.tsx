"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

type RefinementDrawerProps = {
  isOpen: boolean;
  companyName: string;
  onClose: () => void;
  onSubmit: (
    refinementRequest: string,
  ) => void | Promise<void>;
};

const refinementSuggestions = [
  "Make it closer to my passions",
  "Choose a different type of customer",
  "Make it more innovative",
  "Make it simpler to launch",
  "Reduce the initial investment",
];

export default function RefinementDrawer({
  isOpen,
  companyName,
  onClose,
  onSubmit,
}: RefinementDrawerProps) {
  const [refinementRequest, setRefinementRequest] =
    useState("");

  useEffect(() => {
    if (isOpen) {
      setRefinementRequest("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedRequest =
      refinementRequest.trim();

    if (!normalizedRequest) {
      return;
    }

    await onSubmit(normalizedRequest);
  }

  function handleSuggestionClick(
    suggestion: string,
  ) {
    setRefinementRequest(suggestion);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/35"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="refinement-title"
        className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-6 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Refine your proposal
            </p>

            <h2
              id="refinement-title"
              className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
            >
              Let&apos;s shape {companyName} together
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close refinement panel"
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-y-auto px-6 py-6 sm:px-8"
        >
          <p className="leading-7 text-slate-600">
            Tell us what feels right and what
            doesn&apos;t. We&apos;ll improve this proposal
            without losing its strongest parts.
          </p>

          <div className="mt-7">
            <p className="text-sm font-semibold text-slate-950">
              Start with a suggestion
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {refinementSuggestions.map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion,
                      )
                    }
                    className="rounded-full border border-slate-200 px-4 py-2 text-left text-sm text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="mt-7">
            <label
              htmlFor="refinement-request"
              className="text-sm font-semibold text-slate-950"
            >
              What would you like to change?
            </label>

            <textarea
              id="refinement-request"
              value={refinementRequest}
              onChange={(event) =>
                setRefinementRequest(
                  event.target.value,
                )
              }
              rows={7}
              maxLength={2_000}
              autoFocus
              placeholder="For example: keep the idea, but make it more focused on local communities and create a first offer that I could deliver in person..."
              className="mt-3 w-full resize-none rounded-2xl border border-slate-300 px-4 py-4 leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />

            <p className="mt-2 text-sm text-slate-400">
              Describe one or more changes in your own
              words.
            </p>
          </div>

          <div className="mt-auto pt-8">
            <button
              type="submit"
              disabled={!refinementRequest.trim()}
              className="w-full rounded-full bg-slate-950 px-6 py-4 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Refine this proposal
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}