export type ImageGenerationRequest = {
  prompt: string;
  width: number;
  height: number;
  outputFormat: "png" | "webp" | "jpeg";
};

export type ImageGenerationOutput = {
  bytes: Buffer;
  contentType: string;
  format: "png" | "webp" | "jpeg";
  provider: string;
  providerGenerationId: string | null;
};

export interface ImageProvider {
  generate(request: ImageGenerationRequest): Promise<ImageGenerationOutput>;
}
