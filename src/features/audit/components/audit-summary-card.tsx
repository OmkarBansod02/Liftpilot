import { ExternalLink, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AuditResult } from "../types";

interface AuditSummaryCardProps {
  result: AuditResult;
}

function scoreLabel(score: number): { text: string; className: string } {
  if (score >= 80) return { text: "Strong", className: "bg-emerald-100 text-emerald-800" };
  if (score >= 60) return { text: "Moderate", className: "bg-amber-100 text-amber-800" };
  if (score >= 40) return { text: "Needs Work", className: "bg-orange-100 text-orange-800" };
  return { text: "Critical", className: "bg-red-100 text-red-800" };
}

function scoreRingColor(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

export function AuditSummaryCard({ result }: AuditSummaryCardProps) {
  const label = scoreLabel(result.overallScore);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (result.overallScore / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Score + label */}
        <div className="flex items-center gap-5">
          <div className="relative flex size-20 shrink-0 items-center justify-center">
            <svg className="size-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                strokeWidth="5"
                className="stroke-muted"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className={cn("transition-all duration-700", scoreRingColor(result.overallScore))}
                style={{ stroke: "currentColor" }}
              />
            </svg>
            <span className="absolute text-lg font-bold">
              {result.overallScore}
            </span>
          </div>
          <div className="space-y-1">
            <Badge
              variant="secondary"
              className={cn("text-xs font-medium", label.className)}
            >
              {label.text}
            </Badge>
            <p className="text-sm font-medium">Conversion Score</p>
          </div>
        </div>

        {/* Page metadata */}
        <div className="space-y-2 rounded-lg bg-muted/50 p-3">
          <div className="flex items-start gap-2">
            <Globe className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 space-y-0.5">
              <p className="text-sm font-medium leading-tight">
                {result.pageMetadata.title}
              </p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {result.url}
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
          {result.pageMetadata.description && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {result.pageMetadata.description}
            </p>
          )}
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.summary}
        </p>
      </CardContent>
    </Card>
  );
}
