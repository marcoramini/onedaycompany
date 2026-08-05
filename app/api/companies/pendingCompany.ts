import { z } from "zod";

import type { Company } from "../../types/business";

const PENDING_COMPANY_STORAGE_KEY =
  "onedaycompany.pending-company";

const pendingCompanySchema = z.object({
  company: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    tagline: z.string().min(1),
    mission: z.string().min(1),
    problem: z.string().min(1),
    solution: z.string().min(1),

    firstOffer: z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      outcome: z.string().min(1),
    }),

    idealCustomers: z
      .array(z.string().min(1))
      .min(1),

    whyNow: z.string().min(1),
    futureExpansion: z.string().min(1),

    startupCost: z.enum([
      "very-low",
      "low",
      "moderate",
    ]),
  }),

  beginningContext: z.string().min(1),
  savedAt: z.string().datetime(),
});

export type PendingCompany = {
  company: Company;
  beginningContext: string;
  savedAt: string;
};

export function savePendingCompany(
  company: Company,
  beginningContext: string,
) {
  const pendingCompany: PendingCompany = {
    company,
    beginningContext,
    savedAt: new Date().toISOString(),
  };

  window.sessionStorage.setItem(
    PENDING_COMPANY_STORAGE_KEY,
    JSON.stringify(pendingCompany),
  );
}

export function getPendingCompany():
  | PendingCompany
  | null {
  const serializedValue =
    window.sessionStorage.getItem(
      PENDING_COMPANY_STORAGE_KEY,
    );

  if (!serializedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(serializedValue);

    const result =
      pendingCompanySchema.safeParse(parsedValue);

    if (!result.success) {
      clearPendingCompany();
      return null;
    }

    return result.data;
  } catch {
    clearPendingCompany();
    return null;
  }
}

export function clearPendingCompany() {
  window.sessionStorage.removeItem(
    PENDING_COMPANY_STORAGE_KEY,
  );
}