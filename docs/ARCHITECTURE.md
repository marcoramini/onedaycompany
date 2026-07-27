# OneDayCompany — Architecture

## 1. Current architecture

OneDayCompany is currently a client-side Next.js prototype.

### Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- Vercel
- GitHub

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

Temporary business logic
└── src/app/lib/businessGenerator.ts
```

## 2. Current responsibilities

### `page.tsx`

Responsible for:

- application state;
- workflow navigation;
- invoking the temporary generator;
- selecting the screen to render.

It should not contain large UI sections or business-generation rules.

### `components/`

Responsible for:

- rendering screens;
- emitting user events through callback props;
- keeping presentation separate from orchestration.

Components should not directly know about deployment, persistence or AI providers.

### `types/`

Responsible for:

- domain models;
- shared TypeScript contracts;
- explicit data structures passed between workflow stages.

### `lib/`

Currently contains deterministic prototype logic.

Later it may contain provider-independent utilities, but API calls and secrets must remain server-side.

## 3. Near-term target architecture

```text
Browser
  ↓
Next.js UI
  ↓
Next.js Server Action or API Route
  ↓
Application service
  ↓
AI provider adapter
  ↓
Structured business output
```

Suggested structure:

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
│   ├── business.ts
│   ├── blueprint.ts
│   └── workflow.ts
├── services/
│   ├── blueprintService.ts
│   └── validationService.ts
├── providers/
│   └── ai/
│       ├── aiProvider.ts
│       └── openAIProvider.ts
└── prompts/
    └── blueprintPrompt.ts
```

This is a target, not a requirement for the next commit. Avoid premature architecture.

## 4. Workflow state

The current boolean-based state is temporary.

Before adding several additional screens, use an explicit state machine or a typed workflow state.

Initial option:

```ts
export type WorkflowStep =
  | "landing"
  | "skills"
  | "direction"
  | "architect"
  | "blueprint";
```

Possible later state:

```ts
type WorkflowState =
  | { step: "landing" }
  | { step: "skills"; skills: string }
  | {
      step: "direction";
      skills: string;
      direction: BusinessDirection;
    }
  | {
      step: "architect";
      skills: string;
      direction: BusinessDirection;
    }
  | {
      step: "blueprint";
      skills: string;
      direction: BusinessDirection;
      blueprint: BusinessBlueprint;
    };
```

The discriminated-union approach prevents invalid combinations of independent booleans.

## 5. AI integration rules

When AI is introduced:

1. API keys must never be exposed to the browser.
2. AI calls must occur server-side.
3. Responses must use structured output.
4. Output must be validated before reaching the UI.
5. Provider-specific code must be isolated.
6. The domain contract must not depend on one AI provider.
7. Failures must produce a recoverable user experience.
8. Prompts should be versioned.
9. Generated content should be traceable to a workflow stage.
10. Costs and latency should be measurable.

## 6. Data strategy

No database is currently required.

Add persistence only when at least one of these becomes necessary:

- users must resume their workflow;
- users must maintain multiple businesses;
- generated blueprints must be stored;
- validation results must accumulate;
- authentication is introduced;
- analytics require durable event data.

## 7. Quality gates

Before every push:

```bash
npm run build
```

When available, also run:

```bash
npm run lint
npm test
```

A feature is not complete until:

- TypeScript compiles;
- navigation works;
- mobile layout is checked;
- the production deployment succeeds;
- relevant documentation is updated.
