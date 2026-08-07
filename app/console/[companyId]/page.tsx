//file: app/console/[companyId]/page.tsx 

import type { User } from "@supabase/supabase-js";
import {
  notFound,
  redirect,
} from "next/navigation";

import CompanyConsoleHeader from "../../components/console/CompanyConsoleHeader";
import CompanyCapabilities from "../../components/console/CompanyCapabilities";
import CompanyJourney from "../../components/console/CompanyJourney";
import CompanyOverview from "../../components/console/CompanyOverview";
import CompanySwitcher from "../../components/console/CompanySwitcher";
import ConsoleMobileHeader from "../../components/console/ConsoleMobileHeader";
import ConsoleShell from "../../components/console/ConsoleShell";
import ConsoleSidebar from "../../components/console/ConsoleSidebar";
import ConsoleUserArea from "../../components/console/ConsoleUserArea";
import OpenedCompanyTracker from "../../components/console/OpenedCompanyTracker";
import {
  getCompanyExecutionPlan,
  getUserCompanies,
} from "../../lib/companies/companyQueries";
import { getMomentumCurrentStep } from "../../lib/companyMomentum";
import { createClient } from "../../lib/supabase/server";

type CompanyConsolePageProps = {
  params: Promise<{
    companyId: string;
  }>;
};

type PersistedCompany = {
  id: string;
  name: string;
  tagline: string;
  mission: string;
  problem: string;
  solution: string;
  ideal_customers: string[];
  status: string;
  active_stage: string;
};

type PersistedOffer = {
  id: string;
  name: string;
  description: string;
  outcome: string;
  status: string;
};

export default async function CompanyConsolePage({
  params,
}: CompanyConsolePageProps) {
  const { companyId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const {
    data: company,
    error: companyError,
  } = await supabase
    .from("companies")
    .select(`
      id,
      name,
      tagline,
      mission,
      problem,
      solution,
      ideal_customers,
      status,
      active_stage
    `)
    .eq("id", companyId)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (companyError) {
    console.error(
      "Company workspace loading failed.",
      companyError,
    );

    throw new Error(
      "We couldn't load this company workspace.",
    );
  }

  if (!company) {
    notFound();
  }

  const {
    data: offer,
    error: offerError,
  } = await supabase
    .from("offers")
    .select(`
      id,
      name,
      description,
      outcome,
      status
    `)
    .eq("company_id", companyId)
    .order("created_at", {
      ascending: true,
    })
    .limit(1)
    .maybeSingle();

  if (offerError) {
    console.error(
      "Company offer loading failed.",
      offerError,
    );

    throw new Error(
      "We couldn't load this company's offer.",
    );
  }

  let companies;

  try {
    companies = await getUserCompanies(
      supabase,
      user.id,
    );
  } catch (companyListError) {
    console.error(
      "Company switcher loading failed.",
      companyListError,
    );

    throw new Error(
      "We couldn't load your companies.",
    );
  }

  const typedCompany =
    company as PersistedCompany;

  const initialOffer =
    (offer as PersistedOffer | null) ??
    null;

  let executionPlan;

  try {
    executionPlan = await getCompanyExecutionPlan(
      supabase,
      typedCompany.id,
    );
  } catch (planError) {
    console.error(
      "Company Execution Plan loading failed.",
      planError,
    );

    throw new Error(
      "We couldn't load this company's path.",
    );
  }

  const userName = getUserName(user);
  const userEmail = user.email ?? null;
  const momentumCurrentStep = executionPlan
    ? getMomentumCurrentStep(executionPlan)
    : undefined;

  const companySwitcher = (
    <CompanySwitcher
      activeCompanyId={typedCompany.id}
      companies={companies}
    />
  );

  return (
    <>
      <OpenedCompanyTracker
        companyId={typedCompany.id}
      />

      <ConsoleShell
        sidebar={
          <ConsoleSidebar
            companyId={typedCompany.id}
            companySwitcher={
              companySwitcher
            }
            userName={userName}
            userEmail={userEmail}
          />
        }
        mobileHeader={
          <ConsoleMobileHeader
            companyId={typedCompany.id}
            companySwitcher={
              <CompanySwitcher
                activeCompanyId={
                  typedCompany.id
                }
                companies={companies}
              />
            }
            accountArea={
              <ConsoleUserArea
                userName={userName}
                userEmail={userEmail}
                compact
              />
            }
          />
        }
      >
        <CompanyConsoleHeader
          name={typedCompany.name}
          tagline={typedCompany.tagline}
          statusLabel={getCompanyStatusLabel(
            typedCompany.status,
            typedCompany.active_stage,
          )}
        />

        <CompanyCapabilities
          companyName={typedCompany.name}
          offer={initialOffer}
          customerCount={
            typedCompany.ideal_customers.length
          }
          companyContext={{
            mission: typedCompany.mission,
            problem: typedCompany.problem,
            solution: typedCompany.solution,
            idealCustomers:
              typedCompany.ideal_customers,
          }}
          currentFocus={momentumCurrentStep?.title}
          plan={executionPlan}
          foundation={
            <CompanyOverview
              mission={typedCompany.mission}
              problem={typedCompany.problem}
              solution={typedCompany.solution}
              idealCustomers={
                typedCompany.ideal_customers
              }
            />
          }
          journey={
            <CompanyJourney
              hasCompanyFoundation
              hasFirstOffer={Boolean(initialOffer)}
              plan={executionPlan}
            />
          }
        />
      </ConsoleShell>
    </>
  );
}

function getUserName(user: User) {
  const fullName =
    user.user_metadata.full_name;

  if (
    typeof fullName === "string" &&
    fullName.trim()
  ) {
    return fullName.trim();
  }

  const name = user.user_metadata.name;

  if (
    typeof name === "string" &&
    name.trim()
  ) {
    return name.trim();
  }

  return user.email ?? "Company owner";
}

function getCompanyStatusLabel(
  status: string,
  activeStage: string,
) {
  const source =
    activeStage.trim() || status.trim();

  if (!source) {
    return "Foundation started";
  }

  return formatStatus(source);
}

function formatStatus(value: string) {
  const normalized = value
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

  return normalized.replace(
    /\b\w/g,
    (character) =>
      character.toUpperCase(),
  );
}
