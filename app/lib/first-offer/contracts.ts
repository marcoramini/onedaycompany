import { z } from "zod";

import { foundationProposalSchema } from "../company-foundation/contracts.ts";

const offerText = (maximum: number) => z.string().trim().min(1).max(maximum);

export const priceHypothesisSchema = z.object({
  amount: z.number().finite().min(0).max(100_000),
  currency: z.string().trim().regex(/^[A-Z]{3}$/),
  unit: z.enum(["one-time", "hour", "session", "package", "subscription"]),
  rationale: offerText(300),
}).strict();

export const firstOfferProposalSchema = z.object({
  name: offerText(120),
  audience: offerText(300),
  desiredOutcome: offerText(300),
  promise: offerText(400),
  scope: z.array(offerText(220)).min(2).max(5),
  delivery: offerText(400),
  boundaries: z.array(offerText(220)).min(1).max(4),
  priceHypothesis: priceHypothesisSchema.nullable(),
  assumptions: z.array(offerText(240)).min(1).max(6),
  foundationImpactWarnings: z.array(offerText(300)).max(4),
}).strict();

export const firstOfferGenerationRequestSchema = z.object({
  foundation: foundationProposalSchema,
}).strict();

export type PriceHypothesis = z.infer<typeof priceHypothesisSchema>;
export type FirstOfferProposal = z.infer<typeof firstOfferProposalSchema>;
export type FirstOfferGenerationRequest = z.infer<
  typeof firstOfferGenerationRequestSchema
>;
