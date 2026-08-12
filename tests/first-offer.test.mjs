import assert from "node:assert/strict";
import test from "node:test";

import { generateFallbackFoundationProposal } from "../app/lib/company-foundation/fallback.ts";
import { firstOfferGenerationRequestSchema, firstOfferProposalSchema } from "../app/lib/first-offer/contracts.ts";
import { generateFallbackFirstOfferProposal } from "../app/lib/first-offer/fallback.ts";
import { FIRST_OFFER_PROPOSAL_JSON_SCHEMA } from "../app/lib/first-offer/outputSchema.ts";

test("the deterministic fallback produces a valid first-offer proposal from Foundation", () => {
  const foundation = generateFallbackFoundationProposal("I have spent years helping new parents organize family routines.");
  const proposal = generateFallbackFirstOfferProposal(foundation);

  assert.deepEqual(firstOfferProposalSchema.parse(proposal), proposal);
  assert.deepEqual(proposal.foundationImpactWarnings, []);
});

test("the request accepts only a valid Foundation Proposal", () => {
  const foundation = generateFallbackFoundationProposal("I enjoy urban gardening.");
  assert.equal(firstOfferGenerationRequestSchema.safeParse({ foundation }).success, true);
  assert.equal(firstOfferGenerationRequestSchema.safeParse({ foundation: { ...foundation, mission: "" } }).success, false);
});

test("the first-offer contract refuses Foundation and application-state fields", () => {
  const proposal = generateFallbackFirstOfferProposal(generateFallbackFoundationProposal("I enjoy urban gardening."));
  assert.equal(firstOfferProposalSchema.safeParse({ ...proposal, mission: "A rewritten mission" }).success, false);
  assert.equal(firstOfferProposalSchema.safeParse({ ...proposal, version: 1 }).success, false);
});

test("the JSON Schema mirrors the required Zod fields and limits", () => {
  assert.deepEqual(FIRST_OFFER_PROPOSAL_JSON_SCHEMA.required, ["name", "audience", "desiredOutcome", "promise", "scope", "delivery", "boundaries", "priceHypothesis", "assumptions", "foundationImpactWarnings"]);
  assert.equal(FIRST_OFFER_PROPOSAL_JSON_SCHEMA.properties.promise.maxLength, 400);
  assert.equal(FIRST_OFFER_PROPOSAL_JSON_SCHEMA.properties.scope.items.maxLength, 220);
  assert.equal(FIRST_OFFER_PROPOSAL_JSON_SCHEMA.properties.foundationImpactWarnings.maxItems, 4);
});
