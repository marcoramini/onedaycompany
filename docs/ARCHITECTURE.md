# OneDayCompany — Architecture

## 1. Architectural objective

The architecture must support a guided Entrepreneur Operating System in which:

- the Product Method defines the workflow;
- domain state preserves decisions and evidence;
- the UI presents one objective at a time;
- AI services assist specific stages;
- providers remain replaceable;
- user progress can later persist across sessions.

The architecture should evolve incrementally. Avoid building infrastructure before a product milestone requires it.

## 2. Current architecture

OneDayCompany is currently a client-side Next.js prototype.

### Current stack

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- Next.js App Router;
- Vercel;
- GitHub.

### Current layers

```text
Presentation
├── Landing
├── SkillsForm
├── BusinessDirectionScreen
├── Architect
├── ResultCard
└── ArchitectStep

Application orchestration
└── src/app/page.tsx

Domain types
└── src/app/types/business.ts

Temporary generation logic
└── src/app/lib/businessGenerator.ts
```

### Current product flow

```text
Landing
  ↓
Skills
  ↓
Business Direction
  ↓
The Architect
```

The current business-direction generator is deterministic and keyword-based.

## 3. Target conceptual architecture

```text
Presentation Layer
  ↓
Workflow Layer
  ↓
Product Method / Domain Layer
  ↓
Application Services
  ↓
AI and External Service Adapters
  ↓
Infrastructure and Persistence
```

### Presentation Layer

Responsible for:

- one-screen-one-objective experiences;
- rendering domain state;
- collecting user input and decisions;
- showing progress, errors and recoverable actions;
- emitting user intent through typed callbacks or actions.

It should not contain generation rules, provider calls or persistence logic.

### Workflow Layer

Responsible for:

- the current stage;
- valid transitions;
- stage completion criteria;
- navigation history;
- orchestration of asynchronous work;
- selecting the next user objective.

The workflow layer should prevent invalid combinations of state.

### Product Method / Domain Layer

Responsible for:

- domain entities and value objects;
- business hypotheses;
- user decisions;
- validation evidence;
- stage outputs;
- rules that do not depend on UI or providers.

The domain model should distinguish assumptions from evidence.

### Application Services

Responsible for use cases such as:

- generate business directions;
- create a Business Blueprint;
- create a validation plan;
- record evidence;
- recommend continue, refine or change;
- prepare an offer or outreach asset.

Application services coordinate domain logic and adapters.

### AI and External Service Adapters

Responsible for:

- provider-specific API calls;
- model configuration;
- structured output requests;
- external research or enrichment;
- translating provider responses into domain contracts.

Provider responses must not be passed directly to UI components without validation.

### Infrastructure and Persistence

Responsible for:

- database access;
- authentication;
- telemetry;
- logs and monitoring;
- durable storage;
- billing integration;
- external queues or jobs when later required.

## 4. Near-term target flow

For the first AI-backed Blueprint:

```text
Browser
  ↓
Next.js UI
  ↓
Workflow action
  ↓
Server Action or API Route
  ↓
Blueprint application service
  ↓
AI provider adapter
  ↓
Schema validation
  ↓
BusinessBlueprint domain object
  ↓
UI
```

## 5. Recommended project structure

This is a direction, not a required immediate refactor.

```text
src/
├── app/
│   ├── api/
│   │   └── blueprint/
│   │       └── route.ts
│   ├── components/
│   ├── page.tsx
│   └── ...
├── domain/
│   ├── skills.ts
│   ├── businessDirection.ts
│   ├── blueprint.ts
│   ├── validation.ts
│   ├── evidence.ts
│   └── workflow.ts
├── services/
│   ├── businessDirectionService.ts
│   ├── blueprintService.ts
│   └── validationService.ts
├── providers/
│   └── ai/
│       ├── aiProvider.ts
│       └── openAIProvider.ts
├── prompts/
│   ├── businessDirection/
│   └── blueprint/
└── infrastructure/
    ├── persistence/
    └── telemetry/
```

Do not adopt this entire structure until the codebase needs it. Prefer the smallest coherent change that preserves clear responsibilities.

