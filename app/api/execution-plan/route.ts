import { NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  executionPlanRequestSchema,
} from "../../lib/executionPlanSchema";
import { createExecutionPlan } from "../../lib/createExecutionPlan";

export const runtime = "nodejs";

export async function POST(
  request: Request,
) {
  try {
    const rawBody: unknown = await request.json();

    const {
      opportunity,
      userContext,
    } = executionPlanRequestSchema.parse(rawBody);

    const plan = await createExecutionPlan(
      opportunity,
      userContext,
    );

    return NextResponse.json({
      plan,
      source: plan.source,
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
