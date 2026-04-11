import { createAuditInputSchema } from "@/features/audit/schemas/audit-input";
import { createAudit } from "@/features/audit/server/create-audit";
import { parseJsonBody } from "@/lib/validations/parse-json-body";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonBody(request, createAuditInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await createAudit(parsed.data);

  return Response.json(result, { status: 202 });
}
