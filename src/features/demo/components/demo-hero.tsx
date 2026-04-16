"use client";

import { useTracker } from "@/features/snippet/client/tracker-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface DemoHeroContent {
  brand: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustProofRow: readonly string[];
}

interface DemoHeroProps {
  content: DemoHeroContent;
}

export function DemoHero({ content }: DemoHeroProps) {
  const { track } = useTracker();

  function handleCtaClick() {
    track("cta_click", { label: content.primaryCtaLabel, location: "hero" });
    const el = document.getElementById("signup");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-center sm:pt-32">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {content.brand}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight whitespace-pre-line sm:text-5xl">
        {content.headline}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
        {content.subheadline}
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button size="lg" onClick={handleCtaClick}>
          {content.primaryCtaLabel}
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" onClick={handleCtaClick}>
          {content.secondaryCtaLabel}
        </Button>
      </div>
      {content.trustProofRow.length > 0 && (
        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {content.trustProofRow.map((proof) => (
            <span
              key={proof}
              className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {proof}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
