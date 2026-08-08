# OneDayCompany — Tool Documentation

## Purpose

This directory gives every substantial OneDayCompany tool a focused product
and technical memory. A tool is a bounded workflow that produces or operates a
durable company asset, such as a website, offer, logo or campaign.

Separate documentation keeps a tool easy to evolve. It does not require a
separate repository, service or deployment.

## Required dossier

Each tool directory contains:

```text
README.md       purpose, user experience, scope and document index
ARCHITECTURE.md domain boundaries, flows, persistence and integrations
DECISIONS.md    durable decisions local to the tool
ROADMAP.md      phased, independently verifiable implementation plan
```

Add contracts, provider notes or research documents only when they become
necessary. Avoid duplicating central project documentation.

## Source-of-truth rules

1. Repository code is the implementation truth.
2. Central `docs/DECISIONS.md` owns cross-product decisions.
3. The tool's `DECISIONS.md` owns decisions internal to that tool.
4. Central architecture owns shared infrastructure; tool architecture owns
   its bounded design.
5. Conflicts must be resolved explicitly in both affected documents.

## Session rule

A session that changes a tool must read its `README.md`, the relevant linked
documents and the central project documents affected by the change. At the end
of the session, update both levels when the product boundary has changed.

## Current tools

- [`website-agent/`](website-agent/README.md) — generates and evolves public
  company sites through structured conversational changes.
- [`visual-asset-agent/`](visual-asset-agent/README.md) — creates and maintains
  reusable visual identity and promotional assets for all company tools.
