import type { FoundationProposal } from "../company-foundation/contracts.ts";
import type { FirstOfferProposal } from "../first-offer/contracts.ts";

import type { LaunchPlanningProposal, LaunchPlanningStep } from "./contracts.ts";

function isItalian(foundation: FoundationProposal): boolean {
  return /\b(il|lo|la|gli|le|di|che|per|con|sono|una|un|vorrei|aiutare)\b/i.test(
    foundation.userEvidence.join(" "),
  );
}

function step(
  value: LaunchPlanningStep,
): LaunchPlanningStep {
  return value;
}

function generateEnglishFallback(firstOffer: FirstOfferProposal): LaunchPlanningProposal {
  return {
    introduction: "Start with a few visible, low-cost actions that make the company ready for real customer conversations.",
    steps: [
      step({ title: "Confirm the company direction", reason: "A clear foundation keeps every first asset consistent.", expectedOutcome: "A confirmed purpose, mission, and value proposition ready to guide public work.", workflowType: "custom-guided-step", activities: [
        { title: "Review the foundation", description: "Read the proposed purpose, vision, mission, and value proposition together.", completionCriterion: "The foundation is either confirmed or has one clear review note." },
        { title: "Choose the core message", description: "Write one customer-facing sentence based on the foundational value proposition.", completionCriterion: "One concise core message is ready to reuse." },
      ], completionCriteria: ["The foundation is confirmed or clearly marked for review.", "A reusable core message exists."] }),
      step({ title: "Describe the first customer", reason: "A focused starting audience makes the offer and outreach more relevant.", expectedOutcome: "One recognizable first-customer profile and the situation in which they need help.", workflowType: "custom-guided-step", activities: [
        { title: "Select the starting audience", description: `Choose the first audience described by ${firstOffer.name}.`, completionCriterion: "One initial audience is selected." },
        { title: "Describe their situation", description: "State the concrete situation and desired outcome the person has before seeking the offer.", completionCriterion: "The customer's situation and desired outcome are written." },
      ], completionCriteria: ["One first-customer profile is explicit.", "Their situation and desired outcome are clear."] }),
      step({ title: "Prepare the first offer", reason: "A clear offer gives people something concrete to request or buy.", expectedOutcome: `${firstOffer.name} is ready to explain with a promise, scope, delivery, and boundaries.`, workflowType: "offer-builder", activities: [
        { title: "Confirm the offer promise", description: "Check that the customer promise is realistic and understandable without guarantees.", completionCriterion: "One clear customer-facing promise is confirmed." },
        { title: "Set scope and boundaries", description: "List what is included and the limits that keep delivery manageable.", completionCriterion: "The offer scope and boundaries are ready to share." },
        { title: "Choose the delivery path", description: "Define the simplest way to deliver the first version of the offer.", completionCriterion: "A practical delivery path is documented." },
      ], completionCriteria: ["The offer promise, scope, and delivery are clear.", "The founder can explain what is and is not included."] }),
      step({ title: "Create a simple visual direction", reason: "A minimal visual system makes the first page and messages recognizable.", expectedOutcome: "A usable logo direction, color direction, and tone of voice.", workflowType: "custom-guided-step", activities: [
        { title: "Choose the visual mood", description: "Select a simple mood and color direction that fits the company and audience.", completionCriterion: "A visual mood and color direction are selected." },
        { title: "Create a logo direction", description: "Prepare one simple recognizable logo direction for the page and profile.", completionCriterion: "One usable logo direction exists." },
      ], completionCriteria: ["A simple visual direction is documented.", "A first logo direction is ready to use."] }),
      step({ title: "Publish a simple offer page", reason: "Potential customers need one place to understand the offer and take action.", expectedOutcome: "A public page that explains the offer and provides one clear contact or conversion action.", workflowType: "landing-page-builder", activities: [
        { title: "Outline the page", description: "Arrange the customer situation, offer, outcome, and proof in a short page structure.", completionCriterion: "A complete page outline is ready." },
        { title: "Add the primary action", description: "Choose one clear way for visitors to contact, book, or request the offer.", completionCriterion: "One primary action is defined and reachable." },
        { title: "Publish and check the page", description: "Publish the first version and check that it opens and the action works.", completionCriterion: "The public page and its action work on mobile and desktop." },
      ], completionCriteria: ["The offer is understandable on a public page.", "A visitor can take one clear next action."] }),
      step({ title: "Invite first potential customers", reason: "Focused outreach creates low-cost conversations and useful early evidence.", expectedOutcome: "A small relevant group receives a clear invitation to see or discuss the offer.", workflowType: "outreach-builder", activities: [
        { title: "List relevant people", description: "Identify a small group who resembles the starting customer profile.", completionCriterion: "A focused first contact list exists." },
        { title: "Write the invitation", description: "Prepare one concise message that links the person's situation to the offer and next action.", completionCriterion: "A reusable outreach message is ready." },
        { title: "Send the first invitations", description: "Send the message and note questions or replies for later review.", completionCriterion: "The first invitations are sent and responses can be recorded." },
      ], completionCriteria: ["A relevant initial audience has been invited.", "Replies and questions can be reviewed."] }),
      step({ title: "Prepare the customer response path", reason: "A simple response path prevents early interest from being lost.", expectedOutcome: "A usable process from first contact to delivery and follow-up.", workflowType: "contact-builder", activities: [
        { title: "Choose the intake method", description: "Decide how people contact, book, order, or request the offer.", completionCriterion: "One working intake method is selected." },
        { title: "Write the first response", description: "Prepare the immediate response and next step for an interested customer.", completionCriterion: "A repeatable first-response message exists." },
        { title: "Prepare follow-up", description: "Define how delivery, feedback, and the next customer action will be recorded.", completionCriterion: "A basic delivery and follow-up process is ready." },
      ], completionCriteria: ["A customer can enter through one clear path.", "Response, delivery, and follow-up are ready to use."] }),
    ],
  };
}

export function generateFallbackLaunchPlanningProposal(
  foundation: FoundationProposal,
  firstOffer: FirstOfferProposal,
): LaunchPlanningProposal {
  if (!isItalian(foundation)) {
    return generateEnglishFallback(firstOffer);
  }

  const proposal = generateEnglishFallback(firstOffer);
  return {
    ...proposal,
    introduction: "Inizia da azioni visibili e poco costose che rendono l'azienda pronta per conversazioni reali con i clienti.",
    steps: proposal.steps.map((item) => ({
      ...item,
      title: item.title
        .replace("Confirm", "Conferma")
        .replace("Describe", "Descrivi")
        .replace("Prepare", "Prepara")
        .replace("Create", "Crea")
        .replace("Publish", "Pubblica")
        .replace("Invite", "Invita"),
    })),
  };
}
