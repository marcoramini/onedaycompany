# OneDayCompany — Repository Map

This document is the practical index of the current repository.

Use it together with:

- `docs/PROJECT_BRIEF.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/CHAT_HANDOFF.md`

The repository code remains the first source of truth.

---

## 1. Current product flow

```text
Landing
  ├── Start my company
  │     ↓
  │   Guided Company Beginning
  │     ↓
  │   Company proposal
  │     ├── Refine
  │     ├── Try another direction
  │     └── Choose Company
  │           ↓
  │         Google authentication
  │           ↓
  │         Persist Company and first Offer
  │           ↓
  │         /console/[companyId]
  │
  └── Sign in
        ↓
      /console
        ↓
      Most recently opened Company
        ↓
      /console/[companyId]
```

The Console is becoming the permanent operating environment of the Company.

---

## 2. Current milestone

### Milestone 3B.0.3 — Console Shell

The next coherent milestone is to rebuild the Console structure cleanly.

Required outcome:

- desktop sidebar;
- mobile header;
- integrated Company switcher;
- central content area;
- user account area;
- plan and credits placeholders;
- logout;
- responsive behavior;
- minimal `app/console/[companyId]/page.tsx`;
- no new tables;
- no new AI calls;
- no generated images yet.

The current Console page has been modified incrementally and should be refactored rather than patched further.

---

## 3. Repository structure

### Root

#### `AGENTS.md`

Instructions for coding agents working on the repository.

#### `CLAUDE.md`

Project context or instructions intended for Claude-based collaboration.

#### `INTEGRATION.md`

Integration notes. Confirm whether it still reflects the current Supabase and authentication architecture.

#### `README.md`

Repository-level introduction.

#### `REPOSITORY_MAP.md`

This file. Regenerate and update it when the project structure changes materially.

#### `eslint.config.mjs`

ESLint configuration.

#### `next.config.ts`

Next.js configuration.

#### `next-env.d.ts`

Next.js generated TypeScript declarations. Do not edit manually.

#### `package.json`

Application scripts and dependencies.

Important current dependencies include Next.js, React, TypeScript, Supabase SSR/Auth and the AI provider client.

#### `package-lock.json`

Locked npm dependency graph.

#### `postcss.config.mjs`

PostCSS configuration used by Tailwind CSS.

#### `proxy.ts`

Next.js 16 root Proxy entry point.

Delegates session refresh and protected-route handling to the Supabase proxy helper.

#### `tsconfig.json`

TypeScript configuration.

---

## 4. Application entry points

### `app/layout.tsx`

Root application layout.

Owns global metadata, document structure and global styling integration.

### `app/page.tsx`

Client-side coordinator for the new-Company creation flow.

Current responsibilities include:

- Landing;
- Guided Company Beginning;
- Company generation;
- proposal refinement;
- alternative direction generation;
- temporary Company selection state;
- authentication transition.

This file should not absorb Console UI.

### `app/globals.css`

Global CSS and Tailwind imports.

### `app/favicon.ico`

Application favicon.

---

## 5. Landing and Company Beginning

### `app/components/Landing.tsx`

Public landing page.

Current public actions:

- `Start my company`
- `Sign in`

Fixed product copy must remain in English.

### `app/components/CompanyBeginning.tsx`

Short, encouraging, non-evaluative starting interaction.

Collects the context used to shape the first Company proposal.

### `app/components/CompanyCreationLoading.tsx`

Loading experience shown while generating or refining a Company.

Uses product-specific progress language rather than generic AI terminology.

### `app/components/BusinessOpportunitiesScreen.tsx`

Displays the current Company proposal and available decisions.

### `app/components/OpportunityCard.tsx`

Presents the generated Company proposal.

### `app/components/RefinementDrawer.tsx`

Guided refinement interface.

Supports suggestions and free-text refinement without becoming a generic chatbot.

### `app/components/ResultCard.tsx`

Legacy or secondary result component.

Confirm whether it is still referenced. Remove only after repository search and build verification.

---

## 6. Company proposal generation

### `app/api/business-opportunities/route.ts`

Server API endpoint for Company proposal generation.

