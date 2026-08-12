import { openai } from "../openai";
import { FIRST_OFFER_SYSTEM_PROMPT } from "../prompts/firstOfferPrompt";

import {
  firstOfferGenerationRequestSchema,
  firstOfferProposalSchema,
  type FirstOfferProposal,
} from "./contracts";
import { generateFallbackFirstOfferProposal } from "./fallback";
import { FIRST_OFFER_PROPOSAL_JSON_SCHEMA } from "./outputSchema";

export type FirstOfferGenerationSource = "ai" | "fallback";

export type FirstOfferGenerationResult = {
  proposal: FirstOfferProposal;
  source: FirstOfferGenerationSource;
};

export async function generateAiFirstOfferProposal(
  foundation: unknown,
): Promise<FirstOfferProposal> {
  const { foundation: validatedFoundation } =
    firstOfferGenerationRequestSchema.parse({ foundation });

  const response = await openai.responses.create({
    model: "gpt-5",
    instructions: FIRST_OFFER_SYSTEM_PROMPT,
    input: `Validated Foundation Proposal:\n\n${JSON.stringify(validatedFoundation)}`,
    reasoning: { effort: "low" },
    max_output_tokens: 2_000,
    text: {
      format: {
        type: "json_schema",
        name: "first_offer_proposal",
        strict: true,
        schema: FIRST_OFFER_PROPOSAL_JSON_SCHEMA,
      },
    },
  });

  if (response.status === "incomplete") {
    throw new Error(`OpenAI returned an incomplete response: ${response.incomplete_details?.reason ?? "unknown reason"}`);
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
  return firstOfferProposalSchema.parse(output);
}

export async function generateFirstOfferProposal(
  foundation: unknown,
): Promise<FirstOfferGenerationResult> {
  const { foundation: validatedFoundation } =
    firstOfferGenerationRequestSchema.parse({ foundation });

  try {
    return { proposal: await generateAiFirstOfferProposal(validatedFoundation), source: "ai" };
  } catch (error) {
    console.error("First-offer generation failed. Using fallback.", error);
    return { proposal: generateFallbackFirstOfferProposal(validatedFoundation), source: "fallback" };
  }
}
