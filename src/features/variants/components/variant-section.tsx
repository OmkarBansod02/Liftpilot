"use client";

import { useCallback, useState } from "react";
import { VariantGenerationCta } from "@/features/variants/components/variant-generation-cta";
import { VariantLoading } from "@/features/variants/components/variant-loading";
import { VariantError } from "@/features/variants/components/variant-error";
import { VariantProposalCard } from "@/features/variants/components/variant-proposal-card";
import type { DemoPageBaseline, SerializedVariantProposal } from "@/features/variants/types";

interface VariantSectionProps {
  pageId: string;
  baseline: DemoPageBaseline;
  initialVariant: SerializedVariantProposal | null;
}

type GenerationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; variant: SerializedVariantProposal };

export function VariantSection({
  pageId,
  baseline,
  initialVariant,
}: VariantSectionProps) {
  const [state, setState] = useState<GenerationState>(
    initialVariant
      ? { status: "success", variant: initialVariant }
      : { status: "idle" },
  );

  const handleGenerate = useCallback(async () => {
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/variants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const message =
          (body as { error?: string } | null)?.error ??
          "Something went wrong while generating the variant.";
        setState({ status: "error", message });
        return;
      }

      const data = (await response.json()) as SerializedVariantProposal;
      setState({ status: "success", variant: data });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }, [pageId]);

  if (state.status === "idle") {
    return <VariantGenerationCta onGenerate={handleGenerate} isLoading={false} />;
  }

  if (state.status === "loading") {
    return (
      <div className="space-y-4">
        <VariantGenerationCta onGenerate={handleGenerate} isLoading />
        <VariantLoading />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <VariantError
        message={state.message}
        onRetry={handleGenerate}
      />
    );
  }

  return (
    <VariantProposalCard
      variant={state.variant}
      baseline={baseline}
      onApproved={(variant) => setState({ status: "success", variant })}
    />
  );
}
