import type { Company } from "../types/business";

import { generateAiExecutionPlan } from "./aiExecutionPlanGenerator";
import {
  companyExecutionPlanSchema,
  type CompanyExecutionPlan,
  type GeneratedExecutionPlan,
} from "./executionPlanSchema";
import { generateFallbackExecutionPlan } from "./fallbackExecutionPlanGenerator";

export async function createExecutionPlan(
  company: Company,
  userContext: string,
  companyId = company.id,
): Promise<CompanyExecutionPlan> {
  let generatedPlan: GeneratedExecutionPlan;
  let source: "ai" | "fallback";

  try {
    generatedPlan = await generateAiExecutionPlan(
      company,
      userContext,
    );
    source = "ai";
  } catch (error) {
    console.error(
      "AI execution plan generation failed. Using fallback.",
      error,
    );

    generatedPlan =
      generateFallbackExecutionPlan(company);
    source = "fallback";
  }

  const now = new Date().toISOString();

  return companyExecutionPlanSchema.parse({
    id: crypto.randomUUID(),
    companyId,
    introduction: generatedPlan.introduction,
    steps: generatedPlan.steps.map(
      (step, index) => ({
        ...step,
        activities: step.activities.map(
          (activity, activityIndex) => ({
            ...activity,
            id: crypto.randomUUID(),
            order: activityIndex + 1,
            status: "not_started",
          }),
        ),
        id: crypto.randomUUID(),
        order: index + 1,
        status: "not_started",
        outputIds: [],
      }),
    ),
    version: 1,
    source,
    createdAt: now,
    updatedAt: now,
  });
}
