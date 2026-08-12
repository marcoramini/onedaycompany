const workflowTypes = [
  "offer-builder",
  "landing-page-builder",
  "booking-builder",
  "contact-builder",
  "social-launch-builder",
  "outreach-builder",
  "pricing-builder",
  "portfolio-builder",
  "custom-guided-step",
] as const;

const planTextSchema = (maximum: number) => ({
  type: "string",
  minLength: 1,
  maxLength: maximum,
});

export const LAUNCH_PLANNING_PROPOSAL_JSON_SCHEMA = {
  type: "object",
  properties: {
    introduction: {
      ...planTextSchema(400),
      description: "A concise, encouraging introduction to the practical path.",
    },
    steps: {
      type: "array",
      minItems: 7,
      maxItems: 7,
      items: {
        type: "object",
        properties: {
          title: {
            ...planTextSchema(120),
            description: "A concise, action-oriented step title.",
          },
          reason: {
            ...planTextSchema(300),
            description: "Why this is the useful next action for this company.",
          },
          expectedOutcome: {
            ...planTextSchema(400),
            description: "The visible, usable, or verifiable result that will exist.",
          },
          workflowType: { type: "string", enum: workflowTypes },
          activities: {
            type: "array",
            minItems: 2,
            maxItems: 5,
            items: {
              type: "object",
              properties: {
                title: planTextSchema(100),
                description: planTextSchema(240),
                completionCriterion: planTextSchema(180),
              },
              required: ["title", "description", "completionCriterion"],
              additionalProperties: false,
            },
          },
          completionCriteria: {
            type: "array",
            minItems: 1,
            maxItems: 4,
            items: planTextSchema(180),
          },
        },
        required: [
          "title",
          "reason",
          "expectedOutcome",
          "workflowType",
          "activities",
          "completionCriteria",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["introduction", "steps"],
  additionalProperties: false,
} as const;
