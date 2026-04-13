"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { trackEvent, initSession } from "./tracker";
import type { SnippetEventType } from "@/features/analytics/schemas/event-input";

interface TrackerContextValue {
  pageId: string;
  sessionId: string | null;
  ready: boolean;
  track: (
    eventType: SnippetEventType,
    payload?: Record<string, unknown>,
  ) => void;
}

const TrackerContext = createContext<TrackerContextValue | null>(null);

const ANON_ID_KEY = "liftpilot_anon_id";

function getOrCreateAnonId(): string {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem(ANON_ID_KEY);
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem(ANON_ID_KEY, id);
  return id;
}

interface TrackerProviderProps {
  pageId: string;
  children: ReactNode;
}

export function TrackerProvider({ pageId, children }: TrackerProviderProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const ready = sessionId !== null;

  useEffect(() => {
    const anonId = getOrCreateAnonId();
    if (!anonId) return;

    initSession({ pageId, anonymousId: anonId }).then((id) => {
      if (id) setSessionId(id);
    });
  }, [pageId]);

  const track = useCallback(
    (eventType: SnippetEventType, payload?: Record<string, unknown>) => {
      if (!sessionId) return;
      trackEvent({ pageId, sessionId, eventType, payload });
    },
    [pageId, sessionId],
  );

  return (
    <TrackerContext.Provider value={{ pageId, sessionId, ready, track }}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker(): TrackerContextValue {
  const ctx = useContext(TrackerContext);
  if (!ctx) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return ctx;
}
