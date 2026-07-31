import type { Company } from "../types/business";

function createCompanyId(context: string): string {
  const words = context
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  const base = words.join("-");

  return base ? `${base}-studio` : "starting-point-studio";
}

export function generateFallbackBusinessOpportunities(
  context: string,
): Company {
  const normalizedContext = context.trim();

  return {
    id: createCompanyId(normalizedContext),

    name: "Common Thread",

    tagline:
      "Turn meaningful knowledge into clear, useful experiences.",

    mission:
      "Common Thread exists to transform personal knowledge, interests, and lived experience into practical experiences that help other people move forward.",

    problem:
      "People often struggle to find guidance that feels relevant, understandable, and grounded in real experience.",

    solution:
      "Common Thread creates small, focused services and resources built around one specific challenge and one meaningful customer outcome.",

    firstOffer: {
      name: "Clarity Session",

      description:
        "A focused one-to-one session that helps a customer understand one difficult situation and leave with a simple, practical next step.",

      outcome:
        "The customer leaves with greater clarity and a concrete action they can take immediately.",
    },

    idealCustomers: [
      "People facing a specific personal or professional transition",
      "Independent professionals looking for practical guidance",
      "Small communities with a shared challenge",
    ],

    whyNow:
      "People have access to more information than ever, but increasingly value guidance that is personal, focused, and immediately useful.",

    futureExpansion:
      "The company could later expand into small group sessions, practical guides, digital tools, and recurring support.",

    startupCost: "very-low",
  };
}