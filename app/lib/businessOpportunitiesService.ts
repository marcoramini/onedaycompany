import {
  companySchema,
} from "./businessOpportunitiesSchema";

import type { Company } from "../types/business";

type BusinessOpportunitiesApiResponse = {
  company: unknown;
  source: "ai" | "fallback";
  error?: string;
};

export async function generateBusinessOpportunity(
  context: string,
  previousCompany?: Company,
): Promise<Company> {
  const response = await fetch(
    "/api/business-opportunities",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context,
        previousCompany,
      }),
    },
  );

  const data =
    (await response.json()) as BusinessOpportunitiesApiResponse;

  console.log("Company generation source:", data.source);

  if (!response.ok) {
    throw new Error(
      data.error ??
        "We couldn't shape your company.",
    );
  }

  return companySchema.parse(data.company);
}