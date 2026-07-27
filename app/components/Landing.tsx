type LandingProps = {
  onStart: () => void;
};

const journeySteps = [
  "Skills",
  "Business Direction",
  "First Offer",
  "First Customer",
  "First Revenue",
];

export default function Landing({ onStart }: LandingProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-violet-50/40 px-6 py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <section className="w-full max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">
            OneDayCompany
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Our belief
            </p>

            <blockquote className="mt-4">
              <p className="text-2xl font-medium leading-9 tracking-tight text-slate-700 sm:text-3xl sm:leading-10">
                “Everyone has valuable skills.
                <span className="block">
                  Few know how to turn them into a business.”
                </span>
              </p>
            </blockquote>
          </div>

          <div className="mx-auto mt-10 h-px w-20 bg-violet-200" />

          <h1 className="mx-auto mt-10 max-w-4xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Launch your business.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Start today with the skills you already have.
            <span className="block">
              In just a few steps you'll have a clear business direction, your first offer, and a practical plan to reach your first customer.
            </span>
          </p>

          <button
            type="button"
            onClick={onStart}
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-200/40 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
          >
            Start with your skills
            <span aria-hidden="true">→</span>
          </button>

          <p className="mt-5 text-sm text-slate-500">
            Your experience is enough to begin.
          </p>
        </section>

        <section
          aria-labelledby="journey-title"
          className="mt-20 w-full max-w-5xl border-t border-violet-100 pt-10 sm:mt-24"
        >
          <p
            id="journey-title"
            className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-violet-600"
          >
            Your journey
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-5 sm:gap-0">
            {journeySteps.map((step, index) => (
              <div
                key={step}
                className="relative flex items-center sm:flex-col sm:text-center"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white text-sm font-semibold text-violet-700">
                  {index + 1}
                </div>

                <p className="ml-4 text-base font-semibold text-slate-700 sm:ml-0 sm:mt-4">
                  {step}
                </p>

                {index < journeySteps.length - 1 && (
                  <>
                    <span
                      aria-hidden="true"
                      className="ml-auto text-violet-300 sm:hidden"
                    >
                      ↓
                    </span>

                    <div
                      aria-hidden="true"
                      className="absolute left-[calc(50%+1.75rem)] right-[calc(-50%+1.75rem)] top-5 hidden h-px bg-violet-200 sm:block"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}