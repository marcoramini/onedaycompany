# OneDayCompany — Project Brief

## 1. Project identity

**Name:** OneDayCompany  
**Mission:** OneDayCompany helps people turn what they already have into a business they are proud to build.  
**Product category:** AI-assisted Entrepreneur Operating System  
**Public product language:** English  
**Development collaboration language:** Italian

OneDayCompany helps an individual turn existing skills, knowledge, interests, passions, experience or imagination into a real, visible and low-cost business.

It does not stop at generating ideas or documents. It helps bring a company to life, preserve its business knowledge and continue improving it through practical actions.

## 2. Product vision

Every person already carries something worth building.

The target user may not identify as an entrepreneur, may not have a clear business idea and may underestimate their own abilities. OneDayCompany must never make that person feel evaluated, unprepared or required to think like an experienced founder.

The experience reinforces that what the user already knows, loves, notices, imagines or has lived through is enough to begin.

The business is the practical vehicle through which the user can do work they enjoy, create something visible, earn independently and improve their life.

## 3. Product promise

The accepted landing direction is:

> Love what you build. Build what you love. Start today.

Primary CTA:

> Start my company

Returning-user action:

> Sign in

The product promises an immediate beginning, not distant transformation or guaranteed wealth.

The first-day outcome should become a launchable Company foundation:

- a clear direction;
- an initial identity;
- a simple first offer;
- a persistent Company workspace;
- a visible next action;
- a path toward public presence and a first customer.

## 4. Target user

The primary user is one person who:

- wants to change something in their working life;
- wants to build something of their own;
- may not yet have a business idea;
- may not believe they possess important skills;
- has interests, passions, experience, knowledge or imagination that can become useful foundations;
- wants visible progress without weeks of planning;
- needs confidence, direction and practical action rather than entrepreneurial jargon;
- wants to begin with low or almost no initial investment.

## 5. Current user journey

```text
Landing
  ├── Start my company
  │     ↓
  │   Guided Company Beginning
  │     ↓
  │   Company creation loading
  │     ↓
  │   One Company proposal
  │     ├── Refine
  │     ├── Try another direction
  │     └── Let's build this
  │           ↓
  │         Save Company
  │           ↓
  │         Google authentication
  │           ↓
  │         Persist Profile, Company and first Offer
  │           ↓
  │         /console/[companyId]
  │
  └── Sign in
        ↓
      /console
        ↓
      Most recently opened Company
        ↓
      /console/[companyId]
```

The earlier in-memory Execution Plan remains implemented but is temporarily disconnected from the primary flow. It should later become part of the persistent Company workspace.

## 6. Core product principles

1. **One screen, one objective.**
2. **The Company begins today.**
3. **Never evaluate the user.**
4. **Everything the user already has can count.**
5. **Guide, do not interview.**
6. **One Company proposal at a time.**
7. **Concrete action over explanation.**
8. **Build visibly while validating.**
9. **Low-cost and launchable by default.**
10. **The workflow is the durable product asset.**
11. **AI supports the method.**
12. **The Console is the operating environment.**

## 7. The Console vision

The Console is not a generic dashboard, CRM or static business plan.

It is the persistent operating system of the active Company.

The user should feel that:

- meaningful work has already been completed;
- the Company already has a foundation;
- each section represents a real business asset;
- every asset can be refined over time;
- there is always one recommended next action.

The active Company is represented by:

```text
/console/[companyId]
```

The stable returning-user entry point is:

```text
/console
```

which opens the most recently used Company.

## 8. Persistent Company knowledge

The long-term Company workspace will contain persistent, connected assets such as:

- identity;
- mission and vision;
- positioning;
- offers;
- customer profiles;
- strategy;
- brand;
- tasks;
- documents;
- media assets;
- website;
- marketing;
- sales;
- plan and billing;
- credits and usage.

AI should update this business knowledge rather than continuously producing disconnected copies.

## 9. Current technical foundation

Implemented foundations include:

- Next.js App Router;
- React, TypeScript and Tailwind CSS;
- server-side OpenAI Responses API integration;
- strict JSON Schema and Zod validation;
- deterministic fallback generation;
- optional local corporate proxy support;
- Supabase Auth and PostgreSQL;
- cookie-based SSR sessions;
- Row Level Security;
- Google OAuth;
- persistent Profiles, Companies and Offers;
- idempotent Company creation;
- returning-user sign-in;
- multiple Companies per user;
- `last_opened_at`;
- Company switching foundation;
- protected Console routes.

## 10. Current milestone

### Milestone 3B.0.3 — Console Shell

Rebuild the Console with a clean modular structure:

- desktop sidebar;
- mobile header;
- integrated Company switcher;
- central content area;
- account area;
- plan placeholder;
- credits placeholder;
- logout;
- responsive layout;
- minimal server composition page.

No new tables, AI calls or generated images are required for this milestone.

## 11. Next milestones

### 3B.1 — Console Overview

Populate the Console using real persisted and derived Company data.

### 3B.2 — Business Knowledge Expansion

Extend persistent structured data for vision, unique value, customer profile, pricing, delivery, tone of voice and visual direction.

### 3B.3 — Visual Asset Service

Introduce a provider-independent external media service for logos and illustrations.

## 12. What OneDayCompany is not

OneDayCompany is not:

- a generic chatbot;
- a founder assessment;
- a long onboarding questionnaire;
- a random idea generator;
- a static business-plan writer;
- a promise of guaranteed wealth;
- a collection of disconnected AI tools;
- a complex dashboard filled with irrelevant widgets.
