//file: app/components/console/ConsoleNavigation.tsx

import Link from "next/link";

type ConsoleNavigationProps = {
  companyId: string;
};

type NavigationIcon =
  | "home"
  | "identity"
  | "offer"
  | "customers"
  | "strategy"
  | "brand"
  | "tasks"
  | "documents"
  | "assets"
  | "website"
  | "marketing"
  | "sales"
  | "billing"
  | "credits"
  | "account";

type NavigationItem = {
  label: string;
  icon: NavigationIcon;
  href?: string;
  isActive?: boolean;
};

type NavigationSection = {
  label?: string;
  items: NavigationItem[];
};

export default function ConsoleNavigation({
  companyId,
}: ConsoleNavigationProps) {
  const navigationSections: NavigationSection[] = [
    {
      items: [
        {
          label: "Home",
          icon: "home",
          href: `/console/${companyId}`,
          isActive: true,
        },
      ],
    },
    {
      label: "Foundation",
      items: [
        {
          label: "Identity",
          icon: "identity",
        },
        {
          label: "Offer",
          icon: "offer",
        },
        {
          label: "Customers",
          icon: "customers",
        },
        {
          label: "Strategy",
          icon: "strategy",
        },
        {
          label: "Brand",
          icon: "brand",
        },
      ],
    },
    {
      label: "Execution",
      items: [
        {
          label: "Tasks",
          icon: "tasks",
        },
        {
          label: "Documents",
          icon: "documents",
        },
        {
          label: "Assets",
          icon: "assets",
        },
      ],
    },
    {
      label: "Growth",
      items: [
        {
          label: "Website",
          icon: "website",
        },
        {
          label: "Marketing",
          icon: "marketing",
        },
        {
          label: "Sales",
          icon: "sales",
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Plan & Billing",
          icon: "billing",
        },
        {
          label: "Credits & Usage",
          icon: "credits",
        },
        {
          label: "Account",
          icon: "account",
        },
      ],
    },
  ];

  return (
    <nav aria-label="Company workspace">
      <div className="space-y-7">
        {navigationSections.map(
          (section, sectionIndex) => (
            <NavigationGroup
              key={
                section.label ??
                `primary-${sectionIndex}`
              }
              section={section}
            />
          ),
        )}
      </div>
    </nav>
  );
}

function NavigationGroup({
  section,
}: {
  section: NavigationSection;
}) {
  return (
    <section>
      {section.label ? (
        <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
          {section.label}
        </p>
      ) : null}

      <div
        className={
          section.label
            ? "mt-2 space-y-1"
            : "space-y-1"
        }
      >
        {section.items.map((item) => (
          <NavigationEntry
            key={item.label}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

function NavigationEntry({
  item,
}: {
  item: NavigationItem;
}) {
  const baseClassName =
    "group flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition";

  const content = (
    <>
      <span
        aria-hidden="true"
        className="flex h-5 w-5 shrink-0 items-center justify-center"
      >
        <WorkspaceIcon name={item.icon} />
      </span>

      <span className="min-w-0 flex-1 truncate">
        {item.label}
      </span>

      {!item.href ? (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-slate-400">
          Soon
        </span>
      ) : null}
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        aria-current={
          item.isActive ? "page" : undefined
        }
        className={[
          baseClassName,
          item.isActive
            ? "bg-violet-50 text-violet-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
        ].join(" ")}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      aria-disabled="true"
      title={`${item.label} is coming soon`}
      className={[
        baseClassName,
        "cursor-default text-slate-500",
      ].join(" ")}
    >
      {content}
    </div>
  );
}

function WorkspaceIcon({
  name,
}: {
  name: NavigationIcon;
}) {
  switch (name) {
    case "home":
      return (
        <Icon>
          <path d="m4 10 8-6 8 6" />
          <path d="M6 9v10h12V9" />
          <path d="M10 19v-5h4v5" />
        </Icon>
      );

    case "identity":
      return (
        <Icon>
          <circle cx="12" cy="8" r="3" />
          <path d="M6.5 19c.8-3 2.65-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
        </Icon>
      );

    case "offer":
      return (
        <Icon>
          <path d="M5 6h14v12H5z" />
          <path d="M9 10h6M9 14h4" />
        </Icon>
      );

    case "customers":
      return (
        <Icon>
          <circle cx="9" cy="9" r="2.5" />
          <circle cx="16.5" cy="10" r="2" />
          <path d="M4.5 18c.6-2.8 2.1-4.2 4.5-4.2s3.9 1.4 4.5 4.2" />
          <path d="M14 14.5c2.8 0 4.5 1.2 5 3.5" />
        </Icon>
      );

    case "strategy":
      return (
        <Icon>
          <path d="m5 18 5-6 3 3 6-8" />
          <path d="M15 7h4v4" />
        </Icon>
      );

    case "brand":
      return (
        <Icon>
          <path d="m12 4 2.3 4.6 5.1.8-3.7 3.6.9 5-4.6-2.4L7.4 18l.9-5-3.7-3.6 5.1-.8L12 4Z" />
        </Icon>
      );

    case "tasks":
      return (
        <Icon>
          <path d="M9 6h10M9 12h10M9 18h10" />
          <path d="m4.5 6 .8.8L7 5" />
          <path d="m4.5 12 .8.8L7 11" />
          <path d="m4.5 18 .8.8L7 17" />
        </Icon>
      );

    case "documents":
      return (
        <Icon>
          <path d="M7 3h7l3 3v15H7z" />
          <path d="M14 3v4h3" />
          <path d="M10 12h4M10 16h4" />
        </Icon>
      );

    case "assets":
      return (
        <Icon>
          <rect
            x="4"
            y="5"
            width="16"
            height="14"
            rx="2"
          />
          <circle cx="15.5" cy="9" r="1.5" />
          <path d="m6.5 17 4-4 2.5 2.5 2-2 2.5 3.5" />
        </Icon>
      );

    case "website":
      return (
        <Icon>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
          />
          <path d="M3 9h18" />
          <path d="M7 7h.01M10 7h.01" />
        </Icon>
      );

    case "marketing":
      return (
        <Icon>
          <path d="M4 14h4l8-5v10l-8-5" />
          <path d="m8 14 1 5h3" />
          <path d="M19 11c1.3 1.7 1.3 4.3 0 6" />
        </Icon>
      );

    case "sales":
      return (
        <Icon>
          <path d="M12 3v18" />
          <path d="M16 7c-.9-1-2.2-1.5-4-1.5-2 0-3.5 1-3.5 2.7 0 4 7 1.7 7 5.8 0 1.8-1.5 3-4 3-1.7 0-3.2-.5-4.5-1.6" />
        </Icon>
      );

    case "billing":
      return (
        <Icon>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
          />
          <path d="M3 9h18M7 15h4" />
        </Icon>
      );

    case "credits":
      return (
        <Icon>
          <path d="m13 3-7 11h5l-1 7 8-12h-5V3Z" />
        </Icon>
      );

    case "account":
      return (
        <Icon>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 19c1-3 3-4.5 6-4.5s5 1.5 6 4.5" />
        </Icon>
      );
  }
}

function Icon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 stroke-current"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}