# OneDayCompany — Product Method

## 1. Purpose of this document

The Product Method defines the entrepreneurial sequence that OneDayCompany guides users through.

It is the core of the product and must remain independent from any specific AI model, provider or technical implementation.

The method answers three questions for every stage:

1. What decision must the user make?
2. What concrete output must the stage produce?
3. What evidence allows the user to move forward?

## 2. Method overview

```text
1. Skills
   ↓
2. Business Direction
   ↓
3. Customer and Problem
   ↓
4. First Offer
   ↓
5. Validation
   ↓
6. First Customer
   ↓
7. First Revenue
   ↓
8. Repeat and Grow
```

The sequence is progressive, but not rigidly linear. Evidence can require the user to revisit an earlier assumption.

A return to a previous stage is not failure. It is a normal refinement loop.

## 3. Method principles

### 3.1 Begin with existing assets

The method starts from skills, experience, knowledge, relationships, credibility and interests already available to the user.

### 3.2 Convert uncertainty into explicit assumptions

The system should make assumptions visible and testable instead of presenting them as facts.

### 3.3 Reduce the number of simultaneous decisions

Each screen should focus on one meaningful objective.

### 3.4 Prefer the smallest useful offer

The first offer should be simple enough to explain, deliver and test without unnecessary infrastructure.

### 3.5 Seek evidence before scale

Customer behavior is more valuable than internal confidence or polished output.

### 3.6 Move toward a transaction

A business hypothesis becomes stronger when a real person commits time, attention, reputation or money.

### 3.7 Preserve accumulated context

Each stage should reuse previous decisions and evidence rather than repeatedly starting from a blank prompt.

## 4. Stage 1 — Skills

### Objective

Identify useful personal assets that could become the foundation of a business.

### Inputs

- skills;
- professional experience;
- domain knowledge;
- recurring problems the user can solve;
- interests and preferred ways of working;
- available time and constraints, when relevant.

### Product behavior

The system asks concrete questions about what the user can do, has done or understands well.

It should not require the user to already know what business to start.

### Output

A structured `SkillProfile` containing the most relevant capabilities and constraints.

### Advancement criterion

The system has enough specific information to propose credible business directions connected to the user’s real capabilities.

## 5. Stage 2 — Business Direction

### Objective

Select a promising direction that connects the user’s skills to a specific type of customer and value creation.

### Product behavior

The system generates a small number of differentiated directions rather than an overwhelming list.

Each direction should explain:

- who it may serve;
- what value it may create;
- why the user may be credible;
- what makes it practical to test.

### Output

A selected `BusinessDirection`.

### Advancement criterion

The user chooses one direction that is understandable, credible and worth investigating.

The direction remains a hypothesis, not a validated opportunity.

## 6. Stage 3 — Customer and Problem

### Objective

Turn a broad direction into a focused customer-problem hypothesis.

### Product behavior

The system helps the user define:

- a specific initial customer segment;
- a meaningful problem or desired outcome;
- the current alternatives used by that customer;
- the cost or consequence of the problem;
- why the problem may deserve attention now.

### Output

A `CustomerProblemHypothesis`.

### Advancement criterion

The hypothesis is specific enough that the user can identify real people to contact and ask meaningful questions.

## 7. Stage 4 — First Offer

### Objective

Create the smallest credible offer that can test whether the customer wants the proposed outcome.

### Product behavior

The system guides the user to define:

- promised outcome;
- scope;
- deliverables;
- delivery method;
- timeline;
- price or commitment hypothesis;
- boundaries and exclusions.

The first offer should usually favor manual or service-based delivery when this enables faster learning.

### Output

A `FirstOffer` that can be explained and presented to a potential customer.

### Advancement criterion

The offer is concrete enough to communicate, deliver and test without building unnecessary infrastructure.

## 8. Stage 5 — Validation

### Objective

Collect real evidence about the customer, problem and offer.

### Product behavior

The system converts assumptions into a validation plan, including:

