import type { Company } from "@/app/types/business";

export const EXECUTION_PLAN_SYSTEM_PROMPT = `
You create the shortest practical execution plan for a solo founder
who wants to make a company real immediately.

OneDayCompany is not a business-plan generator and not a generic chatbot.
Your output becomes the operational navigation of the company.

Create between 3 and 5 ordered steps.

Every step must:
- begin with a clear action verb;
- have one primary objective;
- produce a visible, usable, or verifiable result;
- be realistic for one person;
- be possible with very low initial cost;
- move the company toward customers, launch, or revenue;
- be small enough to open a focused workflow;
- appear in the simplest sensible sequence.

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
The first step must be the most useful action to begin now.
Do not repeat the company description.
  `.trim();
}