### `app/lib/businessOpportunitiesService.ts`

Client-side request service for the Company-generation API.

### `app/lib/businessOpportunitiesSchema.ts`

Zod contracts and types for generated Company data.

### `app/lib/aiBusinessOpportunitiesGenerator.ts`

Provider-facing AI generation implementation.

### `app/lib/fallbackBusinessGenerator.ts`

Deterministic fallback Company generator.

### `app/lib/prompts/businessOpportunitiesPrompt.ts`

Prompt module for Company generation and refinement.

### `app/types/business.ts`

Core application business types, including the generated `Company` model.

---

## 7. Execution Plan — implemented but no longer the immediate focus

### `app/api/execution-plan/route.ts`

Server API endpoint for Execution Plan generation.

### `app/lib/executionPlanService.ts`

Client-side Execution Plan request service.

### `app/lib/executionPlanSchema.ts`

Execution Plan contracts and application-managed execution state.

### `app/lib/aiExecutionPlanGenerator.ts`

AI implementation for Execution Plan content.

### `app/lib/fallbackExecutionPlanGenerator.ts`

Deterministic fallback Execution Plan.

### `app/lib/prompts/executionPlanPrompt.ts`

Execution Plan prompt module.

### `app/components/ExecutionPlanLoading.tsx`

Dedicated planning transition.

### `app/components/ExecutionPlanScreen.tsx`

Execution Plan presentation.

### `app/components/Architect.tsx`

Current placeholder destination for a focused execution workflow.

### `app/components/ArchitectStep.tsx`

Supporting component for the existing Architect placeholder.

The Execution Plan code should be preserved. It will later become part of the persistent Company Console rather than remain only in client memory.

---

## 8. Authentication

### `app/sign-in/page.tsx`

Returning-user entry page.

Redirects authenticated users to `/console`; otherwise renders the Google sign-in experience.

### `app/components/auth/SignInScreen.tsx`

Returning-user Google OAuth screen.

Uses:

```text
/auth/callback?next=/console
```

### `app/components/auth/SaveCompanyScreen.tsx`

Authentication screen shown after the user chooses a new Company.

Uses:

```text
/auth/callback?next=/company/complete
```

### `app/auth/callback/route.ts`

OAuth callback Route Handler.

Responsibilities:

- handle provider errors;
- validate the internal `next` path;
- exchange the PKCE code for a Supabase session;
- redirect to the intended application route.

### `app/auth/error/page.tsx`

Authentication error page.

### `app/auth/signout/route.ts`

Server-side sign-out Route Handler.

### `app/company/complete/page.tsx`

Protected post-authentication page for a newly selected Company.

### `app/company/complete/CompleteCompanyClient.tsx`

Reads the temporary pending Company, sends it to the persistence API, clears temporary browser state and redirects to the persistent Console.

---

## 9. Supabase and server networking

### `app/lib/supabase/client.ts`

Browser Supabase client.

### `app/lib/supabase/server.ts`

Server Supabase client using cookies and `@supabase/ssr`.

Uses the custom server-side fetch when required by the local corporate network.

### `app/lib/supabase/proxy.ts`

Supabase session refresh and protected-route support used by root `proxy.ts`.

### `app/lib/network/serverFetch.ts`

Server-side `fetch` implementation using `undici` and `EnvHttpProxyAgent`.

Purpose:

```text
Next.js server
  ↓
HTTP_PROXY / HTTPS_PROXY
  ↓
local CNTLM or proxy bridge
  ↓
corporate proxy
  ↓
Supabase
```

This local proxy support must remain conditional.

Do not configure local proxy values on Vercel.

### `app/api/openai-health/route.ts`

Health endpoint for testing OpenAI connectivity.

### `app/lib/openai.ts`

Shared OpenAI client.

Uses optional proxy support and remains the single provider connection layer.

---

## 10. Company persistence

### `app/api/companies/route.ts`

Authenticated API endpoint that validates and persists a selected Company.

### `app/api/companies/companyPersistenceSchema.ts`

Server-owned validation contract for the pending Company payload.

### `app/api/companies/companyRepository.ts`

