import type { Company } from "@/app/types/business";
import type { CompanyCapabilityId } from "@/app/types/companyCapability";

import type {
  ExecutionWorkflowType,
  GeneratedExecutionActivity,
  GeneratedExecutionPlan,
  GeneratedExecutionStep,
} from "./executionPlanSchema";

function createStep(
  capabilityId: CompanyCapabilityId,
  title: string,
  reason: string,
  expectedOutcome: string,
  workflowType: ExecutionWorkflowType,
  activities: GeneratedExecutionActivity[],
  completionCriteria: string[],
): GeneratedExecutionStep {
  return {
    capabilityId,
    title,
    reason,
    expectedOutcome,
    workflowType,
    activities,
    completionCriteria,
  };
}

export function generateFallbackExecutionPlan(
  company: Company,
): GeneratedExecutionPlan {
  const steps: GeneratedExecutionStep[] = [
    createStep(
      "company-foundation",
      "Confirm your company foundation",
      "A shared foundation keeps every public asset and customer action coherent.",
      `A confirmed mission, problem, solution, and value direction for ${company.name}.`,
      "custom-guided-step",
      [
        {
          title: "Review the company direction",
          description:
            "Check that the mission, problem, and solution still describe the company you want to build.",
          completionCriterion:
            "The core company direction is explicitly confirmed",
        },
        {
          title: "Clarify the unique value",
          description:
            "Express why the company deserves attention in one concise customer-facing statement.",
          completionCriterion:
            "One clear unique-value statement is ready",
        },
      ],
      [
        "The mission, problem, and solution are confirmed",
        "The unique value is clear",
      ],
    ),
    createStep(
      "first-customers",
      "Define your first customers",
      "A focused starting customer makes the offer, page, and promotion more relevant.",
      "A practical first-customer profile with a recognizable need and situation.",
      "custom-guided-step",
      [
        {
          title: "Choose the first customer profile",
          description:
            "Select the most useful customer group to serve first from the generated hypotheses.",
          completionCriterion:
            "One starting customer profile is selected",
        },
        {
          title: "Describe the customer situation",
          description:
            "Clarify when the customer feels the problem and what outcome they are seeking.",
          completionCriterion:
            "The need, context, and desired benefit are explicit",
        },
      ],
      [
        "One first-customer profile is selected",
        "The customer's need and desired benefit are clear",
      ],
    ),
    createStep(
      "first-offer",
      "Shape your first offer",
      "A clear first offer gives people something concrete to understand and buy.",
      `A simple version of ${company.firstOffer.name} with a clear promise, delivery format, and customer outcome.`,
      "offer-builder",
      [
        {
          title: "Write the core promise",
          description:
            "Describe the result the customer should expect in one direct sentence.",
          completionCriterion:
            "One clear customer-facing promise is written",
        },
        {
          title: "Choose the delivery format",
          description:
            "Decide how the customer receives the offer and what is included.",
          completionCriterion:
            "The delivery method and inclusions are defined",
        },
        {
          title: "Set the first boundaries",
          description:
            "Clarify the scope so the first version stays realistic for one person.",
          completionCriterion:
            "The offer scope and main exclusions are explicit",
        },
      ],
      [
        "The offer is described in one clear sentence",
        "The customer outcome is explicit",
        "The delivery format is defined",
      ],
    ),
    createStep(
      "brand-identity",
      "Create your launch identity",
      "A simple visual system makes the company recognizable across its page and promotion.",
      `A first logo direction, palette, tone, and image style for ${company.name}.`,
      "custom-guided-step",
      [
        {
          title: "Choose the visual direction",
          description:
            "Define the mood, color direction, and image style that fit the company and its customers.",
          completionCriterion:
            "A coherent visual direction is selected",
        },
        {
          title: "Create the first logo proposal",
          description:
            "Prepare a simple recognizable logo concept suitable for a page, avatar, and promotion.",
          completionCriterion:
            "One usable first logo proposal exists",
        },
        {
          title: "Confirm the tone of voice",
          description:
            "Choose how the company should sound in its public messages.",
          completionCriterion:
            "A concise tone-of-voice direction is confirmed",
        },
      ],
      [
        "A first logo direction exists",
        "Colors, image style, and tone are coherent",
      ],
    ),
    createStep(
      "public-presence",
      "Publish a simple company page",
      "Potential customers need one place where they can understand the company and take action.",
      `A public page presenting ${company.name}, its first offer, and one clear next action.`,
      "landing-page-builder",
      [
        {
          title: "Structure the page message",
          description:
            "Arrange the company promise, offer, customer outcome, and essential proof in a simple sequence.",
          completionCriterion:
            "The landing page has a complete content outline",
        },
        {
          title: "Choose the primary action",
          description:
            "Select the single contact or booking action visitors should take.",
          completionCriterion:
            "One working primary call to action is defined",
        },
        {
          title: "Publish the first version",
          description:
            "Put the page online and verify it on both mobile and desktop.",
          completionCriterion:
            "A public page opens correctly and its action works",
        },
      ],
      [
        "The page explains the offer",
        "The ideal customer can recognize themselves",
        "A contact or booking action is available",
      ],
    ),
    createStep(
      "promotional-launch",
      "Invite your first potential customers",
      "Direct outreach is the fastest low-cost way to create real conversations and learn.",
      "A small, relevant group of potential customers receives a personal invitation to view or discuss the offer.",
      "outreach-builder",
      [
        {
          title: "Build the first contact list",
          description:
            "Identify a small group of people who closely match the starting customer profile.",
          completionCriterion:
            "At least ten relevant contacts are listed",
        },
        {
          title: "Prepare a personal message",
          description:
            "Write a concise invitation focused on the customer's situation and one next action.",
          completionCriterion:
            "One reusable outreach message is ready",
        },
        {
          title: "Send the first invitations",
          description:
            "Contact the initial group and record replies or questions for later improvement.",
          completionCriterion:
            "The first outreach messages are sent and responses can be tracked",
        },
      ],
      [
        "A concise outreach message exists",
        "At least ten relevant people are identified",
        "The first messages are sent",
      ],
    ),
    createStep(
      "customer-operations",
      "Prepare to handle customer interest",
      "A clear response and delivery path prevents early customer interest from being lost.",
      "A simple operating path from first contact to the next relevant customer action.",
      "contact-builder",
      [
        {
          title: "Choose the intake method",
          description:
            "Decide how a potential customer should contact, book, order, or request the offer.",
          completionCriterion:
            "One working customer-intake method is selected",
        },
        {
          title: "Define the response process",
          description:
            "Write the immediate steps for responding and moving the customer forward.",
          completionCriterion:
            "A repeatable first-response process is documented",
        },
        {
          title: "Prepare delivery and follow-up",
          description:
            "Clarify how the offer will be delivered and how feedback or the next action will be recorded.",
          completionCriterion:
            "Delivery and follow-up steps are ready to use",
        },
      ],
      [
        "A customer can take the intended first action",
        "Response, delivery, and follow-up are defined",
      ],
    ),
  ];

  return {
    introduction: `Here is the simplest path to make ${company.name} visible and ready for its first customers.`,
    steps,
  };
}
