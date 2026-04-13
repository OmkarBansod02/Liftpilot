import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AuditFinding } from "../types";

interface FindingCardProps {
  finding: AuditFinding;
}

const severityStyles: Record<AuditFinding["severity"], string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-slate-100 text-slate-700",
};

const categoryLabels: Record<string, string> = {
  headline: "Headline",
  cta: "CTA",
  trust: "Trust",
  layout: "Layout",
  form: "Form",
  copy: "Copy",
  performance: "Performance",
};

export function FindingCard({ finding }: FindingCardProps) {
  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={severityStyles[finding.severity]}
          >
            {finding.severity}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {categoryLabels[finding.category] ?? finding.category}
          </Badge>
        </div>
        <h4 className="mt-2 text-sm font-medium leading-snug">
          {finding.title}
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {finding.description}
        </p>
      </CardContent>
    </Card>
  );
}
