import type { RecordEventInput } from "@/features/analytics/schemas/event-input";

export async function recordEvent(input: RecordEventInput) {
  return {
    accepted: true,
    eventType: input.eventType,
  };
}
