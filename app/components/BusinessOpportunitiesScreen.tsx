import type { BusinessDirection } from "../types/business";
import OpportunityCard from "./OpportunityCard";

type BusinessOpportunitiesScreenProps = {
  directions: BusinessDirection[];
  onBack: () => void;
  onChooseDirection: (direction: BusinessDirection) => void;
};

export default function BusinessOpportunitiesScreen({
  directions,
  onBack,
  onChooseDirection,
}: BusinessOpportunitiesScreenProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-violet-50/40 px-6 py-8">
      <div className="mx-auto w-full max-w-7xl">
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

        <section className="mt-14 sm:mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Business opportunities
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Choose a direction worth exploring.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Based on your skills, here are three business directions you
              could realistically test. They are starting hypotheses, not
              validated opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {directions.map((direction) => (
              <OpportunityCard
                key={direction.id}
                direction={direction}
                onChoose={onChooseDirection}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950"
            >
              Refine my skills
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
