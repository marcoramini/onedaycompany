import type { SupabaseClient } from "@supabase/supabase-js";

import type { CompanyExecutionPlan } from "../executionPlanSchema";

import {
  type WorkspaceGenerationStage,
  workspaceGenerationStateSchema,
  type WorkspaceGenerationState,
} from "./contracts";

const stages: WorkspaceGenerationStage[] = [
  "foundation",
  "first-offer",
  "launch-planning",
  "workspace-assembly",
  "visual-assets",
];

type GenerationRow = {
  id: string;
  company_id: string;
  status: string;
  workspace_generation_stages: StageRow[];
};

type StageRow = {
  stage: string;
  status: string;
  attempt_count: number;
  source: "ai" | "fallback" | null;
  safe_error: string | null;
  started_at: string | null;
  completed_at: string | null;
  result?: unknown;
};

const generationSelect = `
  id,
  company_id,
  status,
  workspace_generation_stages (
    stage,
    status,
    attempt_count,
    source,
    safe_error,
    started_at,
    completed_at,
    result
  )
`;

export async function ensureWorkspaceGeneration(
  supabase: SupabaseClient,
  companyId: string,
): Promise<WorkspaceGenerationState> {
  const existing = await getWorkspaceGeneration(supabase, companyId);
  if (existing) return existing;

  const { data, error } = await supabase
    .from("workspace_generations")
    .insert({ company_id: companyId })
    .select(generationSelect)
    .single();

  if (error) {
    if (error.code === "23505") {
      const concurrent = await getWorkspaceGeneration(supabase, companyId);
      if (concurrent) return concurrent;
    }
    throw new Error(`Workspace generation creation failed: ${error.message}`);
  }

  const { error: stageError } = await supabase
    .from("workspace_generation_stages")
    .insert(stages.map((stage) => ({ generation_id: data.id, stage })));

  if (stageError) {
    await supabase.from("workspace_generations").delete().eq("id", data.id);
    throw new Error(`Workspace generation stages creation failed: ${stageError.message}`);
  }

  const created = await getWorkspaceGeneration(supabase, companyId);
  if (!created) throw new Error("Workspace generation could not be loaded after creation.");
  return created;
}

export async function getWorkspaceGeneration(
  supabase: SupabaseClient,
  companyId: string,
): Promise<WorkspaceGenerationState | null> {
  const { data, error } = await supabase
    .from("workspace_generations")
    .select(generationSelect)
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(`Workspace generation lookup failed: ${error.message}`);
  return data ? mapGeneration(data as GenerationRow) : null;
}

export async function getWorkspaceGenerationStageResult(
  supabase: SupabaseClient,
  companyId: string,
  stage: WorkspaceGenerationStage,
): Promise<unknown | null> {
  const { data, error } = await supabase
    .from("workspace_generations")
    .select("id")
    .eq("company_id", companyId)
    .maybeSingle();
  if (error) throw new Error(`Workspace generation lookup failed: ${error.message}`);
  if (!data) return null;

  const { data: stageData, error: stageError } = await supabase
    .from("workspace_generation_stages")
    .select("result")
    .eq("generation_id", data.id)
    .eq("stage", stage)
    .maybeSingle();
  if (stageError) throw new Error(`Workspace generation stage lookup failed: ${stageError.message}`);
  return stageData?.result ?? null;
}

export async function markWorkspaceGenerationStageRunning(
  supabase: SupabaseClient,
  companyId: string,
  stage: WorkspaceGenerationStage,
) {
  const generation = await requireGenerationId(supabase, companyId);
  const { data: existing, error: lookupError } = await supabase
    .from("workspace_generation_stages")
    .select("attempt_count")
    .eq("generation_id", generation.id)
    .eq("stage", stage)
    .single();
  if (lookupError) throw new Error(`Workspace generation stage lookup failed: ${lookupError.message}`);

  const { error } = await supabase
    .from("workspace_generation_stages")
    .update({
      status: "running",
      attempt_count: existing.attempt_count + 1,
      safe_error: null,
      started_at: new Date().toISOString(),
      completed_at: null,
    })
    .eq("generation_id", generation.id)
    .eq("stage", stage);
  if (error) throw new Error(`Workspace generation stage update failed: ${error.message}`);

  const { error: generationError } = await supabase
    .from("workspace_generations")
    .update({ status: "running" })
    .eq("id", generation.id);
  if (generationError) throw new Error(`Workspace generation update failed: ${generationError.message}`);
}

