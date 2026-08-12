import { openai } from "../openai";
import { COMPANY_FOUNDATION_SYSTEM_PROMPT } from "../prompts/companyFoundationPrompt";

import {
  foundationGenerationRequestSchema,
  foundationProposalSchema,
  type FoundationProposal,
} from "./contracts";
import { generateFallbackFoundationProposal } from "./fallback";
import { FOUNDATION_PROPOSAL_JSON_SCHEMA } from "./outputSchema";

export type FoundationGenerationSource = "ai" | "fallback";

export type FoundationGenerationResult = {
  proposal: FoundationProposal;
  source: FoundationGenerationSource;
};

export async function generateAiFoundationProposal(
  userContext: string,
): Promise<FoundationProposal> {
  const { userContext: normalizedContext } =
    foundationGenerationRequestSchema.parse({ userContext });

  const response = await openai.responses.create({
    model: "gpt-5",
    instructions: COMPANY_FOUNDATION_SYSTEM_PROMPT,
    input: `User context:\n\n${normalizedContext}`,
    reasoning: { effort: "low" },
    max_output_tokens: 2_000,
    text: {
      format: {
        type: "json_schema",
        name: "foundation_proposal",
        strict: true,
        schema: FOUNDATION_PROPOSAL_JSON_SCHEMA,
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

  return foundationProposalSchema.parse(output);
}

export async function generateFoundationProposal(
  userContext: string,
): Promise<FoundationGenerationResult> {
  const { userContext: normalizedContext } =
    foundationGenerationRequestSchema.parse({ userContext });

  try {
    return {
      proposal: await generateAiFoundationProposal(normalizedContext),
      source: "ai",
    };
  } catch (error) {
    console.error("Foundation generation failed. Using fallback.", error);
    return {
      proposal: generateFallbackFoundationProposal(normalizedContext),
      source: "fallback",
    };
  }
}
