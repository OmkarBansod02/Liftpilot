"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  DemoExperimentRuntime,
  DemoPageBaseline,
} from "@/features/demo/types";
import { assignExperimentArm } from "@/features/experiments/lib/assign-experiment-arm";
import type { ExperimentAssignment } from "@/features/experiments/types";
import { getOrCreateAnonymousId } from "@/features/snippet/client/anonymous-id";
import { TrackerProvider } from "@/features/snippet/client/tracker-provider";
import { usePageView } from "@/features/snippet/client/use-page-view";
import { useScrollDepth } from "@/features/snippet/client/use-scroll-depth";
import { DevArmBadge } from "./dev-arm-badge";
import { DemoFeatures } from "./demo-features";
import { DemoHero, type DemoHeroContent } from "./demo-hero";
import { DemoSignupForm } from "./demo-signup-form";
import { DemoSocialProof } from "./demo-social-proof";

function getAssignmentCookieName(experimentId: string): string {
  return `liftpilot_exp_${experimentId}`;
}

function readAssignmentCookie(experimentId: string): ExperimentAssignment | null {
  const cookieName = `${getAssignmentCookieName(experimentId)}=`;
  const rawCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(cookieName));
  const rawArm = rawCookie?.slice(cookieName.length);

  if (rawArm !== "control" && rawArm !== "variant") return null;

  return { experimentId, variantArm: rawArm };
}

function writeAssignmentCookie(assignment: ExperimentAssignment): void {
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `${getAssignmentCookieName(assignment.experimentId)}=${assignment.variantArm}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

function resolveAssignment(
  experimentRuntime: DemoExperimentRuntime,
): ExperimentAssignment {
  const cookieAssignment = readAssignmentCookie(experimentRuntime.experimentId);
  if (cookieAssignment) return cookieAssignment;

  const anonymousId = getOrCreateAnonymousId();
  const assignment = {
    experimentId: experimentRuntime.experimentId,
    variantArm: assignExperimentArm({
      experimentId: experimentRuntime.experimentId,
      anonymousId,
    }),
  };

  writeAssignmentCookie(assignment);

  return assignment;
}

function buildHeroContent(
  baseline: DemoPageBaseline,
  experimentRuntime: DemoExperimentRuntime | null,
  assignment: ExperimentAssignment | null,
): DemoHeroContent {
  if (!experimentRuntime || assignment?.variantArm !== "variant") {
    return {
      brand: baseline.brand,
      headline: baseline.headline,
      subheadline: baseline.subheadline,
      primaryCtaLabel: baseline.primaryCtaLabel,
      secondaryCtaLabel: baseline.secondaryCtaLabel,
      trustProofRow: baseline.trustProofRow,
    };
  }

  return {
    brand: baseline.brand,
    headline: experimentRuntime.variant.headline,
    subheadline: experimentRuntime.variant.subheadline,
    primaryCtaLabel: experimentRuntime.variant.primaryCtaLabel,
    secondaryCtaLabel: baseline.secondaryCtaLabel,
    trustProofRow: experimentRuntime.variant.trustProofRow,
  };
}

function TrackedContent({
  heroContent,
}: {
  heroContent: DemoHeroContent;
}) {
  usePageView();
  useScrollDepth();

  return (
    <>
      <DemoHero content={heroContent} />
      <DemoFeatures />
      <DemoSocialProof />
      <DemoSignupForm ctaLabel={heroContent.primaryCtaLabel} />
    </>
  );
}

interface DemoPageClientProps {
  pageId: string;
  baseline: DemoPageBaseline;
  experimentRuntime: DemoExperimentRuntime | null;
}

export function DemoPageClient({
  pageId,
  baseline,
  experimentRuntime,
}: DemoPageClientProps) {
  const [assignment, setAssignment] = useState<ExperimentAssignment | null>(
    null,
  );

  useEffect(() => {
    if (!experimentRuntime) return;

    const timerId = window.setTimeout(() => {
      setAssignment(resolveAssignment(experimentRuntime));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [experimentRuntime]);

  const heroContent = useMemo(
    () => buildHeroContent(baseline, experimentRuntime, assignment),
    [assignment, baseline, experimentRuntime],
  );

  const experimentContext = experimentRuntime ? assignment : null;

  if (experimentRuntime && !assignment) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center text-sm text-muted-foreground">
        Preparing experiment...
      </div>
    );
  }

  return (
    <TrackerProvider
      pageId={pageId}
      experimentContext={experimentContext}
    >
      <TrackedContent heroContent={heroContent} />
      {assignment && <DevArmBadge arm={assignment.variantArm} />}
    </TrackerProvider>
  );
}
