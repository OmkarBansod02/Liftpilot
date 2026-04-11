import { z } from "zod";

export const createExperimentInputSchema = z.object({
  pageId: z.string().uuid(),
  variantId: z.string().uuid(),
  primaryConversionEvent: z.string().trim().min(1).max(80).default("form_submit"),
});

export type CreateExperimentInput = z.infer<
  typeof createExperimentInputSchema
>;
