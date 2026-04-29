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
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-28 text-center sm:pb-32 sm:pt-40">
      <p className="text-xs font-semibold tracking-widest text-primary/80 uppercase">
        {content.brand}
      </p>
      <h1 className="mt-5 text-5xl font-extrabold tracking-tight whitespace-pre-line text-balance sm:text-6xl">
        {content.headline}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {content.subheadline}
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Button
          size="lg"
          className="h-11 px-6 text-base shadow-md"
          onClick={handleCtaClick}
        >
          {content.primaryCtaLabel}
          <ArrowRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-11 px-6 text-base"
          onClick={handleCtaClick}
        >
          {content.secondaryCtaLabel}
        </Button>
      </div>
      {content.trustProofRow.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
          {content.trustProofRow.map((proof) => (
            <span
              key={proof}
              className="rounded-full border border-primary/15 bg-accent/60 px-3.5 py-1 text-xs font-medium text-accent-foreground"
            >
              {proof}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
