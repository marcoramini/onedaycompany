# OneDayCompany — Chat Handoff

Update this file at the end of every substantial work session.

## 1. Current Product Vision

OneDayCompany is an Entrepreneur Operating System that guides users from existing skills to a validated business, first offer, first customer and first revenue.

Canonical mission:

> OneDayCompany transforms skills into businesses.

Current public promise:

> Launch your next business in a few clear steps today.

The product must not become a generic chatbot, static business-plan generator or disconnected collection of AI tools.

The workflow and Product Method are the primary assets. AI is an enabling layer.

## 2. Current production URL

https://onedaycompany.vercel.app/

## 3. Current implemented flow

```text
Landing
  ↓
Skills
  ↓
Business Direction
  ↓
The Architect
```

## 4. Current technical state

The application uses:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- App Router;
- Vercel.

The UI has been separated into reusable components.

The current Business Direction generator is deterministic and keyword-based.

No backend, AI API, database, authentication or persistence is currently implemented.

## 5. Last completed work

### Product and communication

- clarified OneDayCompany as an Entrepreneur Operating System;
- established that the Product Method and workflow are more important than any specific LLM;
- confirmed validation before unnecessary building;
- confirmed one screen, one objective;
- moved AI out of the center of public communication;
- defined the current landing promise around launching through a few clear steps today;
- treated the primary call to action as the immediate start of the business-building process.

### Documentation

- rewrote `PROJECT_BRIEF.md`;
- rewrote `VISION.md`;
- created `PRODUCT_METHOD.md`;
- created `AI_METHOD.md`;
- rewrote `ARCHITECTURE.md`;
- rewrote `ROADMAP.md`;
- expanded and rewrote `DECISIONS.md`;
- rewrote `CHAT_HANDOFF.md`.

### Existing implementation

- separated screen components from `page.tsx`;
- added `Architect`;
- added `ArchitectStep`;
- created typed `BusinessDirection` data;
- moved temporary generation logic to `lib/businessGenerator.ts`;
- deployed the prototype on Vercel.

## 6. Current milestone

### M1 — Business Blueprint v1

**User outcome:** Transform a selected Business Direction into a clear, actionable and testable business hypothesis.

Minimum Blueprint sections:

- target customer;
- customer problem;
- value proposition;
- first offer;
- delivery model;
- pricing hypothesis;
- acquisition starting point;
- main assumptions;
- validation experiment;
- first concrete action.

The Blueprint is a living hypothesis, not a traditional business plan.

## 7. Recommended next task

Implement **Business Blueprint v1 without real AI integration**.

Recommended sequence:

1. inspect the current repository and confirm it matches this handoff;
2. define `BusinessBlueprint` and any supporting types;
3. define which fields are user-derived and which are generated hypotheses;
4. create a deterministic Blueprint generator from `BusinessDirection`;
5. introduce an explicit typed workflow state;
6. create the Business Blueprint screen;
7. connect The Architect to the Blueprint;
8. add one clear validation-oriented next action;
9. verify backward navigation and responsive layout;
10. run `npm run build`;
11. review `git diff`;
12. deploy and verify Vercel;
13. update handoff, roadmap and changelog.

## 8. Files likely relevant to the next session

```text
src/app/page.tsx
src/app/types/business.ts
src/app/lib/businessGenerator.ts
src/app/components/Architect.tsx
src/app/components/ArchitectStep.tsx
src/app/components/BusinessDirectionScreen.tsx
src/app/components/Landing.tsx
docs/PROJECT_BRIEF.md
docs/PRODUCT_METHOD.md
docs/AI_METHOD.md
docs/ARCHITECTURE.md
docs/DECISIONS.md
docs/ROADMAP.md
docs/CHAT_HANDOFF.md
```

Adjust paths to match the actual repository. Repository code is the first source of truth.

## 9. Current technical debt

1. Workflow navigation uses several independent React state variables.
2. The Architect is static and does not yet perform generation.
3. No Business Blueprint domain type exists.
4. No Business Blueprint screen exists.
5. The generator is keyword-based.
6. No tests exist.
7. No production error monitoring exists.
8. No persistence exists.
9. No product analytics aligned with the Product Method exists.

## 10. Open product questions

These questions should be answered through the Blueprint milestone or later user testing, not by abstract debate alone:

- What is the smallest Blueprint that users understand and want to act on?
- Which fields should the user select or edit explicitly?
- How should assumptions be visually distinguished from evidence?
- What is the best first validation action after the Blueprint?
- Does the initial target user understand “Business Direction” and “Blueprint” without explanation?
- Which user segment should be prioritized for the first validation tests?
- Should The Architect show real progress steps once generation is server-side?

## 11. Working rules for the next assistant session

- Respond to Marco in Italian.
- Keep all public product copy and UI text in English.
- Read `PROJECT_BRIEF.md`, `DECISIONS.md`, `PRODUCT_METHOD.md` and this handoff before proposing changes.
- Treat current repository code as the first source of truth.
- Work on one coherent milestone.
- Prefer the smallest useful and verifiable implementation.
- Do not add AI integration before the Blueprint contract and UX are defined.
- Do not silently revise accepted product or architectural decisions.
- Identify affected files before implementation.
- Run `npm run build` before every push.
- At the end, update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` as appropriate.
