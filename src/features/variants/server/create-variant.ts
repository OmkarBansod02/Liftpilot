import type { CreateVariantInput } from "@/features/variants/schemas/variant-input";

export async function createVariant(input: CreateVariantInput) {
  return {
    accepted: true,
    pageId: input.pageId,
  };
}
