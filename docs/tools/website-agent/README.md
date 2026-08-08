# Website Agent

## Mission

The Website Agent gives every OneDayCompany company a credible public presence
without requiring the user to understand web design, hosting or deployment.

The user receives a generated starting site and improves it by describing the
desired outcome in natural language. OneDayCompany turns those requests into
safe, structured and previewable site changes.

## Product promise

```text
Describe the change → See the result → Accept → Publish
```

The experience is conversational but the agent is not a generic chatbot. It
has one objective: create and maintain the company's promotional website.

## Accepted direction

- Application-controlled templates and React components.
- Typed, versioned site documents rather than generated source code.
- No visual page-builder controls in the first phase.
- No arbitrary HTML, CSS, JavaScript or runtime code generation.
- Agent changes are proposals until previewed and accepted.
- Visual assets are requested from the shared Visual Asset Agent.
- Website Agent owns asset placement, not visual generation or storage.
- Hosting, publication and domain resolution are owned by OneDayCompany.

## Initial user journey

1. Assemble durable company context.
2. Select a suitable site type and template variant.
3. Generate copy, theme, sections, CTA and asset requirements.
4. Generate or select the minimum required visual assets.
5. Show a responsive preview.
6. Let the user request focused changes conversationally.
7. Validate and preview each proposed revision.
8. Publish only after explicit confirmation.

## First release boundary

The first release produces one responsive landing page and supports a path
preview. The domain model anticipates multiple pages, but multi-page navigation,
OneDayCompany subdomains and custom domains arrive in later phases.

The first release does not include:

- free-form drag and drop;
- arbitrary code execution;
- third-party themes installed by users;
- a general CMS;
- ecommerce or complex application behavior;
- automatic publication after an agent response.

## Current status and dependency

Implementation is paused while the shared Visual Asset Agent defines asset
briefs, durable asset references, variants and lifecycle. Website Agent will
consume that contract rather than owning image-provider integrations.

## Documents

- [`ARCHITECTURE.md`](ARCHITECTURE.md)
- [`DECISIONS.md`](DECISIONS.md)
- [`ROADMAP.md`](ROADMAP.md)