export async function markWorkspaceGenerationStageCompleted(
  supabase: SupabaseClient,
  companyId: string,
  stage: WorkspaceGenerationStage,
  result: unknown,
  source: "ai" | "fallback" | null,
) {
  const generation = await requireGenerationId(supabase, companyId);
  const { error } = await supabase
    .from("workspace_generation_stages")
    .update({ status: "completed", result, source, safe_error: null, completed_at: new Date().toISOString() })
    .eq("generation_id", generation.id)
    .eq("stage", stage);
  if (error) throw new Error(`Workspace generation stage completion failed: ${error.message}`);
}

export async function markWorkspaceGenerationStageFailed(
  supabase: SupabaseClient,
  companyId: string,
  stage: WorkspaceGenerationStage,
  safeError: string,
) {
  const generation = await requireGenerationId(supabase, companyId);
  await supabase
    .from("workspace_generation_stages")
    .update({ status: "failed", safe_error: safeError.slice(0, 500), completed_at: null })
    .eq("generation_id", generation.id)
    .eq("stage", stage);
  await supabase.from("workspace_generations").update({ status: "failed" }).eq("id", generation.id);
}

export async function completeWorkspaceGeneration(
  supabase: SupabaseClient,
  companyId: string,
) {
  const generation = await requireGenerationId(supabase, companyId);
  const { error } = await supabase
    .from("workspace_generations")
    .update({ status: "completed" })
    .eq("id", generation.id);
  if (error) throw new Error(`Workspace generation completion failed: ${error.message}`);
}

export async function persistWorkspaceExecutionPlan(
  supabase: SupabaseClient,
  plan: CompanyExecutionPlan,
) {
  const { data: existing, error: lookupError } = await supabase
    .from("execution_plans")
    .select("id")
    .eq("company_id", plan.companyId)
    .eq("version", 1)
    .maybeSingle();
  if (lookupError) throw new Error(`Execution Plan lookup failed: ${lookupError.message}`);
  if (existing) return existing.id;

  const { error: planError } = await supabase.from("execution_plans").insert({
    id: plan.id, company_id: plan.companyId, introduction: plan.introduction, version: plan.version,
    source: plan.source, created_at: plan.createdAt, updated_at: plan.updatedAt,
  });
  if (planError) {
    if (planError.code === "23505") return persistWorkspaceExecutionPlan(supabase, plan);
    throw new Error(`Execution Plan creation failed: ${planError.message}`);
  }

  try {
    const { error: stepsError } = await supabase.from("execution_steps").insert(plan.steps.map((step) => ({
      id: step.id, execution_plan_id: plan.id, capability_id: step.capabilityId, position: step.order,
      title: step.title, reason: step.reason, expected_outcome: step.expectedOutcome,
      workflow_type: step.workflowType, completion_criteria: step.completionCriteria,
      status: step.status, output_ids: step.outputIds,
    })));
    if (stepsError) throw new Error(`Execution Step creation failed: ${stepsError.message}`);

    const { error: activitiesError } = await supabase.from("execution_activities").insert(plan.steps.flatMap((step) => step.activities.map((activity) => ({
      id: activity.id, execution_step_id: step.id, position: activity.order, title: activity.title,
      description: activity.description, completion_criterion: activity.completionCriterion, status: activity.status,
    }))));
    if (activitiesError) throw new Error(`Execution Activity creation failed: ${activitiesError.message}`);
  } catch (error) {
    await supabase.from("execution_plans").delete().eq("id", plan.id);
    throw error;
  }
  return plan.id;
}

async function requireGenerationId(supabase: SupabaseClient, companyId: string) {
  const { data, error } = await supabase.from("workspace_generations").select("id").eq("company_id", companyId).single();
  if (error) throw new Error(`Workspace generation lookup failed: ${error.message}`);
  return data;
}

function mapGeneration(row: GenerationRow): WorkspaceGenerationState {
  const stagesByName = new Map(row.workspace_generation_stages.map((stage) => [stage.stage, stage]));
  return workspaceGenerationStateSchema.parse({
    id: row.id,
    companyId: row.company_id,
    status: row.status,
    stages: stages.map((stage) => {
      const value = stagesByName.get(stage);
      if (!value) throw new Error(`Workspace generation is missing the ${stage} stage.`);
      return { stage, status: value.status, attemptCount: value.attempt_count, source: value.source,
        safeError: value.safe_error, startedAt: value.started_at, completedAt: value.completed_at };
    }),
  });
}
