# Launch Planning Agent Decisions

## LPA-001 — Plan semantics are state-free

**Status:** Accepted

The agent emits only an introduction, seven semantic steps, activities and
completion criteria. The application owns identifiers, ordering, status,
timestamps, versions, generation source, output references and progress.

## LPA-002 — Capability coverage is application-constrained

**Status:** Accepted

The contract derives its exact seven-step length from the existing application
capability catalog and requires the model to return the corresponding fixed
sequence. Capability association is applied by the application after validation;
the model never emits a canonical capability identifier or defines the catalog.

## LPA-003 — Inputs are immutable validated proposals

**Status:** Accepted

Both Foundation and First Offer are revalidated at the module boundary. Launch
Planning may plan confirmation or refinement work around them but cannot
rewrite their semantics or turn their assumptions into facts.

## LPA-004 — The milestone is non-invasive

**Status:** Accepted

The new boundary does not replace the existing generator, persistence path,
or UI. Sequential invocation, lifecycle persistence and workspace assembly are
owned by the Workspace Generation Orchestrator.
