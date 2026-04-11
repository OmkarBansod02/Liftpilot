import { z } from "zod";

export const createSessionInputSchema = z.object({
  pageId: z.string().uuid(),
  anonymousId: z.string().trim().min(8).max(128),
  experimentId: z.string().uuid().optional(),
  experimentArm: z.enum(["control", "variant"]).optional(),
  userAgent: z.string().trim().max(512).optional(),
  referrer: z.string().trim().url().optional(),
});

export type CreateSessionInput = z.infer<typeof createSessionInputSchema>;
