# OneDayCompany — Chat Handoff

## 1. Current direction

OneDayCompany is an AI-assisted Entrepreneur Operating System that helps one person turn what they already have into a real Company.

The current strategic shift is from a temporary linear generation flow toward a persistent Company Console.

The Console is the permanent operating environment of the active Company.

Public UI copy is in English. Collaboration with Marco is in Italian.

## 2. Current primary flow

```text
Landing
  ├── Start my company
  │     ↓
  │   Company Beginning
  │     ↓
  │   Generate one Company proposal
  │     ├── Refine
  │     ├── Try another direction
  │     └── Let's build this
  │           ↓
  │         Save Company
  │           ↓
  │         Google OAuth
  │           ↓
  │         Persist Profile, Company and Offer
  │           ↓
  │         /console/[companyId]
  │
  └── Sign in
        ↓
      /console
        ↓
      Last opened Company
```

## 3. Completed platform work

### Company creation

- Guided non-evaluative beginning.
- One Company proposal at a time.
- Structured Company contract.
- Refinement drawer.
- Alternative direction generation.
- Product-specific loading states.
- AI and deterministic fallback generation.

### Persistence and authentication

- Supabase Auth.
- Supabase PostgreSQL.
- Google OAuth.
- SSR cookie sessions.
- Profiles.
- Companies.
- Offers.
- Row Level Security.
- Idempotent Company creation.
- Protected routes.
- Sign-out.
- Returning-user sign-in.

### Multiple Companies

- `companies.last_opened_at`.
- Company list query.
- `/console` redirect to last opened Company.
- `CompanySwitcher`.
- `OpenedCompanyTracker`.
- `Start another company`.

### Local network support

```text
Next.js server
  ↓
HTTP_PROXY / HTTPS_PROXY
  ↓
undici EnvHttpProxyAgent
  ↓
CNTLM or local proxy bridge
  ↓
corporate proxy
  ↓
Supabase / OpenAI
```

Do not configure local proxy variables on Vercel.

## 4. Important current issue

`app/console/[companyId]/page.tsx` has been modified incrementally several times.

Recent lint output showed unused warnings for Console components and loaded data. The syntax error was resolved, but the page is not considered clean or final.

Decision:

> Do not keep patching the page. Rewrite it as a small server composition page during the next milestone.

## 5. Current milestone

### 3B.0.3 — Console Shell

Required outcome:

- sidebar desktop;
- mobile header;
- integrated Company switcher;
- central content area;
- account area;
- Free plan placeholder;
- credits and usage placeholder;
- logout;
- future navigation visible but inactive;
- responsive behavior;
- minimal `page.tsx`.

No new tables, AI calls or generated images.

## 6. Expected component boundaries

```text
CompanyConsolePage
  ↓
ConsoleShell
  ├── ConsoleSidebar
  │     ├── CompanySwitcher
  │     ├── Navigation
  │     └── User / Plan / Logout
  ├── MobileHeader
  └── MainContent
        ├── CompanyConsoleHeader
        └── Current overview content
```

`CompanyConsolePage` should own authentication, queries, ownership verification, user preparation and composition. It should not own the full Console markup.

## 7. Files most relevant to the next session

```text
LLM context docs/PROJECT_BRIEF.md
LLM context docs/DECISIONS.md
LLM context docs/ROADMAP.md
LLM context docs/CHAT_HANDOFF.md
LLM context docs/ARCHITECTURE_SNAPSHOT.md
LLM context docs/REPOSITORY_MAP.md

app/console/page.tsx
app/console/[companyId]/page.tsx
app/console/[companyId]/not-found.tsx

app/components/console/ConsoleShell.tsx
app/components/console/ConsoleSidebar.tsx
app/components/console/CompanyConsoleHeader.tsx
app/components/console/CompanySwitcher.tsx
app/components/console/OpenedCompanyTracker.tsx

app/lib/companies/companyQueries.ts
app/lib/companies/companySwitcher.ts

app/lib/supabase/server.ts
app/lib/supabase/proxy.ts
app/lib/network/serverFetch.ts

app/auth/signout/route.ts
proxy.ts
package.json
```

## 8. Repository correction

Migration files now use:

```text
supabase/migrations/
```

The previous repeated nested path was accidental and has been corrected.

## 9. Deferred work

Do not implement during Console Shell unless required:

- complete Overview cards;
- richer Company knowledge;
- image generation;
- media microservice;
- billing enforcement;
- credit accounting;
- persistent Execution Plan;
- focused Offer builder;
- document center.

## 10. Next session method

1. Read the LLM context docs.
2. Inspect the actual source files.
3. Confirm final component boundaries.
4. Rewrite one file at a time.
5. Run `npm run lint`.
6. Run `npm run build`.
7. Test desktop and mobile.
8. Review the diff.
9. Update these context documents after verification.
