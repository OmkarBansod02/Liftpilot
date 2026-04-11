import type { CreateVariantInput } from "@/features/variants/schemas/variant-input";

export interface CreateVariantRequestResult {
  accepted: true;
  nextStep: "generate-variant-proposal";
  pageId: string;
  message: string;
}

export async function createVariantRequest(
  input: CreateVariantInput,
): Promise<CreateVariantRequestResult> {
  return {
    accepted: true,
    nextStep: "generate-variant-proposal",
    pageId: input.pageId,
    message: "Variant generation will be implemented in Phase 1.",
  };
}
