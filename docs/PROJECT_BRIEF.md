# OneDayCompany — Project Brief

## 1. Project identity

**Name:** OneDayCompany  
**Mission:** OneDayCompany helps people turn what they already have into a business they are proud to build.  
**Product category:** AI-assisted Entrepreneur Operating System  
**Current public URL:** https://onedaycompany.vercel.app/

OneDayCompany helps an individual turn existing skills, knowledge, interests, passions, experience or imagination into a real, visible and low-cost business.

It does not stop at generating ideas or documents. It helps the user bring a company to life today and continue improving it one practical step at a time.

## 2. Product vision

OneDayCompany is built on the belief that every person already carries something worth building.

The target user may not identify as an entrepreneur, may not have a clear business idea and may underestimate their own abilities. The product must never make that person feel evaluated, unprepared or required to think like an experienced founder.

The experience should instead reinforce that what the user already knows, loves, notices, imagines or has lived through is enough to begin.

The business is not the final emotional promise. It is the practical vehicle through which the user can do work they enjoy, become proud of what they create, earn independently and improve their life one day at a time.

## 3. Product promise

The current landing concept is:

> Love what you build. Build what you love. Start today.

The product promises an immediate beginning, not distant transformation or guaranteed wealth.

Today is the day the company starts becoming real. Tomorrow the user continues improving it.

The first-day outcome should be a launchable business foundation:

- a clear direction;
- an initial identity;
- a simple offer;
- a public landing page;
- a contact or conversion mechanism;
- a concrete path to the first customer.

## 4. Target user

The primary user is a single person who:

- wants to change something in their working life;
- wants to build something of their own;
- may not yet have a business idea;
- may not believe they possess important skills;
- has interests, passions, experience, knowledge or imagination that can become useful foundations;
- wants visible progress without weeks of planning;
- needs confidence, direction and practical action rather than entrepreneurial jargon;
- wants to begin with low or almost no initial investment.

OneDayCompany may also support users who arrive with a more specific idea, but the product must not assume that level of clarity.

## 5. Intended user journey

The emerging onboarding direction is:

```text
Landing
  ↓
Guided company beginning
  ↓
One Business Opportunity
  ↓
Build it / Refine it / Try another direction
  ↓
Saved Opportunities
  ↓
Selected Company
  ↓
Offer, public presence and first customer action
```

The initial interaction should feel like the company is already taking shape. It must not feel like an assessment, questionnaire or founder interview.

One opportunity is generated at a time. If the user does not connect with it, another direction may be generated. Previous opportunities remain available for later selection.

## 6. Core product principles

1. **One screen, one objective.**  
   Each screen should create one clear decision, output or action.

2. **The company begins today.**  
   The product should present the business as already coming to life, not as an abstract idea to plan for later.

3. **Never evaluate the user.**  
   OneDayCompany never asks questions to judge whether the user is capable or prepared.

4. **Everything the user already has can count.**  
   Skills, interests, passions, experience, domain knowledge, curiosity and imagination can all become foundations.

5. **Guide, do not interview.**  
   Interactions should feel like encouraging steps in building the company, not data collection.

6. **One opportunity at a time.**  
   The user should react to a concrete company proposal rather than compare several generic options at once.

7. **Concrete action over explanation.**  
   Each step should make the company more visible, launchable or likely to succeed.

8. **Validation through real-world action.**  
   Validation matters, but it should happen while the business takes shape—not through long preliminary phases.

9. **Low-cost and launchable by default.**  
   Proposed businesses should be realistic for one person to begin with very low initial investment.

10. **The workflow is the durable product asset.**  
    The methodology, state and sequence matter more than any specific LLM.

11. **AI supports the method.**  
    AI should remain behind the experience and not become the public product identity.

12. **Public product language is English.**  
    Collaboration with Marco is in Italian.

## 7. What the product is

OneDayCompany is:

- a guided system for beginning a real company;
- a practical companion for a first-time entrepreneur;
- a workflow that transforms personal foundations into visible business assets;
- an AI-assisted Entrepreneur Operating System;
- a day-by-day path from beginning to customers and revenue.

## 8. What the product is not

OneDayCompany is not:

- a generic chatbot;
- a founder assessment;
- a long onboarding questionnaire;
- a random idea generator;
- a static business-plan writer;
- a promise of guaranteed wealth;
- a product that delays visible progress through excessive planning;
- a system designed only for experienced entrepreneurs.

## 9. Current implemented product state

Current repository flow:

```text
Landing
  ↓
Guided Company Beginning
  ↓
One Company proposal
  ├── Refine
  └── Try another direction
  ↓
Authentication and persistence
  ↓
Company Workspace
```

The Company Workspace is now the permanent operating home of a saved company.
It includes:

- authenticated ownership and support for multiple companies;
- permanent company deletion with explicit confirmation;
- persisted Execution Plans, steps and activities;
- application-defined universal company capabilities;
- momentum-first recommendations that favor autonomous, creative work;
- launch-readiness and per-step activity progress;
- task cards with expandable activities and completion criteria;
- company foundation, customer and offer context;
- compact logo controls in the company header;
- a visual prototype for contextual step and activity refinement.

The refinement prototype does not yet call the LLM or write changes. AI-assisted
refinement must produce an impact-aware proposal and requires explicit user
acceptance before any direct or cascading update.

Technical foundations include Next.js 16, React 19, TypeScript, Tailwind CSS,
Supabase authentication and persistence, server-side OpenAI Responses API,
strict JSON Schema and Zod validation, deterministic fallbacks and optional
local proxy support.

## 10. Completed milestone

**Milestone: Company Workspace Home v1**

The graphical and information architecture of the Workspace home is accepted
as the baseline. It makes the company feel tangible through its offer, public
presence, promotion, customer operations and visible progress, while keeping
the company foundation available as durable context.

The baseline deliberately separates presentation from future implementation:

- card actions can reveal persisted activities;
- logo generation, upload and editing are placeholders;
- dedicated workflows for each task remain to be implemented;
- contextual refinement is a UI shell pending a structured proposal contract;
- progress is partly static until workflow completion writes real state.

## 11. Next implementation strategy

Continue in separate, focused sessions. Each session should implement one
capability or one shared infrastructure boundary, beginning with one of:

1. structured AI refinement proposal and impact analysis;
2. first-offer workflow;
3. public-presence and landing-page workflow;
4. logo generation/upload workflow;
5. promotion workflow;
6. real activity completion and progress updates.

Do not implement several card workflows in one milestone.

## 12. Source of truth

1. Current repository code
2. `DECISIONS.md`
3. `PROJECT_BRIEF.md`
4. `ARCHITECTURE.md`
5. `ROADMAP.md`
6. `CHAT_HANDOFF.md`
7. Previous chat context
