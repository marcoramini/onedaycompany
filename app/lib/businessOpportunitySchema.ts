import { z } from "zod";

export const businessDirectionSchema = z.object({
  id: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(120),
  customer: z.string().trim().min(1).max(300),
  valueCreated: z.string().trim().min(1).max(300),
  credibility: z.string().trim().min(1).max(300),
  testability: z.string().trim().min(1).max(300),
});

export const businessDirectionsSchema = z
  .array(businessDirectionSchema)
  .length(3);

export const businessOpportunitiesResponseSchema = z.object({
  directions: businessDirectionsSchema,
});

export const businessOpportunitiesRequestSchema = z.object({
  skills: z.string().trim().min(1).max(4_000),
});

export type BusinessDirectionOutput = z.infer<
  typeof businessDirectionSchema
>;

export type BusinessOpportunitiesOutput = z.infer<
  typeof businessOpportunitiesResponseSchema
>;