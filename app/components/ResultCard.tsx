type ResultCardProps = {
  label: string;
  value: string;
};

export default function ResultCard({
  label,
  value,
}: ResultCardProps) {
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