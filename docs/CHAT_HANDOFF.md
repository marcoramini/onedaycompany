# OneDayCompany — Chat Handoff

Update this file at the end of every substantial work session.

## Current status

The initial prototype is live at:

https://onedaycompany.vercel.app/

Current user flow:

```text
Landing
  ↓
Skills
  ↓
Business Direction
  ↓
The Architect
```

The application is built with Next.js, TypeScript, Tailwind CSS and the App Router.

The UI has been refactored into separate components.

The current business-direction generator is deterministic and keyword-based.

## Last completed work

- separated screen components from `page.tsx`;
- added `Architect`;
- added `ArchitectStep`;
- created a typed `BusinessDirection`;
- moved generation logic to `lib/businessGenerator.ts`;
- deployed the application to Vercel;
- created the initial project documentation.

## Current production URL

https://onedaycompany.vercel.app/

## Current technical debt

1. Workflow navigation still uses several independent React state variables.
2. The Architect screen is static.
3. No Blueprint screen exists.
4. The generator is keyword-based.
5. No tests exist.
6. No error boundary or production monitoring exists.
7. No persistence exists.

## Next recommended task

Implement **Business Blueprint v1 without AI integration**.

Expected sequence:

1. define the `BusinessBlueprint` type;
2. define the content sections;
3. create a deterministic generator from `BusinessDirection`;
4. create the Blueprint screen;
5. move navigation to a typed workflow step;
6. connect Architect to Blueprint;
7. build and deploy;
8. update docs.

## Files likely relevant to the next session

```text
src/app/page.tsx
src/app/types/business.ts
src/app/lib/businessGenerator.ts
src/app/components/Architect.tsx
src/app/components/BusinessDirectionScreen.tsx
docs/PROJECT_BRIEF.md
docs/ARCHITECTURE.md
docs/DECISIONS.md
docs/ROADMAP.md
```

## Open questions

- Should the Blueprint initially appear instantly, after a short simulated delay, or only after a real server-side generation call?
- What is the minimum useful Blueprint that creates real value?
- Should pricing be included in the first Blueprint version?
- When should user accounts become necessary?
- Which first target user segment should be used for validation?

## Instructions for the next assistant session

- Respond to Marco in Italian.
- Keep all public product text in English.
- Do not redesign the product mission.
- Do not add AI integration before the Blueprint contract and UX are defined.
- Prefer small, testable commits.
- Always run `npm run build` before pushing.
- Update this file at the end of the session.
