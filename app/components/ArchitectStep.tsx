type ArchitectStepProps = {
  text: string;
  completed?: boolean;
  active?: boolean;
};

export default function ArchitectStep({
  text,
  completed = false,
  active = false,
}: ArchitectStepProps) {
  const icon = completed ? "✓" : active ? "•" : "○";

  const iconClasses = completed
    ? "bg-violet-600 text-white"
    : active
      ? "bg-violet-100 text-violet-700"
      : "bg-slate-100 text-slate-400";

  const textClasses = completed
    ? "text-slate-700"
    : active
      ? "text-violet-700"
      : "text-slate-400";

  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${iconClasses}`}
      >
        {icon}
      </span>

      <p className={`text-base font-medium sm:text-lg ${textClasses}`}>
        {text}
      </p>
    </div>
  );
}