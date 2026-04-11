import { createExperimentInputSchema } from "@/features/experiments/schemas/experiment-input";
import { createExperiment } from "@/features/experiments/server/create-experiment";
import { parseJsonBody } from "@/lib/validations/parse-json-body";

export async function POST(request: Request): Promise<Response> {
  const parsed = await parseJsonBody(request, createExperimentInputSchema);

  if (!parsed.ok) {
    return parsed.response;
  }

  const result = await createExperiment(parsed.data);

  return Response.json(result, { status: 202 });
}
