# Visual Asset Agent — Decisions

## VIS-001 — Shared company capability

**Status:** Accepted

Visual asset creation is a shared tool consumed by Website Agent, Promotion
Agent and future tools. It is not implemented inside any one consumer.

## VIS-002 — Structured inter-tool requests

**Status:** Accepted

Consumer tools submit typed asset briefs and receive durable asset references.
They do not send arbitrary provider prompts or depend on provider responses.

## VIS-003 — Provider independence

**Status:** Accepted

Image generation and editing use replaceable adapters. Provider-specific
identifiers and response formats remain in integration metadata, not in the
consumer or asset-domain contracts.

## VIS-004 — Deterministic logo baseline

**Status:** Accepted

The first reliable logo is composed by the application from typography,
palette and an optional approved symbol. Generative models may propose symbols
or visual directions but do not own wordmark rendering.

## VIS-005 — Durable assets and provenance

**Status:** Accepted

OneDayCompany stores accepted assets and variants under stable IDs with source,
generation and rights-related provenance. Temporary provider URLs never become
the published source of truth.

## Open decisions

- Canonical names and fields for `AssetBrief` and `AssetResult`.
- First asset types and supported formats.
- Storage and image-transformation provider.
- Review and selection experience.
- Per-company generation budgets and retry policy.
- Rights, retention and deletion policy.
- Quality evaluation criteria for image providers.
