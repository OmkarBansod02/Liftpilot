import { recordEventInputSchema } from "@/features/analytics/schemas/event-input";
import { recordEvent } from "@/features/analytics/server/record-event";
import { parseJsonBody } from "@/lib/validations/parse-json-body";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonBody(request, recordEventInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await recordEvent(parsed.data);

  return Response.json(result, { status: 202 });
}
