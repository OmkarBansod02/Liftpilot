import type { CreateAuditInput } from "@/features/audit/schemas/audit-input";

export interface CreateAuditRequestResult {
  accepted: true;
  nextStep: "capture-page-signals";
  url: string;
  message: string;
}

export async function createAuditRequest(
  input: CreateAuditInput,
): Promise<CreateAuditRequestResult> {
  return {
    accepted: true,
    nextStep: "capture-page-signals",
    url: input.url,
    message: "Audit orchestration will be implemented in Phase 1.",
  };
}
