import { z } from "zod";

const foundationText = (maximum: number) =>
  z.string().trim().min(1).max(maximum);

export const foundationProposalSchema = z.object({
  purpose: foundationText(400),
  vision: foundationText(400),
  mission: foundationText(500),
  companyConcept: foundationText(600),
  foundationalValueProposition: foundationText(500),
  userEvidence: z.array(foundationText(240)).min(1).max(6),
  assumptions: z.array(foundationText(240)).min(1).max(6),
}).strict();

export const foundationGenerationRequestSchema = z.object({
  userContext: foundationText(4_000),
}).strict();

export type FoundationProposal = z.infer<typeof foundationProposalSchema>;

export type FoundationGenerationRequest = z.infer<
  typeof foundationGenerationRequestSchema
>;
