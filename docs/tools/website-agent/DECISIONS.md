# Website Agent — Decisions

This document records durable decisions internal to the Website Agent. Cross-
product decisions remain in `docs/DECISIONS.md`.

## WEB-001 — Template-driven rendering

**Status:** Accepted

Sites use application-controlled templates, variants and typed sections. The
agent does not generate or modify runtime source code.

## WEB-002 — Conversational editing without web-design controls

**Status:** Accepted

The first user interface accepts natural-language change requests and shows a
preview. It does not expose drag-and-drop or detailed design controls.

## WEB-003 — Structured proposals and explicit acceptance

**Status:** Accepted

The agent returns typed change operations. Application code validates them and
the user explicitly accepts a preview before the revision can be published.

## WEB-004 — Visual assets supplied by the Visual Asset Agent

**Status:** Accepted

Website Agent sends structured asset briefs to the shared Visual Asset Agent
and receives durable references. It does not integrate with image providers or
own asset generation and storage.

## WEB-005 — Site placement is separate from visual production

**Status:** Accepted

Website Agent selects where and how an approved asset is used in a site. Visual
direction, logo composition and promotional-image generation remain outside
its boundary.

## WEB-006 — Same application before service extraction

**Status:** Accepted

The Website Agent, renderer and publication flow begin inside the existing
OneDayCompany application and deployment. Clear module boundaries preserve the
option to extract services later; extraction is not a prototype requirement.

## Open decisions

- Exact first two template archetypes and variants.
- First site-document and operation schemas.
- Visual Asset Agent brief and result contract.
- Preview revision retention policy.
- Public slug reservation and rename policy.
- Domain and TLS provider for production.
