# Company Foundation Agent

## Mission

Turn the user's initial context into a coherent proposed foundation for a
company they can be proud to build, and remain the semantic owner of that
foundation as the company evolves.

## Responsibilities

- propose the company purpose, vision and mission;
- define the initial company concept and foundational value proposition;
- distinguish user evidence from generated assumptions;
- preserve the strongest accepted elements during refinement;
- identify downstream impacts when the foundation changes;
- provide a structured, validated result to dependent agents.

## Non-responsibilities

- specifying the complete First Offer;
- generating launch steps or activities;
- applying proposals directly to canonical company state;
- deciding visual identity, website content or promotional execution.

## Inputs and outputs

The primary input is the durable initial user context. The output is a
versioned Foundation Proposal with purpose, vision, mission, company concept,
foundational value proposition, assumptions and provenance.

The First Offer Agent and Launch Planning Agent consume only a validated
Foundation Proposal. The Company State Agent records it after the applicable
acceptance transition.

## Authority and approval

The agent may generate and refine proposals. It cannot silently replace an
accepted foundation. Material changes require explicit acceptance and an impact
set covering at least offer, launch plan, website and visual identity.

## First implementation milestone

Extract the foundation portion of the current company-generation service into
a dedicated prompt module, structured schema, validation boundary, fallback and
isolated tests without changing the overall workspace endpoint.
