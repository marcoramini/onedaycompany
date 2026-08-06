//file: app/components/console/ConsoleUserArea.tsx

type ConsoleUserAreaProps = {
  userName: string;
  userEmail: string | null;
  compact?: boolean;
};

export default function ConsoleUserArea({
  userName,
  userEmail,
  compact = false,
}: ConsoleUserAreaProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <UserAvatar userName={userName} />

        <form
          action="/auth/signout"
          method="post"
        >
          <button
            type="submit"
            aria-label="Sign out"
            title="Sign out"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-950"
          >
            <SignOutIcon />
          </button>
        </form>
      </div>
    );
  }

  return (
    <section
      aria-label="Account and plan"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <div className="flex items-center gap-3">
        <UserAvatar userName={userName} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-950">
            {userName}
          </p>

          {userEmail ? (
            <p className="mt-0.5 truncate text-xs text-slate-500">
              {userEmail}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4">
        <PlaceholderStat
          label="Current plan"
          value="Free"
        />

        <PlaceholderStat
          label="Credits & usage"
          value="Coming soon"
        />
      </div>

      <form
        action="/auth/signout"
        method="post"
        className="mt-4"
      >
        <button
          type="submit"
          className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
        >
          <SignOutIcon />
          Sign out
        </button>
      </form>
    </section>
  );
}

type PlaceholderStatProps = {
  label: string;
  value: string;
};

function PlaceholderStat({
  label,
  value,
}: PlaceholderStatProps) {
  return (
    <div className="rounded-xl bg-white px-3 py-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function UserAvatar({
  userName,
}: {
  userName: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-800"
    >
      {getInitials(userName)}
    </div>
  );
}

function getInitials(value: string) {
  const initials = value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "U";
}

function SignOutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10" />
      <path d="M14 8l4 4-4 4" />
      <path d="M9 12h9" />
    </svg>
  );
}