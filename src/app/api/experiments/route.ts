import { createExperimentInputSchema } from "@/features/experiments/schemas/experiment-input";
import { createExperimentRequest } from "@/features/experiments/server/create-experiment-request";
import { parseJsonRequest } from "@/lib/validations/parse-request";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonRequest(request, createExperimentInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await createExperimentRequest(parsed.data);

  return Response.json(result, { status: 202 });
}
