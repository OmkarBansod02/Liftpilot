import { z } from "zod";

export const snippetEventTypeSchema = z.enum([
  "page_view",
  "scroll_milestone",
  "cta_click",
  "form_start",
  "form_submit",
]);

export const recordEventInputSchema = z.object({
  pageId: z.string().uuid(),
  sessionId: z.string().uuid(),
  eventType: snippetEventTypeSchema,
  payload: z.record(z.string(), z.unknown()).default({}),
  occurredAt: z.string().datetime().optional(),
});

export type SnippetEventType = z.infer<typeof snippetEventTypeSchema>;
export type RecordEventInput = z.infer<typeof recordEventInputSchema>;
