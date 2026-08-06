# OneDayCompany — Start Here

## Start a session

1. Open the OneDayCompany project.
2. Start one chat for one coherent milestone.
3. Add the current files from `LLM context docs/`.
4. Add only the source files relevant to the milestone.
5. Confirm repository state:

```bash
git status
git log --oneline -5
```

## Standard instructions

```text
Read all files in LLM context docs.
Treat current repository code as the first source of truth.
Work on one coherent milestone.
Respond in Italian.
Write all public product copy in English.
Do not turn the product into a generic chatbot.
Do not evaluate the user.
Prefer small, verifiable changes.
Identify every affected file.
Do not silently revise accepted decisions.
Before push, run npm run lint and npm run build.
```

## Close a session

1. Summarize completed work.
2. Record unresolved issues.
3. Define one next task.
4. Update context docs.
5. Run:

```bash
npm run lint
npm run build
```

6. Commit one coherent milestone.

## Never include

- `.env`;
- `.env.local`;
- API keys;
- OAuth secrets;
- proxy credentials;
- service-role keys;
- generated build directories.
