# OneDayCompany — Start Here

Use this checklist whenever starting or closing a ChatGPT development session.

## Start a new session

1. Open the OneDayCompany ChatGPT Project.
2. Start one new chat for one coherent milestone.
3. Read:
   - `PROJECT_BRIEF.md`
   - `DECISIONS.md`
   - `CHAT_HANDOFF.md`
   - `ROADMAP.md`
   - `ARCHITECTURE.md`
   - the relevant `tools/<tool>/README.md` and linked tool documents when the
     session concerns a focused tool
4. Check the current repository:
   - `git status`
   - `git log --oneline -5`
5. Share only the source files relevant to the milestone.
6. State one precise objective.

## Standard opening prompt

```text
Continuiamo OneDayCompany.

Leggi PROJECT_BRIEF.md, DECISIONS.md, CHAT_HANDOFF.md e ROADMAP.md.
Considera il codice allegato come stato corrente del repository e prima fonte di verità.

Obiettivo di questa sessione:
[ONE PRECISE OBJECTIVE]

Vincoli:
- rispondi in italiano;
- tutto il contenuto pubblico del prodotto deve essere in inglese;
- OneDayCompany non valuta mai l'utente;
- ogni interazione deve far percepire che la sua azienda sta già prendendo forma;
- non trasformare il prodotto in un chatbot generico o in un questionario;
- procediamo con piccoli passi verificabili;
- evidenzia le decisioni che modificherebbero l'architettura o il prodotto;
- prima di ogni push dobbiamo eseguire npm run build.
```

## During the session

1. Confirm the single objective.
2. Inspect the current relevant code.
3. Identify the smallest coherent change.
4. Discuss alternatives when they materially differ.
5. Implement only the chosen change.
6. Test locally.
7. Review `git diff`.
8. Run `npm run lint` and `npm run build` before push.

## End the session

1. Summarize completed work.
2. Record unresolved issues.
3. Define one next task.
4. Update:
   - `CHAT_HANDOFF.md`
   - `ROADMAP.md`
   - `CHANGELOG.md`
5. Update `DECISIONS.md` and architecture documentation when needed.
6. Update the relevant tool dossier when the session changes a focused tool.
7. Commit and push coherent changes.
8. Verify the Vercel deployment when applicable.

## Source of truth

1. Current repository code
2. `DECISIONS.md`
3. `PROJECT_BRIEF.md`
4. `ARCHITECTURE.md`
5. `ROADMAP.md`
6. `CHAT_HANDOFF.md`
7. Previous chat context