Persistence logic for:

- idempotent Company creation;
- initial Offer creation;
- existing Company lookup;
- collision-safe retries.

### `app/api/companies/companySlug.ts`

Creates readable, collision-resistant Company slugs.

### `app/api/companies/pendingCompany.ts`

Temporary browser-session Company storage helper.

Confirm whether this file should remain under `app/api/companies` or move to `app/lib/companies`; it is a client-side/application helper rather than an API Route Handler.

### `app/api/companies/[companyId]/open/route.ts`

Authenticated endpoint that updates `last_opened_at` for the active Company.

---

## 11. Company Console

### `app/console/page.tsx`

Stable Console entry point.

Responsibilities:

- require authentication;
- find the most recently opened Company;
- redirect to `/console/[companyId]`;
- show an empty-workspace state when the user has no Company.

### `app/console/[companyId]/page.tsx`

Loads and composes the active Company Console.

Current issue:

- the file has been modified repeatedly;
- it contains or recently contained unused imports and state;
- it should be rewritten as a small server-side composition page during Milestone 3B.0.3.

Intended responsibilities after refactor:

- authenticate;
- load the active Company;
- verify ownership;
- load the initial Offer;
- load the user's Company list;
- prepare user identity;
- compose Console components.

It should not contain the full Console UI.

### `app/console/[companyId]/not-found.tsx`

Non-disclosing unavailable-Company page.

Does not reveal whether the Company does not exist or belongs to another user.

---

## 12. Console components

### `app/components/console/ConsoleShell.tsx`

Intended top-level Console layout.

Should own:

- desktop/sidebar layout;
- mobile structure;
- central content container.

### `app/components/console/ConsoleSidebar.tsx`

Intended main Console navigation.

Expected sections:

```text
Home

FOUNDATION
Identity
Offer
Customers
Strategy
Brand

EXECUTION
Tasks
Documents
Assets

GROWTH
Website
Marketing
Sales

SETTINGS
Plan & Billing
Credits & Usage
Account
```

Only `Home` needs to be active in the first Console Shell milestone.

### `app/components/console/CompanyConsoleHeader.tsx`

Header for the active Company.

Displays real Company identity data and status.

### `app/components/console/CompanySwitcher.tsx`

Client component for switching between the user's Companies without losing the session.

Also provides:

```text
Start another company
```

### `app/components/console/OpenedCompanyTracker.tsx`

Client-side non-blocking tracker that updates the active Company's `last_opened_at`.

This enables `/console` to reopen the most recently used Company.

---

## 13. Company query helpers

### `app/lib/companies/companyQueries.ts`

Server-side Company queries.

Current responsibilities include:

- list all Companies owned by the authenticated user;
- find the most recently opened Company.

### `app/lib/companies/companySwitcher.ts`

Types and database-to-view-model mapping for CompanySwitcher.

---

## 14. Database migrations

The repository map currently reports these paths:

```text
supabase/migrations/001_auth_and_company_foundation.sql
supabase/migrations/002_idempotent_company_creation.sql
supabase/migrations/003_company_last_opened.sql
```

The migrations now use the intended standard repository location.

Preferred standard location:

```text
supabase/migrations/001_auth_and_company_foundation.sql
supabase/migrations/002_idempotent_company_creation.sql
supabase/migrations/003_company_last_opened.sql
```

The accidental nested path has been corrected. Keep future migrations in this directory.

### `001_auth_and_company_foundation.sql`

Introduces the initial persistence foundation:

- profiles;
- companies;
- offers;
- timestamps;
- ownership;
- Row Level Security;
- profile creation.

### `002_idempotent_company_creation.sql`

Adds protection against duplicate Company and Offer creation.

### `003_company_last_opened.sql`

Adds `last_opened_at` and its owner-ordering index.

---

## 15. Documentation

### `docs/PROJECT_BRIEF.md`

Product mission, vision, target user, product promise and current direction.

Currently behind the implemented authentication, persistence and Console work. It will be rewritten after Console Shell verification.

### `docs/DECISIONS.md`

Durable product and architecture decisions.

