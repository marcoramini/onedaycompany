# Execution Plan v1 — integration notes

## Added files

- `app/lib/executionPlanSchema.ts`
- `app/lib/prompts/executionPlanPrompt.ts`
- `app/lib/aiExecutionPlanGenerator.ts`
- `app/lib/fallbackExecutionPlanGenerator.ts`
- `app/lib/executionPlanService.ts`
- `app/api/execution-plan/route.ts`
- `app/components/ExecutionPlanScreen.tsx`

## Expected opportunity shape

The request currently expects the opportunity fields already documented in the project:

`id`, `name`, `motto`, `vision`, `overview`, `skillAffinity`, `distinctiveness`, `initialCapital`, `additionalSkills`.

## Minimal page integration

When the user clicks `Continue with ...` / `Let's build this`:

```ts
const plan = await requestExecutionPlan({
  opportunity: selectedOpportunity,
  userContext: guidedBeginningContext,
});

setExecutionPlan(plan);
setWorkflowStep("execution-plan");
```

Render:

```tsx
<ExecutionPlanScreen
  companyName={selectedOpportunity.name}
  plan={executionPlan}
  onStartStep={(stepId) => {
    // v1 placeholder: route by workflowType in the next milestone.
    console.log("Start step", stepId);
  }}
/>
```

## Important

The API route imports `materializeExecutionPlan` from a module also used by the client. If your Next.js setup enforces strict client/server boundaries, move that function into `app/lib/materializeExecutionPlan.ts` and import it from the API route only.

Before push:

```bash
npm run build
```
