import type {
  SnippetEventPayloadByType,
  SnippetEventType,
} from "@/features/analytics/schemas/event-input";

export interface TrackEventParams<EventType extends SnippetEventType> {
  pageId: string;
  sessionId: string;
  eventType: EventType;
  payload?: SnippetEventPayloadByType[EventType];
}

export async function trackEvent<EventType extends SnippetEventType>({
  pageId,
  sessionId,
  eventType,
  payload,
}: TrackEventParams<EventType>): Promise<boolean> {
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

const pendingSessions = new Map<string, Promise<string | null>>();

export async function initSession({
  pageId,
  anonymousId,
}: InitSessionParams): Promise<string | null> {
  const requestKey = `${pageId}:${anonymousId}`;
  const pendingSession = pendingSessions.get(requestKey);

  if (pendingSession) {
    return pendingSession;
  }

  const request = createSession({ pageId, anonymousId }).finally(() => {
    pendingSessions.delete(requestKey);
  });

  pendingSessions.set(requestKey, request);

  return request;
}

async function createSession({
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
