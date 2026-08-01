import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { generateAiExecutionPlan } from "../../lib/aiExecutionPlanGenerator";
import {
  companyExecutionPlanSchema,
  executionPlanRequestSchema,
  type CompanyExecutionPlan,
  type GeneratedExecutionPlan,
} from "../../lib/executionPlanSchema";
import { generateFallbackExecutionPlan } from "../../lib/fallbackExecutionPlanGenerator";

export const runtime = "nodejs";

function createExecutionPlan(
  companyId: string,
  generatedPlan: GeneratedExecutionPlan,
  source: "ai" | "fallback",
): CompanyExecutionPlan {
  const now = new Date().toISOString();

  return companyExecutionPlanSchema.parse({
    id: crypto.randomUUID(),
    companyId,
    introduction: generatedPlan.introduction,
    steps: generatedPlan.steps.map(
      (step, index) => ({
        ...step,
        id: crypto.randomUUID(),
        order: index + 1,
        status: "not_started",
        outputIds: [],
      }),
    ),
    version: 1,
    source,
    createdAt: now,
    updatedAt: now,
  });
}

export async function POST(
  request: Request,
) {
  try {
    const rawBody: unknown = await request.json();

    const {
      opportunity,
      userContext,
    } = executionPlanRequestSchema.parse(rawBody);

    let generatedPlan: GeneratedExecutionPlan;
    let source: "ai" | "fallback";

    try {
      generatedPlan =
        await generateAiExecutionPlan(
          opportunity,
          userContext,
        );
      source = "ai";
    } catch (error) {
      console.error(
        "AI execution plan generation failed. Using fallback.",
        error,
      );

      generatedPlan =
        generateFallbackExecutionPlan(
          opportunity,
        );
      source = "fallback";
    }

    const plan = createExecutionPlan(
      opportunity.id,
      generatedPlan,
      source,
    );

    return NextResponse.json({
      plan,
      source,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error:
            "Please check the company information and try again.",
          details: error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    console.error(
      "Execution plan route failed.",
      error,
    );

    return NextResponse.json(
      {
        error:
          "We could not prepare your company path. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
