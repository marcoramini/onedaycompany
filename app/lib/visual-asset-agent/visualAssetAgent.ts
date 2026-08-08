import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { storeAssetVariant } from "./assetStorage";
import { composeLogoSvg } from "./composition/composeLogo";
import { assetBriefSchema, assetResultSchema, type AssetBrief, type AssetResult } from "./contracts";
import { composeFallbackBackground } from "./fallbackBackground";
import type { ImageProvider } from "./image-providers/imageProvider";
import { openAiImageProvider } from "./image-providers/openAiImageProvider";
import { proposeVisualDirection } from "./visualDirection";

export async function runVisualAssetAgent(
  supabase: SupabaseClient,
  unsafeBrief: AssetBrief,
  imageProvider: ImageProvider = openAiImageProvider,
): Promise<AssetResult> {
  const startedAt = Date.now();
  const brief = assetBriefSchema.parse(unsafeBrief);
  const direction = proposeVisualDirection(brief);
  const visualDirectionId = randomUUID();
  const briefId = randomUUID();
  const assetId = randomUUID();
  const variantId = randomUUID();

  await persistDirectionAndBrief(supabase, { visualDirectionId, briefId, brief, direction });

  let source: "composition" | "generated" | "fallback" = "composition";
  let provider: string | null = null;
  let providerGenerationId: string | null = null;
  let bytes: Buffer;
  let format: "svg" | "png" | "webp" | "jpeg";
  let contentType: string;

  if (brief.purpose === "company-logo") {
    bytes = composeLogoSvg(brief, direction);
    format = "svg";
    contentType = "image/svg+xml";
  } else {
    try {
      const generated = await imageProvider.generate({
        prompt: createGenerationPrompt(brief, direction.styleDescription),
        width: brief.target.width,
        height: brief.target.height,
        outputFormat: brief.target.formats.includes("webp") ? "webp" : "png",
      });
      bytes = generated.bytes;
      format = generated.format;
      contentType = generated.contentType;
      provider = generated.provider;
      providerGenerationId = generated.providerGenerationId;
      source = "generated";
    } catch (error) {
      console.warn("Visual image generation failed. Composing a fallback variant.", error);
      bytes = composeFallbackBackground(direction);
      format = "svg";
      contentType = "image/svg+xml";
      source = "fallback";
    }
  }

  const stored = await storeAssetVariant(supabase, { companyId: brief.companyId, assetId, variantId, bytes, format, contentType });
  const altText = brief.purpose === "company-logo" ? `${brief.companyContext.name} logo` : `Abstract ${brief.purpose.replaceAll("-", " ")} for ${brief.companyContext.name}`;
  const latencyMs = Date.now() - startedAt;

  await persistResult(supabase, {
    briefId, assetId, variantId, visualDirectionId, brief, stored,
    format, contentType, altText, source, provider, providerGenerationId, latencyMs,
  });

  return assetResultSchema.parse({
    briefId,
    assetId,
    status: "review-required",
    reviewRequired: true,
    variants: [{ id: variantId, stableUrl: stored.stableUrl, format, width: brief.target.width, height: brief.target.height, altText }],
    visualDirectionId,
    provenance: { source, provider, latencyMs },
  });
}

async function persistDirectionAndBrief(supabase: SupabaseClient, input: { visualDirectionId: string; briefId: string; brief: AssetBrief; direction: ReturnType<typeof proposeVisualDirection> }) {
  const { error: directionError } = await supabase.from("visual_directions").insert({ id: input.visualDirectionId, company_id: input.brief.companyId, status: "draft", palette: input.direction.palette, typography: { family: input.direction.fontFamily }, style_description: input.direction.styleDescription });
  if (directionError) throw new Error(`Visual direction persistence failed: ${directionError.message}`);
  const { error: briefError } = await supabase.from("asset_briefs").insert({ id: input.briefId, company_id: input.brief.companyId, requesting_tool: input.brief.requestingTool, purpose: input.brief.purpose, placement: input.brief.placement, operation: input.brief.operation, request_payload: input.brief, status: "processing" });
  if (briefError) throw new Error(`Asset brief persistence failed: ${briefError.message}`);
}

type PersistedAssetInput = {
  briefId: string;
  assetId: string;
  variantId: string;
  visualDirectionId: string;
  brief: AssetBrief;
  stored: { storagePath: string; stableUrl: string };
  format: "svg" | "png" | "webp" | "jpeg";
  contentType: string;
  altText: string;
  source: "composition" | "generated" | "fallback";
  provider: string | null;
  providerGenerationId: string | null;
  latencyMs: number;
};

async function persistResult(supabase: SupabaseClient, input: PersistedAssetInput) {
  const { error: assetError } = await supabase.from("visual_assets").insert({ id: input.assetId, company_id: input.brief.companyId, brief_id: input.briefId, visual_direction_id: input.visualDirectionId, purpose: input.brief.purpose, status: "review-required", review_required: true });
  if (assetError) throw new Error(`Visual asset persistence failed: ${assetError.message}`);
  const { error: variantError } = await supabase.from("visual_asset_variants").insert({ id: input.variantId, asset_id: input.assetId, storage_path: input.stored.storagePath, public_url: input.stored.stableUrl, format: input.format, mime_type: input.contentType, width: input.brief.target.width, height: input.brief.target.height, alt_text: input.altText, is_selected: true });
  if (variantError) throw new Error(`Asset variant persistence failed: ${variantError.message}`);
  const { error: generationError } = await supabase.from("asset_generations").insert({ asset_id: input.assetId, variant_id: input.variantId, source: input.source, provider: input.provider, provider_generation_id: input.providerGenerationId, latency_ms: input.latencyMs, cost_metadata: {} });
  if (generationError) throw new Error(`Asset provenance persistence failed: ${generationError.message}`);
  await supabase.from("asset_briefs").update({ status: "completed" }).eq("id", input.briefId);
}

function createGenerationPrompt(brief: AssetBrief, style: string) {
  const company = brief.companyContext;
  return `Create a ${brief.purpose.replaceAll("-", " ")} for ${company.name}. ${company.tagline}. Mission: ${company.mission}. Audience: ${company.idealCustomers.join(", ")}. Placement: ${brief.placement}. Visual direction: ${style} Constraints: ${brief.constraints.join("; ")}. No text, letters, logos, people, devices or mockups.`;
}
