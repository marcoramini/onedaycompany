# Workspace Generation Orchestrator Decisions

## WGO-001 — Existing company selection remains the acceptance transition

**Status:** Accepted for the initial integration

The specialized contracts do not contain the current Company persistence
fields such as name, slug and source proposal ID. The orchestrator therefore
runs only after the selected legacy Company has been saved. It stores the
specialist outputs as drafts and does not overwrite that record or the legacy
offer.

## WGO-002 — Progress is persisted stage state

**Status:** Accepted

The client may poll a generation run, but it may not infer progress from
elapsed time. A safe retry resumes completed dependencies and increments only
the stage that is run again.

## WGO-003 — Assembly is application-owned and idempotent

**Status:** Accepted

Launch Planning returns semantic positions only. The assembly layer associates
the canonical capability catalog and creates IDs, orders, timestamps and
`not_started` state. If execution-plan version 1 already exists, it is kept.
