import type { CreateExperimentInput } from "@/features/experiments/schemas/experiment-input";

export async function createExperiment(input: CreateExperimentInput) {
  return {
    accepted: true,
    pageId: input.pageId,
    variantId: input.variantId,
  };
}
