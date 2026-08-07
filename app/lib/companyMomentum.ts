import type {
  CompanyExecutionPlan,
  ExecutionStep,
} from "./executionPlanSchema";
import type { CompanyCapabilityId } from "../types/companyCapability";

const momentumPriority = [
  "first-offer",
  "brand-identity",
  "public-presence",
  "promotional-launch",
  "customer-operations",
  "first-customers",
  "company-foundation",
] as const satisfies readonly CompanyCapabilityId[];

const priorityByCapability = new Map(
  momentumPriority.map((capabilityId, index) => [
    capabilityId,
    index,
  ]),
);

export function getMomentumSteps(
  plan: CompanyExecutionPlan,
): ExecutionStep[] {
  return [...plan.steps].sort(
    (first, second) =>
      getCapabilityPriority(first.capabilityId) -
        getCapabilityPriority(second.capabilityId) ||
      first.order - second.order,
  );
}

export function getMomentumCurrentStep(
  plan: CompanyExecutionPlan,
): ExecutionStep | undefined {
  return getMomentumSteps(plan).find(
    (step) =>
      step.status !== "completed" &&
      step.status !== "skipped",
  );
}

function getCapabilityPriority(
  capabilityId: CompanyCapabilityId,
) {
  return (
    priorityByCapability.get(capabilityId) ??
    momentumPriority.length
  );
}
