import type { Company } from "@/app/types/business";

import {
  generatedExecutionPlanSchema,
  type GeneratedExecutionPlan,
} from "./executionPlanSchema";
import { openai } from "./openai";
import {
  buildExecutionPlanInput,
  EXECUTION_PLAN_SYSTEM_PROMPT,
} from "./prompts/executionPlanPrompt";

const EXECUTION_PLAN_JSON_SCHEMA = {
  type: "object",
  properties: {
    introduction: {
      type: "string",
      minLength: 1,
      maxLength: 400,
      description:
        "A concise, encouraging introduction to the practical path.",
    },
    steps: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
            minLength: 1,
            maxLength: 120,
            description:
              "A short action-oriented objective beginning with a verb.",
          },
          reason: {
            type: "string",
            minLength: 1,
            maxLength: 300,
            description:
              "Why this is the right action at this point in the sequence.",
          },
          expectedOutcome: {
            type: "string",
            minLength: 1,
            maxLength: 400,
            description:
              "The visible, usable, or verifiable result that will exist.",
          },
          workflowType: {
            type: "string",
            enum: [
              "offer-builder",
              "landing-page-builder",
              "booking-builder",
              "contact-builder",
              "social-launch-builder",
              "outreach-builder",
              "pricing-builder",
              "portfolio-builder",
              "custom-guided-step",
            ],
          },
          completionCriteria: {
            type: "array",
            minItems: 1,
            maxItems: 4,
            items: {
              type: "string",
              minLength: 1,
              maxLength: 180,
            },
            description:
              "Concrete checks that show the step has actually been completed.",
          },
        },
        required: [
          "title",
          "reason",
          "expectedOutcome",
          "workflowType",
          "completionCriteria",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["introduction", "steps"],
  additionalProperties: false,
} as const;

export async function generateAiExecutionPlan(
  opportunity: Company,
  userContext: string,
): Promise<GeneratedExecutionPlan> {
  const response = await openai.responses.create({
    model: "gpt-5",

    instructions: EXECUTION_PLAN_SYSTEM_PROMPT,

    input: buildExecutionPlanInput(
      opportunity,
      userContext,
    ),

    reasoning: {
      effort: "low",
    },

    max_output_tokens: 2_500,

    text: {
      format: {
        type: "json_schema",
        name: "execution_plan",
        strict: true,
        schema: EXECUTION_PLAN_JSON_SCHEMA,
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
    parsedOutput = JSON.parse(response.output_text);
  } catch {
    throw new Error(
      `OpenAI returned invalid JSON: ${response.output_text.slice(
        0,
        300,
      )}`,
    );
  }

  return generatedExecutionPlanSchema.parse(
    parsedOutput,
  );
}
