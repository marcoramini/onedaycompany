//file: app/lib/executionPlanSchema.ts

import { z } from "zod";

import {
  companySchema,
} from "./businessOpportunitiesSchema";
import { companyCapabilityIds } from "../types/companyCapability";

export const companyCapabilityIdSchema = z.enum(
  companyCapabilityIds,
);

export const executionWorkflowTypeSchema = z.enum([
  "offer-builder",
  "landing-page-builder",
  "booking-builder",
  "contact-builder",
  "social-launch-builder",
  "outreach-builder",
  "pricing-builder",
  "portfolio-builder",
  "custom-guided-step",
]);

export const executionStepStatusSchema = z.enum([
  "not_started",
  "in_progress",
  "completed",
  "skipped",
]);

export const generatedExecutionActivitySchema = z.object({
  title: z.string().trim().min(1).max(100),

  description: z
    .string()
    .trim()
    .min(1)
    .max(240),

  completionCriterion: z
    .string()
    .trim()
    .min(1)
    .max(180),
});

export const generatedExecutionStepSchema = z.object({
  capabilityId: companyCapabilityIdSchema,

  title: z.string().trim().min(1).max(120),

  reason: z.string().trim().min(1).max(300),

  expectedOutcome: z
    .string()
    .trim()
    .min(1)
    .max(400),

  workflowType: executionWorkflowTypeSchema,

  activities: z
    .array(generatedExecutionActivitySchema)
    .min(2)
    .max(5),

  completionCriteria: z
    .array(z.string().trim().min(1).max(180))
    .min(1)
    .max(4),
});

export const executionActivitySchema =
  generatedExecutionActivitySchema.extend({
    id: z.string().uuid(),
    order: z.number().int().positive(),
    status: executionStepStatusSchema,
  });

export const generatedExecutionPlanSchema = z.object({
  introduction: z
    .string()
    .trim()
    .min(1)
    .max(400),

  steps: z
    .array(generatedExecutionStepSchema)
    .length(companyCapabilityIds.length),
}).superRefine((plan, context) => {
  const generatedCapabilityIds = new Set(
    plan.steps.map((step) => step.capabilityId),
  );

  for (const capabilityId of companyCapabilityIds) {
    if (!generatedCapabilityIds.has(capabilityId)) {
      context.addIssue({
        code: "custom",
        path: ["steps"],
        message: `Missing capability: ${capabilityId}`,
      });
    }
  }
});

export const executionStepSchema =
  generatedExecutionStepSchema.omit({
    activities: true,
  }).extend({
    activities: z
      .array(executionActivitySchema)
      .min(2)
      .max(5),
    id: z.string().uuid(),
    order: z.number().int().positive(),
    status: executionStepStatusSchema,
    outputIds: z.array(z.string()),
  });

export const companyExecutionPlanSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().trim().min(1),
  introduction: z
    .string()
    .trim()
    .min(1)
    .max(400),
  steps: z
    .array(executionStepSchema)
    .min(3)
    .max(companyCapabilityIds.length),
  version: z.number().int().positive(),
  source: z.enum(["ai", "fallback"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const executionPlanRequestSchema = z.object({
  opportunity: companySchema,

  userContext: z
    .string()
    .trim()
    .max(4_000)
    .default(""),
});

export type ExecutionWorkflowType = z.infer<
  typeof executionWorkflowTypeSchema
>;

export type ExecutionStepStatus = z.infer<
  typeof executionStepStatusSchema
>;

export type GeneratedExecutionActivity = z.infer<
  typeof generatedExecutionActivitySchema
>;

export type ExecutionActivity = z.infer<
  typeof executionActivitySchema
>;

export type GeneratedExecutionStep = z.infer<
  typeof generatedExecutionStepSchema
>;

export type GeneratedExecutionPlan = z.infer<
  typeof generatedExecutionPlanSchema
>;

export type ExecutionStep = z.infer<
  typeof executionStepSchema
>;

export type CompanyExecutionPlan = z.infer<
  typeof companyExecutionPlanSchema
>;

export type ExecutionPlanRequest = z.input<
  typeof executionPlanRequestSchema
>;
