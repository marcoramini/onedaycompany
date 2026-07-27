# OneDayCompany — AI Collaboration Protocol

This document defines how to work efficiently with an AI assistant across multiple chats.

## 1. Source of truth hierarchy

When information conflicts, use this order:

1. current repository code;
2. `DECISIONS.md`;
3. `PROJECT_BRIEF.md`;
4. `ARCHITECTURE.md`;
5. `ROADMAP.md`;
6. `CHAT_HANDOFF.md`;
7. old chat history.

The repository is more authoritative than memory.

## 2. Start of a new chat

At the beginning of a new chat, provide:

1. `PROJECT_BRIEF.md`;
2. `CHAT_HANDOFF.md`;
3. relevant code files or a Git diff;
4. the exact objective for the session;
5. any error output.

Do not paste the entire repository unless required.

## 3. Recommended opening message

```text
Continuiamo OneDayCompany.

Leggi prima PROJECT_BRIEF.md e CHAT_HANDOFF.md.
Considera il codice allegato come stato corrente del repository.

Obiettivo di questa sessione:
[one precise objective]

Vincoli:
- rispondi in italiano;
- tutto il prodotto pubblico deve essere in inglese;
- non modificare decisioni consolidate senza evidenziarlo;
- proponi piccoli passi verificabili;
- prima di ogni push dobbiamo eseguire npm run build.
```

## 4. Scope of one chat

One chat should normally focus on one milestone or one coherent technical problem.

Good examples:

- design the Business Blueprint;
- implement workflow state;
- integrate one AI API route;
- add persistence;
- fix deployment;
- validate onboarding with users.

Avoid combining unrelated objectives such as authentication, pricing, landing-page redesign and AI prompting in one session.

## 5. During the session

For every change:

1. identify the objective;
2. identify affected files;
3. agree on the smallest useful implementation;
4. write or modify code;
5. run the application;
6. run `npm run build`;
7. commit;
8. update documentation if a durable decision changed.

## 6. Code-sharing rules

Share only:

- files that must change;
- error logs;
- relevant configuration;
- the current Git diff.

Prefer this command when asking for a review:

```bash
git diff
```

After staging:

```bash
git diff --staged
```

For recent history:

```bash
git log --oneline -10
```

## 7. End of session

Before closing a chat:

1. summarize completed work;
2. record unresolved issues;
3. define exactly one recommended next task;
4. update `CHAT_HANDOFF.md`;
5. update `DECISIONS.md` if a durable decision was made;
6. update `ROADMAP.md`;
7. commit documentation changes.

## 8. When to open a new chat

Open a new chat when:

- a milestone is complete;
- the topic changes significantly;
- the conversation becomes difficult to navigate;
- old errors and discarded approaches dominate the context;
- the assistant begins repeating outdated assumptions;
- a clean architectural decision is needed.

## 9. What not to rely on

Do not rely on the assistant to remember:

- exact current file contents;
- the last uncommitted change;
- package versions;
- environment variables;
- deployment status;
- every prior architectural discussion.

Put these in the repository or provide them in the current chat.

## 10. Minimal handoff rule

A future assistant should be able to understand the project and continue work by reading:

- `PROJECT_BRIEF.md`;
- `CHAT_HANDOFF.md`;
- `DECISIONS.md`;
- relevant source files.

If that is not possible, the documentation is incomplete.
