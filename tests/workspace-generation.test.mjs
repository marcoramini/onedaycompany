import assert from "node:assert/strict";
import test from "node:test";

import { assembleWorkspaceExecutionPlan } from "../app/lib/workspace-generation/assembly.ts";
import { workspaceGenerationStateSchema } from "../app/lib/workspace-generation/contracts.ts";
import { generateFallbackFoundationProposal } from "../app/lib/company-foundation/fallback.ts";
import { generateFallbackFirstOfferProposal } from "../app/lib/first-offer/fallback.ts";
import { generateFallbackLaunchPlanningProposal } from "../app/lib/launch-planning/fallback.ts";
import { companyCapabilityIds } from "../app/types/companyCapability.ts";

test("workspace assembly assigns application-owned execution state without changing plan semantics", () => {
  const foundation = generateFallbackFoundationProposal("I enjoy helping independent artists organize their work.");
  const offer = generateFallbackFirstOfferProposal(foundation);
  const proposal = generateFallbackLaunchPlanningProposal(foundation, offer);
  const plan = assembleWorkspaceExecutionPlan({
    companyId: "d0c47e53-a61b-4274-a9d0-1d1a7fb52d0a",
    proposal,
    source: "fallback",
    now: "2026-08-12T10:00:00.000Z",
  });

  assert.equal(plan.steps.length, companyCapabilityIds.length);
  assert.deepEqual(plan.steps.map((step) => step.capabilityId), companyCapabilityIds);
  assert.equal(plan.steps.every((step) => step.status === "not_started" && step.order > 0), true);
  assert.equal(plan.steps.every((step) => step.activities.every((activity) => activity.status === "not_started" && activity.id)), true);
  assert.equal(plan.introduction, proposal.introduction);
});

test("workspace generation feedback requires all persisted stages", () => {
  const stages = ["foundation", "first-offer", "launch-planning", "workspace-assembly", "visual-assets"].map((stage) => ({
    stage,
    status: "pending",
    attemptCount: 0,
    source: null,
    safeError: null,
    startedAt: null,
    completedAt: null,
  }));
  assert.equal(workspaceGenerationStateSchema.safeParse({
    id: "d0c47e53-a61b-4274-a9d0-1d1a7fb52d0a",
    companyId: "7d8f5b48-d0b0-4c91-a94e-299ed7d9feaf",
    status: "pending",
    stages,
  }).success, true);
  assert.equal(workspaceGenerationStateSchema.safeParse({
    id: "d0c47e53-a61b-4274-a9d0-1d1a7fb52d0a",
    companyId: "7d8f5b48-d0b0-4c91-a94e-299ed7d9feaf",
    status: "pending",
    stages: stages.slice(0, 4),
  }).success, false);
});

test("workspace generation accepts PostgreSQL timestamps with a UTC offset", () => {
  const stages = ["foundation", "first-offer", "launch-planning", "workspace-assembly", "visual-assets"].map((stage) => ({
    stage,
    status: "completed",
    attemptCount: 1,
    source: "ai",
    safeError: null,
    startedAt: "2026-08-12T10:00:00.000+00:00",
    completedAt: "2026-08-12T10:00:01.000+00:00",
  }));

  assert.equal(workspaceGenerationStateSchema.safeParse({
    id: "d0c47e53-a61b-4274-a9d0-1d1a7fb52d0a",
    companyId: "7d8f5b48-d0b0-4c91-a94e-299ed7d9feaf",
    status: "completed",
    stages,
  }).success, true);
});
