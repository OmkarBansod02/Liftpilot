import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VariantGenerationCtaProps {
  onGenerate: () => void;
  isLoading: boolean;
}

export function VariantGenerationCta({
  onGenerate,
  isLoading,
}: VariantGenerationCtaProps) {
  return (
    <div className="rounded-xl border bg-card p-6 ring-1 ring-foreground/10">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Next Step
      </p>
      <h3 className="mt-1 text-base font-semibold leading-snug">
        Generate a variant proposal
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Based on the diagnosis above, Liftpilot can generate an improved version
        of your landing page. You&apos;ll review the proposed changes before
        anything goes live.
      </p>
      <div className="mt-4 border-t pt-4">
        <Button
          size="sm"
          className="gap-2"
          onClick={onGenerate}
          disabled={isLoading}
        >
          <Sparkles className="size-3.5" />
          {isLoading ? "Generating…" : "Generate variant"}
        </Button>
      </div>
    </div>
  );
}
