import type { BusinessDirection } from "../types/business";
import ResultCard from "./ResultCard";

type BusinessDirectionScreenProps = {
  direction: BusinessDirection;
  onBack: () => void;
  onEditSkills: () => void;
  onBuildBusinessPlan: () => void;
};

export default function BusinessDirectionScreen({
  direction,
  onBack,
  onEditSkills,
  onBuildBusinessPlan,
}: BusinessDirectionScreenProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-violet-50/40 px-6 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid grid-cols-3 items-center">
          <button
            type="button"
            onClick={onBack}
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
              onClick={onEditSkills}
              className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Edit my skills
            </button>

            <button
              type="button"
              onClick={onBuildBusinessPlan}
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