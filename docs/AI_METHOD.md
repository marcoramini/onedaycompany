# OneDayCompany — AI Method

## 1. Purpose of this document

The AI Method defines how artificial intelligence supports the OneDayCompany Product Method.

It describes the role, limits, standards and architecture of AI-assisted behavior.

AI is not the product workflow. It is a capability used inside the workflow to reduce friction, improve synthesis and accelerate useful action.

## 2. Core principle

> AI accelerates the method; it does not replace the method.

OneDayCompany must remain useful because of the quality of its entrepreneurial sequence, even if the underlying model or provider changes.

## 3. What AI should do

AI should help the user:

- transform unstructured input into structured context;
- identify relevant patterns in skills and experience;
- generate a small number of credible alternatives;
- explain trade-offs clearly;
- convert decisions into practical business assets;
- surface assumptions and uncertainty;
- prepare validation experiments;
- draft outreach, offers and customer-facing material;
- synthesize evidence;
- recommend the next action based on the current state.

## 4. What AI should not do

AI should not:

- pretend to know that demand exists without evidence;
- make irreversible decisions for the user;
- hide uncertainty behind confident language;
- overwhelm the user with many options;
- generate long reports when a decision is needed;
- recommend substantial building before validation;
- become a generic conversational layer disconnected from workflow state;
- expose model or prompt complexity unnecessarily;
- optimize for impressive output instead of business progress.

## 5. AI interaction model

The preferred interaction is not an open-ended chatbot.

Each AI-assisted step should have:

```text
Known context
  +
One clear objective
  +
A constrained task
  ↓
Structured output
  ↓
User decision or real-world action
```

The system should know the current workflow stage, relevant prior decisions and the required output contract before making a generation request.

## 6. AI responsibilities by Product Method stage

### Skills

AI may:

- extract capabilities from free text;
- ask focused follow-up questions;
- group related experience;
- identify transferable skills;
- distinguish capabilities from preferences.

AI must not infer unsupported credentials or expertise.

### Business Direction

AI may:

- generate a small number of differentiated business directions;
- connect skills to customer value;
- explain credibility and testability;
- identify obvious constraints or risks.

AI must label these directions as hypotheses.

### Customer and Problem

AI may:

- propose initial customer segments;
- articulate problem hypotheses;
- identify current alternatives;
- suggest research questions;
- expose unsupported assumptions.

AI must not claim that a segment has the problem without evidence.

### First Offer

AI may:

- shape scope and deliverables;
- propose delivery models;
- draft pricing hypotheses;
- reduce an idea to a smaller testable offer;
- generate clear customer-facing language.

AI must not present pricing as objectively correct without market evidence.

### Validation

AI may:

- convert assumptions into tests;
- generate interview guides;
- draft outreach messages;
- define evidence thresholds;
- classify evidence supplied by the user;
- recommend continue, refine or change.

AI must prioritize observed behavior over positive sentiment.

### First Customer

AI may:

- personalize outreach using supplied context;
- prepare discovery questions;
- draft proposals and follow-ups;
- identify objections and possible responses;
- summarize conversations.

AI must not fabricate personalization facts or customer information.

### First Revenue and Growth

AI may:

- analyze delivery feedback;
- identify repeated tasks;
- help calculate basic economics from supplied data;
- recommend operational improvements;
- propose evidence-based growth experiments.

AI must not recommend scaling solely because a first transaction occurred.

## 7. Structured output standard

AI output used by the application must be structured and validated.

Preferred characteristics:

- explicit schema;
- concise fields;
- predictable types;
- limited optionality;
- assumptions separated from evidence;
- confidence or uncertainty represented when useful;
- a required next action;
- no UI-critical logic embedded only in prose.

Example conceptual contract:

```ts
type GeneratedHypothesis<T> = {
  value: T;
  rationale: string;
  assumptions: string[];
  evidence: string[];
  uncertainties: string[];
  nextAction: string;
  promptVersion: string;
};
```

This is illustrative. Domain contracts should remain specific to each workflow stage.

## 8. Context strategy

The AI should receive only the context necessary for the current task.

Context may include:

- current Skill Profile;
- selected Business Direction;
- current Blueprint;
- user edits and decisions;
- Evidence Log;
- constraints and preferences;
- current workflow stage.

The system should avoid repeatedly sending irrelevant history or relying on opaque conversational memory.

Important context should be represented in explicit domain data.

## 9. Prompt strategy

Prompts are implementation assets and should be:

- stage-specific;
- versioned;
- designed around a schema;
- testable against representative inputs;
- separated from presentation code;
- independent from a specific provider where practical;
- updated only with a clear behavioral objective.

Prompt quality should be evaluated by the usefulness of user decisions and actions, not by stylistic impressiveness.

## 10. Human decision points

The system should require explicit user confirmation when:

- selecting a Business Direction;
- choosing a target customer;
- accepting or changing a core problem hypothesis;
- defining the First Offer;
- choosing a validation experiment;
- sending or publishing customer-facing material;
- changing direction based on evidence.

AI can recommend, but the user owns the business decision.

## 11. Evidence and uncertainty

The system must distinguish:

- user-provided facts;
- AI-generated hypotheses;
- external research;
- direct customer evidence;
- inferred recommendations.

Generated output should use language appropriate to its evidence level.

Examples:

- “A possible initial customer is…”
- “This hypothesis should be tested by…”
- “Three of five interviews mentioned…”
- “The available evidence supports…”

It should avoid statements such as “Your market wants this” when no market evidence exists.

## 12. Research and external information

When the product later uses external research:

- sources should be traceable;
- current information should be distinguished from model memory;
- claims should be summarized rather than copied;
- external research should inform hypotheses, not substitute customer validation;
- source quality and date should be retained when relevant.

## 13. Provider independence

The domain model and Product Method must not depend on a specific AI provider.

Provider-specific responsibilities should be isolated behind a minimal adapter.

The application should be able to change model or provider without redesigning:

- workflow stages;
- domain contracts;
- business logic;
- UI components;
- stored user state.

Provider abstraction should remain proportionate. Do not create unnecessary complexity before a second provider or a concrete need exists.

## 14. Reliability requirements

AI-assisted features must include:

- schema validation;
- safe parsing;
- recoverable error states;
- retry behavior where appropriate;
- cancellation or timeout behavior where appropriate;
- protection against duplicate generation;
- preservation of user edits;
- logging of latency and failure category;
- prompt and model version traceability.

The user should never lose completed work because a generation step fails.

## 15. Cost and latency principles

AI usage should be measured and intentional.

Use AI when it materially improves:

- relevance;
- speed;
- clarity;
- quality of a deliverable;
- probability of real-world action.

Do not use AI for deterministic navigation, formatting or business rules that can be implemented reliably without it.

## 16. Evaluation framework

AI output should be evaluated against stage-specific criteria.

General criteria:

- Is it grounded in user context?
- Is it specific enough to act on?
- Does it expose assumptions?
- Does it avoid unsupported certainty?
- Is it concise enough for the screen objective?
- Does it produce the required structured fields?
- Does it lead to a user decision or next action?
- Does it respect product guardrails?

The most important evaluation is downstream behavior: did the output help the user take a better action?

## 17. Initial implementation strategy

Before real AI integration:

1. define the domain contract;
2. define the screen objective;
3. create deterministic or mocked output;
4. validate the workflow and UX;
5. define evaluation examples;
6. introduce server-side AI generation;
7. validate structured output;
8. measure quality, latency and cost;
9. iterate from real user behavior.

This prevents the model response from prematurely defining the product.
