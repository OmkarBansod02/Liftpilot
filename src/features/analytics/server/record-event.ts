import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import type { RecordEventInput } from "@/features/analytics/schemas/event-input";

export async function recordEvent(input: RecordEventInput) {
  const [inserted] = await db
    .insert(events)
    .values({
      sessionId: input.sessionId,
      pageId: input.pageId,
      eventType: input.eventType,
      payload: input.payload ?? {},
      occurredAt: input.occurredAt ? new Date(input.occurredAt) : new Date(),
    })
    .returning({ id: events.id });

  return {
    accepted: true,
    eventId: inserted.id,
    eventType: input.eventType,
  };
}
