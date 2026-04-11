import { createVariantInputSchema } from "@/features/variants/schemas/variant-input";
import { createVariantRequest } from "@/features/variants/server/create-variant-request";
import { parseJsonRequest } from "@/lib/validations/parse-request";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonRequest(request, createVariantInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await createVariantRequest(parsed.data);

  return Response.json(result, { status: 202 });
}
