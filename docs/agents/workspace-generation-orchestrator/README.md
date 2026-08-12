# Workspace Generation Orchestrator

## Mission

Run the specialized generation agents as one observable, recoverable workflow
and assemble a coherent workspace without hiding long-running work from the user.

## Responsibilities

- execute Foundation, First Offer and Launch Planning in dependency order;
- persist generation stage, attempts, timestamps and validated partial results;
- expose real progress events and product-specific user feedback;
- retry only the failed or invalidated stage when safe;
- assemble the workspace after all required outputs pass validation;
- preserve enough information to diagnose failure and resume generation.

## Non-responsibilities

- defining domain-agent prompts or semantic rules;
- accepting generated proposals on behalf of the user;
- becoming the general Company Orchestrator;
- hiding a failed stage behind simulated progress.

## Initial dependency graph

```text
Initial user context
  -> Company Foundation Agent
  -> First Offer Agent
  -> Launch Planning Agent
  -> validated workspace assembly
```

The first implementation is sequential because each stage consumes the prior
validated result. Parallel execution may be introduced only for genuinely
independent downstream work.

## State and feedback

Progress must represent persisted workflow state rather than elapsed-time
animation. At minimum each stage supports `pending`, `running`, `completed` and
`failed`, with attempt count and a safe user-facing status. Partial results are
drafts until the workspace reaches its defined acceptance transition.

## Current implementation milestone

The first implementation is available behind the existing authenticated company
creation flow. It preserves the selected legacy Company record and offer as the
user's existing acceptance transition; it does not reinterpret them through
the new domain agents. A persisted `workspace_generations` run then invokes
Foundation, First Offer and Launch Planning sequentially, retaining each
validated proposal as a draft stage result before assembling version 1 of the
Execution Plan.

`workspace_generation_stages` records `pending`, `running`, `completed` or
`failed`, attempt count, timestamps, safe error text, source and validated
partial result. Retrying resumes completed dependencies and reruns only the
failed or unfinished stage. Workspace assembly never overwrites an existing
version-1 plan.

The completion screen polls this persisted lifecycle; its labels are derived
from real stage state rather than elapsed-time animation. The old combined
`/api/execution-plan` path and its generator remain intact for compatibility.

Apply migration `008_workspace_generation.sql` after migrations 001–007 before
enabling this flow in an environment. The default remains the legacy path;
set `WORKSPACE_GENERATION_ORCHESTRATOR_ENABLED=true` only after applying the
migration and completing an authenticated end-to-end verification.
