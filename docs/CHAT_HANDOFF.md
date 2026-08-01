# OneDayCompany — Chat Handoff

## 1. Current product direction

OneDayCompany helps people turn what they already have into a business they are proud to build.

The product starts from what the user loves, knows, has experienced, imagines or would like to create. It must not require a business idea or evaluate whether the user is entrepreneurial enough.

The first AI-generated company is a recommended starting proposal, not a final decision. The user can:

- continue with the proposal;
- refine it;
- request something substantially different.

After the user chooses a company, OneDayCompany now generates the shortest practical path for making it real. The plan is not a static business plan: it is the operational navigation of the company.

Collaboration with Marco is in Italian. Public UI copy remains in English. AI-generated company content follows the language used by the user in the initial context.

## 2. Current repository flow

```text
Landing
  ↓
Company Beginning
  ↓
Company creation loading
  ↓
Company proposal
  ├── Continue with the proposal
  ├── Refine the proposal
  └── Show something different
        ↓
      Company creation loading
  ↓
Execution Plan loading
  ↓
Execution Plan
  ↓
Start first step
  ↓
Current Architect placeholder
```

The current Architect remains a temporary destination for the first execution step. It will be replaced by focused workflow hosts in a later milestone.

## 3. Completed milestones

### Guided Company Beginning

- Replaced the old Skills Form with a short, non-evaluative Company Beginning experience.
- The user can begin from interests, passions, knowledge, lived experience, imagination or something they want to create.
- Generation returns one coherent company proposal.
- The current `Company` contract includes:
  - `id`
  - `name`
  - `tagline`
  - `mission`
  - `problem`
  - `solution`
  - `firstOffer`
  - `idealCustomers`
  - `whyNow`
  - `futureExpansion`
  - `startupCost`
- The proposal page presents the result as a recommended starting point rather than a final answer.
- The user can request a substantially different proposal.
- The previous company is sent back to the model so alternatives are meaningfully different.

### Company creation loading

- Added `CompanyCreationLoading.tsx`.
- The loading screen rotates short progress messages with fade transitions.
- It is shown:
  - after the initial `Shape my company` action;
  - when requesting another proposal;
  - while refining the current proposal.

### Proposal refinement v1

- Added `RefinementDrawer.tsx`.
- The drawer provides:
  - guided refinement suggestions;
  - a free-text request;
  - one clear refinement action.
- Refinement evolves the current company instead of generating an unrelated one.
- The current company and refinement request are passed through the service, API route and AI generator.
- The prompt instructs the model to preserve unaffected strengths and change only what is necessary.

### Execution Plan v1

- Added a structured Execution Plan generated after the user chooses a company.
- The plan contains between three and five ordered steps.
- Every step:
  - begins with an action;
  - has one primary objective;
  - produces a visible, usable or verifiable outcome;
  - is realistic for one person;
  - is designed for low initial cost;
  - is associated with a supported workflow type.
- The AI generates only plan content.
- The application owns:
  - identifiers;
  - ordering;
  - status;
  - timestamps;
  - output references;
  - generation source.
- AI output is validated through strict JSON Schema and Zod.
- A deterministic fallback plan is returned when AI generation fails.
- Regenerating or refining a company clears the previous plan.
- Returning from the current Architect preserves the generated plan.

### Execution Plan loading

- Added `ExecutionPlanLoading.tsx`.
- The company creation loading and execution planning loading are now separate experiences.
- The Execution Plan transition uses:
  - `Every company starts differently.`
  - `We're preparing the simplest path for this one.`
- Rotating messages describe the practical work being organized:
  - understanding what the company needs first;
  - choosing the simplest actions;
  - putting steps in the right order;
  - preparing the company path.
- The transition does not mention AI, analysis or generic generation.

## 4. Current technical pipelines

### Company generation

```text
UI
  ↓
businessOpportunitiesService
  ↓
POST /api/business-opportunities
  ↓
shared OpenAI client
  ↓
OpenAI Responses API
  ↓
strict JSON Schema
  ↓
Zod validation
  ↓
typed Company output
```

### Execution Plan generation

```text
UI
  ↓
executionPlanService
  ↓
POST /api/execution-plan
  ↓
shared OpenAI client
  ↓
OpenAI Responses API
  ↓
strict JSON Schema
  ↓
Zod validation
  ↓
application materialization
  ↓
typed CompanyExecutionPlan
```

Both pipelines retain deterministic fallback behavior.

## 5. Execution Plan contract

The generated content contains:

```ts
type GeneratedExecutionPlan = {
  introduction: string;
  steps: Array<{
    title: string;
    reason: string;
    expectedOutcome: string;
    workflowType: ExecutionWorkflowType;
    completionCriteria: string[];
  }>;
};
```

The application materializes:

```ts
type CompanyExecutionPlan = {
  id: string;
  companyId: string;
  introduction: string;
  steps: ExecutionStep[];
  version: number;
  source: "ai" | "fallback";
  createdAt: string;
  updatedAt: string;
};
```

Supported workflow types currently include:

```text
offer-builder
landing-page-builder
booking-builder
contact-builder
social-launch-builder
outreach-builder
pricing-builder
portfolio-builder
custom-guided-step
```

`custom-guided-step` is a controlled fallback for valid actions that do not yet have a specialized builder. It must not become a generic chat.

## 6. Important current files

```text
app/page.tsx

app/components/CompanyBeginning.tsx
app/components/CompanyCreationLoading.tsx
app/components/BusinessOpportunitiesScreen.tsx
app/components/OpportunityCard.tsx
app/components/RefinementDrawer.tsx
app/components/ExecutionPlanLoading.tsx
app/components/ExecutionPlanScreen.tsx
app/components/Architect.tsx

app/lib/openai.ts
app/lib/businessOpportunitiesService.ts
app/lib/businessOpportunitiesSchema.ts
app/lib/aiBusinessOpportunitiesGenerator.ts
app/lib/fallbackBusinessGenerator.ts
app/lib/prompts/businessOpportunitiesPrompt.ts

app/lib/executionPlanService.ts
app/lib/executionPlanSchema.ts
app/lib/aiExecutionPlanGenerator.ts
app/lib/fallbackExecutionPlanGenerator.ts
app/lib/prompts/executionPlanPrompt.ts

app/api/business-opportunities/route.ts
app/api/execution-plan/route.ts

app/types/business.ts
```

## 7. Next coherent milestone

### First focused execution workflow

Replace the temporary transition from the first Execution Plan step to the placeholder Architect with one focused workflow.

Recommended first candidate:

```text
offer-builder
```

The milestone should:

- introduce a `WorkflowHost` or equivalent typed routing layer;
- open the workflow selected by `workflowType`;
- keep one screen and one objective;
- use the selected company and execution step as context;
- produce one structured output;
- define explicit completion criteria;
- update the step status without losing the plan;
- avoid generic conversational UI.

Do not implement all workflow types at once.

## 8. Technical environment

Local corporate networking may require CNTLM:

```text
Next.js
  ↓
HTTP_PROXY / HTTPS_PROXY
  ↓
CNTLM
  ↓
corporate proxy
  ↓
OpenAI
```

Rules:

- never commit `.env.local`;
- never commit proxy credentials;
- do not configure local proxy variables on Vercel;
- keep proxy support conditional;
- keep the shared OpenAI client as the single connection layer.

## 9. Working rules

- Work on one coherent milestone per chat.
- Prefer small, verifiable changes.
- Clearly identify affected files.
- Do not silently revise accepted product or architectural decisions.
- Run `npm run build` before every push.
- Update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` after substantial work.
