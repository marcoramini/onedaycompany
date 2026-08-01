import type { Company } from "@/app/types/business";

import {
  businessOpportunitiesResponseSchema,
  type CompanyOutput,
} from "./businessOpportunitiesSchema";
import { openai } from "./openai";
import { BUSINESS_OPPORTUNITIES_SYSTEM_PROMPT } from "./prompts/businessOpportunitiesPrompt";

const BUSINESS_OPPORTUNITIES_JSON_SCHEMA = {
  type: "object",
  properties: {
    company: {
      type: "object",
      properties: {
        id: {
          type: "string",
          minLength: 1,
          maxLength: 80,
          pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
          description:
            "A short unique lowercase kebab-case identifier.",
        },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 120,
          description:
            "A memorable and credible company name.",
        },
        tagline: {
          type: "string",
          minLength: 1,
          maxLength: 180,
          description:
            "A concise customer-facing promise.",
        },
        mission: {
          type: "string",
          minLength: 1,
          maxLength: 500,
          description:
            "Why this company exists and the change it wants to create.",
        },
        problem: {
          type: "string",
          minLength: 1,
          maxLength: 500,
          description:
            "The concrete problem experienced by the target customer.",
        },
        solution: {
          type: "string",
          minLength: 1,
          maxLength: 500,
          description:
            "How the company solves the problem in a simple, distinctive way.",
        },
        firstOffer: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 120,
              description:
                "A clear and sellable name for the first offer.",
            },
            description: {
              type: "string",
              minLength: 1,
              maxLength: 500,
              description:
                "What the customer receives and how the offer works.",
            },
            outcome: {
              type: "string",
              minLength: 1,
              maxLength: 300,
              description:
                "The concrete result the customer should receive.",
            },
          },
          required: [
            "name",
            "description",
            "outcome",
          ],
          additionalProperties: false,
        },
        idealCustomers: {
          type: "array",
          minItems: 2,
          maxItems: 4,
          items: {
            type: "string",
            minLength: 1,
            maxLength: 160,
          },
          description:
            "Specific customer groups the user could identify and contact.",
        },
        whyNow: {
          type: "string",
          minLength: 1,
          maxLength: 500,
          description:
            "Why this company is relevant in the current world.",
        },

        futureExpansion: {
          type: "string",
          minLength: 1,
          maxLength: 400,
          description:
            "One concise description of how the company could expand later.",
        },
        startupCost: {
          type: "string",
          enum: [
            "very-low",
            "low",
            "moderate",
          ],
          description:
            "The realistic initial capital required to launch.",
        },
      },
      required: [
        "id",
        "name",
        "tagline",
        "mission",
        "problem",
        "solution",
        "firstOffer",
        "idealCustomers",
        "whyNow",
        "futureExpansion",
        "startupCost",
      ],
      additionalProperties: false,
    },
  },
  required: ["company"],
  additionalProperties: false,
} as const;

function formatCompanyForPrompt(
  company: Company,
): string {
  return `
Name: ${company.name}
Tagline: ${company.tagline}
Mission: ${company.mission}
Problem: ${company.problem}
Solution: ${company.solution}

First offer:
- Name: ${company.firstOffer.name}
- Description: ${company.firstOffer.description}
- Outcome: ${company.firstOffer.outcome}

Ideal customers:
${company.idealCustomers
  .map((customer) => `- ${customer}`)
  .join("\n")}

Why now: ${company.whyNow}
Future expansion: ${company.futureExpansion}
Startup cost: ${company.startupCost}
  `.trim();
}

function buildGenerationInput(
  context: string,
  previousCompany?: Company,
  refinementRequest?: string,
): string {
  if (
    previousCompany &&
    refinementRequest
  ) {
    return `
User context:

${context}

Current company:

${formatCompanyForPrompt(previousCompany)}

Refinement request:

${refinementRequest}
    `.trim();
  }

  if (previousCompany) {
    return `
User context:

${context}

Previous company:

${formatCompanyForPrompt(previousCompany)}
    `.trim();
  }

  return `
User context:

${context}
  `.trim();
}

export async function generateAiBusinessOpportunities(
  context: string,
  previousCompany?: Company,
  refinementRequest?: string,
): Promise<CompanyOutput> {
  const normalizedContext = context.trim();

  if (!normalizedContext) {
    throw new Error(
      "A starting context is required.",
    );
  }

  const normalizedRefinementRequest =
    refinementRequest?.trim();

  const response = await openai.responses.create({
    model: "gpt-5",

    instructions:
      BUSINESS_OPPORTUNITIES_SYSTEM_PROMPT,

    input: buildGenerationInput(
      normalizedContext,
      previousCompany,
      normalizedRefinementRequest,
    ),

    reasoning: {
      effort: "low",
    },

    max_output_tokens: 3_000,

    text: {
      format: {
        type: "json_schema",
        name: "company",
        strict: true,
        schema:
          BUSINESS_OPPORTUNITIES_JSON_SCHEMA,
      },
    },
  });

  if (response.status === "incomplete") {
    throw new Error(
      `OpenAI returned an incomplete response: ${
        response.incomplete_details?.reason ??
        "unknown reason"
      }`,
    );
  }

  if (!response.output_text) {
    throw new Error(
      `OpenAI returned an empty response. Status: ${response.status}`,
    );
  }

  let parsedOutput: unknown;

  try {
    parsedOutput = JSON.parse(
      response.output_text,
    );
  } catch {
    throw new Error(
      `OpenAI returned invalid JSON: ${response.output_text.slice(
        0,
        300,
      )}`,
    );
  }

  const validatedOutput =
    businessOpportunitiesResponseSchema.parse(
      parsedOutput,
    );

  return validatedOutput.company;
}