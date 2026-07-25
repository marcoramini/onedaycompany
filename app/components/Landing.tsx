type LandingProps = {
  onStart: () => void;
};

export default function Landing({ onStart }: LandingProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="w-full max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          OneDayCompany
        </h1>

        <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Build your company.
          <br />
          Today.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Artificial Intelligence should not only create billion-dollar
          companies.
          <br className="hidden sm:block" />
          It should help millions of people build their own.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-10 rounded-2xl bg-slate-950 px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
        >
          Start for free
        </button>
      </section>
    </main>
  );
}