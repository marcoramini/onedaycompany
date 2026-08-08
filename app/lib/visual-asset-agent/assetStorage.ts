import type { SupabaseClient } from "@supabase/supabase-js";

export const VISUAL_ASSET_BUCKET = "company-visual-assets";

export async function storeAssetVariant(
  supabase: SupabaseClient,
  input: {
    companyId: string;
    assetId: string;
    variantId: string;
    bytes: Buffer;
    format: "svg" | "png" | "webp" | "jpeg";
    contentType: string;
  },
) {
  const storagePath = `${input.companyId}/${input.assetId}/${input.variantId}.${input.format}`;
  const { error } = await supabase.storage
    .from(VISUAL_ASSET_BUCKET)
    .upload(storagePath, input.bytes, { contentType: input.contentType, upsert: false });
  if (error) throw new Error(`Visual asset upload failed: ${error.message}`);
  const { data } = supabase.storage.from(VISUAL_ASSET_BUCKET).getPublicUrl(storagePath);
  return { storagePath, stableUrl: data.publicUrl };
}
