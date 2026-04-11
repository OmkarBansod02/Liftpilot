import { recordEventInputSchema } from "@/features/analytics/schemas/event-input";
import { recordSnippetEvent } from "@/features/analytics/server/record-event";
import { parseJsonRequest } from "@/lib/validations/parse-request";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonRequest(request, recordEventInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await recordSnippetEvent(parsed.data);

  return Response.json(result, { status: 202 });
}
