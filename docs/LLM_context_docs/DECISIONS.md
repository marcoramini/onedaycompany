# OneDayCompany — Product and Architecture Decisions

This document records durable decisions, not daily implementation notes.

---

## DEC-001 — Product and generated-content language

**Status:** Accepted

Fixed public UI labels and product copy are written in English. Development discussions with Marco are conducted in Italian. AI-generated Company content follows the language used by the user in the initial context.

---

## DEC-002 — Canonical mission

**Status:** Accepted

> OneDayCompany helps people turn what they already have into a business they are proud to build.

---

## DEC-003 — Product category

**Status:** Accepted

OneDayCompany is an **AI-assisted Entrepreneur Operating System**. It must not become a generic chatbot, founder assessment or static business-plan generator.

---

## DEC-004 — Begin from the whole person

**Status:** Accepted

The product does not require a business idea or a list of skills. Interests, passions, experience, knowledge, curiosity and imagination can all become foundations.

---

## DEC-005 — Never evaluate the user

**Status:** Accepted

OneDayCompany never asks questions to judge whether the user is capable, qualified or entrepreneurial enough.

---

## DEC-006 — Guide, do not interview

**Status:** Accepted

Conversational elements may be used, but the experience must not feel like an interview, questionnaire or generic chat.

---

## DEC-007 — The Company begins today

**Status:** Accepted

OneDayCompany presents the business as already coming to life from the first interaction.

---

## DEC-008 — Landing actions

**Status:** Accepted

The primary new-user CTA is `Start my company`. The returning-user action is `Sign in`.

---

## DEC-009 — One Company proposal at a time

**Status:** Accepted

The product generates one Company proposal at a time. The user can continue, refine it or request a substantially different direction.

---

## DEC-010 — Workflow is the primary product asset

**Status:** Accepted

The durable value comes from methodology, workflow, structured state, persistence and user experience—not dependence on one model.

---

## DEC-011 — One screen, one objective

**Status:** Accepted

Each screen has one primary objective, decision or output.

---

## DEC-012 — Build visibly while validating

**Status:** Accepted

Validation happens through real-world action while the business takes shape.

---

## DEC-013 — Every stage produces an asset or action

**Status:** Accepted

Every meaningful stage produces a decision, structured hypothesis, visible business asset, validation action, customer action or measurable next step.

---

## DEC-014 — AI is an enabling layer

**Status:** Accepted

Public communication focuses on the user, the Company and concrete progress. AI remains behind the experience.

---

## DEC-015 — AI recommends; the user decides

**Status:** Accepted

AI may generate and refine proposals, but the user explicitly chooses what to build. Generated assumptions must not be presented as validated facts.

---

## DEC-016 — Low-cost and launchable Companies

**Status:** Accepted

Company proposals should be realistic for one person, require very low initial investment and avoid unnecessary operational complexity.

---

## DEC-017 — Structured AI output

**Status:** Accepted

Core AI-generated application data uses strict structured contracts and validation. JSON Schema and Zod contracts must remain aligned.

---

## DEC-018 — Prompt modules remain separate

**Status:** Accepted

Prompts remain typed modules outside implementation files.

---

## DEC-019 — Provider independence with proportionate abstraction

**Status:** Accepted

Domain models, workflow and UI must not depend directly on one AI provider.

---

## DEC-020 — Frontend stack

**Status:** Accepted

Use Next.js, React, TypeScript, Tailwind CSS, App Router and Vercel.

---

## DEC-021 — Component separation

**Status:** Accepted

Server pages coordinate authentication, queries and composition rather than containing large UI implementations.

---

## DEC-022 — Explicit typed workflow state

**Status:** Accepted

Navigation and workflow progression use explicit typed state as complexity grows.

---

## DEC-023 — Build verification before push

**Status:** Accepted

Before every push, run:

```bash
npm run lint
npm run build
```

---

## DEC-024 — The first proposal is a starting point

**Status:** Accepted

The first generated Company is a recommended starting proposal, not a final answer.

---

## DEC-025 — Refinement evolves the current Company

**Status:** Accepted

Refinement preserves unaffected strengths and changes only what is needed.

---

## DEC-026 — Loading communicates product progress

**Status:** Accepted

Long-running work uses product-specific progress messages rather than generic AI language.

---

## DEC-027 — Shared OpenAI client with optional proxy support

**Status:** Accepted

All OpenAI server calls use a shared client. Local proxy support is conditional and must not be configured on Vercel.

---

## DEC-028 — Execution Plan is operational navigation

**Status:** Accepted, temporarily deferred from the primary flow

The existing Execution Plan is preserved and will later become part of the persistent Console.

---

## DEC-029 — AI plans; the application owns execution state

**Status:** Accepted

AI generates content. The application owns identifiers, order, status, timestamps, versioning and output references.

---

## DEC-030 — Focused workflows, not generic chat

**Status:** Accepted

Execution steps open focused, typed workflows rather than a generic conversational agent.

---

## DEC-031 — Authentication happens after Company commitment

**Status:** Accepted

The user experiences meaningful value before registration. Authentication is framed as saving the Company and opening its workspace. Returning users may authenticate directly from the Landing.

---

## DEC-032 — Supabase is the initial identity and persistence platform

**Status:** Accepted for the current phase

The platform uses Supabase Auth, PostgreSQL, Row Level Security, `@supabase/ssr` and cookie-based sessions.

---

## DEC-033 — Google is the first authentication provider

**Status:** Accepted

Additional providers are deferred until justified by demand.

---

## DEC-034 — Pre-authentication Company state is temporary

**Status:** Accepted

The selected Company may use browser session state only to survive OAuth. Browser storage is not the source of truth.

---

## DEC-035 — Company ownership is enforced at the database boundary

**Status:** Accepted

Row Level Security and server-side ownership checks are both required.

---

## DEC-036 — Production OAuth must be branded

**Status:** Accepted as a pre-production requirement

Use a branded authentication domain or an authentication entry point hosted on the OneDayCompany domain before public launch.

---

## DEC-037 — One user may own multiple Companies

**Status:** Accepted

The active Company is determined by `/console/[companyId]`. There is no hidden global Company state.

---

## DEC-038 — `/console` is the stable returning-user entry point

**Status:** Accepted

`/console` opens the authenticated user's most recently used Company based on `last_opened_at`.

---

## DEC-039 — The Console is the permanent operating environment

**Status:** Accepted

Future Company capabilities should be coherent parts of the Console rather than disconnected pages or tools.

---

## DEC-040 — Company knowledge is persistent and connected

**Status:** Accepted

Identity, offers, customer knowledge, brand, tasks, documents, assets, website, marketing and sales should become persistent Company assets.

---

## DEC-041 — Company switching uses explicit routes

**Status:** Accepted

The Company switcher preserves the authenticated session and navigates between explicit Company routes.

---

## DEC-042 — The Console always recommends one next action

**Status:** Accepted

The Console may display broad Company knowledge, but it must always present one clear recommended next objective based on real Company state.

---

## DEC-043 — Visual generation is an external provider-independent service

**Status:** Accepted as a future architecture direction

Logo and illustration generation will use a provider adapter. The Company stores prompts, outputs and versions. The Console remains usable when image generation is slow or unavailable.

---

## DEC-044 — Credits and billing belong inside the Console

**Status:** Accepted

Plan, billing, credits and usage are part of the operating environment but must not dominate the business-building experience.
