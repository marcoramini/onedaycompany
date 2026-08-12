# First Offer Agent Architecture

## Boundary

The First Offer Agent is an isolated server-side domain module under
`app/lib/first-offer/`. It owns only the semantics and generation of a proposed
first offer. It has no route, persistence adapter, UI state, acceptance write
or launch-plan generation.

```text
validated FoundationProposal
  -> FirstOfferGenerationRequest validation
  -> OpenAI Responses API with strict JSON Schema
  -> FirstOfferProposal Zod validation
  -> deterministic fallback on provider or output failure
  -> FirstOfferProposal
```

## Canonical contracts

- `contracts.ts` defines the canonical TypeScript and Zod contracts.
- `outputSchema.ts` mirrors them for strict provider output.
- `generator.ts` is the provider-facing boundary and returns source `ai` or
  `fallback`.
- `fallback.ts` is deterministic and makes no provider call.

`FirstOfferProposal` contains only offer semantics: audience, desired outcome,
promise, scope, delivery, boundaries, an optional price hypothesis,
assumptions and Foundation impact warnings. It excludes Foundation fields,
identifiers, versions, acceptance, timestamps, launch steps and activities.
The Company State Agent owns a persisted, versioned envelope once its canonical
state model exists.

## Foundation input

The request schema imports `foundationProposalSchema` from the Foundation
Agent and revalidates it at the module boundary. The agent treats all supplied
Foundation fields as immutable. `userEvidence` remains evidence; all newly
inferred demand, customer, outcome and price claims remain offer assumptions.

`foundationImpactWarnings` is empty when the offer fits the Foundation. When
the offer needs a Foundation change, it describes the issue for explicit review
instead of altering purpose, vision, mission, concept or value proposition.

## Launch Planning handoff

The Launch Planning Agent receives a validated `FoundationProposal` and a
validated `FirstOfferProposal`. It can create company-specific operational
steps, activities and completion criteria around the accepted inputs. It must
not rewrite offer semantics, claim assumptions are validated, or use the offer
module to create execution state.

## Current integration status

The existing `/api/business-opportunities` path remains unchanged. The
Workspace Generation Orchestrator will later call Foundation, First Offer and
Launch Planning sequentially after all three contracts exist.
