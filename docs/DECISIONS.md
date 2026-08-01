# OneDayCompany — Product and Architecture Decisions

This document records durable decisions. It is not a daily diary.

---

## DEC-001 — Product and generated-content language

**Status:** Revised and accepted

Public product UI labels and fixed product copy are written in English.

Development discussions with Marco are conducted in Italian.

AI-generated company content follows the language used by the user in the initial context. The company name should remain in the language that sounds most natural and should not be translated unnecessarily.

---

## DEC-002 — Canonical mission

**Status:** Revised and accepted

The canonical mission is:

> OneDayCompany helps people turn what they already have into a business they are proud to build.

The earlier formulation, “transforms skills into businesses,” is too narrow because the product may begin from interests, passions, experience, knowledge, imagination or aspirations—not only explicit skills.

---

## DEC-003 — Product category

**Status:** Accepted

OneDayCompany is an **AI-assisted Entrepreneur Operating System**.

It must not be positioned or designed as a generic chatbot, founder assessment or static business-plan generator.

---

## DEC-004 — Begin from the whole person, not only skills

**Status:** Revised and accepted

The product must not require the user to identify important skills or arrive with a business idea.

The beginning may uncover:

- interests;
- passions;
- experience;
- knowledge;
- curiosity;
- imagination;
- things the user enjoys doing;
- things the user would be proud to build.

Everything the user already has can count.

---

## DEC-005 — OneDayCompany never evaluates the user

**Status:** Accepted

OneDayCompany never asks questions to determine whether the user is capable, qualified or entrepreneurial enough.

Every interaction must reinforce that the user already has enough to begin. The purpose of each step is to uncover the foundations of a company that is already starting to take shape.

---

## DEC-006 — Guide, do not interview

**Status:** Accepted

The initial interaction may use conversational elements, but it must not feel like an interview, questionnaire or generic chat.

Prompts should be framed as encouraging steps in starting the company. Avoid language that assumes entrepreneurial expertise, such as asking for the first customer, target market or validated problem before the user is ready.

---

## DEC-007 — The company begins today

**Status:** Accepted

OneDayCompany presents the business as already coming to life from the first interaction.

The product should not sell a distant future or ask the user to imagine where they will be in one year. Today is the moment of change; tomorrow the user continues improving the business one practical step at a time.

---

## DEC-008 — Current landing message

**Status:** Accepted

The current central landing message is:

> Love what you build. Build what you love. Start today.

Supporting copy should communicate that the user already has something worth building and does not need a perfect business idea to begin.

The primary CTA is:

> Start my company

---

## DEC-009 — One company proposal at a time

**Status:** Accepted

The intended experience generates one company proposal at a time.

After receiving it, the user can:

- continue building it;
- refine it;
- request a substantially different proposal.

The proposal is a guided starting point, not a final decision.

This replaces the earlier direction of presenting exactly three opportunities simultaneously.

---

## DEC-010 — Workflow is the primary product asset

**Status:** Accepted

The durable value comes from the Product Method, workflow, decision logic, structured state, validation system and user experience—not dependence on one model.

---

## DEC-011 — One screen, one objective

**Status:** Accepted

Each screen should have one primary objective, one central user decision or one clear output.

---

## DEC-012 — Build visibly while validating

**Status:** Revised and accepted

Validation remains essential, but it should occur through real-world action while the business takes shape.

Do not delay visible creation through long preliminary research phases. Prefer a simple launchable foundation, customer contact and evidence over unnecessary building or speculative planning.

---

## DEC-013 — Every stage produces a business asset or action

**Status:** Accepted

Each meaningful stage must produce at least one decision, structured hypothesis, visible business asset, validation action, customer action or measurable next step.

---

## DEC-014 — AI is an enabling layer, not the public identity

**Status:** Accepted

Public communication focuses on the user, their company and concrete progress. AI remains behind the experience.

---

## DEC-015 — AI recommends; the user decides

**Status:** Accepted

AI may generate and refine company proposals, but the user explicitly decides what to continue building. Generated assumptions must not be presented as validated facts.

---

## DEC-016 — Low-cost, simple and launchable companies

**Status:** Accepted

Company proposals should be realistic for one person, begin with very low or almost no initial investment and avoid unnecessary operational complexity.

They should feel like recognizable companies, not merely obvious freelance services.

---

## DEC-017 — Structured AI output

**Status:** Accepted

Core AI-generated application data must use structured contracts and validation before reaching UI state.

The JSON Schema used for generation and the Zod schema used for application validation must remain aligned, including field-length constraints.

---

## DEC-018 — Prompt modules remain separate

**Status:** Accepted

Prompts are stored as typed TypeScript modules outside implementation files, with one file per product capability where practical.

Example:

```text
app/lib/prompts/businessOpportunitiesPrompt.ts
```

---

## DEC-019 — Provider independence with proportionate abstraction

**Status:** Accepted

Domain models, workflow and UI must not depend directly on one AI provider. Provider-specific code should remain isolated without creating unnecessary abstraction.

---

## DEC-020 — Current frontend stack

**Status:** Accepted

Use Next.js, React, TypeScript, Tailwind CSS, App Router and Vercel.

---

## DEC-021 — Component separation

**Status:** Accepted

Screen-level UI and reusable components remain separate from `page.tsx`. Workflow coordination must not absorb large UI sections or generation rules.

---

## DEC-022 — Explicit typed workflow state

**Status:** Accepted

As the onboarding evolves into proposal history, refinement and selection, navigation should use explicit typed workflow state rather than unrelated independent booleans.

---

## DEC-023 — Build verification before push

**Status:** Accepted

Before every push, run:

```bash
npm run build
```

---

## DEC-024 — The first proposal is a starting point

**Status:** Accepted

The first generated company must be presented as OneDayCompany’s recommended starting proposal, not as a final or unquestionable answer.

The interface must avoid implying either that the proposal is definitive or that it is already wrong.

The user should see three clear choices:

1. continue with the proposal;
2. refine it;
3. request something substantially different.

---

## DEC-025 — Refinement evolves the current company

**Status:** Accepted

Refinement should preserve the current company’s strongest unaffected parts and change only what is necessary to satisfy the user’s request.

The system should not generate an unrelated company during refinement unless the user explicitly asks for a fundamentally different direction.

The first refinement interface is a guided drawer with suggestions and a free-text field, not an open-ended generic chatbot.

---

## DEC-026 — Loading communicates visible progress

**Status:** Accepted

AI generation and refinement should use a dedicated loading experience with short rotating progress messages.

The loading experience should reassure the user that OneDayCompany is actively building or reshaping the company, rather than leaving the interface apparently frozen.

---

## DEC-027 — Shared OpenAI client with optional proxy support

**Status:** Accepted

All OpenAI server-side calls use a shared client module.

When `HTTP_PROXY` or `HTTPS_PROXY` is configured locally, the client routes requests through the proxy. When those variables are absent, including on Vercel, the client uses a direct connection.

Proxy configuration, credentials and `.env.local` must never be committed.
