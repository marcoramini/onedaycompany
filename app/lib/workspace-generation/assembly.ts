import { companyCapabilityIds } from "../../types/companyCapability.ts";
import {
  companyExecutionPlanSchema,
  type CompanyExecutionPlan,
} from "../executionPlanSchema.ts";
import type { LaunchPlanningProposal } from "../launch-planning/contracts.ts";

export function assembleWorkspaceExecutionPlan(input: {
  companyId: string;
  proposal: LaunchPlanningProposal;
  source: "ai" | "fallback";
  now?: string;
}): CompanyExecutionPlan {
  const now = input.now ?? new Date().toISOString();

  return companyExecutionPlanSchema.parse({
    id: crypto.randomUUID(),
    companyId: input.companyId,
    introduction: input.proposal.introduction,
    steps: input.proposal.steps.map((step, index) => ({
      id: crypto.randomUUID(),
      capabilityId: companyCapabilityIds[index],
      order: index + 1,
      title: step.title,
      reason: step.reason,
      expectedOutcome: step.expectedOutcome,
      workflowType: step.workflowType,
      completionCriteria: step.completionCriteria,
      status: "not_started",
      outputIds: [],
      activities: step.activities.map((activity, activityIndex) => ({
        id: crypto.randomUUID(),
        order: activityIndex + 1,
        status: "not_started",
        ...activity,
      })),
    })),
    version: 1,
    source: input.source,
    createdAt: now,
    updatedAt: now,
  });
}
