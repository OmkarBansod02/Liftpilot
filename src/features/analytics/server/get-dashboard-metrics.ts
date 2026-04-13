import { db } from "@/lib/db";
import { sessions, events } from "@/lib/db/schema";
import { eq, count, and } from "drizzle-orm";
import type { DashboardMetrics } from "@/features/analytics/types";

export async function getDashboardMetrics(
  pageId: string,
): Promise<DashboardMetrics> {
  const [sessionCount] = await db
    .select({ total: count() })
    .from(sessions)
    .where(eq(sessions.pageId, pageId));

  const totalSessions = sessionCount?.total ?? 0;

  const eventCounts = await db
    .select({
      eventType: events.eventType,
      total: count(),
    })
    .from(events)
    .where(eq(events.pageId, pageId))
    .groupBy(events.eventType);

  const countByType = new Map(
    eventCounts.map((row) => [row.eventType, row.total]),
  );

  const totalPageViews = countByType.get("page_view") ?? 0;
  const ctaClicks = countByType.get("cta_click") ?? 0;
  const formStarts = countByType.get("form_start") ?? 0;
  const formSubmits = countByType.get("form_submit") ?? 0;

  const safeSessions = Math.max(totalSessions, 1);
  const safeFormStarts = Math.max(formStarts, 1);

  return {
    totalSessions,
    totalPageViews,
    ctaClicks,
    formStarts,
    formSubmits,
    ctaClickRate: ctaClicks / safeSessions,
    formStartRate: formStarts / safeSessions,
    formCompletionRate: formSubmits / safeFormStarts,
    conversionRate: formSubmits / safeSessions,
  };
}
