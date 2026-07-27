# OneDayCompany — Project Brief

## 1. Project identity

**Name:** OneDayCompany  
**Mission:** OneDayCompany transforms skills into businesses.  
**Product category:** Entrepreneur Operating System  
**Current public URL:** https://onedaycompany.vercel.app/

OneDayCompany is a guided system that helps people turn the skills they already have into a real business.

It does not stop at generating an idea or a business plan. It guides the user through a sequence of decisions, deliverables, experiments and real-world actions until they reach a first customer and first revenue.

## 2. Product vision

Many people already have valuable skills, experience and knowledge. What they lack is not necessarily potential or motivation, but a clear path from what they know to something another person will pay for.

OneDayCompany provides that path.

The long-term ambition is to make entrepreneurship more accessible by turning a complex and uncertain process into a guided sequence of clear steps.

The product should help millions of people create a business of their own—not by promising effortless success, but by helping them make better decisions, validate demand early and take concrete action.

## 3. Product promise

The current public promise is:

> Launch your next business in a few clear steps today.

The experience should make the user feel that starting is immediate: one click begins a concrete process that can lead from existing skills to a credible business direction and a first real action.

The promise is not that a complete, successful company can be created instantly. The promise is that the user can begin building a real business today through a clear and guided workflow.

## 4. Target user

The initial target user is a person who:

- has useful skills, experience or domain knowledge;
- wants more independence, income or professional optionality;
- is interested in starting a business but does not know what to build;
- feels blocked by uncertainty, complexity or too many possible directions;
- may not identify as an entrepreneur yet;
- needs a practical path rather than generic inspiration.

The product should also remain useful to repeat entrepreneurs who want to explore and validate a new business direction quickly.

## 5. User outcome

OneDayCompany should guide the user from:

```text
Skills
  ↓
Business Direction
  ↓
Customer and Problem
  ↓
First Offer
  ↓
Validation
  ↓
First Customer
  ↓
First Revenue
```

The user should leave each stage with a concrete business asset, a decision or a real-world action—not only generated text.

## 6. Core product principles

1. **One screen, one objective.**  
   Each screen should ask for one meaningful decision or produce one clear outcome.

2. **Every feature must increase the probability of starting a real business.**  
   Features that do not contribute to action, learning, validation or revenue should not be prioritized.

3. **Start from skills, not from a business idea.**  
   The product should help users discover possible businesses from what they already know.

4. **Validation before unnecessary building.**  
   The user should test demand before investing heavily in branding, websites, software or operations.

5. **Concrete actions over long explanations.**  
   The system should reduce ambiguity and tell the user what to decide, create or do next.

6. **The workflow is the product.**  
   The durable value lies in the method, sequence, decision logic and accumulated learning—not in any single AI model.

7. **AI supports the method.**  
   AI should accelerate research, synthesis and creation, but it should not replace user judgment or real market evidence.

8. **Progress must be visible.**  
   The user should always understand where they are, what they have completed and what comes next.

9. **Public product content is in English.**  
   Product UI, prompts shown to users and public-facing copy must be written in English.

10. **Development collaboration with Marco is in Italian.**

## 7. What the product is

OneDayCompany is:

- a guided entrepreneurial workflow;
- a decision and action system;
- a method for turning skills into validated offers;
- a workspace that accumulates business knowledge and evidence;
- an AI-assisted operating system for early-stage entrepreneurship.

## 8. What the product is not

OneDayCompany is not:

- a generic chatbot;
- a random business-idea generator;
- a static business-plan writer;
- a website builder disguised as a business platform;
- a collection of disconnected AI tools;
- a system that encourages users to build before validating demand;
- a promise of effortless or guaranteed business success.

## 9. Current product state

The current implemented flow is:

```text
Landing
  ↓
Skills
  ↓
Business Direction
  ↓
The Architect
```

Implemented:

- Next.js application;
- TypeScript;
- Tailwind CSS;
- App Router;
- landing page;
- skills input form;
- deterministic business-direction generator;
- business-direction screen;
- Architect transition screen;
- reusable React components;
- Vercel deployment;
- Git-based deployment workflow;
- initial documentation system.

Not yet implemented:

- Business Blueprint screen;
- real AI integration;
- server-side generation workflow;
- persistence and user accounts;
- validation tracking;
- first-offer workflow;
- customer outreach workflow;
- analytics and product telemetry;
- billing;
- production monitoring;
- legal and privacy pages.

## 10. Current milestone

**Milestone: Business Blueprint v1**

The next milestone should transform a selected Business Direction into a structured starting hypothesis containing at least:

- target customer;
- customer problem;
- value proposition;
- first offer;
- delivery model;
- pricing hypothesis;
- acquisition starting point;
- validation experiment;
- first concrete action.

The Blueprint is not a final business plan. It is a set of explicit assumptions that the user can inspect, refine and test.

The first implementation may use deterministic or mocked content. The priority is to validate the workflow, data contract and user experience before adding AI complexity.

## 11. Success criteria for the current milestone

The milestone is complete when:

1. the user can move from The Architect to a Business Blueprint;
2. the Blueprint is represented by a typed domain object;
3. every section is concise, actionable and editable in future iterations;
4. the UI keeps one clear objective per screen;
5. the Blueprint leads naturally to a validation action;
6. navigation is based on an explicit workflow state;
7. backward navigation works correctly;
8. the responsive experience is verified;
9. `npm run build` succeeds;
10. deployment succeeds on Vercel;
11. relevant documentation is updated.

## 12. Source of truth

When project information conflicts, use this order:

1. current repository code;
2. `DECISIONS.md`;
3. `PROJECT_BRIEF.md`;
4. `PRODUCT_METHOD.md`;
5. `VISION.md`;
6. `ARCHITECTURE.md`;
7. `ROADMAP.md`;
8. `CHAT_HANDOFF.md`;
9. previous chat context.
