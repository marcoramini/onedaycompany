import { z } from "zod";

export const companyPersistenceSchema = z.object({
  company: z.object({
    id: z.string().trim().min(1).max(200),

    name: z.string().trim().min(1).max(120),

    tagline: z.string().trim().min(1).max(240),

    mission: z.string().trim().min(1).max(2_000),

    problem: z.string().trim().min(1).max(2_000),

    solution: z.string().trim().min(1).max(2_000),

    firstOffer: z.object({
      name: z.string().trim().min(1).max(160),

      description: z
        .string()
        .trim()
        .min(1)
        .max(2_000),

      outcome: z
        .string()
        .trim()
        .min(1)
        .max(1_000),
    }),

    idealCustomers: z
      .array(
        z.string().trim().min(1).max(300),
      )
      .min(1)
      .max(10),

    whyNow: z.string().trim().min(1).max(2_000),

    futureExpansion: z
      .string()
      .trim()
      .min(1)
      .max(2_000),

    startupCost: z.enum([
      "very-low",
      "low",
      "moderate",
    ]),
  }),

  beginningContext: z
    .string()
    .trim()
    .min(1)
    .max(10_000),
});

export type CompanyPersistenceInput =
  z.infer<typeof companyPersistenceSchema>;