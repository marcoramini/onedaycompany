import type { Company } from "../types/business";
import OpportunityCard from "./OpportunityCard";

type Props = {
  companies: Company[];
  isGenerating: boolean;
  error: string | null;
  onBack: () => void;
  onChooseCompany: (company: Company) => void;
  onGenerateMore: () => void;
};

export default function BusinessOpportunitiesScreen({ companies, isGenerating, error, onBack, onChooseCompany, onGenerateMore }: Props) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <button type="button" onClick={onBack} disabled={isGenerating} className="text-sm font-medium text-slate-500 transition hover:text-slate-950 disabled:opacity-50">← Change your starting point</button>

        <header className="mx-auto max-w-3xl py-10 text-center sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">Three ways to begin</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Choose a direction, not a finished company.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Each idea is only a starting point. Your company agents will help you challenge, refine, and turn it into something real inside the workspace.</p>
        </header>

        {error ? <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">{error}</div> : null}

        <div className="grid gap-6 lg:grid-cols-3">
          {companies.map((company) => <OpportunityCard key={company.id} company={company} isGenerating={isGenerating} onChooseCompany={() => onChooseCompany(company)} />)}
        </div>

        <section className="py-12 text-center">
          <p className="text-sm text-slate-500">None of these feels like the right starting point?</p>
          <button type="button" onClick={onGenerateMore} disabled={isGenerating} className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full border border-violet-300 bg-white px-6 py-3 font-semibold text-violet-700 transition hover:border-violet-500 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50">
            {isGenerating ? "Generating three more ideas..." : "Generate three more ideas"}
          </button>
        </section>
      </div>
    </main>
  );
}
