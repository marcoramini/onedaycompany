//file: app/lib/companies/companyQueries.ts

import type { SupabaseClient } from "@supabase/supabase-js";

import {
  companyExecutionPlanSchema,
  type CompanyExecutionPlan,
} from "../executionPlanSchema";
import {
  mapCompanySwitcherItem,
  type CompanySwitcherItem,
} from "./companySwitcher";
import type { SelectedVisualAsset } from "../visual-asset-agent/contracts";

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

export async function getCompanyVisualAssets(
  supabase: SupabaseClient,
  companyId: string,
): Promise<SelectedVisualAsset[]> {
  const { data, error } = await supabase
    .from("visual_assets")
    .select(`
      id,
      purpose,
      status,
      review_required,
      visual_asset_variants!inner (
        id,
        public_url,
        alt_text,
        is_selected
      )
    `)
    .eq("company_id", companyId)
    .eq("visual_asset_variants.is_selected", true);

  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") {
      console.warn("Visual Asset Agent tables are unavailable. Apply migration 007_visual_asset_agent.sql.");
      return [];
    }
    throw new Error(`Company visual assets loading failed: ${error.message}`);
  }

  return data.flatMap((asset) => {
    const variant = asset.visual_asset_variants[0];
    if (!variant) return [];
    return [{
      id: asset.id,
      purpose: asset.purpose,
      status: asset.status,
      reviewRequired: asset.review_required,
      variant: {
        id: variant.id,
        stableUrl: variant.public_url,
        altText: variant.alt_text,
      },
    } as SelectedVisualAsset];
  });
}

export async function getCompanyExecutionPlan(
  supabase: SupabaseClient,
  companyId: string,
): Promise<CompanyExecutionPlan | null> {
  const { data: plan, error: planError } =
    await supabase
      .from("execution_plans")
      .select("id, introduction, version, source, created_at, updated_at")
      .eq("company_id", companyId)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();

  if (planError) {
    if (
      planError.code === "PGRST205" ||
      planError.code === "42P01"
    ) {
      console.warn(
        "Execution Plan tables are not available. Apply migration 004_execution_plan_persistence.sql.",
      );
      return null;
    }

    throw new Error(
      `Execution Plan loading failed: ${planError.message}`,
    );
  }

  if (!plan) {
    return null;
  }

  const { data: steps, error: stepsError } =
    await supabase
      .from("execution_steps")
      .select(`
        id,
        capability_id,
        position,
        title,
        reason,
        expected_outcome,
        workflow_type,
        completion_criteria,
        status,
        output_ids
      `)
      .eq("execution_plan_id", plan.id)
      .order("position", { ascending: true });

  if (stepsError) {
    throw new Error(
      `Execution Step loading failed: ${stepsError.message}`,
    );
  }

  const stepIds = steps.map((step) => step.id);
  const { data: activities, error: activitiesError } =
    stepIds.length > 0
      ? await supabase
          .from("execution_activities")
          .select(`
            id,
            execution_step_id,
            position,
            title,
            description,
            completion_criterion,
            status
          `)
          .in("execution_step_id", stepIds)
          .order("position", { ascending: true })
      : { data: [], error: null };

  if (activitiesError) {
    throw new Error(
      `Execution Activity loading failed: ${activitiesError.message}`,
    );
  }

  return companyExecutionPlanSchema.parse({
    id: plan.id,
    companyId,
    introduction: plan.introduction,
    steps: steps.map((step) => ({
      id: step.id,
      capabilityId: step.capability_id,
      order: step.position,
      title: step.title,
      reason: step.reason,
      expectedOutcome: step.expected_outcome,
      workflowType: step.workflow_type,
      completionCriteria: step.completion_criteria,
      status: step.status,
      outputIds: step.output_ids,
      activities: activities
        .filter(
          (activity) =>
            activity.execution_step_id === step.id,
        )
        .map((activity) => ({
          id: activity.id,
          order: activity.position,
          title: activity.title,
          description: activity.description,
          completionCriterion:
            activity.completion_criterion,
          status: activity.status,
        })),
    })),
    version: plan.version,
    source: plan.source,
    createdAt: new Date(
      plan.created_at,
    ).toISOString(),
    updatedAt: new Date(
      plan.updated_at,
    ).toISOString(),
  });
}
