import assert from "node:assert/strict";
import test from "node:test";

import { foundationProposalSchema } from "../app/lib/company-foundation/contracts.ts";
import { generateFallbackFoundationProposal } from "../app/lib/company-foundation/fallback.ts";
import { FOUNDATION_PROPOSAL_JSON_SCHEMA } from "../app/lib/company-foundation/outputSchema.ts";

test("the deterministic fallback produces a valid foundation proposal", () => {
  const proposal = generateFallbackFoundationProposal(
    "I have spent years helping new parents organize family routines.",
  );

  assert.deepEqual(foundationProposalSchema.parse(proposal), proposal);
  assert.equal(proposal.userEvidence.length, 1);
  assert.ok(proposal.assumptions.length >= 1);
});

test("the foundation contract refuses first-offer fields", () => {
  const proposal = generateFallbackFoundationProposal("I enjoy urban gardening.");
  const result = foundationProposalSchema.safeParse({
    ...proposal,
    firstOffer: { name: "A first offer" },
  });

  assert.equal(result.success, false);
});

test("the deterministic fallback preserves a recognizable Italian context", () => {
  const proposal = generateFallbackFoundationProposal(
    "Vorrei aiutare le persone a coltivare un orto urbano.",
  );

  assert.match(proposal.mission, /dare forma/i);
  assert.match(proposal.assumptions[0], /pubblico iniziale/i);
});

test("the JSON Schema mirrors the required Zod fields and limits", () => {
  assert.deepEqual(FOUNDATION_PROPOSAL_JSON_SCHEMA.required, [
    "purpose",
    "vision",
    "mission",
    "companyConcept",
    "foundationalValueProposition",
    "userEvidence",
    "assumptions",
  ]);
  assert.equal(FOUNDATION_PROPOSAL_JSON_SCHEMA.properties.mission.maxLength, 500);
  assert.equal(
    FOUNDATION_PROPOSAL_JSON_SCHEMA.properties.userEvidence.items.maxLength,
    240,
  );
});
