import { z } from "zod";

import {
  companySchema,
} from "./businessOpportunitiesSchema";

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

export const generatedExecutionStepSchema = z.object({
  title: z.string().trim().min(1).max(120),

  reason: z.string().trim().min(1).max(300),

  expectedOutcome: z
    .string()
    .trim()
    .min(1)
    .max(400),

  workflowType: executionWorkflowTypeSchema,

  completionCriteria: z
    .array(z.string().trim().min(1).max(180))
    .min(1)
    .max(4),
});

export const generatedExecutionPlanSchema = z.object({
  introduction: z
    .string()
    .trim()
    .min(1)
    .max(400),

  steps: z
    .array(generatedExecutionStepSchema)
    .min(3)
    .max(5),
});

export const executionStepSchema =
  generatedExecutionStepSchema.extend({
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
  steps: z.array(executionStepSchema).min(3).max(5),
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
