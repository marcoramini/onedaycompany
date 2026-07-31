import OpenAI from "openai";
import {
  ProxyAgent,
  setGlobalDispatcher,
} from "undici";

let proxyConfigured = false;

function configureProxy(): void {
  if (proxyConfigured) {
    return;
  }

  const proxyUrl =
    process.env.HTTPS_PROXY ??
    process.env.HTTP_PROXY;

  if (proxyUrl) {
    setGlobalDispatcher(
      new ProxyAgent(proxyUrl),
    );
  }

  proxyConfigured = true;
}

function createOpenAiClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured.",
    );
  }

  configureProxy();

  return new OpenAI({
    apiKey,
    maxRetries: 0,
    timeout: 180_000,
  });
}

export const openai = createOpenAiClient();