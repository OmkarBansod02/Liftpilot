import { and, eq } from "drizzle-orm";
import type { SnippetEventType } from "@/features/analytics/schemas/event-input";
import type { RecordEventInput } from "@/features/analytics/schemas/event-input";
import { db } from "@/lib/db";
import { events, sessions, type JsonObject } from "@/lib/db/schema";

export type RecordSnippetEventResult =
  | {
      accepted: true;
      eventId: string;
      eventType: SnippetEventType;
    }
  | {
      accepted: false;
      reason: "session_not_found";
    };

export async function recordSnippetEvent(
  input: RecordEventInput,
): Promise<RecordSnippetEventResult> {
  const [session] = await db
    .select({ id: sessions.id })
    .from(sessions)
    .where(
      and(eq(sessions.id, input.sessionId), eq(sessions.pageId, input.pageId)),
    )
    .limit(1);

  if (!session) {
    return { accepted: false, reason: "session_not_found" };
  }

  await db
    .update(sessions)
    .set({ lastSeenAt: new Date() })
    .where(eq(sessions.id, session.id));

  const [inserted] = await db
    .insert(events)
    .values({
      sessionId: input.sessionId,
      pageId: input.pageId,
      eventType: input.eventType,
      payload: { ...input.payload } satisfies JsonObject,
      occurredAt: input.occurredAt ? new Date(input.occurredAt) : new Date(),
    })
    .returning({ id: events.id });

  return {
    accepted: true,
    eventId: inserted.id,
    eventType: input.eventType,
  };
}
