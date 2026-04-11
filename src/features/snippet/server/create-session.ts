import type { CreateSessionInput } from "@/features/snippet/schemas/session-input";

export async function createSession(input: CreateSessionInput) {
  return {
    accepted: true,
    anonymousId: input.anonymousId,
  };
}
