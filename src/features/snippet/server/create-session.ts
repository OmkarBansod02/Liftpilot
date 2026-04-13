import { db } from "@/lib/db";
import { sessions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { CreateSessionInput } from "@/features/snippet/schemas/session-input";

export async function createSession(input: CreateSessionInput) {
  const existing = await db
    .select({ id: sessions.id })
    .from(sessions)
    .where(
      and(
        eq(sessions.pageId, input.pageId),
        eq(sessions.anonymousId, input.anonymousId),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(sessions)
      .set({ lastSeenAt: new Date(), userAgent: input.userAgent ?? null })
      .where(eq(sessions.id, existing[0].id));

    return { sessionId: existing[0].id, created: false };
  }

  const [inserted] = await db
    .insert(sessions)
    .values({
      pageId: input.pageId,
      anonymousId: input.anonymousId,
      userAgent: input.userAgent ?? null,
      referrer: input.referrer ?? null,
    })
    .returning({ id: sessions.id });

  return { sessionId: inserted.id, created: true };
}
