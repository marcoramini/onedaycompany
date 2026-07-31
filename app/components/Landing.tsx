type LandingProps = {
  onStart: () => void;
};

export default function Landing({ onStart }: LandingProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfcff] text-[#101935]">
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-violet-100/60 blur-3xl"
        />

        <header className="mx-auto flex w-full max-w-6xl justify-center px-6 py-8 sm:py-10">
          <div className="text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.34em] text-violet-600">
              OneDayCompany
            </p>

            <p className="mt-3 text-sm font-medium leading-6 text-violet-500">
              Love what you build.
              <br />
              Build what you love.
            </p>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 pt-10 text-center sm:pb-28 sm:pt-16">
          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#080f2a] sm:text-6xl lg:text-8xl">
            Build the business
            <br />
            that fits you.
          </h1>

          <p className="mt-8 max-w-2xl text-balance text-lg leading-8 text-slate-600 sm:text-xl">
            Build a business around who you are.
          </p>

          <button
            type="button"
            onClick={onStart}
            className="group mt-10 inline-flex min-h-16 items-center justify-center gap-4 rounded-2xl bg-[#080f2a] px-8 text-base font-semibold text-white shadow-[0_18px_50px_rgba(8,15,42,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-[0_22px_60px_rgba(109,40,217,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300"
          >
            Start my company
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </button>

          <p className="mt-5 text-sm text-slate-500">
            You don't need a business idea. You only need to begin.
          </p>
        </section>
      </div>

      <section className="border-t border-violet-100 bg-white/80">
        <div className="mx-auto grid w-full max-w-6xl gap-0 px-6 py-14 sm:grid-cols-3 sm:py-16">
          <article className="border-b border-violet-100 py-8 text-center sm:border-b-0 sm:border-r sm:px-10 sm:py-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500">
              Begin as you are
            </span>

            <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#101935]">
              You already have enough.
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Your interests, experiences and way of seeing the world are a
              real place to start.
            </p>
          </article>

          <article className="border-b border-violet-100 py-8 text-center sm:border-b-0 sm:border-r sm:px-10 sm:py-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500">
              Build today
            </span>

            <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#101935]">
              Make it real from day one.
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Discover a company that fits you and start bringing it to life
              immediately.
            </p>
          </article>

          <article className="py-8 text-center sm:px-10 sm:py-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500">
              Grow every day
            </span>

            <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#101935]">
              One meaningful step at a time.
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Today you begin. Tomorrow you keep improving what you started.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}