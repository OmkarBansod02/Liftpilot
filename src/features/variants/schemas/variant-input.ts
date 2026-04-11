import { z } from "zod";

export const variantContentSchema = z.object({
  headline: z.string().trim().min(1).max(160),
  subheadline: z.string().trim().min(1).max(300).optional(),
  ctaLabel: z.string().trim().min(1).max(80),
  trustSignals: z.array(z.string().trim().min(1).max(120)).max(4).optional(),
});

export const createVariantInputSchema = z.object({
  pageId: z.string().uuid(),
  auditId: z.string().uuid().optional(),
  content: variantContentSchema,
  rationale: z.string().trim().min(1).max(1000),
});

export type VariantContentInput = z.infer<typeof variantContentSchema>;
export type CreateVariantInput = z.infer<typeof createVariantInputSchema>;
