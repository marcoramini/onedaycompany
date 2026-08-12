export const FOUNDATION_PROPOSAL_JSON_SCHEMA = {
  type: "object",
  properties: {
    purpose: {
      type: "string",
      minLength: 1,
      maxLength: 400,
      description: "Why this company deserves to exist beyond making a sale.",
    },
    vision: {
      type: "string",
      minLength: 1,
      maxLength: 400,
      description: "The meaningful future this company wants to help create.",
    },
    mission: {
      type: "string",
      minLength: 1,
      maxLength: 500,
      description: "What this company does now, for whom, and toward what change.",
    },
    companyConcept: {
      type: "string",
      minLength: 1,
      maxLength: 600,
      description: "A concise explanation of the coherent company taking shape.",
    },
    foundationalValueProposition: {
      type: "string",
      minLength: 1,
      maxLength: 500,
      description: "The foundational value the company can credibly create for people.",
    },
    userEvidence: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: { type: "string", minLength: 1, maxLength: 240 },
      description: "Only facts, interests, experience, or aspirations stated by the user.",
    },
    assumptions: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: { type: "string", minLength: 1, maxLength: 240 },
      description: "Useful hypotheses that require later validation; never present them as facts.",
    },
  },
  required: [
    "purpose",
    "vision",
    "mission",
    "companyConcept",
    "foundationalValueProposition",
    "userEvidence",
    "assumptions",
  ],
  additionalProperties: false,
} as const;
