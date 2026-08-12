# Workspace Generation Orchestrator Roadmap

## Completed — initial recoverable orchestration

- [x] Persist a company-scoped run and lifecycle for all dependency stages.
- [x] Execute Foundation, First Offer and Launch Planning in order.
- [x] Store validated partial outputs and sources.
- [x] Retry only failed or unfinished stages.
- [x] Assemble application-owned execution-plan state without overwriting v1.
- [x] Expose persisted progress to the completion screen.
- [x] Preserve the legacy execution-plan endpoint and generator.

## Next

- [ ] Apply migration 008 in each target Supabase environment, then set
  `WORKSPACE_GENERATION_ORCHESTRATOR_ENABLED=true` only after verification.
- [ ] Exercise the authenticated browser flow against a migrated database,
  including a failed stage and retry.
- [ ] Define canonical accepted Foundation and First Offer records with the
  Company State Agent before replacing legacy Company/Offer persistence.
- [ ] Add an explicit recovery entry from an already-created workspace if a
  user leaves while a run is failed.
