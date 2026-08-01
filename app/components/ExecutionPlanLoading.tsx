"use client";

import { useEffect, useState } from "react";

const messages = [
  "Understanding what this company needs first",
  "Choosing the simplest actions to begin",
  "Putting each step in the right order",
  "Preparing your company path",
];

const MESSAGE_DURATION_MS = 2_200;
const FADE_DURATION_MS = 400;

type ExecutionPlanLoadingProps = {
  companyName: string;
};

export default function ExecutionPlanLoading({
  companyName,
}: ExecutionPlanLoadingProps) {
  const [messageIndex, setMessageIndex] =
    useState(0);
  const [isVisible, setIsVisible] =
    useState(true);

  useEffect(() => {
    const fadeOutTimer = window.setTimeout(
      () => {
        setIsVisible(false);
      },
      MESSAGE_DURATION_MS - FADE_DURATION_MS,
    );

    const nextMessageTimer = window.setTimeout(
      () => {
        setMessageIndex(
          (currentIndex) =>
            (currentIndex + 1) %
            messages.length,
        );
        setIsVisible(true);
      },
      MESSAGE_DURATION_MS,
    );

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(nextMessageTimer);
    };
  }, [messageIndex]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-6 py-10 text-[#171717]">
      <section className="w-full max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
          {companyName}
        </p>

        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
          Every company starts differently.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-black/58">
          We&apos;re preparing the simplest path
          for this one.
        </p>

        <div className="mx-auto mt-12 flex max-w-xl items-center gap-4 rounded-3xl border border-black/10 bg-white px-5 py-5 text-left shadow-[0_18px_60px_rgba(40,30,70,0.06)] sm:px-6">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 animate-spin text-violet-700"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-20"
              />

              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p
            aria-live="polite"
            className={`min-h-6 text-sm font-semibold leading-6 text-black/70 transition-opacity duration-500 sm:text-base ${
              isVisible
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            {messages[messageIndex]}
          </p>
        </div>
      </section>
    </main>
  );
}
