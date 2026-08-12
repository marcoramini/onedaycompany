# Company Foundation Agent

## Mission and measurable outcome

Turn the user's initial context into a coherent proposed foundation for a
company they can be proud to build, and remain the semantic owner of that
foundation as the company evolves.

The first measurable outcome is a `FoundationProposal` that passes the shared
Zod contract and contains purpose, vision, mission, company concept,
foundational value proposition, explicit user evidence and explicit
assumptions. It is ready for the First Offer Agent without containing offer or
launch-plan detail.

## Responsibilities

- propose the company purpose, vision and mission;
- define the initial company concept and foundational value proposition;
- distinguish user evidence from generated assumptions;
- preserve the strongest accepted elements during refinement;
- identify downstream impacts when the foundation changes;
- provide a structured, validated result to dependent agents.

## Non-responsibilities

- specifying the complete First Offer;
- generating launch steps or activities;
- applying proposals directly to canonical company state;
- deciding visual identity, website content or promotional execution.

## Inputs, outputs and owned artifacts

The primary input is the durable initial user context. The generated semantic
output is `FoundationProposal`, defined in
`app/lib/company-foundation/contracts.ts`. It contains purpose, vision,
mission, company concept, foundational value proposition, user evidence and
assumptions.

The Foundation Agent owns the semantics of that artifact and its generation
prompt. The Company State Agent owns any persisted record envelope, including
identifier, version, timestamps and acceptance state. This separation prevents
the model from writing application-managed state.

The First Offer Agent and Launch Planning Agent consume only a validated
Foundation Proposal. The Company State Agent records it after the applicable
acceptance transition.

## Read/write authority, approval and escalation

The agent may generate and refine proposals. It cannot silently replace an
accepted foundation. Material changes require explicit acceptance and an impact
set covering at least offer, launch plan, website and visual identity.

It reads the durable initial context and accepted foundation supplied by its
orchestrator. It writes no database state and does not apply proposals. A
missing or contradictory input is returned as a validation failure to the
calling orchestrator. A conflict with an accepted first offer is reported to
the First Offer Agent and routed through the Company State Agent's acceptance
rules.

## Core operating flow

```text
Initial user context
  -> request validation
  -> Foundation prompt + strict JSON Schema
  -> Zod validation
  -> deterministic fallback when provider output fails
  -> validated FoundationProposal
  -> First Offer Agent / Company State Agent
```

## First implementation milestone

The initial isolated implementation is complete. It deliberately does not
replace the current combined endpoint; that integration belongs to the
Workspace Generation Orchestrator milestone.

## Collaborators and handoff

The First Offer Agent consumes only a validated `FoundationProposal` and may
not redefine it. Its handoff is documented in
[`ARCHITECTURE.md`](ARCHITECTURE.md#first-offer-handoff).

## Current status and next milestone

The foundation generation boundary, provider adapter call, deterministic
fallback and isolated contract tests are available. The next milestone is for
the Workspace Generation Orchestrator to call this boundary sequentially before
the First Offer Agent; it must preserve the current endpoint until that broader
workflow is explicitly implemented.
