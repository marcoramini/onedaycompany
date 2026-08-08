# OneDayCompany — Changelog

All notable project changes should be recorded here.

The format is intentionally lightweight.

## Unreleased

### Added

- Dedicated `docs/tools` documentation convention for focused product tools.
- Initial Website Agent product, architecture, decision and roadmap dossier.
- Initial Visual Asset Agent dossier and shared visual-capability boundary.

- Guided Company Beginning that starts from interests, experience, knowledge, imagination or something the user wants to create.
- One-company-at-a-time generation through a server-side Next.js API route.
- Guided proposal refinement with quick suggestions and free-text direction.
- Dedicated company creation loading with rotating progress messages.
- Structured Execution Plan generation after the user chooses a company.
- Execution Plan contract with seven ordered, capability-bound steps.
- Workflow-type routing metadata for each execution step.
- Structured activities with completion criteria inside every execution step.
- Persistent Execution Plans, steps, and activities attached to saved companies.
- Workspace current-activity card and progress timeline driven by persisted execution state.
- Canonical seven-capability company model and capability-centered Workspace cards.
- Deterministic launch-readiness summary with Public Presence as the initial visual focus.
- Momentum-first current activity and progress ordering for both new and persisted plans.
- Current activity and company progress moved beside the capability cards below Launch Readiness.
- Execution Plan generation constrained to one implementation step for each universal capability.
- Dedicated `ExecutionPlanScreen`.
- Dedicated `ExecutionPlanLoading` transition.
- Deterministic fallback generation for both companies and execution plans.
- Shared OpenAI client with optional `HTTP_PROXY` or `HTTPS_PROXY` support.
- Strict JSON Schema and Zod validation for AI-generated application data.
- Generation source metadata: `ai` or `fallback`.
- Authenticated multi-company Workspace with permanent company deletion.
- Capability task board with expandable persisted activities and completion criteria.
- Per-step percentage bars in `Your progress`.
- Compact logo actions in the company header.
- Contextual `Refine step` and `Refine activity` entry points.
- Impact-aware refinement side-panel prototype with explicit-acceptance guardrail.
- Corrective legacy capability migration with plan-level capability uniqueness.

### Changed

- Reframed the public-presence milestone as a template-driven Website Agent
  with structured, previewable changes instead of a visual page builder.
- Moved logo, website imagery and campaign creative generation from the
  Website Agent into a shared Visual Asset Agent and paused Website Agent
  implementation until the shared asset contract is defined.

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
- Replaced the linear current-activity presentation with user-selectable task cards.
- Replaced large card actions with compact text links.
- Applied momentum-first presentation without rewriting persisted plans.
- Required AI refinements to remain proposals until explicit `Accept changes`.

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
