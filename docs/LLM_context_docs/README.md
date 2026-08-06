# OneDayCompany — LLM Context Docs

This folder contains the compact source set used to give an LLM the current OneDayCompany context.

These documents are optimized for development continuity. They do not replace the repository code, which remains the first source of truth.

## Files

- `PROJECT_BRIEF.md` — product mission, vision, target user and current journey.
- `DECISIONS.md` — durable product and architecture decisions.
- `ROADMAP.md` — completed, current and upcoming milestones.
- `CHAT_HANDOFF.md` — current implementation state, open issues and next task.
- `ARCHITECTURE_SNAPSHOT.md` — current technical structure and data flow.
- `REPOSITORY_MAP.md` — practical index of the repository.
- `START_HERE.md` — checklist for starting and closing an LLM-assisted session.
- `NEXT_CHAT_PROMPT.md` — ready-to-use opening prompt for the next session.

## Source-of-truth order

1. Current repository code
2. `DECISIONS.md`
3. `PROJECT_BRIEF.md`
4. `ARCHITECTURE_SNAPSHOT.md`
5. `ROADMAP.md`
6. `CHAT_HANDOFF.md`
7. Previous conversation context

## Update rule

After a substantial milestone:

1. update `CHAT_HANDOFF.md`;
2. update `ROADMAP.md`;
3. update `DECISIONS.md` only for durable decisions;
4. update `PROJECT_BRIEF.md` only when the product direction changes;
5. update `ARCHITECTURE_SNAPSHOT.md` and `REPOSITORY_MAP.md` when paths or boundaries change;
6. run `npm run lint` and `npm run build` before push.
