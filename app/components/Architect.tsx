import ArchitectStep from "./ArchitectStep";

type ArchitectProps = {
  onBack: () => void;
};

export default function Architect({ onBack }: ArchitectProps) {
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

        <section className="mx-auto mt-20 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            The Architect
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Building your business...
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            We&apos;re transforming your skills into a practical business
            blueprint.
          </p>

          <div className="mt-12 rounded-3xl border border-violet-100 bg-white p-7 text-left shadow-sm sm:p-9">
            <ArchitectStep
              completed
              text="Understanding your skills"
            />

            <ArchitectStep
              completed
              text="Finding the right customers"
            />

            <ArchitectStep
              completed
              text="Defining your value proposition"
            />

            <ArchitectStep
              active
              text="Designing your first offer"
            />

            <ArchitectStep text="Creating your business model" />

            <ArchitectStep text="Identifying your first customer" />
          </div>

          <p className="mt-6 text-sm text-slate-400">
            This usually takes a few moments.
          </p>
        </section>
      </div>
    </main>
  );
}