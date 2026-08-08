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
application-owned capability catalog. The output contains semantic plan content
only. The application assigns identifiers, state, version and timestamps.

## Authority and approval

The agent recommends a plan but cannot apply progress or overwrite completed
work. Regeneration must preserve application-owned state and follow explicit
impact and acceptance rules.

## First implementation milestone

Extract the execution-plan generation from the current combined flow into a
dedicated prompt, structured schema, validation boundary, fallback and isolated
tests consuming Foundation and First Offer contracts.
