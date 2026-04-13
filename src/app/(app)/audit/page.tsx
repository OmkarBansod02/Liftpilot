import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { AuditPageClient } from "@/features/audit/components/audit-page-client";

export default function AuditPage() {
  return (
    <PageContainer>
      <PageHeader
        title="URL Audit"
        description="Paste a public URL to get a fast conversion audit with actionable findings."
      >
        <Badge variant="secondary">Phase 1</Badge>
      </PageHeader>

      <div className="mt-8">
        <AuditPageClient />
      </div>
    </PageContainer>
  );
}
