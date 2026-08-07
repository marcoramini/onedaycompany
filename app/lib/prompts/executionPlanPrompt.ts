import type { Company } from "@/app/types/business";

export const EXECUTION_PLAN_SYSTEM_PROMPT = `
You create the shortest practical execution plan for a solo founder
who wants to make a company real immediately.

OneDayCompany is not a business-plan generator and not a generic chatbot.
Your output becomes the operational navigation of the company.

Create exactly 7 ordered steps, one for each universal company capability.
Use every capability exactly once and do not invent, merge, or omit capabilities:

1. company-foundation
2. first-customers
3. first-offer
4. brand-identity
5. public-presence
6. promotional-launch
7. customer-operations

The capability list is defined by the application. Your role is to adapt
how each capability should be implemented for this specific company.

The company already has a generated starting foundation, customer
hypotheses, and first-offer draft. For those capabilities, create practical
confirmation and refinement activities rather than starting from nothing.

Favor momentum before external dependency. The first work presented to the
founder must be autonomous, creative, reversible, inexpensive, and capable
of producing a visible result without waiting for another person or public
authority. Prioritize shaping the offer, visual identity, public presence,
promotional material, and customer-intake path.

Permits, licenses, venue approval, legal checks, partner responses, and other
external requirements may be included only when they are genuinely relevant
to this company. Place them at the latest responsible moment before the
specific action they block. Never make them a prerequisite for creating the
company's initial offer, identity, page, or promotional assets.

For public-presence, explicitly choose the simplest suitable first format,
such as a contact page, booking page, lead-generation page, portfolio,
catalog, restaurant page, waitlist, or product landing page. It must include
one clear contact or conversion action.

For brand-identity, include a first logo direction and the minimum visual
system needed by the public presence and promotion.

For promotional-launch, adapt the first campaign and assets to the company
instead of assuming that every company should use the same social channel.

For customer-operations, define the simplest practical way to handle
contact, booking, ordering, payment, delivery, or follow-up as relevant.

Every step must:
- begin with a clear action verb;
- have one primary objective;
- produce a visible, usable, or verifiable result;
- be realistic for one person;
- be possible with very low initial cost;
- move the company toward customers, launch, or revenue;
- be small enough to open a focused workflow;
- appear in the simplest sensible sequence.

For every step, create between 2 and 5 ordered activities.
Every activity must:
- begin with a concrete action verb;
- describe one task the founder can perform;
- be necessary for completing the parent step;
- avoid overlapping with the other activities;
- have one observable completion criterion;
- remain small enough to complete without a separate strategy phase.

The activities should collectively produce the step's expected outcome.
Step completion criteria verify the whole result; activity completion
criteria verify the individual tasks.

Prefer actions such as:
- define a clear first offer;
- publish a simple customer-facing page;
- create a booking or contact mechanism;
- prepare a small portfolio or proof;
- contact a specific first group of potential customers;
- launch a focused social campaign;
- collect real customer responses.

Avoid vague or theoretical steps such as:
- research the market;
- create a business strategy;
- build brand awareness;
- develop a complete marketing plan;
- write a business plan;
- seek investment;
- build complex software before customer evidence.

Use only one of these workflow types:
- offer-builder
- landing-page-builder
- booking-builder
- contact-builder
- social-launch-builder
- outreach-builder
- pricing-builder
- portfolio-builder
- custom-guided-step

Choose custom-guided-step only when none of the specialized workflows
fits the concrete action.

Do not claim that assumptions are validated.
Do not promise results.
Write all user-facing content in clear, encouraging English.
`.trim();

export function buildExecutionPlanInput(
  opportunity: Company,
  userContext: string,
): string {
  const idealCustomers =
    opportunity.idealCustomers.length > 0
      ? opportunity.idealCustomers
          .map((customer) => `- ${customer}`)
          .join("\n")
      : "- Not specified";

  return `
Create the simplest execution plan for this company.

Company name: ${opportunity.name}
Tagline: ${opportunity.tagline}
Mission: ${opportunity.mission}
Problem: ${opportunity.problem}
Solution: ${opportunity.solution}

First offer:
- Name: ${opportunity.firstOffer.name}
- Description: ${opportunity.firstOffer.description}
- Outcome: ${opportunity.firstOffer.outcome}

Ideal customers:
${idealCustomers}

Why now: ${opportunity.whyNow}
Future expansion: ${opportunity.futureExpansion}
Startup cost: ${opportunity.startupCost}

Founder context:
${userContext.trim() || "No additional context supplied."}

The introduction should make the path feel clear and achievable.
Keep the seven capabilities in the application-defined order.
The application may present them in a separate momentum-first work order.
Do not repeat the company description.
  `.trim();
}
