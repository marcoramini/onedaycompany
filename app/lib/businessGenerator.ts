import type { BusinessDirection } from "../types/business";

export function buildBusinessDirection(
  skills: string,
): BusinessDirection {
  const normalized = skills.toLowerCase();

  if (
    normalized.includes("software") ||
    normalized.includes("developer") ||
    normalized.includes("programming") ||
    normalized.includes("code")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Small businesses and independent professionals that need simple digital tools but cannot hire a full development team.",
      problem:
        "Many small organizations still manage repetitive work manually because custom software appears too expensive or complicated.",
      businessIdea:
        "Create small, focused software solutions that automate one repetitive business process at a time.",
      firstOffer:
        "A fixed-price workflow automation delivered in seven days, starting with a free 30-minute process review.",
      nextAction:
        "Contact one small business owner today and ask which repetitive task consumes the most time every week.",
    };
  }

  if (
    normalized.includes("teach") ||
    normalized.includes("teacher") ||
    normalized.includes("training") ||
    normalized.includes("education")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Students or professionals who need practical help understanding a specific subject.",
      problem:
        "People often have access to information but lack a clear, personalized learning path.",
      businessIdea:
        "Offer short, outcome-based learning programs focused on one specific result.",
      firstOffer:
        "A one-hour individual session that helps the customer understand or complete one clearly defined task.",
      nextAction:
        "Choose one topic you can teach confidently and offer a free pilot session to one real person today.",
    };
  }

  if (
    normalized.includes("cook") ||
    normalized.includes("cooking") ||
    normalized.includes("baking") ||
    normalized.includes("chef") ||
    normalized.includes("food")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Busy people who want high-quality homemade food or practical guidance in the kitchen.",
      problem:
        "Many people want healthier or more personal food experiences but lack time, confidence or preparation skills.",
      businessIdea:
        "Turn your cooking expertise into a focused local service, workshop or digital product.",
      firstOffer:
        "A small paid cooking experience for a limited group, centred on one recipe or one specific need.",
      nextAction:
        "Select one dish people regularly appreciate and ask five contacts whether they would pay for it or learn how to make it.",
    };
  }

  if (
    normalized.includes("design") ||
    normalized.includes("photo") ||
    normalized.includes("photography") ||
    normalized.includes("video") ||
    normalized.includes("creative")
  ) {
    return {
      strongestSkill: skills,
      customer:
        "Independent professionals and small businesses that need a stronger visual presence.",
      problem:
        "Small organizations often struggle to communicate their value clearly and consistently.",
      businessIdea:
        "Create a productized creative service with a clear deliverable, fixed deadline and fixed price.",
      firstOffer:
        "A starter visual package containing one clearly defined result, delivered within five working days.",
      nextAction:
        "Find one local professional whose online presence could be improved and prepare a small example for them today.",
    };
  }

  return {
    strongestSkill: skills,
    customer:
      "People or small businesses that need your expertise but lack the time, knowledge or resources to obtain the same result independently.",
    problem:
      "Your potential customer needs a useful result that you can deliver faster, more clearly or with less risk.",
    businessIdea:
      "Transform your experience into a narrowly defined service for one specific type of customer and one specific problem.",
    firstOffer:
      "A small starter service with a clear result, a fixed delivery time and a simple initial price.",
    nextAction:
      "Identify one real person who might benefit from your skill and ask them about their current problem today.",
  };
}