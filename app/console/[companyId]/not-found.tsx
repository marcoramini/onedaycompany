import Link from "next/link";

export default function CompanyNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          Company workspace
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          This company is not available
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          It may not exist, or it may belong to a
          different account.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Return to OneDayCompany
        </Link>
      </section>
    </main>
  );
}