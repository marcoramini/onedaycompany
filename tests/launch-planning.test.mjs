import assert from "node:assert/strict";
import test from "node:test";

import { generateFallbackFoundationProposal } from "../app/lib/company-foundation/fallback.ts";
import { generateFallbackFirstOfferProposal } from "../app/lib/first-offer/fallback.ts";
import {
  launchPlanningGenerationRequestSchema,
  launchPlanningProposalSchema,
} from "../app/lib/launch-planning/contracts.ts";
import { generateFallbackLaunchPlanningProposal } from "../app/lib/launch-planning/fallback.ts";
import { LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA } from "../app/lib/launch-planning/outputSchema.ts";
import { companyCapabilityIds } from "../app/types/companyCapability.ts";

function createInputs() {
  const foundation = generateFallbackFoundationProposal(
    "I have spent years helping new parents organize family routines.",
  );
  return { foundation, firstOffer: generateFallbackFirstOfferProposal(foundation) };
}

test("the deterministic fallback produces a valid plan with all application capabilities", () => {
  const { foundation, firstOffer } = createInputs();
  const proposal = generateFallbackLaunchPlanningProposal(foundation, firstOffer);

  assert.deepEqual(launchPlanningProposalSchema.parse(proposal), proposal);
  assert.equal(proposal.steps.length, companyCapabilityIds.length);
  assert.ok(proposal.steps.every((step) => step.activities.length >= 2 && step.activities.length <= 5));
});

test("the request accepts only valid Foundation and First Offer proposals", () => {
  const { foundation, firstOffer } = createInputs();
  assert.equal(launchPlanningGenerationRequestSchema.safeParse({ foundation, firstOffer }).success, true);
  assert.equal(launchPlanningGenerationRequestSchema.safeParse({ foundation, firstOffer: { ...firstOffer, promise: "" } }).success, false);
});

test("the plan contract refuses application-owned state and capability identifiers", () => {
  const { foundation, firstOffer } = createInputs();
  const proposal = generateFallbackLaunchPlanningProposal(foundation, firstOffer);
  assert.equal(launchPlanningProposalSchema.safeParse({ ...proposal, id: "plan-id" }).success, false);
  assert.equal(launchPlanningProposalSchema.safeParse({
    ...proposal,
    steps: [{ ...proposal.steps[0], capabilityId: "company-foundation" }, ...proposal.steps.slice(1)],
  }).success, false);
});

test("the JSON Schema mirrors the required plan fields without application identifiers", () => {
  assert.deepEqual(LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA.required, ["introduction", "steps"]);
  assert.equal("capabilityId" in LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA.properties.steps.items.properties, false);
  assert.equal(LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA.properties.steps.items.properties.activities.maxItems, 5);
  assert.equal(LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA.properties.steps.items.properties.completionCriteria.items.maxLength, 180);
});
