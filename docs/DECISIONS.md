# OneDayCompany — Product and Architecture Decisions

This document records durable decisions.

Do not use it as a daily diary. Add or revise a decision only when it should guide future product or technical work.

---

## DEC-001 — Product language

**Status:** Accepted

All public product content, UI labels, prompts shown to users and user-facing output are written in English.

Development discussions with Marco are conducted in Italian.

**Reason:** The product is intended for an international audience, while collaboration is more efficient in Italian.

---

## DEC-002 — Canonical mission

**Status:** Accepted

The canonical mission is:

> OneDayCompany transforms skills into businesses.

---

## DEC-003 — Product category

**Status:** Accepted

OneDayCompany is an **Entrepreneur Operating System**.

It is a guided environment that moves a user from existing skills to a validated business, first offer, first customer and first revenue.

It must not be positioned or designed as a generic chatbot or static business-plan generator.

---

## DEC-004 — Start from skills, not business ideas

**Status:** Accepted

The onboarding starts by asking users what they are good at, what they know or what they have done.

The product should not require the user to arrive with a business idea.

**Reason:** Many potential users have valuable capabilities but lack a clear business direction. The product must reduce this initial ambiguity.

---

## DEC-005 — Workflow is the primary product asset

**Status:** Accepted

The product’s defensibility should come from the Product Method, workflow, decision logic, structured context, validation system and user experience—not dependence on a specific LLM.

**Implication:** Product stages and domain contracts must be defined independently from provider behavior.

---

## DEC-006 — One screen, one objective

**Status:** Accepted

Each screen should have one primary objective, one central user decision or one clear output.

**Reason:** Entrepreneurship is cognitively demanding. The interface must reduce simultaneous choices rather than multiply them.

---

## DEC-007 — Validation before unnecessary building

**Status:** Accepted

The workflow should move users toward customer evidence before recommending substantial work on websites, software, branding, automation or operations.

**Reason:** Early validation reduces wasted effort and improves the probability of building something people want.

---

## DEC-008 — Every stage produces a business asset or action

**Status:** Accepted

Every meaningful stage must produce at least one of:

- a decision;
- a structured hypothesis;
- a business asset;
- a validation experiment;
- market evidence;
- a customer action;
- a measurable next step.

Long generated reports without a decision or action are not sufficient product outcomes.

---

## DEC-009 — AI is an enabling layer, not the public product identity

**Status:** Accepted

AI should accelerate analysis, synthesis and creation inside the Product Method.

Public communication should focus primarily on the user outcome and the clarity of the process, not on AI technology.

**Reason:** Models will change and become more widely available. The durable value is the entrepreneurial system.

---

## DEC-010 — AI recommends; the user decides

**Status:** Accepted

AI may generate alternatives, recommendations and deliverables, but core business decisions remain explicit user decisions.

Generated assumptions must not be presented as validated facts.

---

## DEC-011 — Current public promise

**Status:** Accepted for the current landing direction

The current public promise is:

> Launch your next business in a few clear steps today.

The landing should create the feeling that clicking the primary call to action begins the business-building process immediately.

**Interpretation:** “Today” means the user can begin taking meaningful action now; it is not a guarantee that a complete successful company will be created in one day.

---

## DEC-012 — Public copy should inspire action, not explain the technology

**Status:** Accepted

The landing and acquisition copy should communicate:

- possibility;
- immediacy;
- clarity;
- progress from skills to business.

Avoid making AI the hero of the public narrative.

---

## DEC-013 — The Business Blueprint is a living hypothesis

**Status:** Accepted

The Business Blueprint is not a traditional or final business plan.

It is a structured set of current assumptions about:

- customer;
- problem;
- value proposition;
- offer;
- delivery;
- pricing;
- acquisition;
- validation;
- next action.

It should evolve when evidence is collected.

---

## DEC-014 — The Architect is a transition stage

**Status:** Accepted

The Architect represents the reasoning and generation phase between a selected Business Direction and the Business Blueprint.

It should not repeat the Business Direction content.

When real generation is introduced, it should reflect useful progress and recoverable processing—not an arbitrary artificial delay.

---

## DEC-015 — Define workflow and data contracts before AI integration

**Status:** Accepted

The Business Blueprint schema, stage objective and UX should be validated using deterministic or mocked data before real AI integration.

**Reason:** The product contract should define model behavior, not the reverse.

---

## DEC-016 — Structured AI output

**Status:** Accepted

AI-generated application data must use a structured contract and be validated before reaching UI state.

Raw provider prose must not become the only representation of core domain state.

---

## DEC-017 — Provider independence with proportionate abstraction

**Status:** Accepted

Domain models, workflow and UI must not depend on one AI provider.

Provider-specific code should be isolated behind a minimal adapter.

Do not create a large multi-provider abstraction before a concrete need exists.

---

## DEC-018 — Current frontend stack

**Status:** Accepted

Use:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- App Router;
- Vercel.

---

## DEC-019 — Component separation

**Status:** Accepted

Screen-level UI and reusable UI elements must remain separate from `page.tsx`.

`page.tsx` or its successor should coordinate workflow state and navigation rather than contain large UI sections or business-generation rules.

---

## DEC-020 — Explicit typed workflow state

**Status:** Accepted

Independent boolean navigation state is temporary.

Before the workflow grows beyond the current stages, navigation should move to an explicit typed workflow state, preferably a discriminated union when stage context becomes richer.

---

## DEC-021 — Temporary deterministic generator

**Status:** Accepted, temporary

The current Business Direction is generated through keyword-based TypeScript logic.

**Reason:** It allows workflow and UX testing without API cost or backend complexity.

**Replacement condition:** Replace or complement it when the relevant domain contract, stage UX and evaluation criteria are defined.

---

## DEC-022 — Persistence is introduced by product need

**Status:** Accepted

No database is required for the current prototype.

Persistence should be introduced when users need to resume workflows, manage multiple businesses, retain Blueprints and edits, accumulate validation evidence, authenticate or use paid features.

---

## DEC-023 — Deploy early and verify production

**Status:** Accepted

The prototype is deployed before full functionality.

Production preview:

https://onedaycompany.vercel.app/

Every meaningful release should be verified in the production deployment.

---

## DEC-024 — Build before push

**Status:** Accepted

Before every push:

```bash
npm run build
```

When available, also run linting and tests.

---

## DEC-025 — Documentation is project memory

**Status:** Accepted

Chat history must not be the only project memory.

Repository documentation is authoritative for:

- vision;
- Product Method;
- AI Method;
- architecture;
- durable decisions;
- roadmap;
- current session handoff.

---

## DEC-026 — Source of truth hierarchy

**Status:** Accepted

When information conflicts, use this order:

1. current repository code;
2. `DECISIONS.md`;
3. `PROJECT_BRIEF.md`;
4. `PRODUCT_METHOD.md`;
5. `VISION.md`;
6. `ARCHITECTURE.md`;
7. `ROADMAP.md`;
8. `CHAT_HANDOFF.md`;
9. previous chat context.

---

## DEC-027 — One coherent milestone per chat

**Status:** Accepted

A development chat should normally focus on one coherent milestone or technical problem.

At the end of a substantial session, update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` as appropriate. Update other documents when durable product or architecture decisions changed.
