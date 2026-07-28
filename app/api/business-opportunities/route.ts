import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { generateAiBusinessDirections } from "../../lib/aiBusinessOpportunityGenerator";
import {
  businessDirectionsSchema,
  businessOpportunitiesRequestSchema,
} from "../../lib/businessOpportunitySchema";
import { generateFallbackBusinessDirections } from "../../lib/fallbackBusinessGenerator";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const { skills } =
      businessOpportunitiesRequestSchema.parse(body);

    try {
      const aiDirections =
        await generateAiBusinessDirections(skills);

      const validatedDirections =
        businessDirectionsSchema.parse(aiDirections);

      return NextResponse.json({
        directions: validatedDirections,
        source: "ai",
      });
    } catch (aiError) {
      console.error(
        "AI business opportunity generation failed. Using fallback:",
        aiError,
      );

      const fallbackDirections =
        generateFallbackBusinessDirections(skills);

      const validatedFallbackDirections =
        businessDirectionsSchema.parse(fallbackDirections);

      return NextResponse.json({
        directions: validatedFallbackDirections,
        source: "fallback",
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid business opportunities request.",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    console.error(
      "Failed to generate business opportunities:",
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to generate business opportunities.",
      },
      { status: 500 },
    );
  }
}