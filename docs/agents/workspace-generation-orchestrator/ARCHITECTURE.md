# Workspace Generation Orchestrator Architecture

## Runtime flow

```text
selected persisted Company + durable user context
  -> workspace_generations run
  -> foundation stage (validated draft)
  -> first-offer stage (validated draft)
  -> launch-planning stage (validated draft)
  -> application-owned execution-plan assembly
  -> completed workspace
```

`app/lib/workspace-generation/orchestrator.ts` coordinates only dependency
order, persisted lifecycle and final assembly. It calls each specialist module
through its public generator and revalidates stored results through the
producer's schema before using them downstream.

## Persistence and recovery

Migration `008_workspace_generation.sql` creates one generation run per
company and four child stage records. The stage record owns lifecycle status,
attempt count, timestamps, safe failure text, generation source and the
validated draft result. It is protected by company ownership RLS.

Completed stages are reused on retry. A failed or unfinished stage is retried
without calling completed dependencies. Assembly checks for an existing
version-1 Execution Plan, so a retry cannot silently replace completed work.

## Feedback boundary

The authenticated route
`/api/companies/[companyId]/workspace-generation` has a GET read and a POST
run/retry operation. `CompleteCompanyClient` polls GET while POST performs the
sequential work. UI text maps only persisted stage state; no timer infers
progress.

## Compatibility boundary

The legacy Company persistence contract remains the initial user-selected
company record. Foundation and First Offer results are persisted as generation
drafts, not direct mutations of that accepted state. The legacy
`/api/execution-plan` route and generator remain available for compatibility,
but authenticated creation on this experimental branch always continues through
the Workspace Generation Orchestrator. Migration 008 is therefore required in
every environment that deploys this branch.
