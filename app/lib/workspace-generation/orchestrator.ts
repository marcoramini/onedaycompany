import type { SupabaseClient } from "@supabase/supabase-js";

import { foundationProposalSchema } from "../company-foundation/contracts";
import { generateFoundationProposal } from "../company-foundation/generator";
import { firstOfferProposalSchema } from "../first-offer/contracts";
import { generateFirstOfferProposal } from "../first-offer/generator";
import { generateLaunchPlanningProposal } from "../launch-planning/generator";
import { launchPlanningProposalSchema } from "../launch-planning/contracts";
import { ensureInitialVisualAssetsForCompany } from "../visual-asset-agent/createInitialVisualAssets";

import { assembleWorkspaceExecutionPlan } from "./assembly";
import type { WorkspaceGenerationStage, WorkspaceGenerationState } from "./contracts";
import {
  completeWorkspaceGeneration,
  ensureWorkspaceGeneration,
  getWorkspaceGeneration,
  getWorkspaceGenerationStageResult,
  markWorkspaceGenerationStageCompleted,
  markWorkspaceGenerationStageFailed,
  markWorkspaceGenerationStageRunning,
  persistWorkspaceExecutionPlan,
} from "./repository";

export async function runWorkspaceGeneration(input: {
  supabase: SupabaseClient;
  companyId: string;
  userContext: string;
}): Promise<WorkspaceGenerationState> {
  const { supabase, companyId, userContext } = input;
  let state = await ensureWorkspaceGeneration(supabase, companyId);
  if (state.status === "completed" && state.stages.every((stage) => stage.status === "completed")) return state;

  try {
    const foundation = await runStage({
      supabase, companyId, state, stage: "foundation",
      parse: foundationProposalSchema.parse,
      generate: async () => generateFoundationProposal(userContext),
    });
    state = await requireState(supabase, companyId);

    const firstOffer = await runStage({
      supabase, companyId, state, stage: "first-offer",
      parse: firstOfferProposalSchema.parse,
      generate: async () => generateFirstOfferProposal(foundation),
    });
    state = await requireState(supabase, companyId);

    const launchPlan = await runStage({
      supabase, companyId, state, stage: "launch-planning",
      parse: launchPlanningProposalSchema.parse,
      generate: async () => generateLaunchPlanningProposal(foundation, firstOffer),
    });
    state = await requireState(supabase, companyId);

    const assemblyStage = findStage(state, "workspace-assembly");
    if (assemblyStage.status !== "completed") {
      await markWorkspaceGenerationStageRunning(supabase, companyId, "workspace-assembly");
      const source = state.stages.some((stage) => stage.source === "fallback") ? "fallback" : "ai";
      const plan = assembleWorkspaceExecutionPlan({ companyId, proposal: launchPlan, source });
      const planId = await persistWorkspaceExecutionPlan(supabase, plan);
      await markWorkspaceGenerationStageCompleted(supabase, companyId, "workspace-assembly", { executionPlanId: planId }, source);
    }

    state = await requireState(supabase, companyId);
    const visualAssetsStage = findStage(state, "visual-assets");
    if (visualAssetsStage.status !== "completed") {
      await markWorkspaceGenerationStageRunning(supabase, companyId, "visual-assets");
      await ensureInitialVisualAssetsForCompany(supabase, companyId);
      await markWorkspaceGenerationStageCompleted(
        supabase,
        companyId,
        "visual-assets",
        { assetPurposes: ["company-logo", "workspace-background"] },
        null,
      );
    }
    await completeWorkspaceGeneration(supabase, companyId);
  } catch (error) {
    const safeError = "We couldn't finish this part of your workspace. Please try again.";
    const activeStage = (await requireState(supabase, companyId)).stages.find((stage) => stage.status === "running");
    if (activeStage) await markWorkspaceGenerationStageFailed(supabase, companyId, activeStage.stage, safeError);
    console.error("Workspace generation failed.", error);
  }

  return requireState(supabase, companyId);
}

async function runStage<T>(input: {
  supabase: SupabaseClient;
  companyId: string;
  state: WorkspaceGenerationState;
  stage: WorkspaceGenerationStage;
  parse: (value: unknown) => T;
  generate: () => Promise<{ proposal: T; source: "ai" | "fallback" }>;
}): Promise<T> {
  const existing = findStage(input.state, input.stage);
  if (existing.status === "completed") {
    const result = await getWorkspaceGenerationStageResult(input.supabase, input.companyId, input.stage);
    return input.parse(result);
  }

  await markWorkspaceGenerationStageRunning(input.supabase, input.companyId, input.stage);
  const generated = await input.generate();
  const proposal = input.parse(generated.proposal);
  await markWorkspaceGenerationStageCompleted(input.supabase, input.companyId, input.stage, proposal, generated.source);
  return proposal;
}

function findStage(state: WorkspaceGenerationState, stage: WorkspaceGenerationStage) {
  const value = state.stages.find((candidate) => candidate.stage === stage);
  if (!value) throw new Error(`Workspace generation is missing the ${stage} stage.`);
  return value;
}

async function requireState(supabase: SupabaseClient, companyId: string) {
  const state = await getWorkspaceGeneration(supabase, companyId);
  if (!state) throw new Error("Workspace generation could not be loaded.");
  return state;
}
