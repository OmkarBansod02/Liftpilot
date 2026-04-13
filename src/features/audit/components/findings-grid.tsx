import type { AuditFinding } from "../types";
import { FindingCard } from "./finding-card";

interface FindingsGridProps {
  findings: AuditFinding[];
}

export function FindingsGrid({ findings }: FindingsGridProps) {
  if (findings.length === 0) return null;

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">Key Findings</h2>
        <p className="text-sm text-muted-foreground">
          Top conversion issues identified on this page
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {findings.map((finding) => (
          <FindingCard key={finding.id} finding={finding} />
        ))}
      </div>
    </section>
  );
}
