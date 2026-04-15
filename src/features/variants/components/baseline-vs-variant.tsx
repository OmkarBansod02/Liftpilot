import { Badge } from "@/components/ui/badge";
import type { DemoPageBaseline, SerializedVariantProposal } from "@/features/variants/types";

interface BaselineVsVariantProps {
  baseline: DemoPageBaseline;
  variant: SerializedVariantProposal;
}

interface ComparisonRowProps {
  label: string;
  baselineValue: string;
  variantValue: string;
}

function ComparisonRow({ label, baselineValue, variantValue }: ComparisonRowProps) {
  const changed = baselineValue !== variantValue;

  return (
    <div className="grid grid-cols-[120px_1fr_1fr] gap-3 py-3 text-sm">
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className="leading-relaxed">{baselineValue}</span>
      <span className={changed ? "font-medium leading-relaxed" : "leading-relaxed text-muted-foreground"}>
        {variantValue}
        {changed && (
          <Badge variant="outline" className="ml-2 text-[10px]">
            changed
          </Badge>
        )}
      </span>
    </div>
  );
}

export function BaselineVsVariant({ baseline, variant }: BaselineVsVariantProps) {
  return (
    <div className="rounded-lg border">
      <div className="grid grid-cols-[120px_1fr_1fr] gap-3 border-b bg-muted/50 px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Element</span>
        <span>Baseline</span>
        <span>Proposed Variant</span>
      </div>

      <div className="divide-y px-4">
        <ComparisonRow
          label="Headline"
          baselineValue={baseline.headline}
          variantValue={variant.headline}
        />
        <ComparisonRow
          label="Subheadline"
          baselineValue={baseline.subheadline}
          variantValue={variant.subheadline}
        />
        <ComparisonRow
          label="CTA Label"
          baselineValue={baseline.primaryCtaLabel}
          variantValue={variant.primaryCtaLabel}
        />
        <ComparisonRow
          label="Trust / Proof"
          baselineValue={baseline.trustProofRow.join(" · ")}
          variantValue={variant.trustProofRow.join(" · ")}
        />
      </div>
    </div>
  );
}
