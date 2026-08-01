# OneDayCompany — Changelog

All notable project changes should be recorded here.

The format is intentionally lightweight.

## Unreleased

### Added

- Guided Company Beginning that starts from interests, experience, knowledge, imagination or something the user wants to create.
- One-company-at-a-time generation through a server-side Next.js API route.
- Guided proposal refinement with quick suggestions and free-text direction.
- Dedicated company creation loading with rotating progress messages.
- Structured Execution Plan generation after the user chooses a company.
- Execution Plan contract with three to five ordered, actionable steps.
- Workflow-type routing metadata for each execution step.
- Dedicated `ExecutionPlanScreen`.
- Dedicated `ExecutionPlanLoading` transition.
- Deterministic fallback generation for both companies and execution plans.
- Shared OpenAI client with optional `HTTP_PROXY` or `HTTPS_PROXY` support.
- Strict JSON Schema and Zod validation for AI-generated application data.
- Generation source metadata: `ai` or `fallback`.

### Changed

- Replaced the old skills-first workflow with a non-evaluative Company Beginning.
- Replaced three simultaneous Business Opportunities with one recommended company proposal at a time.
- Updated the `Company` contract to:
  - `id`
  - `name`
  - `tagline`
  - `mission`
  - `problem`
  - `solution`
  - `firstOffer`
  - `idealCustomers`
  - `whyNow`
  - `futureExpansion`
  - `startupCost`
- Changed the primary continuation flow from a direct Architect transition to:
  - generate Execution Plan;
  - show ordered company-building steps;
  - start the first focused step.
- Separated company-generation loading from execution-planning loading.
- Execution Plan AI output now contains only generated content; IDs, ordering, status, timestamps and output references are created by the application.
- Returning from the current Architect now restores the Execution Plan.
- Regenerating or refining a company invalidates its previous Execution Plan.
- Kept proxy configuration environment-specific so Vercel connects directly.

### Security

- OpenAI credentials remain server-side.
- Proxy credentials and `.env.local` remain excluded from application code and Vercel.
- Client input and provider output are validated before entering application state.

## Initial prototype

### Added

- Landing page
- Skills form
- Business Direction generation
- Business Direction screen
- Architect transition screen
- Reusable React components
- TypeScript business-domain type
- Deterministic prototype generator
- Vercel deployment

### Deployment

- Production preview: https://onedaycompany.vercel.app/
