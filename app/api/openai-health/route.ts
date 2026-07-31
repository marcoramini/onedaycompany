import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import {
  fetch as undiciFetch,
  ProxyAgent,
} from "undici";

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        stage: "configuration",
        error: "OPENAI_API_KEY is missing.",
      },
      {
        status: 500,
      },
    );
  }

  const startedAt = Date.now();

  try {
const proxyUrl =
  process.env.HTTPS_PROXY ??
  process.env.HTTP_PROXY;

if (!proxyUrl) {
  return NextResponse.json(
    {
      ok: false,
      stage: "configuration",
      error:
        "HTTP_PROXY or HTTPS_PROXY is missing.",
    },
    {
      status: 500,
    },
  );
}

const dispatcher = new ProxyAgent(proxyUrl);

const response = await undiciFetch(
  "https://api.openai.com/v1/models",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
    dispatcher,
    signal: AbortSignal.timeout(15_000),
  },
);

    const responseText = await response.text();

    return NextResponse.json({
      ok: response.ok,
      stage: "openai-http-response",
      status: response.status,
      durationMs: Date.now() - startedAt,
      responsePreview: responseText.slice(0, 500),
    });
  } catch (error) {
    const details =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            cause:
              error.cause instanceof Error
                ? {
                    name: error.cause.name,
                    message: error.cause.message,
                  }
                : String(error.cause ?? ""),
          }
        : {
            value: String(error),
          };

    console.error(
      "OpenAI health check failed:",
      details,
    );

    return NextResponse.json(
      {
        ok: false,
        stage: "network-request",
        durationMs: Date.now() - startedAt,
        error: details,
      },
      {
        status: 500,
      },
    );
  }
}