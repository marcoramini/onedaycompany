"use client";

import { useState } from "react";

type BusinessDirection = {
  strongestSkill: string;
  customer: string;
  problem: string;
  businessIdea: string;
  firstOffer: string;
  nextAction: string;
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [skills, setSkills] = useState("");
  const [direction, setDirection] = useState<BusinessDirection | null>(null);

  if (direction) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-violet-50/40 px-6 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid grid-cols-3 items-center">
          <button
            type="button"
            onClick={() => setDirection(null)}
            className="justify-self-start rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            ← Back
          </button>

          <div className="justify-self-center text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            OneDayCompany
          </div>

          <div />
        </header>

        <section className="mx-auto mt-14 max-w-3xl sm:mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Your first business direction
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Your skills can become a business.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              This is not a complete business plan. It is your first concrete
              direction.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            <ResultCard
              label="Your strongest skill"
              value={direction.strongestSkill}
            />

            <ResultCard
              label="Possible customer"
              value={direction.customer}
            />

            <ResultCard
              label="Problem you could solve"
              value={direction.problem}
            />

            <ResultCard
              label="First business idea"
              value={direction.businessIdea}
            />

            <ResultCard
              label="First offer"
              value={direction.firstOffer}
            />

            <ResultCard
              label="Your next action"
              value={direction.nextAction}
            />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setDirection(null)}
              className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Edit my skills
            </button>

            <button
              type="button"
              className="rounded-2xl bg-slate-950 px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Build my business plan →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

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

              const normalizedSkills = skills.trim();

              if (!normalizedSkills) {
                return;
              }

              const result = buildBusinessDirection(normalizedSkills);
              setDirection(result);
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

type ResultCardProps = {
  label: string;
  value: string;
};

function ResultCard({ label, value }: ResultCardProps) {
  return (
    <article className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-600">
        {label}
      </p>

      <p className="mt-3 text-lg leading-8 text-slate-700">
        {value}
      </p>
    </article>
  );
}

function buildBusinessDirection(skills: string): BusinessDirection {
  const normalized = skills.toLowerCase();

  if (
    normalized.includes("software") ||
    normalized.includes("developer") ||
    normalized.includes("programming") ||
    normalized.includes("code")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Small businesses and independent professionals that need simple digital tools but cannot hire a full development team.",
      problem:
        "Many small organizations still manage repetitive work manually because custom software appears too expensive or complicated.",
      businessIdea:
        "Create small, focused software solutions that automate one repetitive business process at a time.",
      firstOffer:
        "A fixed-price workflow automation delivered in seven days, starting with a free 30-minute process review.",
      nextAction:
        "Contact one small business owner today and ask which repetitive task consumes the most time every week.",
    };
  }

  if (
    normalized.includes("teach") ||
    normalized.includes("teacher") ||
    normalized.includes("training") ||
    normalized.includes("education")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Students or professionals who need practical help understanding a specific subject.",
      problem:
        "People often have access to information but lack a clear, personalized learning path.",
      businessIdea:
        "Offer short, outcome-based learning programs focused on one specific result.",
      firstOffer:
        "A one-hour individual session that helps the customer understand or complete one clearly defined task.",
      nextAction:
        "Choose one topic you can teach confidently and offer a free pilot session to one real person today.",
    };
  }

  if (
    normalized.includes("cook") ||
    normalized.includes("baking") ||
    normalized.includes("chef") ||
    normalized.includes("food")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Busy people who want high-quality homemade food or practical guidance in the kitchen.",
      problem:
        "Many people want healthier or more personal food experiences but lack time, confidence or preparation skills.",
      businessIdea:
        "Turn your cooking expertise into a focused local service, workshop or digital product.",
      firstOffer:
        "A small paid cooking experience for a limited group, centred on one recipe or one specific need.",
      nextAction:
        "Select one dish people regularly appreciate and ask five contacts whether they would pay for it or learn how to make it.",
    };
  }

  if (
    normalized.includes("design") ||
    normalized.includes("photo") ||
    normalized.includes("video") ||
    normalized.includes("creative")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Independent professionals and small businesses that need a stronger visual presence.",
      problem:
        "Small organizations often struggle to communicate their value clearly and consistently.",
      businessIdea:
        "Create a productized creative service with a clear deliverable, fixed deadline and fixed price.",
      firstOffer:
        "A starter visual package containing one clearly defined result, delivered within five working days.",
      nextAction:
        "Find one local professional whose online presence could be improved and prepare a small example for them today.",
    };
  }

  return {
    strongestSkill: skills,
    customer:
      "People or small businesses that need your expertise but lack the time, knowledge or resources to obtain the same result independently.",
    problem:
      "Your potential customer needs a useful result that you can deliver faster, more clearly or with less risk.",
    businessIdea:
      "Transform your experience into a narrowly defined service for one specific type of customer and one specific problem.",
    firstOffer:
      "A small starter service with a clear result, a fixed delivery time and a simple initial price.",
    nextAction:
      "Identify one real person who might benefit from your skill and ask them about their current problem today.",
  };
}