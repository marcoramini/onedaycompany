# Company Foundation Agent Decisions

## CFA-001 — The Foundation Proposal is semantic and state-free

**Status:** Accepted

The Foundation Agent emits a validated `FoundationProposal` without IDs,
versions, timestamps, acceptance state or persistence authority. The Company
State Agent owns the versioned durable envelope. This preserves the registry's
write boundary while letting downstream agents share one portable contract.

## CFA-002 — Evidence and assumptions remain separate

**Status:** Accepted

The proposal always includes `userEvidence` and `assumptions`. Evidence is
limited to what the user explicitly supplied. Any inferred customer, problem,
outcome or market condition is an assumption, never a validated fact.

## CFA-003 — The first implementation is non-invasive

**Status:** Accepted

The module is isolated and does not replace the existing combined company
proposal endpoint. The Workspace Generation Orchestrator will own the later
sequential integration after First Offer and Launch Planning contracts exist.
