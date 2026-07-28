# OneDayCompany — Changelog

All notable project changes should be recorded here.

The format is intentionally lightweight.

## Unreleased

### Added

- AI-backed Business Opportunity generation through a server-side Next.js API route.
- OpenAI Responses API integration with strict structured output.
- Zod schemas for request and generated opportunity validation.
- Deterministic fallback generation when the provider is unavailable or returns invalid data.
- Generation source metadata: `ai` or `fallback`.
- Loading, retry and recoverable error states in the skills workflow.
- Optional `LOCAL_PROXY_URL` support for local corporate development through an NTLM bridge such as CNTLM.

### Changed

- Replaced direct generation calls in the UI with `businessOpportunityService`.
- Evolved the workflow from one Business Direction to three selectable Business Opportunities.
- Kept proxy configuration environment-specific so Vercel connects directly.

### Security

- OpenAI credentials remain server-side.
- NTLM credentials and corporate proxy configuration are excluded from application code and Vercel.

## Initial prototype

### Added

- Landing page
- Skills form
- Business Direction generation
- Business Direction screen
- Architect transition screen
- Reusable React components
- TypeScript business-domain type
- Deterministic prototype generator
- Vercel deployment

### Deployment

- Production preview: https://onedaycompany.vercel.app/
