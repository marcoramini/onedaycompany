import OpenAI from "openai";
import {
  fetch as undiciFetch,
  ProxyAgent,
  type RequestInit as UndiciRequestInit,
} from "undici";

import {
  businessOpportunitiesResponseSchema,
  type BusinessDirectionOutput,
} from "./businessOpportunitySchema";

const BUSINESS_OPPORTUNITIES_JSON_SCHEMA = {
  type: "object",
  properties: {
    directions: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "A short unique lowercase kebab-case identifier.",
          },
          title: {
            type: "string",
            description:
              "A concise name for the business direction.",
          },
          customer: {
            type: "string",
            description:
              "The specific group of people or organizations the user could help.",
          },
          valueCreated: {
            type: "string",
            description:
              "The concrete result or value the user could create for that customer.",
          },
          credibility: {
            type: "string",
            description:
              "Why the user's stated skills make this direction credible.",
          },
          testability: {
            type: "string",
            description:
              "Why this direction can be tested quickly and at very low initial cost.",
          },
        },
        required: [
          "id",
          "title",
          "customer",
          "valueCreated",
          "credibility",
          "testability",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["directions"],
  additionalProperties: false,
} as const;

const SYSTEM_PROMPT = `
You generate business direction hypotheses for OneDayCompany.

OneDayCompany helps people transform their existing skills into a real,
simple and testable business.

Your task is to generate exactly three clearly different business directions
from the skills provided by the user.

Rules:

- Write all output in English.
- Use only evidence contained in the user's input.
- Do not invent qualifications, experience, audiences, achievements or credentials.
- Treat every direction as a hypothesis, not a validated opportunity.
- Prefer businesses that can begin as a simple manual service.
- Prefer low or nearly zero initial costs.
- Avoid ideas that require building software, an audience, inventory,
  a marketplace or a complex product before validation.
- Each direction must serve a specific customer.
- Each direction must create a concrete and understandable result.
- The three directions must differ meaningfully in customer, use case or value.
- Do not include pricing, revenue projections, first offers, business plans
  or execution steps.
- Do not claim that market demand exists.
- Keep each descriptive field concise, ideally under 40 words.
- Make the ideas practical but not generic.
- Do not mention artificial intelligence unless the user's skills explicitly
  make it relevant.
`.trim();

function createOpenAiClient(apiKey: string): OpenAI {
  const localProxyUrl = process.env.LOCAL_PROXY_URL?.trim();

  if (!localProxyUrl) {
    // Vercel o ambiente locale senza proxy.
    return new OpenAI({
      apiKey,
      timeout: 60_000,
      maxRetries: 1,
    });
  }

  // In locale LOCAL_PROXY_URL deve puntare al proxy HTTP esposto da CNTLM.
  const proxyAgent = new ProxyAgent(localProxyUrl);

  const proxyFetch: typeof globalThis.fetch = async (
    input,
    init,
  ) => {
    const response = await undiciFetch(
      input as Parameters<typeof undiciFetch>[0],
      {
        ...(init as UndiciRequestInit),
        dispatcher: proxyAgent,
      },
    );

    return response as unknown as globalThis.Response;
  };

  return new OpenAI({
    apiKey,
    fetch: proxyFetch,
    timeout: 60_000,
    maxRetries: 1,
  });
}

export async function generateAiBusinessDirections(
  skills: string,
): Promise<BusinessDirectionOutput[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const openai = createOpenAiClient(apiKey);

  const response = await openai.responses.create({
    model:
      process.env.OPENAI_BUSINESS_MODEL?.trim() ||
      "gpt-5.6-luna",

    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `User skills:\n${skills}`,
      },
    ],

    text: {
      format: {
        type: "json_schema",
        name: "business_opportunities",
        strict: true,
        schema: BUSINESS_OPPORTUNITIES_JSON_SCHEMA,
      },
    },

    max_output_tokens: 1_500,
  });

  if (response.status === "incomplete") {
    throw new Error(
      `OpenAI returned an incomplete response: ${
        response.incomplete_details?.reason ?? "unknown reason"
      }`,
    );
  }

  if (!response.output_text) {
    throw new Error("OpenAI returned no structured output.");
  }

  let parsedOutput: unknown;

  try {
    parsedOutput = JSON.parse(response.output_text);
  } catch {
    throw new Error("OpenAI returned invalid JSON.");
  }

  const validatedOutput =
    businessOpportunitiesResponseSchema.parse(parsedOutput);

  return validatedOutput.directions;
}