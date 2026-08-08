import { z } from "zod";

export const assetPurposeSchema = z.enum([
  "company-logo",
  "website-hero",
  "workspace-background",
  "promotional-image",
  "campaign-creative",
]);

export const assetBriefSchema = z.object({
  requestingTool: z.enum([
    "company-creation",
    "brand-workflow",
    "website-agent",
    "promotion-agent",
  ]),
  companyId: z.string().uuid(),
  purpose: assetPurposeSchema,
  placement: z.string().trim().min(1).max(240),
  operation: z.enum(["compose", "generate", "edit", "select-upload"]),
  target: z.object({
    formats: z.array(z.enum(["svg", "png", "webp", "jpeg"])).min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
  companyContext: z.object({
    name: z.string().trim().min(1).max(120),
    tagline: z.string().trim().min(1).max(240),
    mission: z.string().trim().min(1).max(2_000),
    problem: z.string().trim().min(1).max(2_000),
    solution: z.string().trim().min(1).max(2_000),
    idealCustomers: z.array(z.string().trim().min(1).max(300)).min(1).max(10),
  }),
  constraints: z.array(z.string().trim().min(1).max(500)).max(20).default([]),
  preserveAssetIds: z.array(z.string().uuid()).default([]),
});

export const assetResultSchema = z.object({
  briefId: z.string().uuid(),
  assetId: z.string().uuid(),
  status: z.enum(["draft", "review-required", "approved", "rejected"]),
  reviewRequired: z.boolean(),
  variants: z.array(z.object({
    id: z.string().uuid(),
    stableUrl: z.string().url(),
    format: z.enum(["svg", "png", "webp", "jpeg"]),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    altText: z.string().trim().min(1),
  })).min(1),
  visualDirectionId: z.string().uuid(),
  provenance: z.object({
    source: z.enum(["composition", "generated", "uploaded", "fallback"]),
    provider: z.string().nullable(),
    latencyMs: z.number().int().nonnegative(),
  }),
});

export type AssetBrief = z.infer<typeof assetBriefSchema>;
export type AssetResult = z.infer<typeof assetResultSchema>;
export type AssetPurpose = z.infer<typeof assetPurposeSchema>;

export type SelectedVisualAsset = {
  id: string;
  purpose: AssetPurpose;
  status: "draft" | "review-required" | "approved" | "rejected" | "archived";
  reviewRequired: boolean;
  variant: {
    id: string;
    stableUrl: string;
    altText: string;
  };
};
