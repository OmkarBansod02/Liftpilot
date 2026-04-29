import { Camera, FlaskConical, Search, ShieldCheck } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { AuditPageClient } from "@/features/audit/components/audit-page-client";

const trustItems = [
  { icon: Camera, label: "Screenshot & structure" },
  { icon: Search, label: "Prioritized issues" },
  { icon: FlaskConical, label: "One recommended experiment" },
  { icon: ShieldCheck, label: "Deterministic + AI" },
] as const;

export default function AuditPage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[280px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--accent)_0%,transparent_70%)] opacity-70"
      />

      <PageContainer>
        <PageHeader
          title="URL Audit"
          description="Paste any public landing page. Get a fast, structured conversion audit — and one experiment to run next."
        >
          <Badge
            variant="secondary"
            className="h-6 rounded-full border-border bg-card px-2.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
          >
            Quick start
          </Badge>
        </PageHeader>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-muted-foreground">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <item.icon className="size-3.5 text-primary/80" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <AuditPageClient />
        </div>
      </PageContainer>
    </div>
  );
}
