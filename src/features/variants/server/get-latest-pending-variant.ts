import { mapVariantRow } from "@/features/variants/lib/map-variant-row";
import type { GetLatestPendingVariantInput } from "@/features/variants/schemas/variant-input";
import type { VariantProposal } from "@/features/variants/types";
import { db } from "@/lib/db";
import { variants } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getLatestPendingVariant(
  input: GetLatestPendingVariantInput,
): Promise<VariantProposal | null> {
  const latestPendingVariant = await db
    .select()
    .from(variants)
    .where(
      and(
        eq(variants.pageId, input.pageId),
        eq(variants.status, "pending_approval"),
      ),
    )
    .orderBy(desc(variants.createdAt))
    .limit(1);

  const row = latestPendingVariant[0];

  return row ? mapVariantRow(row) : null;
}
