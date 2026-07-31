# OneDayCompany — Product Roadmap

## 1. Roadmap principle

Milestones represent a meaningful increase in the probability that a person starts a real business today or makes that business more likely to succeed tomorrow.

Prefer visible outputs, low initial cost and real-world customer action over planning depth or feature volume.

## 2. Completed

### M0 — Foundation

**Outcome:** A live Next.js prototype with the first navigable workflow.

- [x] Create application foundation
- [x] Build initial landing, skills form and business direction flow
- [x] Add The Architect transition
- [x] Deploy on Vercel
- [x] Establish Git and documentation workflow

### M0.1 — Product and AI method alignment

**Outcome:** OneDayCompany is established as an AI-assisted Entrepreneur Operating System whose workflow is more important than any model.

- [x] Confirm one screen, one objective
- [x] Keep AI out of the center of public communication
- [x] Define structured AI contracts and validation
- [x] Add Product Method and AI Method documentation

### M0.2 — AI-backed Business Opportunities

**Outcome:** The existing Skills flow generates structured opportunities through a resilient server-side AI pipeline.

- [x] Add OpenAI Responses API integration
- [x] Add strict JSON Schema and Zod validation
- [x] Add deterministic fallback generation
- [x] Add loading, retry and recoverable error behavior
- [x] Add optional local proxy support
- [x] Separate prompt content into a prompt module
- [x] Improve opportunity branding, diversity and customer-facing copy

### M0.3 — Landing vision reset

**Outcome:** The landing now communicates immediate personal and entrepreneurial action rather than a skills-analysis workflow.

- [x] Establish the central message: “Love what you build. Build what you love. Start today.”
- [x] Use “Start my company” as the primary CTA
- [x] Remove the old skills-first timeline from the proposed landing
- [x] Communicate that the user does not need a perfect business idea
- [ ] Verify final implementation visually in the repository
- [ ] Run `npm run build`
- [ ] Commit and deploy the landing change

## 3. Current milestone

### M1 — Guided Company Beginning v1

**User outcome:** A person who may have no clear idea and may underestimate their skills begins creating a company through a short, encouraging interaction.

The interaction must feel like building—not interviewing.

#### Product work

- [ ] Replace the current Skills form
- [ ] Define the emotional progression of the first interaction
- [ ] Define a small number of broad, supportive prompts
- [ ] Allow the user to express interests, passions, experience, knowledge or imagination
- [ ] Avoid founder-language such as target customer, market or problem during the first step
- [ ] Reinforce that everything the user already has can count
- [ ] Keep one screen and one objective

#### Opportunity flow

- [ ] Generate exactly one Business Opportunity at a time
- [ ] Add `Let's build this`
- [ ] Add `Refine this idea`
- [ ] Add `Try a different direction`
- [ ] Keep previous opportunities in a saved list
- [ ] Allow later selection from saved opportunities
- [ ] Prevent repeated near-duplicate directions

#### Architecture

- [ ] Define typed onboarding/conversation state
- [ ] Define the context object sent to opportunity generation
- [ ] Update the Business Opportunity response contract from three items to one item
- [ ] Preserve structured validation and fallback behavior
- [ ] Decide how refinement instructions modify generation context
- [ ] Add explicit typed workflow state
- [ ] Verify backward navigation and responsive behavior

#### Completion

- [ ] Test with users who provide vague inputs
- [ ] Test with users who already have a specific idea
- [ ] Run `npm run build`
- [ ] Review diff
- [ ] Commit and deploy
- [ ] Update documentation and handoff

## 4. Next milestones

### M2 — Company commitment and opportunity workspace

**User outcome:** The user chooses a company to build while preserving alternative directions.

- [ ] Create saved Opportunities workspace
- [ ] Make the selected company the active project
- [ ] Show why the company fits without evaluating the user
- [ ] Preserve original user context and refinements
- [ ] Support returning to an alternative opportunity

### M3 — First launchable company foundation

**User outcome:** The chosen company becomes visible and ready for initial contact with the market.

- [ ] Initial identity and positioning
- [ ] Simple first offer
- [ ] Lightweight customer-facing landing page
- [ ] Contact or conversion mechanism
- [ ] First customer action
- [ ] Clear assumptions to test through launch

### M4 — First customer workflow

**User outcome:** The user reaches out, learns from real people and moves toward the first commitment.

- [ ] Prospect and outreach workflow
- [ ] Customer conversation support
- [ ] Evidence capture
- [ ] Offer refinement
- [ ] Follow-up and first commitment

### M5 — First revenue and daily improvement

**User outcome:** The user delivers, gets paid and improves the business one day at a time.

- [ ] Delivery checklist
- [ ] Payment recording
- [ ] Feedback and testimonial capture
- [ ] Daily next action
- [ ] Offer, positioning and process improvement

## 5. Enabling platform work

Introduce only when it supports the current business-building outcome:

- authentication and persistence;
- multiple company projects;
- analytics aligned with meaningful user action;
- billing and usage limits;
- privacy, terms and deletion;
- production monitoring and support.

## 6. Explicitly deferred

- generic chat features;
- long business plans;
- complex dashboards;
- large template libraries;
- autonomous agents without clear control;
- major software or operational builds before evidence;
- extensive financial forecasting;
- native mobile applications;
- gamification disconnected from real business progress.
