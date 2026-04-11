import type { CreateAuditInput } from "@/features/audit/schemas/audit-input";

export async function createAudit(input: CreateAuditInput) {
  return {
    accepted: true,
    url: input.url,
  };
}
