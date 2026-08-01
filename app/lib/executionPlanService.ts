import type { Company } from "../types/business";

import {
  companyExecutionPlanSchema,
  type CompanyExecutionPlan,
} from "./executionPlanSchema";

type ExecutionPlanApiResponse = {
  plan?: unknown;
  source?: "ai" | "fallback";
  error?: string;
};

export async function requestExecutionPlan(
  opportunity: Company,
  userContext: string,
): Promise<CompanyExecutionPlan> {
  const response = await fetch(
    "/api/execution-plan",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        opportunity,
        userContext,
      }),
    },
  );

  const data =
    (await response.json()) as ExecutionPlanApiResponse;

  if (!response.ok) {
    throw new Error(
      data.error ??
        "We couldn't prepare your company path.",
    );
  }

  return companyExecutionPlanSchema.parse(data.plan);
}
