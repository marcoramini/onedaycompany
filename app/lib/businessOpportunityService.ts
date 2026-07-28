import type { BusinessDirection } from "../types/business";
import { businessDirectionsSchema } from "./businessOpportunitySchema";

type BusinessOpportunitiesResponse = {
  directions?: unknown;
  error?: string;
};

export async function generateBusinessDirections(
  skills: string,
): Promise<BusinessDirection[]> {
  const response = await fetch( "/api/business-opportunities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skills,
    }),
  });

  const data =
    (await response.json()) as BusinessOpportunitiesResponse;

  if (!response.ok) {
    throw new Error(
      data.error ?? "Unable to generate business opportunities.",
    );
  }

  return businessDirectionsSchema.parse(data.directions);
}