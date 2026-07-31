import { NextResponse } from "next/server";
import { ZodError } from "zod";

import type { Company } from "@/app/types/business";

import { generateAiBusinessOpportunities } from "../../lib/aiBusinessOpportunitiesGenerator";
import {
  businessOpportunitiesRequestSchema,
  companySchema,
} from "../../lib/businessOpportunitiesSchema";
import { generateFallbackBusinessOpportunities } from "../../lib/fallbackBusinessGenerator";

export const runtime = "nodejs";

type RequestBody = {
  context?: string;
  previousCompany?: Company;
};

export async function POST(
  request: Request,
) {
  try {
    const rawBody =
      (await request.json()) as RequestBody;

    const { context } =
      businessOpportunitiesRequestSchema.parse(
        rawBody,
      );

    const previousCompany =
      rawBody.previousCompany
        ? companySchema.parse(
            rawBody.previousCompany,
          )
        : undefined;

    try {
      const company =
        await generateAiBusinessOpportunities(
          context,
          previousCompany,
        );

      console.log("Company generated with AI:", company.name);
      
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

      console.warn("Returning fallback company:", company.name);

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
            "Please share something meaningful to build your company from.",
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