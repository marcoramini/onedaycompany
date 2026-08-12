export const FIRST_OFFER_PROPOSAL_JSON_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 120, description: "A clear, credible name for this first offer." },
    audience: { type: "string", minLength: 1, maxLength: 300, description: "The specific initial audience this offer is for." },
    desiredOutcome: { type: "string", minLength: 1, maxLength: 300, description: "The practical outcome the customer hopes to reach." },
    promise: { type: "string", minLength: 1, maxLength: 400, description: "A realistic, customer-facing promise without guarantees." },
    scope: { type: "array", minItems: 2, maxItems: 5, items: { type: "string", minLength: 1, maxLength: 220 }, description: "What the customer receives." },
    delivery: { type: "string", minLength: 1, maxLength: 400, description: "How one person can deliver the offer simply." },
    boundaries: { type: "array", minItems: 1, maxItems: 4, items: { type: "string", minLength: 1, maxLength: 220 }, description: "Clear limits that prevent overpromising or scope creep." },
    priceHypothesis: {
      anyOf: [
        { type: "null" },
        {
          type: "object",
          properties: {
            amount: { type: "number", minimum: 0, maximum: 100000 },
            currency: { type: "string", pattern: "^[A-Z]{3}$", description: "ISO 4217 currency code." },
            unit: { type: "string", enum: ["one-time", "hour", "session", "package", "subscription"] },
            rationale: { type: "string", minLength: 1, maxLength: 300 },
          },
          required: ["amount", "currency", "unit", "rationale"],
          additionalProperties: false,
        },
      ],
      description: "An initial price hypothesis, or null when a price would be premature.",
    },
    assumptions: { type: "array", minItems: 1, maxItems: 6, items: { type: "string", minLength: 1, maxLength: 240 }, description: "Hypotheses requiring validation; never established facts." },
    foundationImpactWarnings: { type: "array", maxItems: 4, items: { type: "string", minLength: 1, maxLength: 300 }, description: "Empty when the offer fits the foundation; otherwise explain what requires Foundation review." },
  },
  required: ["name", "audience", "desiredOutcome", "promise", "scope", "delivery", "boundaries", "priceHypothesis", "assumptions", "foundationImpactWarnings"],
  additionalProperties: false,
} as const;
