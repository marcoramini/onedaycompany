# OneDayCompany — Architecture and Product Decisions

This document records durable decisions. Do not use it as a daily diary.

---

## DEC-001 — Product language

**Status:** Accepted

All public product content, UI labels and user-facing output are written in English.

Development discussions with Marco are conducted in Italian.

**Reason:** The product is intended for an international audience while collaboration is more efficient in Italian.

---

## DEC-002 — Mission statement

**Status:** Accepted

The canonical mission is:

> OneDayCompany transforms skills into businesses.

---

## DEC-003 — Start from skills, not business ideas

**Status:** Accepted

The onboarding starts by asking users what they are good at.

The product should not begin with:

> What business do you want to create?

**Reason:** Many users have useful skills but do not yet have a business idea. The product must reduce this initial ambiguity.

---

## DEC-004 — Workflow is the primary asset

**Status:** Accepted

The product's defensibility should come from the method, workflow and user experience rather than dependence on a specific LLM.

---

## DEC-005 — One screen, one objective

**Status:** Accepted

Each screen should have one primary action and one clear outcome.

**Reason:** Entrepreneurship is already cognitively demanding. The interface must reduce choices rather than multiply them.

---

## DEC-006 — Current frontend stack

**Status:** Accepted

Use:

- Next.js;
- TypeScript;
- Tailwind CSS;
- App Router;
- Vercel.

---

## DEC-007 — Component separation

**Status:** Accepted

Screen-level UI and reusable UI elements must be separated from `page.tsx`.

`page.tsx` should coordinate state and navigation.

---

## DEC-008 — Temporary deterministic generator

**Status:** Accepted, temporary

The current business direction is generated through keyword-based TypeScript logic.

**Reason:** It allows the workflow and UX to be tested before adding API cost and backend complexity.

**Replacement condition:** Replace or complement it when the Business Blueprint data contract and user journey are stable enough to justify AI integration.

---

## DEC-009 — The Architect is a transition stage

**Status:** Accepted

The Architect represents the AI reasoning/generation stage between Business Direction and the generated Business Blueprint.

It should not display the same content as Business Direction.

---

## DEC-010 — Deploy early

**Status:** Accepted

The prototype is deployed on Vercel before it has full functionality.

**Reason:** Early deployment validates the real production environment, mobile access and continuous delivery workflow.

Production preview:

https://onedaycompany.vercel.app/

---

## DEC-011 — Documentation is project memory

**Status:** Accepted

Chat history must not be the only project memory.

The repository documentation is the authoritative source for:

- vision;
- architecture;
- decisions;
- roadmap;
- current status;
- session handoff.

---

## DEC-012 — New chats use a handoff package

**Status:** Accepted

Each substantial new work session should begin with:

1. `PROJECT_BRIEF.md`;
2. `CHAT_HANDOFF.md`;
3. the relevant source files or Git diff;
4. a precise objective for the session.

At the end of the session, the handoff and affected documentation must be updated.
