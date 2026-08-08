# Visual Asset Agent

## Mission

The Visual Asset Agent creates and maintains the visual assets a company needs
across OneDayCompany. It gives other focused tools one safe, consistent way to
request logos, identity elements, website imagery and campaign creatives.

## Product role

```text
Company context + structured asset brief
  ↓
Visual Asset Agent
  ↓
Visual direction and asset variants
  ↓
User selection or explicit acceptance
  ↓
Durable reusable company asset
```

The agent is not a generic image chat and not a full professional design suite.
It converts a business purpose into usable, consistent visual assets.

## Consumers

- Website Agent requests hero, section and background imagery.
- Promotion Agent requests campaign and channel-specific creatives.
- Brand workflow requests logo directions and identity elements.
- Future catalog, offer and social tools may reuse approved assets.

## Ownership boundary

The Visual Asset Agent owns:

- structured visual interpretation of an asset brief;
- company visual direction;
- provider-independent generation and composition;
- variants and relationships between assets;
- upload, metadata, provenance, storage and reuse;
- provider cost and latency tracking.

Consumer tools own:

- the business action requiring the asset;
- placement and surrounding content;
- acceptance of the asset for their output;
- publication of the final website, campaign or document.

## First release boundary

The first release should define contracts and produce a small number of useful
asset types:

- composed typographic logo with optional symbol;
- website hero image;
- supporting promotional image;
- one campaign creative variant.

It does not initially provide pixel-level editing, arbitrary canvas tools,
video generation or a complete brand-management platform.

## Documents

- [`ARCHITECTURE.md`](ARCHITECTURE.md)
- [`DECISIONS.md`](DECISIONS.md)
- [`ROADMAP.md`](ROADMAP.md)
