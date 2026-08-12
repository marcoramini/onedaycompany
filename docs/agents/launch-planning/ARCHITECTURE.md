# Launch Planning Agent Architecture

## Boundary

The Launch Planning Agent is an isolated server-side domain module under
`app/lib/launch-planning/`. It transforms validated Foundation and First Offer
proposals into semantic launch-plan content only. It has no route, persistence
adapter, UI state, acceptance write or activity-completion write.

```text
validated FoundationProposal + FirstOfferProposal
  -> LaunchPlanningGenerationRequest validation
  -> OpenAI Responses API with strict JSON Schema
  -> LaunchPlanningProposal Zod validation
  -> deterministic fallback on provider or output failure
  -> Workspace Generation Orchestrator
```

## Canonical contracts

- `contracts.ts` owns the TypeScript and Zod contracts for plan semantics.
- `outputSchema.ts` mirrors the proposal schema for strict provider output.
- `generator.ts` is the provider-facing boundary and returns source `ai` or
  `fallback`.
- `fallback.ts` is deterministic and makes no provider call.
- `app/types/companyCapability.ts` remains the authoritative application-owned
  capability catalog; the contract derives its closed Zod enum directly from
  that catalog and independently mirrors the application workflow-type set.

`LaunchPlanningProposal` contains an introduction and exactly seven semantic
steps in application-defined capability order. Every step has controlled
workflow type, two to five activities and completion criteria. It excludes all
plan, step and activity identifiers; application-owned capability association,
ordering, state, timestamps, versions, source and output references.

## Workspace Generation handoff

The Workspace Generation Orchestrator receives a validated
`LaunchPlanningProposal` only after Foundation and First Offer are valid. It
must associate the seven positions with the canonical capabilities and assign
persistence envelopes, identifiers, ordering, progress state,
timestamps and retry lifecycle; it may not ask this agent to fabricate them.
It maps the proposal to the current application execution-plan records without
silently overwriting completed work.

The legacy execution-plan generator and existing routes remain unchanged during
this isolated milestone. Replacing them is an orchestration task.