- what must be learned;
- who to contact;
- what questions to ask;
- what outreach message to send;
- what action or commitment to request;
- what evidence counts as positive, negative or inconclusive.

Validation should prioritize behavior over compliments.

### Evidence hierarchy

From weaker to stronger:

```text
Opinion
  ↓
Specific problem admission
  ↓
Time commitment
  ↓
Introduction or referral
  ↓
Trial commitment
  ↓
Deposit or payment
  ↓
Repeat purchase or referral
```

### Output

A `ValidationPlan` and a growing `EvidenceLog`.

### Advancement criterion

The user has enough evidence to choose one of three actions:

- continue;
- refine;
- change direction.

## 9. Stage 6 — First Customer

### Objective

Convert validated interest into a real customer relationship.

### Product behavior

The system supports:

- prospect identification;
- personalized outreach;
- discovery conversation preparation;
- proposal creation;
- objection handling;
- follow-up;
- commitment tracking.

### Output

A concrete sales opportunity and, ideally, a first customer commitment.

### Advancement criterion

A real customer agrees to the defined exchange of value, preferably including payment.

## 10. Stage 7 — First Revenue

### Objective

Deliver the offer successfully and complete the first revenue cycle.

### Product behavior

The system helps the user:

- onboard the customer;
- deliver the promised outcome;
- track effort and cost;
- collect payment;
- gather feedback;
- document results;
- identify improvements and repeatable elements.

### Output

A completed `RevenueCycle` containing delivery evidence, revenue, costs, lessons and customer feedback.

### Advancement criterion

The user has completed a real transaction and can explain what should be repeated, changed or stopped.

## 11. Stage 8 — Repeat and Grow

### Objective

Turn the first successful transaction into a more repeatable business system.

### Product behavior

Only after initial evidence should the product prioritize:

- offer refinement;
- repeatable acquisition;
- positioning;
- brand assets;
- website or landing page;
- automation;
- software or productization;
- operational systems;
- financial planning;
- growth experiments.

### Output

A prioritized growth plan based on observed evidence rather than assumptions alone.

### Advancement criterion

The user has a repeatable path to customers and a clearer understanding of unit economics, delivery capacity and growth constraints.

## 12. The Business Blueprint

The Business Blueprint is the bridge between Business Direction and Validation.

It should summarize the current business hypothesis in a structured, concise form:

- target customer;
- customer problem;
- value proposition;
- first offer;
- delivery model;
- pricing hypothesis;
- acquisition starting point;
- main assumptions;
- validation experiment;
- immediate next action.

The Blueprint is not a traditional business plan.

It is a living hypothesis that evolves as evidence is collected.

## 13. Stage design contract

Every product stage should define:

```text
Objective
Inputs
User decision
System assistance
Output
Evidence
Next action
```

A stage is incomplete if it produces content but does not clarify what the user should do next.

## 14. Progress and state

Progress should represent completed entrepreneurial work, not the number of screens viewed.

The system should distinguish between:

- **drafted** — an assumption or asset exists;
- **selected** — the user has made a decision;
- **tested** — the assumption has been exposed to the market;
- **supported** — evidence is directionally positive;
- **validated** — sufficient evidence supports moving forward;
- **invalidated** — evidence suggests a change is required.

## 15. Product metrics derived from the method

The most useful product metrics should follow the user’s entrepreneurial progress:

- percentage completing a Skill Profile;
- percentage selecting a Business Direction;
- percentage creating a First Offer;
- percentage launching a validation action;
- number of customer conversations started;
- number of meaningful demand signals recorded;
- percentage reaching a proposal or trial;
- percentage reaching first customer;
- percentage reaching first revenue;
- time between stages;
- return rate after evidence collection.

Completion alone is not the ultimate success metric. Real-world action is.

## 16. Method guardrails

The product should not:

- present generated assumptions as validated facts;
- create a large business plan before customer learning;
- recommend complex technology before proving demand;
- confuse visual polish with business progress;
- allow users to remain indefinitely in ideation;
- reward activity that does not produce learning or commitment;
- generate dozens of options when one decision is required.
