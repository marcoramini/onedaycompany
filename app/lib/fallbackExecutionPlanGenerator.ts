import type { Company } from "@/app/types/business";

import type {
  ExecutionWorkflowType,
  GeneratedExecutionPlan,
  GeneratedExecutionStep,
} from "./executionPlanSchema";

function createStep(
  title: string,
  reason: string,
  expectedOutcome: string,
  workflowType: ExecutionWorkflowType,
  completionCriteria: string[],
): GeneratedExecutionStep {
  return {
    title,
    reason,
    expectedOutcome,
    workflowType,
    completionCriteria,
  };
}

export function generateFallbackExecutionPlan(
  company: Company,
): GeneratedExecutionPlan {
  const steps: GeneratedExecutionStep[] = [
    createStep(
      "Shape your first offer",
      "A clear first offer gives people something concrete to understand and buy.",
      `A simple version of ${company.firstOffer.name} with a clear promise, delivery format, and customer outcome.`,
      "offer-builder",
      [
        "The offer is described in one clear sentence",
        "The customer outcome is explicit",
        "The delivery format is defined",
      ],
    ),
    createStep(
      "Publish a simple company page",
      "Potential customers need one place where they can understand the company and take action.",
      `A public page presenting ${company.name}, its first offer, and one clear next action.`,
      "landing-page-builder",
      [
        "The page explains the offer",
        "The ideal customer can recognize themselves",
        "A contact or booking action is available",
      ],
    ),
    createStep(
      "Invite your first potential customers",
      "Direct outreach is the fastest low-cost way to create real conversations and learn.",
      "A small, relevant group of potential customers receives a personal invitation to view or discuss the offer.",
      "outreach-builder",
      [
        "A concise outreach message exists",
        "At least ten relevant people are identified",
        "The first messages are sent",
      ],
    ),
  ];

  return {
    introduction: `Here is the simplest path to make ${company.name} visible and ready for its first customers.`,
    steps,
  };
}
