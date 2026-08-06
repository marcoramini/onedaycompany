# OneDayCompany — Architecture Snapshot

## 1. Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel
- Supabase Auth
- Supabase PostgreSQL
- `@supabase/ssr`
- OpenAI Responses API
- Zod
- `undici` for conditional server proxy support

## 2. Current boundaries

```text
Public experience
  ├── Landing
  ├── Sign in
  └── Guided Company Beginning

Company generation
  ├── client service
  ├── API Route Handler
  ├── prompt module
  ├── AI generator
  ├── strict schema validation
  └── deterministic fallback

Authentication
  ├── Google OAuth
  ├── Supabase callback exchange
  ├── SSR session cookies
  ├── Proxy refresh
  └── Sign-out Route Handler

Persistence
  ├── Profiles
  ├── Companies
  ├── Offers
  ├── ownership policies
  ├── idempotent creation
  └── last-opened tracking

Console
  ├── stable /console entry
  ├── active /console/[companyId] route
  ├── CompanySwitcher
  ├── OpenedCompanyTracker
  └── Console Shell under construction
```

## 3. Company-generation pipeline

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
typed Company
```

## 4. New-Company persistence pipeline

```text
User chooses Company
  ↓
save pending Company in sessionStorage
  ↓
Google OAuth
  ↓
/auth/callback
  ↓
/company/complete
  ↓
POST /api/companies
  ↓
server validation
  ↓
idempotent Company creation
  ↓
initial Offer creation
  ↓
clear pending browser state
  ↓
/console/[companyId]
```

## 5. Returning-user pipeline

```text
Landing → Sign in
  ↓
/sign-in
  ↓
Google OAuth or existing session
  ↓
/console
  ↓
query latest last_opened_at
  ↓
/console/[companyId]
```

## 6. Multiple-Company model

A user may own multiple Companies.

The active Company is explicit in the URL:

```text
/console/[companyId]
```

`/console` is only a resolver for the most recently opened Company.

## 7. Database foundation

### `profiles`

Application profile associated with the authenticated user.

### `companies`

Persistent Company foundation, including owner, source proposal, identity, Company context, status and `last_opened_at`.

### `offers`

Persistent offers linked to a Company.

### Security

- Row Level Security;
- authenticated ownership checks;
- server-side validation;
- non-disclosing unavailable-Company behavior;
- no service-role key in browser code.

## 8. Server networking

The local corporate network may block direct Node.js access.

`app/lib/network/serverFetch.ts` uses `EnvHttpProxyAgent` and reads:

- `HTTP_PROXY`;
- `HTTPS_PROXY`;
- `NO_PROXY`.

This is local-environment support, not production architecture.

## 9. Console target architecture

```text
app/console/[companyId]/page.tsx
  ├── authenticate
  ├── load active Company
  ├── verify owner
  ├── load Offer
  ├── load Company list
  ├── prepare user identity
  └── compose UI

ConsoleShell
  ├── ConsoleSidebar
  │     ├── CompanySwitcher
  │     ├── Navigation groups
  │     └── User, plan, credits, logout
  ├── MobileHeader
  └── Main content container
        ├── CompanyConsoleHeader
        └── route content
```

## 10. Future directions

Introduce only through coherent milestones:

- persistent customer profiles;
- brand identities;
- tasks;
- documents;
- assets;
- website state;
- usage and credit ledger;
- subscriptions;
- asynchronous media jobs;
- provider-independent media adapters;
- persistent Execution Plans and workflow outputs.

## 11. Architectural rules

- repository code is the first source of truth;
- public UI copy is English;
- prompts are separate modules;
- AI output is validated;
- application state is not owned by the model;
- server pages coordinate, components render;
- each workflow has one objective;
- the Console remains usable without AI or image-provider availability;
- no secrets in the repository.
