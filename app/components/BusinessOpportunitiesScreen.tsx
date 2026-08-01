import type { Company } from "../types/business";
import OpportunityCard from "./OpportunityCard";

type BusinessOpportunitiesScreenProps = {
  company: Company;
  isGenerating: boolean;
  error: string | null;
  onBack: () => void;
  onChooseCompany: () => void;
  onRefineProposal: () => void;
  onTryDifferentDirection: () => void;
};

export default function BusinessOpportunitiesScreen({
  company,
  isGenerating,
  error,
  onBack,
  onChooseCompany,
  onRefineProposal,
  onTryDifferentDirection,
}: BusinessOpportunitiesScreenProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          disabled={isGenerating}
          className="mb-6 text-sm font-medium text-slate-500 transition hover:text-slate-950 disabled:opacity-50"
        >
          ← Change your starting point
        </button>

        {error ? (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
          >
            {error}
          </div>
        ) : null}

        <OpportunityCard
          company={company}
          isGenerating={isGenerating}
          onChooseCompany={onChooseCompany}
          onRefineProposal={onRefineProposal}
          onTryDifferentDirection={
            onTryDifferentDirection
          }
        />
      </div>
    </main>
  );
}