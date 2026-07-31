# OneDayCompany — Chat Handoff

## 1. Current product direction

OneDayCompany helps people turn what they already have into a business they are proud to build.

The product is for people who may not consider themselves entrepreneurs, may not have a clear business idea and may underestimate their skills. It should help them begin today from interests, passions, experience, knowledge, curiosity or imagination.

OneDayCompany never evaluates the user. Every interaction reinforces that the user already has enough to begin and that their company is already taking shape.

Public UI and product copy are in English. Collaboration with Marco is in Italian.

## 2. Product principles established in the latest session

- The company begins today, not in a distant imagined future.
- Tomorrow is for continued improvement, one practical step at a time.
- The product must guide rather than interview.
- Initial prompts must not assume entrepreneurial knowledge.
- Avoid asking for a first customer, target market or similar founder concepts at the beginning.
- Everything the user already has can count.
- The interaction should help the user recognize value in themselves and what they love doing.
- Generate one Business Opportunity at a time.
- The user can build it, refine it or request another direction.
- Previously generated opportunities remain available for later selection.

## 3. Landing decision

The accepted central message is:

> Love what you build. Build what you love. Start today.

Primary CTA:

> Start my company

Supporting concepts:

> You already have something worth building.

> You don't need a business idea. You only need to begin.

A replacement `Landing.tsx` was proposed with:

- minimal header;
- large three-line hero;
- violet emphasis on `Start today.`;
- dark primary CTA;
- three lower sections: `Begin as you are`, `Build today`, `Grow every day`.

Repository code remains the first source of truth. Confirm whether this proposed component has been pasted into the repository, then run `npm run build` before committing or deploying.

## 4. Current repository flow before the next milestone

```text
Landing
  ↓
Skills form
  ↓
Three Business Opportunities
  ↓
The Architect
```

This current flow is technically functional but no longer matches the intended product direction.

## 5. Existing technical foundation to preserve

The Business Opportunity pipeline currently includes:

```text
UI
  ↓
businessOpportunityService
  ↓
POST /api/business-opportunities
  ↓
OpenAI Responses API
  ↓
strict JSON Schema
  ↓
Zod validation
  ↓
typed BusinessDirection output
```

Resilience includes a deterministic fallback generator and an API source indicator (`ai` or `fallback`).

Prompts are separated from implementation, currently using a module such as:

```text
app/lib/prompts/businessOpportunityPrompt.ts
```

The existing output contract generates exactly three opportunities. The next milestone will intentionally change this to one opportunity at a time.

## 6. Current opportunity model

The opportunity structure has been migrated to:

```text
id
name
motto
vision
overview
skillAffinity
distinctiveness
initialCapital
additionalSkills
```

The prompt was improved to produce differentiated, branded and customer-facing businesses rather than three versions of generic consulting.

Do not continue optimizing the old three-card prompt before redesigning the onboarding and one-opportunity flow.

## 7. Next coherent milestone

### Guided Company Beginning v1

Replace `SkillsForm` with a short guided interaction that:

- starts from what the user loves, knows, imagines or wants to create;
- does not feel like an interview or assessment;
- avoids narrow or entrepreneurial questions;
- provides encouragement and visible progress;
- gathers enough context to generate one company proposal;
- reinforces that the company is already being built.

Then adapt generation to return one opportunity and support:

- `Let's build this`
- `Refine this idea`
- `Try a different direction`
- saved previous opportunities

Work in small steps. The first step in the next chat should be product/UX design of the replacement for `SkillsForm`, followed by identification of affected files. Do not implement the entire opportunity history architecture in the first change unless it is required by the chosen smallest milestone.

## 8. Likely affected files

Confirm paths against the repository before changes:

```text
app/page.tsx
app/components/SkillsForm.tsx
app/components/BusinessOpportunitiesScreen.tsx
app/components/OpportunityCard.tsx
app/lib/businessOpportunityService.ts
app/lib/businessOpportunitySchema.ts
app/lib/aiBusinessOpportunityGenerator.ts
app/lib/fallbackBusinessGenerator.ts
app/lib/prompts/businessOpportunityPrompt.ts
app/api/business-opportunities/route.ts
app/types/business.ts
```

New components and types may be preferable rather than forcing the new concept into `SkillsForm`.

## 9. Technical environment

Local corporate network may require an optional local bridge such as CNTLM:

```text
Next.js → LOCAL_PROXY_URL → local bridge → corporate NTLM proxy → OpenAI
```

Never commit `.env.local`, secrets, proxy credentials or bridge configuration. Do not configure `LOCAL_PROXY_URL` on Vercel.

## 10. Working rules

- One coherent milestone per chat.
- Small, verifiable changes.
- Discuss alternatives before significant architecture changes.
- Clearly identify affected files.
- Do not silently revise accepted decisions.
- Run `npm run build` before every push.
- Update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` after substantial work.
