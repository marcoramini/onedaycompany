# OneDayCompany — Start Here

Use this checklist whenever starting or closing a ChatGPT development session.

## Start a new session

1. Open the OneDayCompany ChatGPT Project.
2. Start a new chat for one coherent milestone.
3. Read:
   - PROJECT_BRIEF.md
   - CHAT_HANDOFF.md
   - DECISIONS.md
4. Check the current repository:
   - git status
   - git log --oneline -5
5. Share only:
   - relevant source files;
   - git diff;
   - error logs;
   - relevant configuration.
6. State one precise objective.

## Opening prompt

Continuiamo OneDayCompany.

Leggi PROJECT_BRIEF.md, CHAT_HANDOFF.md e DECISIONS.md.

Considera il codice allegato come stato corrente del repository.

Obiettivo di questa sessione:
[ONE PRECISE OBJECTIVE]

Vincoli:
- rispondi in italiano;
- tutto il prodotto pubblico deve essere in inglese;
- non modificare decisioni consolidate senza evidenziarlo;
- procediamo con piccoli passi verificabili;
- prima di ogni push dobbiamo eseguire npm run build.

## During the session

1. Confirm the objective.
2. Identify affected files.
3. Implement the smallest useful change.
4. Test locally.
5. Review git diff.
6. Run npm run build.
7. Commit only coherent changes.

## End the session

1. Summarize completed work.
2. Record unresolved issues.
3. Define one next task.
4. Update:
   - CHAT_HANDOFF.md
   - ROADMAP.md
   - CHANGELOG.md
5. Update when needed:
   - DECISIONS.md
   - ARCHITECTURE.md
6. Commit and push documentation.
7. Verify the Vercel deployment.

## Source of truth

1. Current repository code
2. DECISIONS.md
3. PROJECT_BRIEF.md
4. ARCHITECTURE.md
5. ROADMAP.md
6. CHAT_HANDOFF.md
7. Previous chat context