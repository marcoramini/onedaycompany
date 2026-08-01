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

**Goal:** Make AI generation feel like visible progress rather than an unexplained wait.

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

## Current milestone

### M4 — Guided Company Evolution v2

**Goal:** Turn refinement into a dependable collaborative workflow without creating a generic chatbot.

Potential deliverables:

- [ ] Test the refinement drawer with real users.
- [ ] Improve refinement-specific loading messages.
- [ ] Preserve prior company versions in session state.
- [ ] Allow restoration of the previous proposal after refinement.
- [ ] Decide whether limited conversational history is necessary.
- [ ] Improve error handling so failed refinements preserve the current company and request.
- [ ] Remove the temporary OpenAI health route once production connectivity is confirmed.

## Upcoming

### M5 — Architect Redesign

**Goal:** Continue from the accepted or refined `Company` entity and produce the first concrete launch assets.

- [ ] Replace placeholder Architect progress with real guided steps.
- [ ] Define the first offer in greater detail.
- [ ] Create a public landing-page foundation.
- [ ] Add a contact or conversion mechanism.
- [ ] Prepare a concrete path to the first customer.

### M6 — Proposal History and Comparison

**Goal:** Give users control over meaningful alternatives without overwhelming them.

- [ ] Store prior proposals and refinements.
- [ ] Distinguish alternatives from revisions.
- [ ] Compare a small number of proposals.
- [ ] Restore a previous version.
- [ ] Avoid turning history into a complex idea-management system.

### M7 — Product Localization

**Goal:** Support Italian test users while preserving English as the default public product language.

- [ ] Add explicit English / Italian UI selection.
- [ ] Centralize fixed UI copy in a small dictionary.
- [ ] Persist language choice locally.
- [ ] Evaluate migration to `next-intl` only when product scale requires it.

## Ongoing technical rules

- [ ] Run `npm run build` before every push.
- [ ] Keep prompts separate from implementation.
- [ ] Keep structured output and Zod schemas aligned.
- [ ] Never commit `.env.local`, API keys or proxy credentials.
- [ ] Keep local proxy support optional so Vercel uses direct connectivity.
- [ ] Update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` after substantial milestones.
