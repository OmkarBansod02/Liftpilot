"use client";

import { TrackerProvider } from "@/features/snippet/client/tracker-provider";
import { usePageView } from "@/features/snippet/client/use-page-view";
import { useScrollDepth } from "@/features/snippet/client/use-scroll-depth";
import { DemoHero } from "./demo-hero";
import { DemoFeatures } from "./demo-features";
import { DemoSocialProof } from "./demo-social-proof";
import { DemoSignupForm } from "./demo-signup-form";

function TrackedContent() {
  usePageView();
  useScrollDepth();

  return (
    <>
      <DemoHero />
      <DemoFeatures />
      <DemoSocialProof />
      <DemoSignupForm />
    </>
  );
}

interface DemoPageClientProps {
  pageId: string;
}

export function DemoPageClient({ pageId }: DemoPageClientProps) {
  return (
    <TrackerProvider pageId={pageId}>
      <TrackedContent />
    </TrackerProvider>
  );
}