Current decisions cover the Guided Company Beginning, structured AI generation, refinement and Execution Plan.

Needs new accepted decisions for:

- authentication after Company commitment;
- Supabase foundation;
- multiple Companies per user;
- returning-user access;
- Console as the permanent operating environment;
- persistent Company assets;
- branded OAuth before production;
- external media-generation service.

### `docs/ROADMAP.md`

Milestone status.

Currently behind the implemented persistence and Console milestones.

Will be rewritten after Milestone 3B.0.3.

### `docs/CHAT_HANDOFF.md`

Current session handoff.

Currently reflects an earlier Execution Plan milestone and must be replaced after the Console Shell is stable.

### `docs/ARCHITECTURE.md`

Technical architecture.

Review after Console Shell and persistence boundaries are stable.

### `docs/VISION.md`

Long-form product vision.

### `docs/PRODUCT_METHOD.md`

Product methodology and workflow principles.

### `docs/AI_METHOD.md`

AI usage, contracts, prompts and provider independence.

### `docs/AI_COLLABORATION.md`

Rules for collaborating with AI during development.

### `docs/BUSINESS_PLAN.md`

Business plan documentation.

### `docs/ECONOMIC_MODEL.md`

Usage limits, credits, pricing and cost-control model.

Relevant to future Console sections:

- Plan & Billing;
- Credits & Usage.

### `docs/CHANGELOG.md`

Project change history.

Update after a coherent milestone is verified.

### `docs/START_HERE.md`

Checklist for starting and closing development sessions.

### `docs/SESSION_TEMPLATE.md`

Template for milestone-based sessions.

### `docs/README_DOCS.md`

Documentation index.

---

## 16. Public assets

### `public/file.svg`
### `public/globe.svg`
### `public/next.svg`
### `public/vercel.svg`
### `public/window.svg`

Default or placeholder public assets.

Review and remove unused defaults only after repository search and build verification.

---

## 17. Sensitive and generated files

The generated raw map included:

```text
.env
.env.local
```

These files must never be uploaded, committed or included in a shared repository map.

The repository-map generation script should exclude:

```text
node_modules
.next
.git
out
dist
.env
.env.*
```

Keep only a safe `.env.example` in version control when needed.

---

## 18. Source-of-truth order

1. Current repository code
2. `docs/DECISIONS.md`
3. `docs/PROJECT_BRIEF.md`
4. `docs/ARCHITECTURE.md`
5. `docs/ROADMAP.md`
6. `docs/CHAT_HANDOFF.md`
7. Previous chat context

Because the documentation is currently behind the repository, the code is especially important until the post-Console documentation rewrite is complete.

---

## 19. Files to include in the next chat

For Milestone 3B.0.3, include:

```text
REPOSITORY_MAP.md

docs/PROJECT_BRIEF.md
docs/DECISIONS.md
docs/ROADMAP.md
docs/CHAT_HANDOFF.md

app/console/page.tsx
app/console/[companyId]/page.tsx
app/console/[companyId]/not-found.tsx

app/components/console/ConsoleShell.tsx
app/components/console/ConsoleSidebar.tsx
app/components/console/CompanyConsoleHeader.tsx
app/components/console/CompanySwitcher.tsx
app/components/console/OpenedCompanyTracker.tsx

app/lib/companies/companyQueries.ts
app/lib/companies/companySwitcher.ts

app/lib/supabase/server.ts
app/lib/supabase/proxy.ts
app/lib/network/serverFetch.ts

app/auth/signout/route.ts
proxy.ts
package.json
```

Also include the current migration file for `last_opened_at` if database behavior needs to be reviewed.

---

## 20. Immediate next task

### Milestone 3B.0.3 — Console Shell

1. Inspect the current Console code.
2. Define the final minimal component boundaries.
3. Rewrite `app/console/[companyId]/page.tsx`.
4. Complete `ConsoleShell`.
5. Complete `ConsoleSidebar`.
6. Integrate CompanySwitcher.
7. Add account, plan and logout areas.
8. Verify desktop and mobile behavior.
9. Run:

```bash
npm run lint
npm run build
```

10. Only after verification, rewrite the central project documentation.
