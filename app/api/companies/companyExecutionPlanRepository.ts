import type { SupabaseClient } from "@supabase/supabase-js";

import type { Company } from "../../types/business";
import { createExecutionPlan } from "../../lib/createExecutionPlan";

export async function ensureCompanyExecutionPlan(
  supabase: SupabaseClient,
  companyId: string,
  company: Company,
  userContext: string,
) {
  const { data: existingPlan, error: lookupError } =
    await supabase
      .from("execution_plans")
      .select("id")
      .eq("company_id", companyId)
      .eq("version", 1)
      .maybeSingle();

  if (lookupError) {
    throw new Error(
      `Execution Plan lookup failed: ${lookupError.message}`,
    );
  }

  if (existingPlan) {
    return existingPlan.id;
  }

  const plan = await createExecutionPlan(
    company,
    userContext,
    companyId,
  );

  const { error: planError } = await supabase
    .from("execution_plans")
    .insert({
      id: plan.id,
      company_id: companyId,
      introduction: plan.introduction,
      version: plan.version,
      source: plan.source,
      created_at: plan.createdAt,
      updated_at: plan.updatedAt,
    });

  if (planError) {
    if (planError.code === "23505") {
      return ensureCompanyExecutionPlan(
        supabase,
        companyId,
        company,
        userContext,
      );
    }

    throw new Error(
      `Execution Plan creation failed: ${planError.message}`,
    );
  }

  try {
    const { error: stepsError } = await supabase
      .from("execution_steps")
      .insert(
        plan.steps.map((step) => ({
          id: step.id,
          execution_plan_id: plan.id,
          capability_id: step.capabilityId,
          position: step.order,
          title: step.title,
          reason: step.reason,
          expected_outcome: step.expectedOutcome,
          workflow_type: step.workflowType,
          completion_criteria: step.completionCriteria,
          status: step.status,
          output_ids: step.outputIds,
        })),
      );

    if (stepsError) {
      throw new Error(
        `Execution Step creation failed: ${stepsError.message}`,
      );
    }

    const { error: activitiesError } = await supabase
      .from("execution_activities")
      .insert(
        plan.steps.flatMap((step) =>
          step.activities.map((activity) => ({
            id: activity.id,
            execution_step_id: step.id,
            position: activity.order,
            title: activity.title,
            description: activity.description,
            completion_criterion:
              activity.completionCriterion,
            status: activity.status,
          })),
        ),
      );

    if (activitiesError) {
      throw new Error(
        `Execution Activity creation failed: ${activitiesError.message}`,
      );
    }
  } catch (error) {
    await supabase
      .from("execution_plans")
      .delete()
      .eq("id", plan.id);

    throw error;
  }

  return plan.id;
}
