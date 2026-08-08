import { NextResponse } from "next/server";

import {
  companyPersistenceSchema,
} from "./companyPersistenceSchema";
import {
  createCompanyWithOffer,
} from "./companyRepository";
import { ensureCompanyExecutionPlan } from "./companyExecutionPlanRepository";
import { createClient } from "../../lib/supabase/server";
import { ensureInitialVisualAssets } from "../../lib/visual-asset-agent/createInitialVisualAssets";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error: "Authentication required.",
      },
      {
        status: 401,
      },
    );
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON body.",
      },
      {
        status: 400,
      },
    );
  }

  const validationResult =
    companyPersistenceSchema.safeParse(
      requestBody,
    );

  if (!validationResult.success) {
    console.error(
      "Invalid Company persistence payload.",
      validationResult.error.flatten(),
    );

    return NextResponse.json(
      {
        error:
          "The company data is incomplete or invalid.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const company =
      await createCompanyWithOffer(
        supabase,
        {
          ownerId: user.id,
          payload: validationResult.data,
        },
      );

    await ensureCompanyExecutionPlan(
      supabase,
      company.id,
      validationResult.data.company,
      validationResult.data.beginningContext,
    );

    try {
      await ensureInitialVisualAssets(
        supabase,
        company.id,
        validationResult.data.company,
      );
    } catch (brandError) {
      console.error(
        "Initial Visual Asset Agent run failed. The workspace will open without blocking.",
        brandError,
      );
    }

    return NextResponse.json(
      {
        company,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Persistent Company creation failed.",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We couldn't save your company.",
      },
      {
        status: 500,
      },
    );
  }
}