## 6. Workflow state

The current collection of independent React state variables is temporary.

Before adding the Blueprint and later stages, introduce an explicit workflow state.

Initial form:

```ts
export type WorkflowStep =
  | "landing"
  | "skills"
  | "direction"
  | "architect"
  | "blueprint";
```

Preferred domain-safe evolution:

```ts
type WorkflowState =
  | { step: "landing" }
  | { step: "skills"; skillsDraft: string }
  | {
      step: "direction";
      skillProfile: SkillProfile;
      directions: BusinessDirection[];
    }
  | {
      step: "architect";
      skillProfile: SkillProfile;
      direction: BusinessDirection;
    }
  | {
      step: "blueprint";
      skillProfile: SkillProfile;
      direction: BusinessDirection;
      blueprint: BusinessBlueprint;
    };
```

The discriminated union prevents invalid state combinations and makes each stage’s required context explicit.

## 7. Domain data principles

Domain objects should:

- use explicit TypeScript types;
- represent one stage output clearly;
- distinguish user input, generated hypotheses and evidence;
- include stable identifiers when persistence is introduced;
- preserve user edits;
- avoid provider-specific fields;
- remain concise enough for the product workflow.

The Business Blueprint should be a living hypothesis, not a single unstructured text field.

## 8. AI integration rules

When AI is introduced:

1. API keys must never be exposed to the browser.
2. AI calls must occur server-side.
3. Requests should be stage-specific.
4. Responses must use structured output when available.
5. Every response must be validated before entering domain state.
6. Provider-specific code must be isolated.
7. Domain contracts must not depend on one provider.
8. Prompts must be versioned.
9. Model and prompt version should be traceable.
10. Latency, failure category and approximate cost should be measurable.
11. Errors must be recoverable without losing user work.
12. AI output must distinguish hypotheses from evidence.

See `AI_METHOD.md` for product behavior and AI standards.

## 9. Persistence strategy

No database is required for the current prototype milestone.

Introduce persistence when one or more of these become necessary:

- users must resume a workflow;
- users can maintain multiple businesses;
- Blueprints and user edits must be durable;
- evidence accumulates across customer conversations;
- user authentication is introduced;
- analytics require durable event history;
- billing or usage limits are introduced.

When persistence is added, store domain state rather than relying on chat transcripts as the source of truth.

## 10. Analytics and telemetry

Product analytics should be aligned with the Product Method.

Useful events include:

- stage started;
- stage completed;
- direction selected;
- hypothesis edited;
- validation action created;
- outreach initiated;
- evidence recorded;
- first customer recorded;
- first revenue recorded;
- recommendation accepted or rejected;
- generation failed or retried.

Do not collect unnecessary personal or sensitive data.

## 11. Error handling

Every asynchronous stage should define:

- loading state;
- timeout behavior;
- validation failure behavior;
- retry action;
- safe fallback;
- preservation of previous user work;
- user-facing explanation in plain English.

The Architect may represent a real generation phase later, but it must not become an artificial delay without product value.

## 12. Security and privacy principles

- Secrets remain server-side.
- Validate all external input and generated output.
- Minimize stored personal data.
- Do not expose internal prompts or credentials through errors.
- Add authentication before private durable projects are introduced.
- Add data export and deletion with persistent accounts.
- Review privacy, terms and analytics before commercial launch.

## 13. Quality gates

Before every push:

```bash
npm run build
```

When available, also run:

```bash
npm run lint
npm test
```

A product change is complete only when:

- TypeScript compiles;
- the intended workflow works;
- invalid transitions are prevented;
- mobile layout is checked;
- user-visible copy is in English;
- errors are recoverable where relevant;
- relevant documentation is updated;
- production deployment succeeds.

## 14. Architectural guardrails

- Do not build a generic chat architecture.
- Do not let raw AI output define domain state.
- Do not introduce a database before persistence is required.
- Do not create broad provider abstractions without a concrete need.
- Do not move business rules into presentation components.
- Do not add features outside the current milestone without identifying the trade-off.
- Do not silently revise accepted decisions in `DECISIONS.md`.
