import {
  EnvHttpProxyAgent,
  fetch as undiciFetch,
} from "undici";

const proxyAgent = new EnvHttpProxyAgent();

type UndiciFetchInput =
  Parameters<typeof undiciFetch>[0];

type UndiciFetchInit =
  Parameters<typeof undiciFetch>[1];

export const serverFetch: typeof globalThis.fetch =
  async (input, init) => {
    const response = await undiciFetch(
      input as UndiciFetchInput,
      {
        ...init,
        dispatcher: proxyAgent,
      } as UndiciFetchInit,
    );

    return response as unknown as globalThis.Response;
  };