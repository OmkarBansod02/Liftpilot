import type { AuditResult } from "../types";

export const MOCK_AUDIT_RESULT: AuditResult = {
  id: "audit_demo_001",
  url: "https://yetico.com",
  screenshotUrl: null,
  pageMetadata: {
    title: "Yeti Co — Premium Outdoor Gear for Every Adventure",
    description:
      "Premium outdoor gear trusted by 10,000+ adventurers. Browse our latest collection and find your next favorite.",
    ogImage: null,
  },
  overallScore: 42,
  summary:
    "This landing page has strong product imagery potential but suffers from a vague headline, a buried primary CTA, and weak trust signals above the fold. Visitors likely bounce before understanding the core value proposition. The layout prioritizes navigation over conversion, and the hero section lacks urgency or specificity.",
  findings: [
    {
      id: "f1",
      title: "Headline doesn't communicate specific value",
      severity: "high",
      category: "headline",
      description:
        "\"Gear built for the wild\" is generic and doesn't differentiate from competitors. Visitors can't immediately understand why they should stay.",
    },
    {
      id: "f2",
      title: "Primary CTA is below the fold",
      severity: "high",
      category: "cta",
      description:
        "The main conversion action (Shop the Collection) requires scrolling. Most visitors won't reach it before bouncing.",
    },
    {
      id: "f3",
      title: "No trust signals in hero section",
      severity: "medium",
      category: "trust",
      description:
        "Social proof (reviews, customer count) is positioned far from the hero. Adding trust cues near the headline would reduce hesitation.",
    },
    {
      id: "f4",
      title: "Navigation competes with conversion",
      severity: "medium",
      category: "layout",
      description:
        "The top nav has 5+ links that pull attention away from the primary conversion flow. Simplifying would focus visitor intent.",
    },
    {
      id: "f5",
      title: "No lifestyle imagery in hero",
      severity: "low",
      category: "copy",
      description:
        "Product-only imagery misses the emotional connection. Showing gear in use builds aspiration and increases engagement.",
    },
  ],
  issues: [
    {
      id: "i1",
      title: "Vague hero headline",
      severity: "high",
      category: "headline",
      description:
        "The headline \"Gear built for the wild\" doesn't convey a specific benefit or outcome. Visitors need to understand the value proposition in under 5 seconds.",
      conversionImpact:
        "Weak headlines are the #1 cause of high bounce rates on landing pages. Visitors who don't instantly grasp the value proposition leave within 3-5 seconds, typically accounting for 40-60% of all bounces.",
    },
    {
      id: "i2",
      title: "CTA not visible without scrolling",
      severity: "high",
      category: "cta",
      description:
        "The primary action button sits below the fold. On mobile, it requires 2+ scrolls to reach.",
      conversionImpact:
        "CTAs below the fold see 30-50% fewer clicks. When visitors have to search for the next step, friction increases and drop-off rises sharply — especially on mobile where scroll fatigue is higher.",
    },
    {
      id: "i3",
      title: "Trust signals disconnected from decision point",
      severity: "medium",
      category: "trust",
      description:
        "Reviews (4.9 stars, 2,400+ reviews) and customer count (10,000+) exist on the page but are placed far from the hero and CTA.",
      conversionImpact:
        "Trust signals placed near the primary CTA can increase conversion by 10-25%. When social proof is distant from the decision point, visitors must remember it rather than feel it at the moment of action.",
    },
    {
      id: "i4",
      title: "Excessive navigation options",
      severity: "medium",
      category: "layout",
      description:
        "The top navigation includes Products, About, and Shop links, plus a promotional banner. This creates multiple exit paths from the conversion funnel.",
      conversionImpact:
        "Every additional navigation option reduces the probability of the desired action. Pages with focused navigation (1-2 links) convert 20-30% better than those with full site navigation.",
    },
  ],
  recommendedExperiment: {
    title: "Test a value-driven headline with above-fold CTA",
    hypothesis:
      "Replacing the generic headline with a specific value proposition and moving the primary CTA above the fold will reduce bounce rate and increase Shop clicks.",
    expectedImpact: "+15-25% click-through to Shop",
    changes: [
      "Replace \"Gear built for the wild\" with \"Premium outdoor gear trusted by 10,000+ adventurers\"",
      "Move \"Shop the Collection\" button into the hero section",
      "Add star rating badge next to the CTA",
      "Reduce hero nav to logo + single CTA",
    ],
    rationale:
      "The current page loses visitors at the hero because it doesn't answer \"why should I care?\" fast enough. By leading with social proof in the headline and giving an immediate action path, we reduce the cognitive load required to convert. This is the highest-leverage change because it addresses both the #1 and #2 prioritized issues simultaneously.",
  },
  createdAt: new Date("2026-04-13T10:30:00Z"),
};

export const AUDIT_LOADING_STEPS = [
  { label: "Connecting to page", duration: 1200 },
  { label: "Capturing screenshot", duration: 1800 },
  { label: "Extracting page signals", duration: 2000 },
  { label: "Analyzing conversion patterns", duration: 2200 },
  { label: "Generating audit report", duration: 1500 },
] as const;
