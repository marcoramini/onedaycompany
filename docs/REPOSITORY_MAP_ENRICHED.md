# OneDayCompany — Repository Map

The repository is the first source of truth. This map covers the active product
surface and omits generated folders, secrets and legacy context snapshots.

## Product routes

```text
app/page.tsx                         Public creation flow
app/sign-in/page.tsx                 Returning-user authentication
app/company/complete/page.tsx        Persist selected company after auth
app/console/page.tsx                 Open most recently used company
app/console/[companyId]/page.tsx     Company Workspace composition
app/console/new/page.tsx             New-company Console entry
```

## Public creation flow

```text
app/components/Landing.tsx
app/components/CompanyBeginning.tsx
app/components/CompanyCreationLoading.tsx
app/components/BusinessOpportunitiesScreen.tsx
app/components/OpportunityCard.tsx
app/components/RefinementDrawer.tsx
```

Generation pipeline:

```text
app/api/business-opportunities/route.ts
app/lib/businessOpportunitiesService.ts
app/lib/businessOpportunitiesSchema.ts
app/lib/aiBusinessOpportunitiesGenerator.ts
app/lib/fallbackBusinessGenerator.ts
app/lib/prompts/businessOpportunitiesPrompt.ts
app/types/business.ts
```

## Company Workspace

```text
app/components/console/ConsoleShell.tsx
app/components/console/ConsoleSidebar.tsx
app/components/console/ConsoleMobileHeader.tsx
app/components/console/ConsoleNavigation.tsx
app/components/console/CompanySwitcher.tsx
app/components/console/CompanyConsoleHeader.tsx
app/components/console/CompanyCapabilities.tsx
app/components/console/CompanyTaskBoard.tsx
app/components/console/CompanyJourney.tsx
app/components/console/CompanyOverview.tsx
app/components/console/OpenedCompanyTracker.tsx
```

- `CompanyConsoleHeader`: company identity, status and logo-action shell.
- `CompanyCapabilities`: launch progress and two-column composition.
- `CompanyTaskBoard`: task cards, activities and refinement-panel prototype.
- `CompanyJourney`: per-step persisted activity progress.
- `CompanyOverview`: Company and Customers foundation context.
- `CompanySwitcher`: multi-company navigation and permanent deletion.

## Execution Plans and capabilities

```text
app/types/companyCapability.ts
app/lib/companyMomentum.ts
app/lib/executionPlanSchema.ts
app/lib/createExecutionPlan.ts
app/lib/executionPlanService.ts
app/lib/aiExecutionPlanGenerator.ts
app/lib/fallbackExecutionPlanGenerator.ts
app/lib/prompts/executionPlanPrompt.ts
app/components/ExecutionPlanLoading.tsx
app/components/ExecutionPlanScreen.tsx
app/api/execution-plan/route.ts
```

The application defines seven capabilities and owns execution state. AI adapts
their implementation. `companyMomentum.ts` controls Workspace presentation
priority separately from persisted step ordering.

## Company APIs and persistence

```text
app/api/companies/route.ts
app/api/companies/[companyId]/route.ts
app/api/companies/[companyId]/open/route.ts
app/api/companies/companyRepository.ts
app/api/companies/companyExecutionPlanRepository.ts
app/api/companies/companyPersistenceSchema.ts
app/api/companies/companySlug.ts
app/api/companies/pendingCompany.ts
app/lib/companies/companyQueries.ts
app/lib/companies/companySwitcher.ts
```

- `POST /api/companies` persists Company, Offer and initial Execution Plan.
- `DELETE /api/companies/[companyId]` verifies ownership and deletes the
  company; database cascades remove dependent state.
- `POST /api/companies/[companyId]/open` records recency.

## Authentication and provider boundaries

```text
app/lib/supabase/client.ts
app/lib/supabase/server.ts
app/lib/supabase/proxy.ts
app/auth/callback/route.ts
app/auth/signout/route.ts
proxy.ts
app/lib/openai.ts
app/lib/network/serverFetch.ts
app/api/openai-health/route.ts
```

Provider calls remain server-side. Local proxy support is optional and must not
be copied to Vercel.

## Migrations

```text
app/lib/supabase/migrations/001_auth_and_company_foundation.sql
app/lib/supabase/migrations/002_idempotent_company_creation.sql
app/lib/supabase/migrations/003_company_last_opened.sql
app/lib/supabase/migrations/004_execution_plan_persistence.sql
app/lib/supabase/migrations/005_execution_step_capabilities.sql
app/lib/supabase/migrations/006_correct_legacy_step_capabilities.sql
```

Apply migrations deliberately to each environment. Migrations 005 and 006
upgrade an environment where migration 004 was already applied; 006 corrects
ambiguous legacy mappings without changing plan content or state.

## Current UI-only placeholders

- logo upload, generation and editing;
- contextual step/activity refinement generation;
- impact review and `Accept changes`;
- dedicated capability workflow routing;
- activity completion mutations and real launch-readiness recalculation.

## Documentation authority

```text
docs/PROJECT_BRIEF.md
docs/DECISIONS.md
docs/ARCHITECTURE.md
docs/PRODUCT_METHOD.md
docs/ROADMAP.md
docs/CHAT_HANDOFF.md
docs/CHANGELOG.md
```

## Quality commands

```bash
npm run lint
npm run build
git diff --check
```
