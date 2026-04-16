"use client";

const ANON_ID_KEY = "liftpilot_anon_id";

export function getOrCreateAnonymousId(): string {
  if (typeof window === "undefined") return "";

  const stored = localStorage.getItem(ANON_ID_KEY);
  if (stored) return stored;

  const id = crypto.randomUUID();
  localStorage.setItem(ANON_ID_KEY, id);

  return id;
}
