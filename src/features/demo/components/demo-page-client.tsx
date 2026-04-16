"use client";

import { useEffect, useMemo, useState } from "react";
import { demoContent } from "@/features/demo/lib/demo-content";
import type { DemoExperimentRuntime } from "@/features/demo/types";
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

const CONTROL_HERO_CONTENT: DemoHeroContent = {
  brand: demoContent.brand,
  headline: demoContent.headline,
  subheadline: demoContent.subheadline,
  primaryCtaLabel: demoContent.ctaLabel,
  secondaryCtaLabel: demoContent.secondaryCta,
  trustProofRow: [],
};

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
  experimentRuntime: DemoExperimentRuntime | null,
  assignment: ExperimentAssignment | null,
): DemoHeroContent {
  if (!experimentRuntime || assignment?.variantArm !== "variant") {
    return CONTROL_HERO_CONTENT;
  }

  return {
    brand: demoContent.brand,
    headline: experimentRuntime.variant.headline,
    subheadline: experimentRuntime.variant.subheadline,
    primaryCtaLabel: experimentRuntime.variant.primaryCtaLabel,
    secondaryCtaLabel: demoContent.secondaryCta,
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
  experimentRuntime: DemoExperimentRuntime | null;
}

export function DemoPageClient({
  pageId,
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
    () => buildHeroContent(experimentRuntime, assignment),
    [assignment, experimentRuntime],
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
