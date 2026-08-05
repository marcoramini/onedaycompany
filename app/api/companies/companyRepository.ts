import type { SupabaseClient } from "@supabase/supabase-js";

import type { CompanyPersistenceInput } from "./companyPersistenceSchema";
import { createCompanySlug } from "./companySlug";

type CreateCompanyInput = {
  ownerId: string;
  payload: CompanyPersistenceInput;
};

type PersistedCompany = {
  id: string;
  name: string;
  slug: string;
};

export async function createCompanyWithOffer(
  supabase: SupabaseClient,
  input: CreateCompanyInput,
): Promise<PersistedCompany> {
  const { ownerId, payload } = input;
  const { company, beginningContext } = payload;

  const existingCompany =
    await findCompanyBySourceProposal(
      supabase,
      ownerId,
      company.id,
    );

  if (existingCompany) {
    await ensureInitialOffer(
      supabase,
      existingCompany.id,
      company.firstOffer,
    );

    return existingCompany;
  }

  const slug = createCompanySlug(company.name);

  const {
    data: createdCompany,
    error: companyError,
  } = await supabase
    .from("companies")
    .insert({
      owner_id: ownerId,
      source_proposal_id: company.id,
      name: company.name,
      slug,
      tagline: company.tagline,
      mission: company.mission,
      problem: company.problem,
      solution: company.solution,
      ideal_customers: company.idealCustomers,
      why_now: company.whyNow,
      future_expansion: company.futureExpansion,
      startup_cost: company.startupCost,
      source_context: beginningContext,
      status: "foundation",
      active_stage: "company-foundation",
    })
    .select("id, name, slug")
    .single();

  if (companyError) {
    /*
     * PostgreSQL unique-violation. Another retry may
     * have created the Company between our initial
     * lookup and insert.
     */
    if (companyError.code === "23505") {
      const concurrentCompany =
        await findCompanyBySourceProposal(
          supabase,
          ownerId,
          company.id,
        );

      if (concurrentCompany) {
        await ensureInitialOffer(
          supabase,
          concurrentCompany.id,
          company.firstOffer,
        );

        return concurrentCompany;
      }
    }

    throw new Error(
      `Company creation failed: ${companyError.message}`,
    );
  }

  await ensureInitialOffer(
    supabase,
    createdCompany.id,
    company.firstOffer,
  );

  return createdCompany;
}

async function findCompanyBySourceProposal(
  supabase: SupabaseClient,
  ownerId: string,
  sourceProposalId: string,
): Promise<PersistedCompany | null> {
  const {
    data,
    error,
  } = await supabase
    .from("companies")
    .select("id, name, slug")
    .eq("owner_id", ownerId)
    .eq(
      "source_proposal_id",
      sourceProposalId,
    )
    .maybeSingle();

  if (error) {
    throw new Error(
      `Company lookup failed: ${error.message}`,
    );
  }

  return data;
}

async function ensureInitialOffer(
  supabase: SupabaseClient,
  companyId: string,
  offer: CompanyPersistenceInput["company"]["firstOffer"],
) {
  const { error } = await supabase
    .from("offers")
    .upsert(
      {
        company_id: companyId,
        name: offer.name,
        description: offer.description,
        outcome: offer.outcome,
        status: "draft",
      },
      {
        onConflict: "company_id",
        ignoreDuplicates: true,
      },
    );

  if (error) {
    throw new Error(
      `Initial offer creation failed: ${error.message}`,
    );
  }
}