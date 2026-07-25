"use client";

import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [skills, setSkills] = useState("");

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <section className="w-full max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            OneDayCompany
          </h1>

          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Build your company.
            <br />
            Today.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Artificial Intelligence should not only create billion-dollar
            companies.
            <br className="hidden sm:block" />
            It should help millions of people build their own.
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-10 rounded-2xl bg-slate-950 px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
          >
            Start for free
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-violet-50/40 px-6 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid grid-cols-3 items-center">
          <button
            type="button"
            onClick={() => setStarted(false)}
            className="justify-self-start rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            ← Back
          </button>

          <div className="justify-self-center text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            OneDayCompany
          </div>

          <div />
        </header>

        <section className="mx-auto mt-14 max-w-3xl text-center sm:mt-20">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            What are you really
            <br className="hidden sm:block" />
            good at?
          </h1>

          <div className="mx-auto mt-8 max-w-xl space-y-3 text-left sm:mt-10">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg">
                ✦
              </span>

              <p className="text-lg font-semibold text-violet-700 sm:text-xl">
                You already have the skills.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg">
                ↗
              </span>

              <p className="text-lg font-semibold text-violet-700 sm:text-xl">
                We help you build the business.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 h-px w-20 bg-violet-200" />

          <div className="mt-8">
            <p className="text-lg text-slate-700 sm:text-xl">
              Tell us what you know how to do.
            </p>

            <p className="mt-2 text-lg text-slate-500 sm:text-xl">
              We&apos;ll take care of turning it into a business.
            </p>
          </div>

          <form
            className="mt-10"
            onSubmit={(event) => {
              event.preventDefault();

              if (!skills.trim()) {
                return;
              }

              console.log("Skills:", skills);
            }}
          >
            <label htmlFor="skills" className="sr-only">
              Describe your skills
            </label>

            <textarea
              id="skills"
              name="skills"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              placeholder={`I'm a software developer...\nI love cooking...\nI'm good at teaching...`}
              rows={7}
              autoFocus
              className="w-full resize-none rounded-3xl border border-violet-200 bg-white px-6 py-5 text-lg leading-8 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />

            <button
              type="submit"
              disabled={!skills.trim()}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-200/50 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:w-auto sm:min-w-80"
            >
              Continue
              <span aria-hidden="true">→</span>
            </button>

            <p className="mt-5 text-sm text-slate-400">
              Your information is private and secure.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}