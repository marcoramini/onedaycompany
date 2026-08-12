# First Offer Agent Roadmap

## Completed — isolated first-offer generation boundary

- [x] Define the Foundation-consuming TypeScript and Zod request contract.
- [x] Define the state-free `FirstOfferProposal` contract.
- [x] Mirror field requirements and limits in strict JSON Schema.
- [x] Add a dedicated provider prompt and generation boundary.
- [x] Add deterministic fallback behavior.
- [x] Add isolated Node contract tests.
- [x] Document the Launch Planning handoff and state ownership boundary.

## Next — Launch Planning and orchestration integration

- [ ] Obtain architecture-chat approval for the `FirstOfferProposal` as a
  shared contract before it is integrated by three or more agents.
- [x] Define a state-free Launch Planning contract over validated Foundation
  and First Offer inputs.
- [ ] Have the Workspace Generation Orchestrator execute Foundation, First
  Offer and Launch Planning in order without changing acceptance semantics.
- [ ] Define offer refinement and impact-proposal contracts with the Company
  State and Governance & Quality Agents.
- [ ] Add state-owned versioning only after its canonical record model exists.
