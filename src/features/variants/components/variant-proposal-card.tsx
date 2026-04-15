import { FileText, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BaselineVsVariant } from "@/features/variants/components/baseline-vs-variant";
import type { DemoPageBaseline, SerializedVariantProposal } from "@/features/variants/types";

interface VariantProposalCardProps {
  variant: SerializedVariantProposal;
  baseline: DemoPageBaseline;
}

function formatTargetArea(area: string): string {
  return area.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function StatusBadge({ status }: { status: string }) {
  if (status === "pending_approval") {
    return <Badge variant="secondary">Pending Approval</Badge>;
  }
  return <Badge variant="outline">{status}</Badge>;
}

export function VariantProposalCard({
  variant,
  baseline,
}: VariantProposalCardProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-card p-6 ring-1 ring-foreground/10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="size-5 text-foreground/70" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Variant Proposal
              </p>
              <h2 className="mt-1 text-lg font-semibold leading-snug">
                Improved {formatTargetArea(variant.targetArea)}
              </h2>
            </div>
          </div>
          <StatusBadge status={variant.status} />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Target Area</p>
            <p className="mt-0.5 text-sm font-medium">
              {formatTargetArea(variant.targetArea)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Expected Impact</p>
            <p className="mt-0.5 text-sm font-medium">
              {variant.expectedImpact}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Source</p>
            <p className="mt-0.5 text-sm font-medium">
              {variant.source === "ai" ? "AI-generated" : "Deterministic fallback"}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium text-muted-foreground">Rationale</p>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {variant.rationale}
          </p>
        </div>
      </div>

      <BaselineVsVariant baseline={baseline} variant={variant} />

      <div className="flex items-center justify-between rounded-xl border bg-card px-6 py-4 ring-1 ring-foreground/10">
        <p className="text-sm text-muted-foreground">
          Approve this variant to begin an A/B test against your baseline.
        </p>
        <Button variant="outline" size="sm" disabled className="shrink-0 gap-2">
          <FlaskConical className="size-3.5" />
          Approve for A/B test
          <Badge variant="secondary" className="ml-1 text-[10px]">
            Phase 5
          </Badge>
        </Button>
      </div>
    </div>
  );
}
