# Launch Planning Agent Roadmap

## Completed — isolated launch-planning generation boundary

- [x] Define Foundation- and First Offer-consuming TypeScript and Zod inputs.
- [x] Define a state-free proposal with seven complete capability steps.
- [x] Mirror field requirements and limits in strict JSON Schema.
- [x] Add a dedicated provider prompt and generation boundary.
- [x] Add deterministic fallback behavior.
- [x] Add isolated contract tests.
- [x] Document the Workspace Generation handoff and state boundary.

## Next — Workspace Generation integration

- [ ] Execute Foundation, First Offer and Launch Planning sequentially with
  persisted stage lifecycle and recoverable failures.
- [ ] Map the validated proposal to application-owned execution-plan records
  without changing the current UI or silently overwriting work.
- [ ] Define regeneration and impact-proposal handling with Company State and
  Governance & Quality before changing an accepted plan.
