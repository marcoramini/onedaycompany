import { openai } from "../openai.ts";
import {
  buildLaunchPlanningInput,
  LAUNCH_PLANNING_SYSTEM_PROMPT,
} from "../prompts/launchPlanningPrompt.ts";

import {
  launchPlanningGenerationRequestSchema,
  launchPlanningProposalSchema,
  type LaunchPlanningProposal,
} from "./contracts.ts";
import { generateFallbackLaunchPlanningProposal } from "./fallback.ts";
import { LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA } from "./outputSchema.ts";

export type LaunchPlanningGenerationSource = "ai" | "fallback";

export type LaunchPlanningGenerationResult = {
  proposal: LaunchPlanningProposal;
  source: LaunchPlanningGenerationSource;
};

export async function generateAiLaunchPlanningProposal(
  foundation: unknown,
  firstOffer: unknown,
): Promise<LaunchPlanningProposal> {
  const validatedRequest = launchPlanningGenerationRequestSchema.parse({
    foundation,
    firstOffer,
  });

  const response = await openai.responses.create({
    model: "gpt-5",
    instructions: LAUNCH_PLANNING_SYSTEM_PROMPT,
    input: buildLaunchPlanningInput(
      validatedRequest.foundation,
      validatedRequest.firstOffer,
    ),
    reasoning: { effort: "low" },
    max_output_tokens: 8_000,
    text: {
      format: {
        type: "json_schema",
        name: "launch_planning_proposal",
        strict: true,
        schema: LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA,
      },
    },
  });

  if (response.status === "incomplete") {
    throw new Error(
      `OpenAI returned an incomplete response: ${response.incomplete_details?.reason ?? "unknown reason"}`,
    );
  }
  if (!response.output_text) {
    throw new Error(`OpenAI returned an empty response. Status: ${response.status}`);
  }

  let output: unknown;
  try {
    output = JSON.parse(response.output_text);
  } catch {
    throw new Error(`OpenAI returned invalid JSON: ${response.output_text.slice(0, 300)}`);
  }

  return launchPlanningProposalSchema.parse(output);
}

export async function generateLaunchPlanningProposal(
  foundation: unknown,
  firstOffer: unknown,
): Promise<LaunchPlanningGenerationResult> {
  const validatedRequest = launchPlanningGenerationRequestSchema.parse({
    foundation,
    firstOffer,
  });

  try {
    return {
      proposal: await generateAiLaunchPlanningProposal(
        validatedRequest.foundation,
        validatedRequest.firstOffer,
      ),
      source: "ai",
    };
  } catch (error) {
    console.error("Launch-planning generation failed. Using fallback.", error);
    return {
      proposal: generateFallbackLaunchPlanningProposal(
        validatedRequest.foundation,
        validatedRequest.firstOffer,
      ),
      source: "fallback",
    };
  }
}
