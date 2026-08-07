# OneDayCompany — Chat Handoff

## Current state

The Company Workspace Home v1 graphical milestone is complete. The repository,
not prior chat history, is the first source of truth.

Communication with Marco is in Italian. Fixed public product copy is English.
OneDayCompany is not a generic chatbot and every screen should retain one clear
objective.

## Implemented flow

```text
Landing
  ↓
Guided Company Beginning
  ↓
One proposal at a time
  ├── Refine
  └── Try another direction
  ↓
Authentication
  ↓
Persist Company, Offer and Execution Plan
  ↓
/console/[companyId]
```

Authenticated users can maintain multiple companies, reopen the most recently
used one and permanently delete a company after explicit confirmation.

## Company Workspace Home v1

The Workspace contains:

- a company header with name, tagline, status and compact logo actions;
- deterministic Launch Readiness and a momentum-first recommendation;
- a two-column desktop layout with tasks on the left and progress on the right;
- task cards bound to persisted Execution Plan capabilities;
- percentage and completed-activity counts for each visible step;
- expandable activity lists with descriptions and `Done when` criteria;
- Foundation cards for Company and Customers;
- contextual `Refine step` and `Refine activity` entry points;
- a right-side refinement prototype showing current definition, company context
  and impact-awareness rules.

The visible task board currently excludes `brand-identity`; logo actions live in
the header. The capability remains in schemas and persisted plans until a later
architecture decision deliberately revises DEC-031.

## Execution model

There are seven canonical capabilities:

1. company foundation;
2. first customers;
3. first offer;
4. brand identity;
5. public presence;
6. promotional launch;
7. customer operations.

AI generates one implementation step and two to five activities for each
capability. The application owns identifiers, ordering, statuses, timestamps,
versioning and output references. Plans are persisted in Supabase.

The Workspace presents unfinished work in a separate momentum-first order:

```text
First offer → Brand → Public presence → Promotion
→ Customer operations → First customers → External requirements
```

External dependencies and bureaucracy must be introduced only when relevant
and at the latest responsible moment. They must not prevent early creative and
autonomous work.

## Persistence

Migrations:

- `001_auth_and_company_foundation.sql`
- `002_idempotent_company_creation.sql`
- `003_company_last_opened.sql`
- `004_execution_plan_persistence.sql`
- `005_execution_step_capabilities.sql`
- `006_correct_legacy_step_capabilities.sql`

Migrations 005 and 006 must be applied, in order, to databases that already
received migration 004. Migration 006 corrects ambiguous capability mappings
for legacy seven-step plans. Plan content and execution state are preserved.

## Refinement boundary

DEC-033 requires explicit user acceptance.

Future refinement flow:

1. user discusses one selected step or activity in a focused side panel;
2. AI returns a structured proposal, not a direct write;
3. the application identifies affected company data, steps, activities and
   published outputs;
4. a lower-impact alternative may be suggested;
5. the user reviews a complete diff;
6. only `Accept changes` applies the proposal transactionally;
7. affected completed or published outputs become explicit review items.

The current panel is visual only. `Generate change proposal` and
`Review changes` are intentionally disabled.

## Important files

```text
app/console/[companyId]/page.tsx
app/components/console/CompanyConsoleHeader.tsx
app/components/console/CompanyCapabilities.tsx
app/components/console/CompanyTaskBoard.tsx
app/components/console/CompanyJourney.tsx
app/components/console/CompanyOverview.tsx
app/components/console/CompanySwitcher.tsx
app/types/companyCapability.ts
app/lib/companyMomentum.ts
app/lib/executionPlanSchema.ts
app/lib/prompts/executionPlanPrompt.ts
app/lib/companies/companyQueries.ts
app/api/companies/companyExecutionPlanRepository.ts
app/lib/supabase/migrations/004_execution_plan_persistence.sql
app/lib/supabase/migrations/005_execution_step_capabilities.sql
app/lib/supabase/migrations/006_correct_legacy_step_capabilities.sql
```

## Recommended next sessions

Open a separate task for one coherent objective:

- structured refinement proposal and impact contract;
- first-offer workflow;
- public-presence workflow;
- logo workflow;
- promotion workflow;
- activity status mutation and real progress calculation.

Do not implement all workflows together. Run `npm run lint` and
`npm run build` before every push.
