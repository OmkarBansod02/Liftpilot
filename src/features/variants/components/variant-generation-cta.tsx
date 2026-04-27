import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VariantGenerationCtaProps {
  onGenerate: () => void;
  isLoading: boolean;
}

export function VariantGenerationCta({
  onGenerate,
  isLoading,
}: VariantGenerationCtaProps) {
  return (
    <Card className="gap-0 border-accent-foreground/15 bg-accent/30 p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Next step
            </p>
            <h3 className="mt-1 text-base font-semibold leading-snug">
              Generate a variant proposal
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Based on the diagnosis above, Liftpilot will draft one improved
              version of your landing page. You&apos;ll review the proposed
              changes before anything goes live.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="shrink-0"
          onClick={onGenerate}
          disabled={isLoading}
        >
          {isLoading ? "Generating…" : "Generate variant"}
        </Button>
      </div>
    </Card>
  );
}
