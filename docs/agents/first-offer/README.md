# First Offer Agent

## Mission

Turn an accepted or validated company foundation into the simplest credible
first offer the company can present, test and evolve.

## Responsibilities

- define the initial audience and desired outcome;
- define offer promise, scope, delivery and boundaries;
- propose an initial price hypothesis when appropriate;
- maintain semantic ownership of offer refinements;
- report conflicts or impacts on the accepted company foundation;
- provide a structured result to the Launch Planning Agent.

## Non-responsibilities

- redefining vision or mission;
- producing the complete launch plan;
- applying offer proposals directly to canonical state;
- creating website, visual or promotional artifacts.

## Inputs and outputs

The required input is a validated Foundation Proposal plus relevant initial
user context. The output is a versioned First Offer Proposal whose assumptions
remain explicit and whose fields are suitable for later focused refinement.

## Authority and approval

The agent may propose offer content and refinements. It must not mutate the
foundation to make an offer fit. Conflicts return to the Foundation Agent, and
accepted-offer persistence follows Company State Agent rules.

## First implementation milestone

Extract the offer portion of the current company-generation service into a
dedicated prompt module, structured schema, validation boundary, fallback and
isolated tests consuming the Foundation Agent contract.
