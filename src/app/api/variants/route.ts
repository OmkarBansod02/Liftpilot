import { createVariantInputSchema } from "@/features/variants/schemas/variant-input";
import { createVariant } from "@/features/variants/server/create-variant";
import { parseJsonBody } from "@/lib/validations/parse-json-body";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonBody(request, createVariantInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await createVariant(parsed.data);

  return Response.json(result, { status: 202 });
}
