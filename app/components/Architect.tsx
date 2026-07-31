import type { Company } from "../types/business";
import ArchitectStep from "./ArchitectStep";

type ArchitectProps = {
  company: Company;
  onBack: () => void;
  onRestart: () => void;
};

export default function Architect({
  company,
  onBack,
  onRestart,
}: ArchitectProps) {
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

          <button
            type="button"
            onClick={onRestart}
            className="justify-self-end rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          >
            Start over
          </button>
        </header>

        <section className="mx-auto mt-20 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Building {company.name}
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Your company is becoming real.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            We&apos;re turning {company.name} into a clear offer, a visible
            business, and a practical path to its first customer.
          </p>

          <div className="mt-10 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4">
            <p className="text-sm font-semibold text-violet-900">
              {company.tagline}
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-violet-100 bg-white p-7 text-left shadow-sm sm:p-9">
            <ArchitectStep
              completed
              text="Defining the company foundation"
            />

            <ArchitectStep
              completed
              text="Identifying the first customers"
            />

            <ArchitectStep
              completed
              text={`Shaping ${company.firstOffer.name}`}
            />

            <ArchitectStep
              active
              text="Building the first offer"
            />

            <ArchitectStep text="Creating the public business page" />

            <ArchitectStep text="Preparing the path to the first customer" />
          </div>

          <p className="mt-6 text-sm text-slate-400">
            One practical step at a time.
          </p>
        </section>
      </div>
    </main>
  );
}