import type { Company } from "../types/business";

type OpportunityCardProps = {
  company: Company;
  onChooseCompany: () => void;
  isGenerating?: boolean;
};

export default function OpportunityCard({ company, onChooseCompany, isGenerating = false }: OpportunityCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Starting direction</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{company.name}</h2>

      <dl className="mt-8 flex-1 space-y-6">
        <IdeaField label="Mission" value={company.mission} />
        <IdeaField label="Problem" value={company.problem} />
        <IdeaField label="Solution" value={company.solution} />
      </dl>

      <button
        type="button"
        onClick={onChooseCompany}
        disabled={isGenerating}
        className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-center font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Start from this idea
        <span aria-hidden="true" className="ml-2">→</span>
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-slate-500">You&apos;ll refine it with your agents inside the workspace.</p>
    </article>
  );
}

function IdeaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</dt>
      <dd className="mt-2 leading-7 text-slate-700">{value}</dd>
    </div>
  );
}
