"use client";

import { useTracker } from "@/features/snippet/client/tracker-provider";
import { Button } from "@/components/ui/button";
import { demoContent } from "@/features/demo/lib/demo-content";
import { ArrowRight } from "lucide-react";

export function DemoHero() {
  const { track } = useTracker();

  function handleCtaClick() {
    track("cta_click", { label: demoContent.ctaLabel, location: "hero" });
    const el = document.getElementById("signup");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-center sm:pt-32">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {demoContent.brand}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight whitespace-pre-line sm:text-5xl">
        {demoContent.headline}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
        {demoContent.subheadline}
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button size="lg" onClick={handleCtaClick}>
          {demoContent.ctaLabel}
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" onClick={handleCtaClick}>
          {demoContent.secondaryCta}
        </Button>
      </div>
    </section>
  );
}
