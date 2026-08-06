# OneDayCompany — Roadmap

## Roadmap principle

Each milestone must increase the probability that the user launches a real business today or makes that business more likely to succeed tomorrow.

---

## Completed

### M1 — Guided Company Beginning

- [x] Replace the old skills assessment.
- [x] Start from interests, passions, knowledge, experience or imagination.
- [x] Generate one coherent Company proposal.
- [x] Preserve the original user context.

### M2 — Visible Company Creation

- [x] Add a dedicated animated loading experience.
- [x] Use product-specific progress messages.

### M3 — Proposal Refinement

- [x] Present the proposal as a starting point.
- [x] Add guided refinement.
- [x] Add alternative direction generation.
- [x] Preserve unaffected Company strengths.

### M4 — Execution Plan v1

- [x] Generate a short ordered operational path.
- [x] Keep execution state application-managed.
- [x] Add deterministic fallback behavior.

The implementation is preserved but temporarily disconnected until it becomes persistent inside the Console.

### M5 — Authenticated Company Workspace Foundation

- [x] Add Supabase Auth and PostgreSQL.
- [x] Add SSR cookie sessions.
- [x] Add Google OAuth.
- [x] Add Profiles, Companies and Offers.
- [x] Add Row Level Security.
- [x] Add idempotent Company creation.
- [x] Add protected Console routes.
- [x] Add sign-out.
- [x] Add conditional local proxy support.

### M6 — Returning User Access

- [x] Add `Sign in` to the Landing.
- [x] Add `/sign-in`.
- [x] Add `/console`.
- [x] Redirect to the most recently opened Company.

### M7 — Multiple Company Foundation

- [x] Add `last_opened_at`.
- [x] Add Company list queries.
- [x] Add CompanySwitcher.
- [x] Add OpenedCompanyTracker.
- [x] Preserve session during switching.
- [x] Add Start another company.
- [ ] Verify the complete flow after Console Shell refactor.

---

## Current milestone

### M8 — Console Shell / 3B.0.3

**Outcome:** A clean, modular and responsive persistent Company workspace.

- [ ] Rewrite `app/console/[companyId]/page.tsx` as a small composition page.
- [ ] Complete desktop sidebar.
- [ ] Complete mobile header.
- [ ] Integrate CompanySwitcher.
- [ ] Add central content area.
- [ ] Add account area.
- [ ] Show plan placeholder.
- [ ] Show credits and usage placeholder.
- [ ] Integrate logout.
- [ ] Keep future navigation visible but inactive.
- [ ] Verify responsive behavior.
- [ ] Remove unused Console fragments.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Review the diff.
- [ ] Update context documentation.

Constraints:

- no new database tables;
- no new AI calls;
- no generated images;
- no invented metrics.

---

## Next milestones

### M9 — Console Overview / 3B.1

- [ ] Company Foundation card.
- [ ] First Offer card.
- [ ] Customers card.
- [ ] Brand state card.
- [ ] Execution state card.
- [ ] Documents preview.
- [ ] One state-derived Next Recommendation.
- [ ] Use only real or deterministic data.

### M10 — Business Knowledge Expansion / 3B.2

- [ ] Vision.
- [ ] Unique value.
- [ ] Primary customer profile.
- [ ] Early market.
- [ ] Pricing range.
- [ ] Delivery model.
- [ ] Tone of voice.
- [ ] Visual direction.
- [ ] Suggested palette.
- [ ] Persistence and versioning.

### M11 — Visual Asset Service / 3B.3

- [ ] Provider-independent media adapter.
- [ ] Asynchronous generation jobs.
- [ ] Prompt and version storage.
- [ ] Logo concept.
- [ ] Company illustration.
- [ ] Offer illustration.
- [ ] Customer illustration.
- [ ] Placeholder and failure behavior.
- [ ] Credit integration.

### M12 — First Focused Persistent Workflow

Recommended first action:

```text
Shape your first offer
```

- [ ] Open a focused Offer workspace.
- [ ] Use current Company and Offer as context.
- [ ] Save the refined Offer persistently.
- [ ] Update the Console overview.
- [ ] Avoid generic chat.

### M13 — Documents and Assets

- [ ] Company Foundation document.
- [ ] Offer document.
- [ ] Customer starting point.
- [ ] Lean business overview.
- [ ] Landing copy.
- [ ] Asset library.
- [ ] Version history.

### M14 — Public Presence and First Customer Action

- [ ] Public landing page.
- [ ] Contact or conversion mechanism.
- [ ] First outreach action.
- [ ] Evidence capture.
- [ ] Offer refinement from feedback.

---

## Pre-production requirements

- [ ] Branded OAuth domain.
- [ ] Production and preview redirect URLs.
- [ ] Google OAuth consent branding.
- [ ] Privacy policy and terms.
- [ ] Account and data deletion.
- [ ] Authentication error testing.
- [ ] Vercel environment variables.
- [ ] Production monitoring.
- [ ] Billing and credit enforcement.

## Ongoing rules

- [ ] Run `npm run lint` and `npm run build` before every push.
- [ ] Keep prompts separate from implementation.
- [ ] Keep JSON Schema and Zod aligned.
- [ ] Never commit secrets or proxy credentials.
- [ ] Keep local proxy support conditional.
- [ ] Update LLM context docs after substantial milestones.
