# OneDayCompany — Chat Handoff

## 1. Current product direction

OneDayCompany transforms skills into businesses.

It is an AI-assisted Entrepreneur Operating System that guides a user from existing skills to a validated business, first offer, first customer and first revenue. The workflow and Product Method are the core product assets; AI is a structured enabling layer, not a generic chatbot.

Public product content and UI copy are written in English. Collaboration with Marco is conducted in Italian.

## 2. Current implemented flow

```text
Landing
  ↓
Skills
  ↓
Business Opportunities
  ↓
The Architect
```

The user enters skills and receives exactly three distinct Business Opportunity hypotheses. The user selects one before entering The Architect.

## 3. Completed milestone — AI-backed Business Opportunities

Implemented architecture:

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
three BusinessDirection objects
```

Resilience path:

```text
AI timeout / provider error / invalid output
  ↓
deterministic fallback generator
  ↓
validated directions
  ↓
HTTP 200 with source: fallback
```

The API response identifies the source as `ai` or `fallback`. The UI is independent from the provider, model and prompt.

## 4. Local corporate proxy

The corporate network uses an NTLM-authenticated proxy. The application does not implement NTLM.

Local development uses an optional local bridge such as CNTLM:

```text
Next.js → LOCAL_PROXY_URL → CNTLM → corporate NTLM proxy → OpenAI
```

`.env.local` may contain:

```env
OPENAI_API_KEY=...
OPENAI_BUSINESS_MODEL=...
LOCAL_PROXY_URL=http://127.0.0.1:3128
```

Vercel must contain only the OpenAI variables. Do not configure `LOCAL_PROXY_URL` on Vercel; the server then connects directly. Never commit `.env.local`, proxy credentials or CNTLM configuration.

## 5. Main files affected by the completed milestone

Paths should be confirmed against the repository, which remains the first source of truth.

```text
app/page.tsx
app/components/SkillsForm.tsx
app/components/BusinessOpportunitiesScreen.tsx
app/lib/businessOpportunityService.ts
app/lib/businessOpportunitySchema.ts
app/lib/aiBusinessOpportunityGenerator.ts
app/lib/fallbackBusinessGenerator.ts
app/api/business-opportunities/route.ts
app/types/business.ts
package.json
```

## 6. Current technical behavior

- OpenAI is called only from the server.
- Structured output must contain exactly three opportunities.
- Zod validates provider and fallback output before it reaches UI state.
- Skills remain available after recoverable errors.
- The user can retry generation.
- The deterministic fallback preserves the workflow during provider outages.
- Local proxy support is activated only by `LOCAL_PROXY_URL`.
- Vercel uses direct network access.

## 7. Verification required before push

Run locally from the real repository:

```bash
npm run build
```

Then verify:

1. AI path returns `source: "ai"`.
2. A forced provider failure returns `source: "fallback"`.
3. No secret or `.env.local` appears in `git status`.
4. `LOCAL_PROXY_URL` is not configured in Vercel.

## 8. Next milestone

### M1 — Business Blueprint v1

**User outcome:** turn the selected Business Opportunity into a concise, inspectable and actionable business hypothesis.

Recommended sequence:

1. Define `BusinessBlueprint` and supporting domain types.
2. Define which fields are user-derived, generated assumptions or later evidence.
3. Create a deterministic Blueprint contract before expanding AI behavior.
4. Introduce an explicit typed workflow state.
5. Build the Business Blueprint screen.
6. Connect The Architect to the Blueprint.
7. End with one clear validation action.
8. Add backward navigation and responsive checks.
9. Run build, review diff, deploy and update documentation.

## 9. Working rules

- Work on one coherent milestone per chat.
- Prefer small, verifiable changes.
- Clearly identify affected files.
- Do not silently revise accepted decisions.
- Require `npm run build` before every push.
- Update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` at the end of substantial sessions.
