import Link from "next/link";

type AuthErrorPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const { message } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
          Sign-in interrupted
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          We couldn&apos;t open your workspace
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          {message ??
            "Something interrupted authentication. Your company proposal is still available in this browser session."}
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