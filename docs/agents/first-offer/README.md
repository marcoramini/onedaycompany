# First Offer Agent

## Mission and measurable outcome

Turn an accepted or validated company foundation into the simplest credible
first offer the company can present, test and evolve.

The first measurable outcome is a `FirstOfferProposal` that passes the shared
Zod contract and contains a concrete audience, outcome, promise, scope,
delivery, boundaries, explicit assumptions, an optional price hypothesis and
explicit Foundation impact warnings. It is ready for the Launch Planning Agent
without redefining Foundation semantics or containing launch activities.

## Responsibilities

- define the initial audience and desired outcome;
- define offer promise, scope, delivery and boundaries;
- propose an initial price hypothesis when appropriate;
- maintain semantic ownership of offer refinements;
- report conflicts or impacts on the accepted company foundation;
- provide a structured result to the Launch Planning Agent.

## Non-responsibilities

- redefining vision or mission;
- producing the complete launch plan;
- applying offer proposals directly to canonical state;
- creating website, visual or promotional artifacts.

## Inputs, outputs and owned artifacts

The only required input for the first implementation is a validated
`FoundationProposal`, imported and revalidated by
`app/lib/first-offer/contracts.ts`. The semantic output is a
`FirstOfferProposal`; it deliberately has no ID, version, timestamp,
acceptance status or persistence authority. The Company State Agent owns any
durable envelope. Its assumptions remain explicit and its fields are suitable
for later focused refinement.

The agent owns offer semantics and the prompt that proposes them. It does not
own the Foundation contract, persistence, application-managed state or the
Launch Plan.

## Authority and approval

The agent may propose offer content and refinements. It must not mutate the
foundation to make an offer fit. `foundationImpactWarnings` returns any
conflict for Foundation review; the agent never changes Foundation data.
Accepted-offer persistence follows Company State Agent rules. Missing or
invalid Foundation input is a validation failure for the caller.

## Core operating flow

```text
validated FoundationProposal
  -> FirstOfferGenerationRequest validation
  -> OpenAI Responses API with strict JSON Schema
  -> FirstOfferProposal Zod validation
  -> deterministic fallback on provider or output failure
  -> validated FirstOfferProposal
  -> Launch Planning Agent / Company State Agent
```

## First implementation milestone

The isolated generation boundary is complete. It does not replace the existing
combined company-generation endpoint; sequencing Foundation, First Offer and
Launch Planning remains the Workspace Generation Orchestrator's responsibility.

## Collaborators and handoff

The Launch Planning Agent receives only the validated `FirstOfferProposal` and
the validated Foundation contract supplied by its orchestrator. It may turn
those inputs into launch steps and activities, but it must not redefine offer
fields, their assumptions or their Foundation impact warnings. The canonical
handoff is documented in [`ARCHITECTURE.md`](ARCHITECTURE.md#launch-planning-handoff).

## Current status and next milestone

The Foundation-consuming contract, provider adapter call, deterministic
fallback and isolated contract tests are available. Next, the Launch Planning
Agent must define its state-free planning contract over validated Foundation
and First Offer inputs. The Workspace Generation Orchestrator later integrates
the three modules sequentially without changing acceptance semantics.
