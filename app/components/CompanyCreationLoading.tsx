"use client";

import { useEffect, useState } from "react";

const messages = [
  "We're shaping your company...",
  "Looking for the strongest opportunity...",
  "Keeping it simple, practical and launchable...",
  "Your new business is almost ready...",
];

const MESSAGE_DURATION_MS = 2_400;
const FADE_DURATION_MS = 450;

export default function CompanyCreationLoading() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, MESSAGE_DURATION_MS - FADE_DURATION_MS);

    const nextMessageTimer = window.setTimeout(() => {
      setMessageIndex(
        (currentIndex) =>
          (currentIndex + 1) % messages.length,
      );
      setIsVisible(true);
    }, MESSAGE_DURATION_MS);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(nextMessageTimer);
    };
  }, [messageIndex]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-violet-50/50 px-6 py-10">
      <section className="w-full max-w-3xl text-center">
        <div
          aria-hidden="true"
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-10 w-10 animate-spin text-violet-700"
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

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
          OneDayCompany
        </p>

        <div className="mt-5 flex min-h-32 items-center justify-center">
          <h1
            aria-live="polite"
            className={`text-4xl font-semibold tracking-tight text-slate-950 transition-opacity duration-500 sm:text-6xl ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {messages[messageIndex]}
          </h1>
        </div>

        <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-violet-100 bg-white px-6 py-5 shadow-sm">
          <p className="font-semibold text-slate-950">
            OneDayCompany is building your new business.
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This usually takes just a few moments.
          </p>
        </div>
      </section>
    </main>
  );
}