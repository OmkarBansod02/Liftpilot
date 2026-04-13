import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuditIssue } from "../types";

interface IssueListProps {
  issues: AuditIssue[];
}

const severityStyles: Record<AuditIssue["severity"], string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-slate-100 text-slate-700",
};

export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) return null;

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">Prioritized Issues</h2>
        <p className="text-sm text-muted-foreground">
          Ordered by likely impact on conversion
        </p>
      </div>
      <div className="space-y-3">
        {issues.map((issue, index) => (
          <Card key={issue.id} size="sm">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold">
                  {index + 1}
                </span>
                <CardTitle className="flex-1">{issue.title}</CardTitle>
                <Badge
                  variant="secondary"
                  className={severityStyles[issue.severity]}
                >
                  {issue.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {issue.description}
              </p>
              <div className="rounded-lg bg-amber-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-xs font-medium text-amber-900">
                      Why this likely hurts conversion
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-amber-800">
                      {issue.conversionImpact}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
