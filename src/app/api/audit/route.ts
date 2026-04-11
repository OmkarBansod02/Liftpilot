import { createAuditInputSchema } from "@/features/audit/schemas/audit-input";
import { createAuditRequest } from "@/features/audit/server/create-audit-request";
import { parseJsonRequest } from "@/lib/validations/parse-request";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonRequest(request, createAuditInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await createAuditRequest(parsed.data);

  return Response.json(result, { status: 202 });
}
