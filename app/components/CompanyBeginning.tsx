"use client";

import {
  type FormEvent,
  useState,
} from "react";

type CompanyBeginningProps = {
  initialValue?: string;
  isSubmitting: boolean;
  error: string | null;
  onBack: () => void;
  onSubmit: (
    context: string,
  ) => void | Promise<void>;
};

export default function CompanyBeginning({
  initialValue = "",
  isSubmitting,
  error,
  onBack,
  onSubmit,
}: CompanyBeginningProps) {
  const [context, setContext] =
    useState(initialValue);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedContext = context.trim();

    if (!normalizedContext || isSubmitting) {
      return;
    }

    await onSubmit(normalizedContext);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-3xl">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="mb-8 text-sm font-medium text-slate-500 transition hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Back
        </button>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Your company starts here
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            What would you love to build from?
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Share something you love, know, have
            experienced, keep imagining, or would be
            proud to create.
          </p>

          <div className="mt-8 rounded-2xl bg-violet-50 px-5 py-4 text-violet-900">
            You already have enough to begin.
          </div>

          <label
            htmlFor="beginning-context"
            className="sr-only"
          >
            What would you love to build from?
          </label>

          <textarea
            id="beginning-context"
            value={context}
            onChange={(event) =>
              setContext(event.target.value)
            }
            disabled={isSubmitting}
            rows={8}
            placeholder="I love explaining complex ideas, designing simple tools, and helping independent professionals feel more confident with technology..."
            className="mt-6 w-full resize-none rounded-2xl border border-slate-300 bg-white px-5 py-4 text-lg leading-relaxed text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <p className="mt-3 text-sm text-slate-500">
            Use your own words. There is no right answer.
          </p>

          {error ? (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
              {error}
            </div>
          ) : null}

            <button
              type="submit"
              disabled={isSubmitting || !context.trim()}
              aria-busy={isSubmitting}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 animate-spin"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />

                    <path
                      d="M21 12a9 9 0 0 0-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-90"
                    />
                  </svg>

                  <span>Shaping your company...</span>
                </>
              ) : (
                <span>Shape my company</span>
              )}
            </button>
        </form>
      </div>
    </main>
  );
}