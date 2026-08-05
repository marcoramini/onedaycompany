"use client";

import { useState } from "react";

import { createClient } from "../../lib/supabase/client";

type SaveCompanyScreenProps = {
  companyName: string;
  onBack: () => void;
};

export default function SaveCompanyScreen({
  companyName,
  onBack,
}: SaveCompanyScreenProps) {
  const [isSigningIn, setIsSigningIn] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleGoogleSignIn() {
    if (isSigningIn) {
      return;
    }

    setIsSigningIn(true);
    setError(null);

    try {
      const supabase = createClient();

      const redirectTo =
        `${window.location.origin}/auth/callback` +
        "?next=/company/complete";

      const { error: signInError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
          },
        });

      if (signInError) {
        throw signInError;
      }
    } catch (signInError) {
      console.error(
        "Google sign-in failed.",
        signInError,
      );

      setError(
        signInError instanceof Error
          ? signInError.message
          : "We couldn't start sign-in. Please try again.",
      );

      setIsSigningIn(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-xl">
        <button
          type="button"
          onClick={onBack}
          disabled={isSigningIn}
          className="mb-8 text-sm font-medium text-slate-500 transition hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Back to your company
        </button>

        <section className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
            ✦
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            Your company is ready to build
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Save {companyName}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-slate-600">
            Create your free account to save your
            company, open its workspace and continue
            where you left off.
          </p>

          {error ? (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-left text-red-700"
            >
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            aria-busy={isSigningIn}
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <GoogleIcon />

            <span>
              {isSigningIn
                ? "Opening Google..."
                : "Continue with Google"}
            </span>
          </button>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Your company will remain private and
            connected to your account.
          </p>
        </section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
    >
      <path
        fill="currentColor"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.32 2.98-7.39Z"
      />

      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.97-.9 6.62-2.38l-3.24-2.53c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.6-4.12H3.06v2.61A10 10 0 0 0 12 22Z"
      />

      <path
        fill="currentColor"
        d="M6.4 13.93A6 6 0 0 1 6.08 12c0-.67.12-1.32.32-1.93V7.46H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.54l3.34-2.61Z"
      />

      <path
        fill="currentColor"
        d="M12 5.95c1.47 0 2.8.51 3.84 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.94 5.46l3.34 2.61c.8-2.36 3-4.12 5.6-4.12Z"
      />
    </svg>
  );
}