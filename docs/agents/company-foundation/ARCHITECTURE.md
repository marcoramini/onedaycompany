# Company Foundation Agent Architecture

## Boundary

The Foundation Agent is an isolated server-side domain module under
`app/lib/company-foundation/`. It owns only the semantics and generation of a
proposed company foundation. It has no route, persistence adapter, UI state or
acceptance write.

```text
durable initial user context
  -> FoundationGenerationRequest validation
  -> OpenAI Responses API with strict JSON Schema
  -> FoundationProposal Zod validation
  -> deterministic fallback on provider or output failure
  -> FoundationProposal
```

## Canonical contracts

- `contracts.ts` is the canonical TypeScript and Zod contract.
- `outputSchema.ts` mirrors it for strict provider output.
- `generator.ts` is the provider-facing boundary and returns its source as
  `ai` or `fallback`.
- `fallback.ts` is deterministic and contains no provider call.

`FoundationProposal` contains only semantic fields. It deliberately excludes
IDs, versions, acceptance, timestamps, offers, launch steps and activities.
The Company State Agent must own the persisted versioned envelope when that
state model is introduced.

## First Offer handoff

The First Offer Agent receives this validated input:

```ts
type FoundationProposal = {
  purpose: string;
  vision: string;
  mission: string;
  companyConcept: string;
  foundationalValueProposition: string;
  userEvidence: string[];
  assumptions: string[];
};
```

It can use the company concept and value proposition to shape an offer, but it
must keep evidence and assumptions explicit and must not rewrite foundation
fields. If an offer requires a foundation change, it returns an impact warning
to the Foundation Agent; no agent mutates accepted state directly.

## Current integration status

The existing `/api/business-opportunities` path remains unchanged. Replacing
the current combined proposal generation with the sequential Foundation → First
Offer → Launch Planning flow is owned by the Workspace Generation Orchestrator.
