# OneDayCompany — Roadmap

## Completed

### M1 — Guided Company Beginning

- [x] Replace the skills assessment with a short, non-evaluative beginning.
- [x] Generate one coherent company proposal at a time.
- [x] Support refinement and substantially different alternatives.
- [x] Preserve structured validation and deterministic fallback behavior.

### M2 — Authentication and Company persistence

- [x] Add Supabase authentication and protected Console routes.
- [x] Persist Company and initial Offer.
- [x] Support multiple companies and reopen the most recently used one.
- [x] Add permanent company deletion with explicit confirmation and cascade.

### M3 — Execution Plan persistence

- [x] Define seven application-owned company capabilities.
- [x] Generate one step per capability and two to five activities per step.
- [x] Persist plans, steps and activities with ownership-aware RLS.
- [x] Preserve application ownership of execution state.
- [x] Bind stored steps to canonical capability identifiers.

### M4 — Company Workspace Home v1

- [x] Establish the Workspace as the permanent company operating home.
- [x] Add company header, navigation, switcher and responsive shell.
- [x] Add Launch Readiness and momentum-first recommendation.
- [x] Present task cards with real persisted activities.
- [x] Add per-step activity percentages in `Your progress`.
- [x] Keep task cards in an ordered two-column desktop grid.
- [x] Move compact logo actions into the company header.
- [x] Preserve Foundation cards for Company and Customers.
- [x] Add contextual refinement entry points and side-panel prototype.
- [x] Require explicit user acceptance for future AI changes.

## Next focused milestones

These should be implemented in separate tasks. Their order may change after
product review, but each milestone must remain independently verifiable.

### M5 — Structured refinement proposals

**Goal:** Turn the current refinement panel into an impact-aware, explicitly
accepted change workflow.

- [ ] Define Zod contracts for refinement request, proposal and impact set.
- [ ] Provide complete structured company context server-side.
- [ ] Generate a proposal without writing domain state.
- [ ] Identify direct and cascading impacts.
- [ ] Suggest a lower-impact alternative when useful.
- [ ] Show a reviewable diff.
- [ ] Apply only after `Accept changes`.
- [ ] Version the change and mark affected completed outputs `needs_review`.
- [ ] Apply accepted changes transactionally.

### M6 — First-offer workflow

- [ ] Open a focused offer builder from the First Offer card.
- [ ] Refine promise, scope, delivery, outcome and boundaries.
- [ ] Save structured outputs and update activity status.
- [ ] Return to the Workspace with real progress.

### M7 — Public-presence workflow

- [ ] Choose the suitable first page type for the company.
- [ ] Generate structured page content and one primary CTA.
- [ ] Support contact, booking, catalog, portfolio or waitlist variants.
- [ ] Preview and publish a minimal company page.
- [ ] Track published state and later upgrades.

### M8 — Logo and visual asset workflow

- [ ] Upload a user logo.
- [ ] Generate logo proposals through a dedicated image provider.
- [ ] Store the selected logo and basic visual direction.
- [ ] Evaluate online editing integrations separately.

### M9 — Promotional launch workflow

- [ ] Select the first relevant channel.
- [ ] Generate campaign message and initial assets.
- [ ] Preserve connection with offer, page and company identity.
- [ ] Track preparation and launch activities.

### M10 — Customer operations and first customers

- [ ] Define contact, booking, ordering, payment and follow-up paths.
- [ ] Support first-customer outreach without forcing one channel.
- [ ] Add customer records only when a real CRM boundary is required.

### M11 — History and localization

- [ ] Version company and plan revisions.
- [ ] Restore meaningful prior versions.
- [ ] Add explicit English/Italian UI selection when product testing requires it.

## Ongoing quality rules

- [ ] One task, one coherent objective.
- [ ] Fixed public UI copy remains English.
- [ ] No generic chatbot surface.
- [ ] Keep prompts separate from implementation.
- [ ] Keep JSON Schema and Zod contracts aligned.
- [ ] Never let AI write application-managed state directly.
- [ ] Never commit secrets or local proxy credentials.
- [ ] Run `npm run lint` and `npm run build` before every push.
- [ ] Update documentation after substantial milestones.
