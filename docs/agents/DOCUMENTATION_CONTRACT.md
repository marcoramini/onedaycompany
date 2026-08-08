# Agent Documentation Contract

Every dedicated agent chat must follow this contract. Its purpose is to keep
the agents coherent even when they are designed and implemented in separate
conversations.

## Authority hierarchy

When sources conflict, use this order:

1. current repository code and persisted schemas;
2. central `docs/DECISIONS.md`;
3. central `docs/PROJECT_BRIEF.md` and `docs/ARCHITECTURE.md`;
4. `docs/agents/REGISTRY.yaml` and this contract;
5. the agent's dedicated dossier;
6. `docs/ROADMAP.md` and `docs/CHAT_HANDOFF.md`;
7. chat history.

A lower source must never silently override a higher source. Record and resolve
the conflict at every affected documentation level.

## Required agent dossier

Before implementation begins, each agent must have documentation covering:

- mission and measurable outcome;
- responsibilities and explicit non-responsibilities;
- owned records, documents and artifacts;
- inputs, outputs and collaborators;
- read and write authority;
- approval and escalation rules;
- lifecycle or core operating flow;
- current status, dependencies and next milestone;
- durable local decisions.

Tool agents use the existing four-file dossier convention:

```text
README.md
ARCHITECTURE.md
DECISIONS.md
ROADMAP.md
```

Governance agents may begin with a single `README.md` charter while they have
no runtime implementation. They must split out architecture, decisions and
roadmap documents before acquiring code, persistence or external integrations.

## Ownership rules

- Each durable fact or artifact has one authoritative owner.
- Other agents may reference owned data but may not redefine it locally.
- Cross-agent contracts are documented by both producer and consumer, using
  the producer's schema as the canonical definition.
- Shared product decisions belong in central `docs/DECISIONS.md`.
- Agent-internal decisions belong in the agent dossier.
- The Knowledge & Documentation Agent checks structure and consistency but
  does not become the semantic owner of every document.
- The Company State Agent owns the canonical operational-state model but does
  not decide strategy or execute specialist work.

## Start-of-chat protocol

Every dedicated chat must:

1. read the central project sources named in its starter prompt;
2. read this contract, the registry entry and the complete relevant dossier;
3. inspect current Git status and preserve unrelated work;
4. state one precise session objective;
5. identify affected files, collaborators and cross-agent contracts;
6. identify any decision that requires architecture-chat approval.

## End-of-chat protocol

Before handing work back, every dedicated chat must:

1. update its dossier to match the implemented or accepted design;
2. update central documents when a cross-product fact changed;
3. update producer and consumer documentation when a contract changed;
4. record unresolved conflicts, risks and dependencies;
5. provide one precise recommended next task;
6. report verification performed and anything not verified;
7. leave no durable decision solely in chat history.

## Changes requiring architecture-chat approval

- creating, merging, renaming or retiring an agent;
- moving ownership between agents;
- allowing an agent to write another agent's authoritative data;
- changing approval or escalation boundaries;
- introducing a shared contract used by three or more agents;
- changing this documentation contract or the registry schema.
