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

The product should support continuous progress for as long as the user wants to continue. It must not imply that the user should stop after a predetermined daily amount of work.

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

As the product evolves into proposal history, execution plans and focused workflows, navigation should use explicit typed workflow state rather than unrelated independent booleans.

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

The user should see three clear choices:

1. continue with the proposal;
2. refine it;
3. request something substantially different.

---

## DEC-025 — Refinement evolves the current company

**Status:** Accepted

Refinement should preserve the current company’s strongest unaffected parts and change only what is necessary to satisfy the user’s request.

The first refinement interface is a guided drawer with suggestions and a free-text field, not an open-ended generic chatbot.

---

## DEC-026 — Loading communicates visible progress

**Status:** Revised and accepted

Long-running generation should use short, product-specific progress messages rather than generic AI language.

Company creation and execution planning are different product moments and use separate loading experiences.

The Execution Plan transition communicates that OneDayCompany is organizing the simplest path for the selected company. It does not mention AI, analysis or generic generation.

---

## DEC-027 — Shared OpenAI client with optional proxy support

**Status:** Accepted

All OpenAI server-side calls use a shared client module.

When `HTTP_PROXY` or `HTTPS_PROXY` is configured locally, the client routes requests through the proxy. When those variables are absent, including on Vercel, the client uses a direct connection.

Proxy configuration, credentials and `.env.local` must never be committed.

---

## DEC-028 — The Execution Plan is operational navigation

**Status:** Revised and accepted

After the user chooses a company, OneDayCompany generates one ordered implementation step for each of the seven universal company capabilities.

The Execution Plan is not a static checklist, strategic document or business plan. It is the operational navigation of the active company.

Each step must:

- begin with a concrete action;
- have one primary objective;
- produce a visible, usable or verifiable result;
- be realistic for one person;
- remain low-cost;
- move the company toward launch, customers or revenue;
- connect to a focused workflow type.

The application defines the capability set and validates complete coverage. AI adapts the implementation, activities and appropriate workflow for each capability; it cannot omit, merge or invent capabilities.

---

## DEC-029 — AI plans; the application owns execution state

**Status:** Revised and accepted

For Execution Plans, AI generates only:

- introduction;
- title;
- reason;
- expected outcome;
- workflow type;
- ordered activity titles, descriptions and completion criteria;
- completion criteria.

The application owns:

- identifiers;
- ordering;
- status;
- timestamps;
- output references;
- source metadata;
- versioning.

AI must not regenerate or overwrite application-managed execution state.

Each execution step contains between two and five practical activities.
AI defines the activity content, while the application assigns activity
identifiers, ordering and status.

---

## DEC-030 — Focused workflows, not generic chat

**Status:** Accepted

Each Execution Plan step opens a workflow dedicated to one objective.

Workflow types are a controlled application capability set. The model may select a supported workflow type, but the application validates and routes it.

`custom-guided-step` may support valid actions without a dedicated builder, but it must still use a structured, goal-oriented flow and must not become a generic chatbot.

---

## DEC-031 — Universal company capabilities

**Status:** Accepted

Every OneDayCompany workspace begins from seven application-defined capabilities:

1. company foundation;
2. first customers;
3. first offer;
4. brand identity;
5. public presence;
6. promotional launch;
7. customer operations.

The application defines which capabilities every company needs. AI adapts how each capability is implemented for the specific company; it does not remove universal capabilities.

The Workspace presents durable capability cards rather than treating the company as only a linear checklist. Activities and execution steps remain the operational state behind each capability.

Public presence is the first visually emphasized launch capability because a clear public page and contact action make the company feel real and reachable. Its implementation may vary, including contact, booking, catalog, portfolio, waitlist, or another company-specific format.

Launch readiness is calculated from explicit required activities owned by the application. AI must not invent progress percentages.

---

## DEC-032 — Momentum-first execution order

**Status:** Accepted

The Workspace presents the next useful work in a momentum-first order that is
owned by the application and remains separate from AI-generated step order.

The initial priority is:

1. first offer;
2. brand identity;
3. public presence;
4. promotional launch;
5. customer operations;
6. first customers;
7. company foundation or external launch requirements still outstanding.

The first suggested work should be autonomous, creative, low-cost and capable
of producing a visible result. Permits, venue approvals, partner responses and
other external dependencies are introduced only when relevant and at the
latest responsible moment before the action they block.

Existing persisted plans are not silently regenerated or overwritten. The
application may reorder their presentation while preserving their content and
execution state.

---

## DEC-033 — Explicit acceptance for AI refinements

**Status:** Accepted

AI-assisted refinement of a company step or activity produces a structured
change proposal. It never writes directly to company, capability, execution,
or published-output state.

Before applying a proposal, the application must show the requested change,
its affected company elements, completed work that needs review, and any
lower-impact alternative identified by the model. Cascading changes are
applied only after the user explicitly selects `Accept changes`.

Published or completed outputs are not silently overwritten. When affected,
they become explicit review items in the proposed change set.

---

## DEC-034 — Company Workspace Home v1 baseline

**Status:** Accepted

The Company Workspace home is a capability task board rather than a linear
wizard or a generic assistant conversation.

The accepted baseline includes:

- one task card for every visible operational step;
- user-selectable activities with one expanded card at a time;
- per-step completion percentages in both cards and `Your progress`;
- Launch Readiness with a non-blocking recommended next action;
- Foundation information kept separate from operational progress;
- contextual refinement entry points on steps and activities;
- compact logo actions in the company header.

The visual `brand-identity` card is hidden because logo actions currently live
in the header. This does not remove the canonical capability from the domain,
schema, prompt or persisted plans. Removing or merging that capability requires
a separate explicit revision of DEC-031.

Dedicated implementations for offer, public presence, logo, promotion,
customer operations and refinement must proceed as separate focused milestones.
