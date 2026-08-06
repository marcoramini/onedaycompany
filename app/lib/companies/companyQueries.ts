//file: app/lib/companies/companyQueries.ts

import type { SupabaseClient } from "@supabase/supabase-js";

import {
  mapCompanySwitcherItem,
  type CompanySwitcherItem,
} from "./companySwitcher";

type CompanyListRow = {
  id: string;
  name: string;
  tagline: string;
  status: string;
  last_opened_at: string;
};

export async function getUserCompanies(
  supabase: SupabaseClient,
  ownerId: string,
): Promise<CompanySwitcherItem[]> {
  const {
    data,
    error,
  } = await supabase
    .from("companies")
    .select(`
      id,
      name,
      tagline,
      status,
      last_opened_at
    `)
    .eq("owner_id", ownerId)
    .order("last_opened_at", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Company list loading failed: ${error.message}`,
    );
  }

  return (data as CompanyListRow[]).map(
    mapCompanySwitcherItem,
  );
}

export async function getLastOpenedCompanyId(
  supabase: SupabaseClient,
  ownerId: string,
): Promise<string | null> {
  const {
    data,
    error,
  } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_id", ownerId)
    .order("last_opened_at", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Last Company lookup failed: ${error.message}`,
    );
  }

  return data?.id ?? null;
}