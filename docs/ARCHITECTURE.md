# OneDayCompany — Architecture

## Architectural objective

OneDayCompany is an AI-assisted Entrepreneur Operating System. The product
method and durable application state control the experience; AI assists
bounded stages and never becomes the source of truth.

```text
Presentation
  ↓
Focused workflows
  ↓
Product method and domain contracts
  ↓
Application services
  ↓
AI adapters and persistence
```

## Current stack

- Next.js 16 App Router;
- React 19 and TypeScript;
- Tailwind CSS;
- Supabase authentication, PostgreSQL and Row Level Security;
- OpenAI Responses API with strict structured output;
- Zod validation;
- Vercel deployment;
- optional local `HTTP_PROXY` / `HTTPS_PROXY` support.

Relevant Next.js documentation in `node_modules/next/dist/docs` must be read
before changing framework-specific code.

## Current runtime flow

```text
Public landing
  ↓
Client-guided Company Beginning
  ↓
POST /api/business-opportunities
  ↓
Validated Company proposal
  ↓
Authentication
  ↓
POST /api/companies
  ├── persist Company and Offer
  └── generate and persist Execution Plan
  ↓
Server-rendered /console/[companyId]
  ↓
Client task-board interactions
```

## Company generation

```text
UI → businessOpportunitiesService
   → POST /api/business-opportunities
   → OpenAI adapter or deterministic fallback
   → strict JSON Schema
   → Zod Company contract
```

Company proposal refinement receives the existing proposal and preserves
unaffected strengths.

## Company persistence and ownership

Supabase owns durable authentication and company data. The server verifies the
authenticated user and company ownership for every private operation.

Current durable entities:

```text
profiles
companies
  ├── offers
  └── execution_plans
        └── execution_steps
              └── execution_activities
```

Foreign-key cascades support permanent company deletion. RLS prevents access
to another user's company state.

The selected Company is temporarily held only until authentication and initial
persistence complete. Once saved, database state is authoritative.

## Execution Plan

The application defines seven canonical capabilities. AI generates one
company-specific step per capability and two to five practical activities per
step.

AI owns generated content:

- plan introduction;
- step title, reason, expected outcome and workflow type;
- activity title, description and completion criterion;
- step completion criteria.

The application owns:

- capability set;
- identifiers and database relationships;
- execution ordering and momentum presentation ordering;
- status and timestamps;
- version and generation source;
- output references;
- progress calculation.

Existing persisted plans are never silently regenerated. Migration 005 maps
previous steps to capability identifiers without rewriting their content.

## Company Workspace composition

`app/console/[companyId]/page.tsx` is a Server Component. It authenticates,
loads owned data and composes the Workspace.

```text
ConsoleShell
├── ConsoleSidebar / ConsoleMobileHeader
└── Company Workspace
    ├── CompanyConsoleHeader
    └── CompanyCapabilities
        ├── LaunchProgress
        ├── CompanyTaskBoard (client boundary)
        ├── CompanyOverview (server-rendered slot)
        └── CompanyJourney (server-rendered slot)
```

`CompanyTaskBoard` is the narrow client boundary responsible for card
expansion and the refinement-panel prototype. Data fetching and secrets remain
server-side.

The task board hides `brand-identity` from its card list because logo actions
currently live in the header. The canonical capability is intentionally still
preserved in schemas and persisted plans.

## Momentum-first navigation

Canonical capability identity is separate from presentation priority.
`app/lib/companyMomentum.ts` chooses the next unfinished work in this order:

```text
First offer → Brand identity → Public presence → Promotion
→ Customer operations → First customers → Company foundation
```

This prevents old or newly generated bureaucratic requirements from becoming
the first emotional experience. External dependencies remain visible when
relevant but are deferred to the latest responsible moment.

## AI-assisted refinement target architecture

The current side panel is presentation only. The target boundary is:

```text
Focused refinement request
  ↓
Server-side company context assembly
  ↓
LLM structured proposal
  ↓
Zod validation
  ↓
Application impact analysis
  ↓
User-visible diff and lower-impact alternative
  ↓
Explicit Accept changes
  ↓
Transactional write + version + needs_review markers
```

The LLM never applies the proposal. Application code validates dependencies
and owns the transaction. Completed or published outputs cannot be silently
overwritten.

## Focused tool architecture

Substantial product capabilities are documented as focused tools under
`docs/tools/`. A tool may begin inside the current modular application and be
extracted only when operational scale or ownership requires it. Separate
documentation does not imply a separate deploy or microservice.

The first documented tool is the Website Agent:

```text
Company context + selected site revision
  ↓
Focused Website Agent
  ├── typed site operations
  └── structured briefs → Visual Asset Agent
  ↓
Schema and policy validation
  ↓
Preview and user acceptance
  ↓
Immutable site version
  ↓
Shared public renderer
```

Templates and React components remain application-controlled. The persisted
source of truth is a versioned site document, not model-generated source code
or exported HTML. The first renderer lives in the OneDayCompany Next.js deploy
and later supports path previews, OneDayCompany subdomains and verified custom
domains without requiring user-managed hosting.

## Shared Visual Asset Agent

Visual production is a shared tool rather than an internal Website Agent
module:

```text
Website Agent ───────┐
Promotion Agent ─────┼→ Visual Asset Agent → durable company assets
Logo workflow ───────┘
```

Consumer tools describe the business purpose and required placement. The
Visual Asset Agent owns provider-independent generation, composition, variants,
metadata and storage. Consumers receive stable asset references and never
depend on temporary provider URLs or provider-specific response formats.

## Network and secrets

```text
Local development
Next.js → optional HTTP(S) proxy → corporate network → providers

Vercel
Next.js → direct HTTPS → providers
```

- Secrets remain server-side.
- `.env`, `.env.local` and proxy credentials are never committed.
- Shared clients remain the single provider connection layer.
- Local proxy configuration must not be copied to Vercel.

## Database migrations

```text
001_auth_and_company_foundation.sql
002_idempotent_company_creation.sql
003_company_last_opened.sql
004_execution_plan_persistence.sql
005_execution_step_capabilities.sql
006_correct_legacy_step_capabilities.sql
```

Migration 006 corrects seven-step legacy plans whose generic workflow types
were ambiguously mapped by migration 005.

Database migrations are not automatically applied by the application. Apply
them deliberately to each Supabase environment.

## Quality gates

Before every push:

```bash
npm run lint
npm run build
git diff --check
```

A milestone is complete only when public copy remains English, responsive
behavior is coherent, errors preserve user work, relevant documentation is
updated and deployment is verified.

## Guardrails

- Repository code is the first source of truth.
- Do not build a generic chatbot.
- One screen should retain one primary objective.
- Do not pass raw provider output into domain state.
- Do not let AI own IDs, progress, statuses or writes.
- Do not overwrite completed or published work silently.
- Do not broaden a focused workflow into a general agent system.
- Do not revise accepted decisions without updating `DECISIONS.md`.
