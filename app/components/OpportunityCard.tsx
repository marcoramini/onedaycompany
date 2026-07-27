import type { BusinessDirection } from "../types/business";

type OpportunityCardProps = {
  direction: BusinessDirection;
  onChoose: (direction: BusinessDirection) => void;
};

export default function OpportunityCard({
  direction,
  onChoose,
}: OpportunityCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        {direction.title}
      </h2>

      <dl className="mt-6 space-y-5">
        <div>
          <dt className="text-sm font-semibold text-violet-600">
            Who you could help
          </dt>
          <dd className="mt-1 leading-7 text-slate-600">
            {direction.customer}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-semibold text-violet-600">
            Value you could create
          </dt>
          <dd className="mt-1 leading-7 text-slate-600">
            {direction.valueCreated}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-semibold text-violet-600">
            Why this fits you
          </dt>
          <dd className="mt-1 leading-7 text-slate-600">
            {direction.credibility}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-semibold text-violet-600">
            Why it is practical to test
          </dt>
          <dd className="mt-1 leading-7 text-slate-600">
            {direction.testability}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => onChoose(direction)}
        className="mt-8 rounded-2xl bg-slate-950 px-5 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        Choose this direction →
      </button>
    </article>
  );
}
