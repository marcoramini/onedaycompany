import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { generateAiBusinessOpportunities } from "../../lib/aiBusinessOpportunitiesGenerator";
import {
  businessOpportunitiesRequestSchema,
  companySchema,
} from "../../lib/businessOpportunitiesSchema";
import { generateFallbackBusinessOpportunities } from "../../lib/fallbackBusinessGenerator";

export const runtime = "nodejs";

export async function POST(
  request: Request,
) {
  try {
    const rawBody: unknown =
      await request.json();

    const {
      context,
      previousCompany,
      refinementRequest,
    } =
      businessOpportunitiesRequestSchema.parse(
        rawBody,
      );

    try {
      const company =
        await generateAiBusinessOpportunities(
          context,
          previousCompany,
          refinementRequest,
        );

      console.log(
        "Company generated with AI:",
        company.name,
      );

      return NextResponse.json({
        company: companySchema.parse(company),
        source: "ai",
      });
    } catch (error) {
      console.error(
        "AI company generation failed. Using fallback.",
        error,
      );

      const company =
        generateFallbackBusinessOpportunities(
          context,
        );

      console.warn(
        "Returning fallback company:",
        company.name,
      );

      return NextResponse.json({
        company: companySchema.parse(company),
        source: "fallback",
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error:
            "Please check the information provided and try again.",
          details: error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    console.error(
      "Business opportunities route failed.",
      error,
    );

    return NextResponse.json(
      {
        error:
          "We could not shape your company. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}