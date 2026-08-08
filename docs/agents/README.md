# OneDayCompany Agent Registry

This directory is the authoritative catalog for the agents that design,
operate and govern OneDayCompany.

## Why it exists

Separate chats may develop different agents, but chat history is not durable
project memory. Every agent chat must therefore leave the repository in a
state that another chat can understand without relying on prior conversation.

The registry distinguishes:

- **governance agents**, which coordinate work, state, knowledge and quality;
- **domain agents**, which own the meaning and evolution of a bounded part of
  the company;
- **tool agents**, which create or operate a bounded company asset for users;
- **future domain agents**, which will own areas such as finance or legal work
  only when their product boundary and approval model are defined.

## Immediate agent set

| Agent | Type | Status | Documentation home |
|---|---|---|---|
| Company Orchestrator | Governance | Define now | `company-orchestrator/` |
| Company State Agent | Governance | Define now | `company-state/` |
| Knowledge & Documentation Agent | Governance | Define now | `knowledge-documentation/` |
| Governance & Quality Agent | Governance | Define now | `governance-quality/` |
| Company Foundation Agent | Domain | Implement next | `company-foundation/` |
| First Offer Agent | Domain | Implement after Foundation | `first-offer/` |
| Launch Planning Agent | Domain | Implement after First Offer | `launch-planning/` |
| Workspace Generation Orchestrator | Integration | Implement after agent contracts | `workspace-generation-orchestrator/` |
| Website Agent | Tool | Already initiated | `../tools/website-agent/` |
| Visual Asset Agent | Tool | Current design priority | `../tools/visual-asset-agent/` |

This initial set reflects responsibilities that already exist in the product or
are required to split workspace generation safely. The Company Foundation Agent
owns foundation semantics, while broader cross-company strategy remains a
responsibility of the Company Orchestrator until it requires a separate agent.
Brand is initially shared between the Visual Asset Agent and the consuming tool.
Finance and Legal agents require a later, explicit definition of data ownership,
risk and human approval.

## Files

- [`REGISTRY.yaml`](REGISTRY.yaml) is the machine-readable agent inventory.
- [`DOCUMENTATION_CONTRACT.md`](DOCUMENTATION_CONTRACT.md) defines the common
  documentation and handoff rules for every dedicated chat.
- Each governance, domain and integration-agent directory contains its charter
  and chat starter.
- Tool-agent dossiers remain under `docs/tools/`; their chat starters are
  listed in this document below.

## Starting a dedicated agent chat

Use the prompt stored in the agent directory for governance, domain and
integration agents. For tool agents, use the prompts below until a dedicated
`CHAT_STARTER.md` is added to their existing dossier.

### Website Agent

```text
Continuiamo OneDayCompany nella chat dedicata al Website Agent.

Leggi docs/PROJECT_BRIEF.md, docs/DECISIONS.md, docs/ARCHITECTURE.md,
docs/ROADMAP.md, docs/agents/README.md,
docs/agents/DOCUMENTATION_CONTRACT.md e l'intero dossier
docs/tools/website-agent/. Considera codice e documentazione nel repository
come fonte di verità, non la memoria della chat.

Il tuo ambito è progettare e realizzare il Website Agent senza assorbire la
generazione degli asset visivi, che appartiene al Visual Asset Agent. Prima di
modificare il codice dichiara l'obiettivo preciso della sessione e i documenti
che dovranno essere aggiornati. Mantieni coerenti il dossier locale e le
decisioni centrali; segnala esplicitamente ogni conflitto o modifica di confine.
Rispondi in italiano e procedi per piccoli risultati verificabili.
```

### Visual Asset Agent

```text
Continuiamo OneDayCompany nella chat dedicata al Visual Asset Agent.

Leggi docs/PROJECT_BRIEF.md, docs/DECISIONS.md, docs/ARCHITECTURE.md,
docs/ROADMAP.md, docs/agents/README.md,
docs/agents/DOCUMENTATION_CONTRACT.md e l'intero dossier
docs/tools/visual-asset-agent/. Considera codice e documentazione nel
repository come fonte di verità, non la memoria della chat.

Il tuo ambito è progettare e realizzare il sistema condiviso di asset visivi,
inclusi brief, direzione visiva, varianti, persistenza, provenienza e contratti
con i consumer. Non assumere la responsabilità del posizionamento o della
pubblicazione nei tool consumer. Prima di modificare il codice dichiara
l'obiettivo preciso e i documenti interessati. Mantieni coerenti il dossier
locale e le decisioni centrali; segnala esplicitamente conflitti o modifiche di
confine. Rispondi in italiano e procedi per piccoli risultati verificabili.
```

## Adding an agent

An agent is added only when it has:

1. a distinct outcome and owner boundary;
2. explicit inputs, outputs and write authority;
3. known collaborators and escalation rules;
4. a documentation home and chat starter;
5. no unresolved overlap with an existing agent;
6. an entry in `REGISTRY.yaml` approved through this architecture chat.
