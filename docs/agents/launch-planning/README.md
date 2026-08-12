# Launch Planning Agent

## Mission

Translate a validated company foundation and First Offer into the simplest
realistic path that moves the company toward launch, customers and revenue.

## Responsibilities

- implement every application-defined universal company capability;
- generate one company-specific step per capability;
- generate practical activities and completion criteria;
- keep the plan low-cost, coherent and momentum-first;
- report missing or contradictory Foundation and Offer inputs.

## Non-responsibilities

- adding, removing or renaming universal capability identifiers;
- assigning identifiers, ordering state, timestamps or completion status;
- rewriting Foundation or First Offer semantics;
- executing or marking activities complete.

## Inputs and outputs

Inputs are validated Foundation and First Offer proposals plus the
application-owned capability catalog. The output is a state-free
`LaunchPlanningProposal`, defined in `app/lib/launch-planning/contracts.ts`.
It contains an introduction and exactly seven steps with their practical
activities and observable completion criteria. The application assigns
identifiers, order, state, version and timestamps.

The canonical First Offer input is the state-free `FirstOfferProposal` defined
by `app/lib/first-offer/contracts.ts`. It supplies audience, desired outcome,
promise, scope, delivery, boundaries, an optional price hypothesis,
assumptions and Foundation impact warnings. The Launch Planning Agent must
consume these fields without rewriting them or treating hypotheses as facts.

## Authority and approval

The agent recommends a plan but cannot apply progress or overwrite completed
work. Regeneration must preserve application-owned state and follow explicit
impact and acceptance rules.

## First implementation milestone

The isolated generation boundary is complete. It deliberately leaves the
combined execution-plan generator, persistence flow and UI unchanged. The
Workspace Generation Orchestrator must invoke this module after Foundation and
First Offer and perform the state-owned assembly.
