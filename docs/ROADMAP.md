# OneDayCompany — Roadmap

## Completed

### M1 — Guided Company Beginning

**Goal:** Replace the old skills assessment with a short, encouraging and non-evaluative beginning.

- [x] Start from what the user loves, knows, has experienced, imagines or wants to create.
- [x] Remove the requirement for a business idea.
- [x] Avoid entrepreneurial terminology in the first interaction.
- [x] Generate one coherent company proposal.
- [x] Present the proposal as a real, low-cost and launchable company.
- [x] Allow the user to request something substantially different.
- [x] Preserve the user’s original context during regeneration.

### M2 — Visible Company Creation

**Goal:** Make company generation feel like visible progress rather than an unexplained wait.

- [x] Add a dedicated animated loading screen.
- [x] Rotate short progress messages with fade transitions.
- [x] Use the loading screen for initial company generation.
- [x] Use the loading screen when requesting another proposal.
- [x] Use the loading screen during proposal refinement.

### M3 — Proposal Refinement v1

**Goal:** Give the user practical control over the recommended starting proposal.

- [x] Present the first company as a proposal, not a final answer.
- [x] Add a guided refinement drawer.
- [x] Add quick refinement suggestions.
- [x] Add a free-text refinement request.
- [x] Pass the current company and refinement request to the AI pipeline.
- [x] Preserve unaffected strengths during refinement.
- [x] Establish clear action hierarchy:
  - continue;
  - refine;
  - request something different.
- [x] Generate company content in the language used by the user.
- [x] Add shared OpenAI client with optional local proxy support.
- [x] Align JSON Schema and Zod field limits.

### M4 — Execution Plan v1

**Goal:** Turn the selected company into a short, ordered and immediately actionable path.

- [x] Generate between three and five ordered execution steps.
- [x] Require one practical objective per step.
- [x] Require a visible, usable or verifiable outcome.
- [x] Associate each step with a supported workflow type.
- [x] Add strict JSON Schema and Zod validation.
- [x] Keep IDs, status, timestamps and output references application-managed.
- [x] Add deterministic fallback plan generation.
- [x] Add a dedicated Execution Plan screen.
- [x] Preserve the plan when returning from the current Architect.
- [x] Clear the plan when the company is regenerated or refined.
- [x] Add a distinct Execution Plan loading experience.
- [x] Keep company creation and execution planning transitions separate.

## Current milestone

### M5 — First Focused Execution Workflow

**Goal:** Replace the placeholder Architect transition with one real workflow that completes a concrete company-building objective.

Recommended first workflow:

```text
offer-builder
```

Deliverables:

- [ ] Add a typed `WorkflowHost` or equivalent routing layer.
- [ ] Open a workflow from the selected Execution Plan step.
- [ ] Pass the current `Company` and `ExecutionStep` as structured context.
- [ ] Define a dedicated offer-builder contract.
- [ ] Generate or refine one concrete first offer.
- [ ] Avoid a generic chat interface.
- [ ] Save one structured workflow output.
- [ ] Mark the execution step as `in_progress` and then `completed`.
- [ ] Return to the Execution Plan without losing outputs or status.
- [ ] Preserve deterministic fallback behavior where AI generation is used.
- [ ] Run `npm run build`.
- [ ] Review the diff.
- [ ] Update documentation.

## Upcoming

### M6 — Workflow Library v1

**Goal:** Add a small set of reusable, focused workflows without building a generic agent system.

Candidate workflows:

- [ ] `landing-page-builder`
- [ ] `booking-builder`
- [ ] `contact-builder`
- [ ] `outreach-builder`
- [ ] `pricing-builder`
- [ ] `portfolio-builder`
- [ ] `social-launch-builder`
- [ ] controlled `custom-guided-step`

Each workflow must:

- have one objective;
- use a typed input contract;
- produce a structured output;
- define completion criteria;
- update company or plan state explicitly.

### M7 — Persistence and Company Ownership

**Goal:** Let the user preserve a company and continue building without making registration feel like an interruption.

- [ ] Define the first persistence boundary.
- [ ] Decide when temporary session data becomes a saved company.
- [ ] Add a free account flow tied to saving progress.
- [ ] Preserve the company, execution plan, workflow outputs and statuses.
- [ ] Frame registration as continuing or saving the company, not accessing generic features.
- [ ] Add privacy, deletion and basic account-management requirements.

### M8 — Proposal and Plan History

**Goal:** Preserve meaningful changes without overwhelming the user.

- [ ] Store prior company proposals and refinements.
- [ ] Distinguish company alternatives from revisions.
- [ ] Version Execution Plans when the active company changes materially.
- [ ] Restore a previous company or plan version.
- [ ] Avoid turning history into a complex idea-management system.

### M9 — Product Localization

**Goal:** Support Italian test users while preserving English as the default fixed product language.

- [ ] Add explicit English / Italian UI selection.
- [ ] Centralize fixed UI copy in a small dictionary.
- [ ] Persist language choice locally.
- [ ] Evaluate migration to `next-intl` only when product scale requires it.

## Ongoing technical rules

- [ ] Run `npm run build` before every push.
- [ ] Keep prompts separate from implementation.
- [ ] Keep structured output and Zod schemas aligned.
- [ ] Keep AI-generated content separate from application-managed state.
- [ ] Never commit `.env.local`, API keys or proxy credentials.
- [ ] Keep local proxy support optional so Vercel uses direct connectivity.
- [ ] Update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` after substantial milestones.
