import { z } from "zod";

import { foundationProposalSchema } from "../company-foundation/contracts.ts";
import { firstOfferProposalSchema } from "../first-offer/contracts.ts";
import { companyCapabilityIds } from "../../types/companyCapability.ts";

const planText = (maximum: number) => z.string().trim().min(1).max(maximum);

export const launchPlanningWorkflowTypeSchema = z.enum([
  "offer-builder",
  "landing-page-builder",
  "booking-builder",
  "contact-builder",
  "social-launch-builder",
  "outreach-builder",
  "pricing-builder",
  "portfolio-builder",
  "custom-guided-step",
]);

export const launchPlanningActivitySchema = z
  .object({
    title: planText(100),
    description: planText(240),
    completionCriterion: planText(180),
  })
  .strict();

export const launchPlanningStepSchema = z
  .object({
    title: planText(120),
    reason: planText(300),
    expectedOutcome: planText(400),
    workflowType: launchPlanningWorkflowTypeSchema,
    activities: z.array(launchPlanningActivitySchema).min(2).max(5),
    completionCriteria: z.array(planText(180)).min(1).max(4),
  })
  .strict();

export const launchPlanningProposalSchema = z
  .object({
    introduction: planText(400),
    steps: z.array(launchPlanningStepSchema).length(companyCapabilityIds.length),
  })
  .strict();

export const launchPlanningGenerationRequestSchema = z
  .object({
    foundation: foundationProposalSchema,
    firstOffer: firstOfferProposalSchema,
  })
  .strict();

export type LaunchPlanningActivity = z.infer<typeof launchPlanningActivitySchema>;
export type LaunchPlanningStep = z.infer<typeof launchPlanningStepSchema>;
export type LaunchPlanningProposal = z.infer<typeof launchPlanningProposalSchema>;
export type LaunchPlanningGenerationRequest = z.infer<
  typeof launchPlanningGenerationRequestSchema
>;
