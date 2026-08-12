# First Offer Agent Decisions

## FOA-001 — The First Offer Proposal is semantic and state-free

**Status:** Proposed — requires architecture-chat approval before cross-agent integration

The First Offer Agent emits a validated `FirstOfferProposal` without IDs,
versions, timestamps, acceptance state or persistence authority. The Company
State Agent owns the durable envelope. This removes the ambiguity in the
initial dossier wording that called the generated proposal versioned.

## FOA-002 — Foundation is immutable input

**Status:** Accepted

The module imports and validates the Foundation contract at its input boundary.
It may emit `foundationImpactWarnings`, but it never redefines or mutates
purpose, vision, mission, company concept or foundational value proposition.

## FOA-003 — Price is an optional hypothesis

**Status:** Accepted

`priceHypothesis` is either a structured amount, ISO currency, unit and
rationale, or `null` when the Foundation does not support a responsible
initial hypothesis. Price is never presented as a validated fact.

## FOA-004 — The first implementation is non-invasive

**Status:** Accepted

The module is isolated and does not replace the existing combined company
proposal endpoint. The Workspace Generation Orchestrator owns later sequential
integration after the Launch Planning contract exists.
