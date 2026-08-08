# Visual Asset Agent — Roadmap

## Phase 0 — Contracts and boundaries

- [x] Separate visual production from Website Agent.
- [x] Establish the Visual Asset Agent as a shared tool.
- [x] Accept structured inter-tool briefs and provider independence.
- [x] Define `AssetBrief` and `AssetResult` Zod contracts.
- [x] Define visual-direction, asset, variant and generation entities.
- [x] Select the first supported asset types and formats.
- [ ] Define review, acceptance and reuse rules.

## Phase 1 — Deterministic identity baseline

- [x] Define the initial typography, palette and composition tokens.
- [x] Compose the initial responsive SVG wordmark and lockup variant.
- [ ] Support uploaded symbols and logos.
- [x] Store durable originals and variants.
- [ ] Preview and explicitly accept the company identity.

## Phase 2 — First image provider

- [x] Define the provider adapter contract.
- [x] Implement the first generation adapter.
- [ ] Generate an optional logo symbol without wordmark text.
- [x] Generate the initial workspace background, reusable by website workflows.
- [x] Persist briefs, variants, provenance, latency and provider-neutral cost metadata.
- [ ] Add validation, retry limits and failure recovery.

## Phase 3 — Inter-tool use

- [ ] Serve a structured request from Website Agent.
- [ ] Reuse the approved visual direction across site assets.
- [ ] Serve a campaign-creative request from Promotion Agent.
- [ ] Preserve asset lineage across edits and derivatives.
- [ ] Expose stable asset references to consumer tools.

## Phase 4 — Evaluation and expansion

- [ ] Measure usefulness, consistency, latency and cost.
- [ ] Evaluate a second provider using identical briefs.
- [ ] Add channel and format-specific derivatives.
- [ ] Define lifecycle, retention and deletion behavior.
- [ ] Decide whether operational scale justifies service extraction.
