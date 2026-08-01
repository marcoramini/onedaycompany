import { z } from "zod";

export const startupCostSchema = z.enum([
  "very-low",
  "low",
  "moderate",
]);

export const firstOfferSchema = z.object({
  name: z.string().trim().min(1).max(120),

  description: z
    .string()
    .trim()
    .min(1)
    .max(500),

  outcome: z.string().trim().min(1).max(300),
});

export const companySchema = z.object({
  id: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Company id must be lowercase kebab-case.",
    ),

  name: z.string().trim().min(1).max(120),

  tagline: z.string().trim().min(1).max(180),

  mission: z.string().trim().min(1).max(500),

  problem: z.string().trim().min(1).max(500),

  solution: z.string().trim().min(1).max(500),

  firstOffer: firstOfferSchema,

  idealCustomers: z
    .array(z.string().trim().min(1).max(160))
    .min(2)
    .max(4),

  whyNow: z.string().trim().min(1).max(500),

  futureExpansion: z
    .string()
    .trim()
    .min(1)
    .max(400),

  startupCost: startupCostSchema,
});

export const businessOpportunitiesResponseSchema =
  z.object({
    company: companySchema,
  });

export const businessOpportunitiesRequestSchema =
  z.object({
    context: z.string().trim().min(1).max(4_000),

    previousCompany: companySchema.optional(),

    refinementRequest: z
      .string()
      .trim()
      .min(1)
      .max(2_000)
      .optional(),
  });

export type CompanyOutput = z.infer<
  typeof companySchema
>;

export type BusinessOpportunitiesOutput = z.infer<
  typeof businessOpportunitiesResponseSchema
>;