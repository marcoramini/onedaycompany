# OneDayCompany — Project Brief

## 1. Project identity

**Name:** OneDayCompany  
**Public URL:** https://onedaycompany.vercel.app/  
**Mission:** OneDayCompany transforms skills into businesses.

OneDayCompany is an AI-assisted Entrepreneur Operating System designed to help people turn their existing skills into a concrete business opportunity.

The product should guide the user from personal skills to:

1. a business direction;
2. a validated customer problem;
3. a clear value proposition;
4. a first offer;
5. a simple business model;
6. a first MVP;
7. a brand and website;
8. the first customer;
9. the first revenue.

## 2. Vision

Artificial intelligence should not only help create a small number of billion-dollar companies. It should help millions of people create sustainable businesses of their own.

The long-term objective is to distribute entrepreneurial opportunity rather than concentrate further economic advantage.

The product's defensibility must not depend primarily on access to a particular LLM. The competitive advantage should come from:

- the method;
- the workflow;
- the decision framework;
- the user experience;
- the accumulated knowledge about how businesses are created;
- the quality of the transition from idea to real-world action.

## 3. Product principles

1. Every screen has one primary objective.
2. Every feature must increase the probability that the user starts a real business.
3. The product must reduce ambiguity and cognitive load.
4. The system should ask concrete questions instead of requesting abstract business plans.
5. The user should always know the next action.
6. AI output must be practical, structured and actionable.
7. The interface and all user-facing content are written in English.
8. Development discussions with Marco are conducted in Italian.
9. The workflow is more important than the underlying model.
10. The user should move quickly from reflection to contact with real customers.

## 4. Current product flow

Current implemented flow:

```text
Landing
  ↓
Skills
  ↓
Business Direction
  ↓
The Architect
```

Planned product flow:

```text
Landing
  ↓
Skills
  ↓
Business Direction
  ↓
The Architect
  ↓
Business Blueprint
  ↓
Business Model
  ↓
Validation
  ↓
First Customer
  ↓
First Revenue
```

## 5. Current implementation status

Implemented:

- Next.js application;
- TypeScript;
- Tailwind CSS;
- App Router;
- landing page;
- skills input form;
- rule-based business direction generator;
- business direction screen;
- Architect loading/progress screen;
- reusable React components;
- deployment on Vercel;
- Git-based deployment workflow.

Not yet implemented:

- real AI integration;
- backend/API route;
- persistence;
- authentication;
- database;
- business blueprint generation;
- validation workflow;
- analytics;
- billing;
- production error monitoring;
- domain name;
- privacy and legal pages.

## 6. Current technical structure

```text
src/
└── app/
    ├── page.tsx
    ├── components/
    │   ├── Architect.tsx
    │   ├── ArchitectStep.tsx
    │   ├── BusinessDirectionScreen.tsx
    │   ├── Landing.tsx
    │   ├── ResultCard.tsx
    │   └── SkillsForm.tsx
    ├── lib/
    │   └── businessGenerator.ts
    └── types/
        └── business.ts
```

The current generator is deterministic and keyword-based. It is temporary and will later be replaced or complemented by an AI-backed generation workflow.

## 7. Current state model

The current page uses these React states:

```ts
const [started, setStarted] = useState(false);
const [skills, setSkills] = useState("");
const [direction, setDirection] =
  useState<BusinessDirection | null>(null);
const [businessPlan, setBusinessPlan] = useState(false);
```

This is acceptable for the current prototype. Before the workflow grows significantly, it should be replaced by a single explicit workflow state, for example:

```ts
type Step =
  | "landing"
  | "skills"
  | "direction"
  | "architect"
  | "blueprint";

const [step, setStep] = useState<Step>("landing");
```

## 8. Deployment

Production preview:

https://onedaycompany.vercel.app/

Deployment model:

```text
local change
  ↓
npm run build
  ↓
git commit
  ↓
git push
  ↓
automatic Vercel deployment
```

## 9. Immediate next milestone

**Milestone: Business Blueprint v1**

The next useful milestone should transform the current business direction into a structured blueprint containing at least:

- target customer;
- customer problem;
- value proposition;
- first offer;
- delivery model;
- acquisition channel;
- pricing hypothesis;
- validation experiment;
- first concrete action.

The first implementation may still use deterministic or mocked data, but the data structure and UX should be designed as if an AI API will generate it later.

## 10. Success criteria for the next milestone

The milestone is complete when:

1. the user can move from The Architect to a Business Blueprint screen;
2. the blueprint is represented by a typed TypeScript object;
3. the screen is reusable and separated from `page.tsx`;
4. navigation backward works correctly;
5. `npm run build` succeeds;
6. the application deploys successfully on Vercel;
7. documentation and decisions are updated.
