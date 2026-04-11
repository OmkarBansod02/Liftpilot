import type { CreateSessionInput } from "@/features/snippet/schemas/session-input";

export interface CreateSessionResult {
  accepted: true;
  nextStep: "persist-snippet-session";
  anonymousId: string;
  message: string;
}

export async function createSnippetSession(
  input: CreateSessionInput,
): Promise<CreateSessionResult> {
  return {
    accepted: true,
    nextStep: "persist-snippet-session",
    anonymousId: input.anonymousId,
    message: "Session persistence will be implemented in Phase 1.",
  };
}
