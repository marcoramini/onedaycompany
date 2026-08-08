# Website Agent — Architecture

## Architectural objective

Keep AI flexible at the intent level and deterministic at the application
boundary. The model proposes supported site operations; application code owns
validation, persistence, rendering and publication.

```text
User request
  ↓
Company and site context assembly
  ↓
Website Agent
  ↓
Structured change proposal
  ├── site operations
  └── asset briefs for the Visual Asset Agent
  ↓
Schema, policy and impact validation
  ↓
Preview revision
  ↓
Explicit acceptance
  ↓
Draft or immutable published version
```

## Bounded modules

```text
website-agent       interprets intent and proposes typed operations
site-domain         documents, sections, themes, revisions and statuses
template-catalog    supported templates, variants and React components
visual-assets       client of the shared Visual Asset Agent contract
site-renderer       preview and public rendering
site-publishing     immutable versions, slugs and domains
```

These begin as modules in the current application. Their boundaries should
allow later extraction without requiring a microservice during validation.

## Site document

The persisted source of truth is a versioned document with:

- schema version;
- template identifier and version;
- theme tokens;
- one or more typed pages;
- ordered typed sections;
- references to durable assets;
- SEO metadata;
- revision and publication metadata.

The first UI renders one page, but the contract should not prevent later
multi-page sites. Published documents are immutable snapshots.

## Agent operations

The exact Zod contracts remain to be designed. The intended operation catalog
includes:

```text
update_section
add_section
remove_section
move_section
change_template_variant
change_theme
request_asset
replace_asset
update_seo
```

Every operation targets stable application-owned identifiers. Unsupported
instructions produce a constrained alternative rather than generated code.

## Template boundary

Templates are reviewed application code. They declare supported sections,
slots, variants and theme constraints. AI selects and configures templates but
does not modify their implementation at runtime.

The initial catalog should be small and cover materially different company
needs. Candidate archetypes are service, portfolio, product or waitlist, and
local business. The exact first two templates are not yet accepted.

## Visual asset boundary

Website Agent does not generate or persist visual assets. It sends a structured
brief to the shared Visual Asset Agent describing purpose, placement, aspect
ratio, visual constraints and relevant company context. It receives durable
asset references and owns only their placement and accessibility text in the
site document.

Provider choice, generation, composition, variants, provenance, cost and
storage belong to the Visual Asset Agent.

## Publication and addressing

```text
draft → proposed revision → accepted draft → published snapshot
```

The initial preview route may use `/sites/<public-slug>`. Later, the same
renderer resolves wildcard OneDayCompany subdomains and verified custom
domains from the request hostname. The user never manages hosting.

The public slug is globally unique and separate from the current owner-scoped
company slug.

## Security and quality guardrails

- Never execute model-generated code.
- Never accept arbitrary scripts or global CSS in the first release.
- Validate every provider response before persistence.
- Keep provider credentials server-side.
- Do not silently replace accepted or published work.
- Sanitize user-provided URLs and uploaded assets.
- Render only registered section components.
- Preserve responsive and accessible defaults in every template.
