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

## First implementation milestone

Replace the current combined workspace-generation path with the three agent
contracts, persisted stage lifecycle, resumable failure handling and visible
progress while preserving the current public product behavior.
