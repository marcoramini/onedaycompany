import { z } from "zod";

export const workspaceGenerationStageSchema = z.enum([
  "foundation",
  "first-offer",
  "launch-planning",
  "workspace-assembly",
]);

export const workspaceGenerationStatusSchema = z.enum([
  "pending",
  "running",
  "completed",
  "failed",
]);

export const workspaceGenerationStageStateSchema = z.object({
  stage: workspaceGenerationStageSchema,
  status: workspaceGenerationStatusSchema,
  attemptCount: z.number().int().nonnegative(),
  source: z.enum(["ai", "fallback"]).nullable(),
  safeError: z.string().nullable(),
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
}).strict();

export const workspaceGenerationStateSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  status: workspaceGenerationStatusSchema,
  stages: z.array(workspaceGenerationStageStateSchema).length(4),
}).strict();

export type WorkspaceGenerationStage = z.infer<typeof workspaceGenerationStageSchema>;
export type WorkspaceGenerationStatus = z.infer<typeof workspaceGenerationStatusSchema>;
export type WorkspaceGenerationState = z.infer<typeof workspaceGenerationStateSchema>;
