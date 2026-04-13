import type { SnippetEventType } from "@/features/analytics/schemas/event-input";

interface TrackEventParams {
  pageId: string;
  sessionId: string;
  eventType: SnippetEventType;
  payload?: Record<string, unknown>;
}

export async function trackEvent({
  pageId,
  sessionId,
  eventType,
  payload,
}: TrackEventParams): Promise<boolean> {
  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageId,
        sessionId,
        eventType,
        payload: payload ?? {},
        occurredAt: new Date().toISOString(),
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

interface InitSessionParams {
  pageId: string;
  anonymousId: string;
}

export async function initSession({
  pageId,
  anonymousId,
}: InitSessionParams): Promise<string | null> {
  try {
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageId,
        anonymousId,
        userAgent: navigator.userAgent,
        referrer: document.referrer || undefined,
      }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { sessionId: string };
    return data.sessionId;
  } catch {
    return null;
  }
}
