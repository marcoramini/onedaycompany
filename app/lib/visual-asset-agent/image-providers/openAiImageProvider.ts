import { openai } from "../../openai";
import type { ImageProvider } from "./imageProvider";

export const openAiImageProvider: ImageProvider = {
  async generate(request) {
    const model = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1.5";
    const size = request.width >= request.height ? "1536x1024" : "1024x1536";
    const response = await openai.images.generate({
      model,
      prompt: request.prompt,
      size,
      background: "opaque",
      output_format: request.outputFormat,
      quality: "low",
    });
    const base64 = response.data?.[0]?.b64_json;
    if (!base64) throw new Error("The image provider returned no image data.");
    return {
      bytes: Buffer.from(base64, "base64"),
      contentType: `image/${request.outputFormat}`,
      format: request.outputFormat,
      provider: "openai",
      providerGenerationId: null,
    };
  },
};
