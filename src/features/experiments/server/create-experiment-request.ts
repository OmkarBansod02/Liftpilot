import type { CreateExperimentInput } from "@/features/experiments/schemas/experiment-input";

export interface CreateExperimentRequestResult {
  accepted: true;
  nextStep: "create-draft-experiment";
  pageId: string;
  variantId: string;
  message: string;
}

export async function createExperimentRequest(
  input: CreateExperimentInput,
): Promise<CreateExperimentRequestResult> {
  return {
    accepted: true,
    nextStep: "create-draft-experiment",
    pageId: input.pageId,
    variantId: input.variantId,
    message: "Experiment creation will be implemented in Phase 1.",
  };
}
