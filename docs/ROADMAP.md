# OneDayCompany — Product Roadmap

## 1. Roadmap principle

The roadmap is outcome-based.

Milestones should represent a meaningful increase in the user’s probability of starting a real business—not only the addition of technical features.

Dates should be added only when there is a real planning need.

## 2. Completed

### M0 — Foundation

**Outcome:** OneDayCompany exists as a live, navigable product prototype with a clear mission and initial workflow.

- [x] Define mission and initial vision
- [x] Choose product name
- [x] Create Next.js project
- [x] Build initial landing page
- [x] Build skills input
- [x] Build deterministic Business Direction generation
- [x] Build Business Direction screen
- [x] Add The Architect transition screen
- [x] Separate major UI components from `page.tsx`
- [x] Deploy on Vercel
- [x] Establish Git-based deployment workflow
- [x] Establish initial project documentation

### M0.1 — Product Vision alignment

**Outcome:** The product is positioned as an Entrepreneur Operating System whose method and workflow are more important than a specific AI model.

- [x] Confirm mission: “OneDayCompany transforms skills into businesses.”
- [x] Define the public promise around launching through clear steps
- [x] Remove AI from the center of public communication
- [x] Confirm “one screen, one objective”
- [x] Confirm validation before unnecessary building
- [x] Define Product Method as a core asset
- [x] Define AI as an enabling layer
- [x] Rewrite the core project documentation
- [x] Add `PRODUCT_METHOD.md`
- [x] Add `AI_METHOD.md`

## 3. Current milestone

### M1 — Business Blueprint v1

**User outcome:** The user turns a selected Business Direction into a clear, inspectable and actionable business hypothesis.

The Blueprint should include:

- target customer;
- customer problem;
- value proposition;
- first offer;
- delivery model;
- pricing hypothesis;
- acquisition starting point;
- core assumptions;
- validation experiment;
- first concrete action.

Deliverables:

- [ ] Define `BusinessBlueprint` domain type
- [ ] Define which fields are hypotheses and which come from user input
- [ ] Create deterministic or mocked Blueprint generator
- [ ] Create Business Blueprint screen
- [ ] Connect The Architect to the Blueprint
- [ ] Introduce explicit typed workflow state
- [ ] Preserve selected skills and Business Direction in workflow state
- [ ] Add backward navigation
- [ ] Ensure each Blueprint section is concise and actionable
- [ ] End the Blueprint with one clear validation action
- [ ] Check responsive layout
- [ ] Run `npm run build`
- [ ] Deploy successfully
- [ ] Update documentation and handoff

**Completion evidence:** A user can begin with skills and reach a coherent Blueprint that is ready to test.

## 4. Next product milestones

### M2 — Blueprint refinement and first AI integration

**User outcome:** The user receives a more relevant Blueprint generated from their context and can refine it without losing control.

- [ ] Define stage-specific prompt and evaluation examples
- [ ] Add server-side generation route or Server Action
- [ ] Add provider adapter
- [ ] Request structured output
- [ ] Validate response against domain schema
- [ ] Preserve user edits across regeneration
- [ ] Add loading, error and retry states
- [ ] Record prompt version, model, latency and approximate cost
- [ ] Test output quality with representative Skill Profiles
- [ ] Keep deterministic fallback during early testing if useful

### M3 — Customer and Problem focus

**User outcome:** The user converts a broad Blueprint into a specific customer-problem hypothesis that can be researched.

- [ ] Define initial customer segment
- [ ] Define problem hypothesis
- [ ] Define current alternatives
- [ ] Identify main assumptions
- [ ] Identify real people or sources to investigate
- [ ] Create a focused research objective
- [ ] Prevent advancement when the hypothesis is too broad to test

### M4 — First Offer

**User outcome:** The user creates the smallest credible offer that can be presented to a potential customer.

- [ ] Define promised outcome
- [ ] Define scope and exclusions
- [ ] Define deliverables
- [ ] Define delivery model
- [ ] Define timeline
- [ ] Define pricing or commitment hypothesis
- [ ] Generate concise offer description
- [ ] Create a customer-facing version

### M5 — Validation Engine

**User outcome:** The user launches a real validation action and records evidence.

- [ ] Convert assumptions into testable questions
- [ ] Generate interview guide
- [ ] Generate outreach message
- [ ] Define positive, negative and inconclusive evidence
- [ ] Track customer conversations
- [ ] Record quotes, behavior and commitments
- [ ] Separate evidence from interpretation
- [ ] Recommend continue, refine or change
- [ ] Require a concrete next validation action

### M6 — First Customer workflow

**User outcome:** The user moves from validated interest to a real customer commitment.

- [ ] Create simple prospect workflow
- [ ] Track outreach and replies
- [ ] Prepare discovery conversation
- [ ] Generate proposal or trial invitation
- [ ] Support objections and follow-up
- [ ] Record commitments
- [ ] Record first customer

### M7 — First Revenue

**User outcome:** The user completes delivery, collects payment and learns from the first transaction.

- [ ] Support customer onboarding
- [ ] Define delivery checklist
- [ ] Track delivery effort and direct costs
- [ ] Record payment
- [ ] Collect customer feedback
- [ ] Capture testimonial or case-study permission
- [ ] Summarize lessons
- [ ] Recommend what to repeat, change or stop

### M8 — Repeatable business system

**User outcome:** The user turns early evidence into a more repeatable acquisition and delivery process.

- [ ] Refine positioning
- [ ] Refine offer and pricing
- [ ] Identify repeatable acquisition channel
- [ ] Create essential brand assets
- [ ] Create landing or sales page only when justified
- [ ] Standardize delivery
- [ ] Identify automation opportunities
- [ ] Track simple unit economics
- [ ] Define next growth experiment

## 5. Enabling platform milestones

These should be introduced when they support an active product outcome.

### Accounts and persistence

- [ ] Authentication
- [ ] Save and resume workflow
- [ ] Multiple business projects
- [ ] Durable Blueprint and Evidence Log
- [ ] Data export
- [ ] Account and data deletion

### Product analytics

- [ ] Define event taxonomy aligned with Product Method
- [ ] Track stage conversion
- [ ] Track real-world action events
- [ ] Track generation failures and retries
- [ ] Create privacy-conscious analytics implementation

### Commercial foundation

- [ ] Usage limits
- [ ] Billing
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Cookie and analytics review
- [ ] Production monitoring
- [ ] Custom domain
- [ ] Support workflow

## 6. Prioritization rules

Prioritize a backlog item only when it:

- increases the probability that a user starts a real business;
- reduces a major point of friction in the current method stage;
- produces better user or market learning;
- supports the current milestone;
- reduces a material technical or trust risk;
- enables measurement of a key entrepreneurial outcome.

Do not prioritize a feature simply because it is common in SaaS products.

## 7. Explicitly deferred

Until evidence justifies them, avoid prioritizing:

- broad social or community features;
- complex dashboards;
- large template libraries;
- autonomous agents acting without clear user control;
- website building before validation;
- extensive financial forecasting before first revenue;
- multi-provider AI abstraction without a concrete need;
- native mobile applications;
- gamification disconnected from business action.
