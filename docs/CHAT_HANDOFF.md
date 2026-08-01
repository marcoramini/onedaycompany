# OneDayCompany — Chat Handoff

## 1. Current product direction

OneDayCompany helps people turn what they already have into a business they are proud to build.

The product starts from what the user loves, knows, has experienced, imagines or would like to create. It must not require a business idea or evaluate whether the user is entrepreneurial enough.

The first AI-generated company is a recommended starting proposal, not a final decision. The user can:

- continue with the proposal;
- refine it;
- request something substantially different.

The company should feel real and launchable while remaining open to evolution.

Collaboration with Marco is in Italian. Public UI copy remains in English. AI-generated company content follows the language used by the user in the initial context.

## 2. Current repository flow

```text
Landing
  ↓
Company Beginning
  ↓
Animated company creation loading
  ↓
Company proposal
  ├── Continue with the proposal
  ├── Refine the proposal
  └── Show something different
        ↓
      Animated loading
  ↓
Architect
```

## 3. Completed in the latest milestone

### Guided Company Beginning

- Replaced the old Skills Form with a short, non-evaluative Company Beginning experience.
- The user can begin from interests, passions, knowledge, lived experience, imagination or something they want to create.
- Generation returns one coherent company proposal.
- The company contract now includes:
  - `id`
  - `name`
  - `tagline`
  - `mission`
  - `problem`
  - `solution`
  - `firstOffer`
  - `idealCustomers`
  - `whyNow`
  - `futureExpansion`
  - `startupCost`
- The proposal page presents the result as a recommended starting point rather than a final answer.
- The user can request a substantially different proposal.
- The previous company is sent back to the model so alternatives are meaningfully different.

### Company creation loading

- Added `CompanyCreationLoading.tsx`.
- The loading screen rotates short progress messages with fade transitions.
- It is shown:
  - after the initial `Shape my company` action;
  - when requesting another proposal;
  - while refining the current proposal.

### Proposal refinement v1

- Added `RefinementDrawer.tsx`.
- The drawer provides:
  - guided refinement suggestions;
  - a free-text request;
  - one clear refinement action.
- Refinement evolves the current company instead of generating an unrelated one.
- The current company and refinement request are passed through the service, API route and AI generator.
- The prompt instructs the model to preserve unaffected strengths and change only what is necessary.

### Proposal action hierarchy

The proposal page now uses this hierarchy:

1. `Continue with {company.name}` — primary action.
2. `Refine this proposal` — secondary action.
3. `Show me something different` — tertiary action.

This avoids implying that every proposal is automatically wrong or must be refined.

### Language behavior

- The model detects the language used in the user's initial description.
- All generated customer-facing company content is returned in that language.
- The company name remains in the language that sounds most natural.

### AI infrastructure

- Added a shared OpenAI client in `app/lib/openai.ts`.
- Local development can use `HTTP_PROXY` or `HTTPS_PROXY` through CNTLM.
- Proxy use is optional.
- Vercel uses the normal direct connection because no proxy variables are configured there.
- Company generation uses structured output plus Zod validation.
- JSON Schema limits mirror the Zod limits.
- Longer output allowance prevents refinement JSON from being truncated.
- A temporary `/api/openai-health` route was used to verify connectivity and may be removed once production is stable.

## 4. Current technical pipeline

```text
UI
  ↓
businessOpportunitiesService
  ↓
POST /api/business-opportunities
  ↓
shared OpenAI client
  ↓
OpenAI Responses API
  ↓
strict JSON Schema
  ↓
Zod validation
  ↓
typed Company output
```

The API returns:

```ts
{
  company: Company;
  source: "ai" | "fallback";
}
```

A deterministic fallback remains available when AI generation fails.

## 5. Important current files

```text
app/page.tsx
app/components/CompanyBeginning.tsx
app/components/CompanyCreationLoading.tsx
app/components/BusinessOpportunitiesScreen.tsx
app/components/OpportunityCard.tsx
app/components/RefinementDrawer.tsx
app/components/Architect.tsx

app/lib/openai.ts
app/lib/businessOpportunitiesService.ts
app/lib/businessOpportunitiesSchema.ts
app/lib/aiBusinessOpportunitiesGenerator.ts
app/lib/fallbackBusinessGenerator.ts
app/lib/prompts/businessOpportunitiesPrompt.ts

app/api/business-opportunities/route.ts
app/api/openai-health/route.ts

app/types/business.ts
```

## 6. Next coherent milestone

### Guided Company Evolution v2

The next milestone should improve refinement without turning the product into a generic chatbot.

Recommended focus:

- assess the current drawer through user testing;
- decide whether refinement needs conversational history;
- preserve previous company versions;
- allow the user to compare or restore a prior proposal;
- improve loading copy for initial generation versus refinement;
- redesign Architect around the accepted or refined `Company`.

Do not implement full opportunity history or a general-purpose chat unless testing shows it is necessary.

## 7. Technical environment

Local corporate networking may require CNTLM:

```text
Next.js
  ↓
HTTP_PROXY / HTTPS_PROXY
  ↓
CNTLM
  ↓
corporate proxy
  ↓
OpenAI
```

Rules:

- never commit `.env.local`;
- never commit proxy credentials;
- do not configure local proxy variables on Vercel;
- keep proxy support conditional;
- keep the shared OpenAI client as the single connection layer.

## 8. Working rules

- Work on one coherent milestone per chat.
- Prefer small, verifiable changes.
- Clearly identify affected files.
- Do not silently revise accepted product or architectural decisions.
- Run `npm run build` before every push.
- Update `CHAT_HANDOFF.md`, `ROADMAP.md` and `CHANGELOG.md` after substantial work.
