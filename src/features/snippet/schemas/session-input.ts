import { z } from "zod";

export const createSessionInputSchema = z.object({
  pageId: z.string().uuid(),
  anonymousId: z.string().trim().min(8).max(128),
  userAgent: z.string().trim().max(512).optional(),
  referrer: z.string().trim().url().optional(),
}).strict();

export type CreateSessionInput = z.infer<typeof createSessionInputSchema>;
