import type { RecordEventInput } from "@/features/analytics/schemas/event-input";

export interface RecordEventResult {
  accepted: true;
  nextStep: "persist-snippet-event";
  eventType: RecordEventInput["eventType"];
  message: string;
}

export async function recordSnippetEvent(
  input: RecordEventInput,
): Promise<RecordEventResult> {
  return {
    accepted: true,
    nextStep: "persist-snippet-event",
    eventType: input.eventType,
    message: "Event persistence will be implemented in Phase 1.",
  };
}
