# Visual Asset Agent — Architecture

## Architectural objective

Separate visual production from the tools that consume visual assets while
preserving company-wide consistency and provider independence.

```text
Consumer tool
  ↓ structured AssetBrief
Visual Asset Agent
  ├── company visual context
  ├── composition strategy
  └── image provider adapter
  ↓ validated variants
Review and selection
  ↓
Durable AssetResult
```

## Proposed bounded modules

```text
visual-agent       interprets briefs and proposes a production plan
visual-direction   reusable palette, typography, style and constraints
asset-domain       assets, variants, purposes, statuses and provenance
composition        deterministic SVG, typography and layout composition
image-providers    replaceable generation and editing adapters
asset-storage      durable originals, derivatives and delivery metadata
```

The modules begin in the existing application. Separate tool documentation and
domain contracts do not require an immediate microservice.

## Inter-tool contract

The initial Zod schemas live in
`app/lib/visual-asset-agent/contracts.ts`. An `AssetBrief` contains:

- requesting tool and company ID;
- asset purpose and intended placement;
- target formats, dimensions and aspect ratios;
- relevant company and audience context;
- approved visual direction and assets to preserve;
- content, safety and brand constraints;
- whether generation, editing, composition or upload selection is requested.

An `AssetResult` returns:

- stable asset and variant IDs;
- status and review requirements;
- dimensions, format and accessibility metadata;
- visual-direction relationship;
- provenance and provider-neutral cost metadata;
- no temporary provider URL as the durable reference.

## Logo boundary

The reliable baseline is deterministic composition:

```text
company name + selected typography + palette + optional approved symbol
  ↓
application-composed SVG logo variants
```

An image provider may propose symbols or visual directions. It should not be
trusted to render the company wordmark correctly inside a raster image.

## Provider boundary

Provider adapters implement generation and editing without leaking provider
responses into the domain. The first adapter may use the existing OpenAI
integration. A second provider can later be evaluated using stored quality,
latency and cost evidence.

## Persistence direction

Migration `007_visual_asset_agent.sql` distinguishes:

```text
visual_directions
asset_briefs
assets
asset_variants
asset_generations
```

Selected and published assets are never silently overwritten. Regeneration
creates variants or revisions and preserves provenance.

## Safety and rights

- Validate uploads and generated output metadata.
- Keep provider credentials server-side.
- Record source and generation provenance.
- Avoid unverified claims of trademark uniqueness.
- Prevent consumer tools from publishing temporary provider URLs.
- Preserve user uploads and accepted assets across regeneration.
- Define deletion and retention rules before production use.
