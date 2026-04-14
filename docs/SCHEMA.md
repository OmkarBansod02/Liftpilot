# Liftpilot Schema

This schema is intentionally small. It models the MVP loop without turning
Liftpilot into a generic analytics or experimentation platform.

## Core Tables

- `sites`: the tracked website container. Stores a display name, canonical URL,
  and timestamps.
- `pages`: the landing page being optimized. Stores the owning site, page URL,
  optional title, and the primary conversion event.
- `audits`: a URL audit run for a page. Stores audit status, screenshot URL,
  extracted page signals, deterministic or AI-assisted findings, and one
  recommended experiment.
- `sessions`: an anonymous visitor session for a page. Stores anonymous ID,
  optional experiment context, user agent, referrer, and first/last seen times.
- `events`: validated snippet events. Stores session, page, event type, a small
  typed payload JSON object, and occurrence time.
- `variants`: one generated variant proposal. Stores page, optional source
  audit, approval status, structured variant content, and rationale.
- `experiments`: one A/B test for a page and variant. Stores status, primary
  conversion event, and lifecycle timestamps.
- `conversions`: conversion attribution for an experiment arm. Stores
  experiment, session, page, arm, event name, and occurrence time.

## Enums

- `audit_status`: `queued`, `processing`, `completed`, `failed`
- `event_type`: `page_view`, `scroll_depth`, `cta_click`, `form_start`,
  `form_submit`
- `variant_status`: `draft`, `pending_approval`, `approved`, `rejected`
- `experiment_status`: `draft`, `running`, `paused`, `completed`
- `experiment_arm`: `control`, `variant`

## Phase 0 Choices

- Drizzle table definitions live in `src/lib/db/schema.ts` so migrations have
  one obvious source of truth.
- Feature request contracts live in `src/features/*/schemas` and use zod at
  route boundaries.
- JSONB is used for page signals, audit findings, event payloads, and variant
  content until Phase 1 proves which fields need normalization.
- No repository layer, service container, workflow engine, or analytics
  framework exists in Phase 0.

## Phase 2 Tracking Contract

Anonymous sessions are reused by `page_id` and `anonymous_id`. The browser owns
the anonymous ID; the server owns the persisted session row.

Supported event payloads:

- `page_view`: `{ "path"?: string, "title"?: string }`
- `scroll_depth`: `{ "depth": 25 | 50 | 75 | 100 }`
- `cta_click`: `{ "label"?: string, "location"?: string }`
- `form_start`: `{ "formId"?: string, "field"?: string }`
- `form_submit`: `{ "formId"?: string }`

Dashboard metrics are computed directly from `sessions` and `events`:

- total sessions
- total page views
- CTA clicks and click-through rate
- form starts and form start rate
- form submits and form submit rate

## Phase 3 Diagnosis Contract

Diagnosis is computed from dashboard metrics at read time. It is not persisted
in a separate table in Phase 3.

The dashboard metrics response now includes:

- `scrollDepth.totalScrollEvents`
- `scrollDepth.sessionsWithScrollDepth`
- `scrollDepth.averageMaxScrollDepth`
- `scrollDepth.highestScrollDepth`
- `diagnosis.status`: `not_enough_data` or `ready`
- `diagnosis.primaryBottleneck`: `insufficient_data`,
  `low_cta_engagement`, `weak_above_the_fold_interest`, `form_friction`,
  `good_interest_weak_conversion`, or `healthy_funnel`
- `diagnosis.title`
- `diagnosis.summary`
- `diagnosis.confidence`: `low`, `medium`, or `high`
- `diagnosis.supportingSignals`: label, value, and description objects
- `diagnosis.recommendedExperiment`: title, description, target area, and
  expected impact
- `diagnosis.createdAt`

Diagnosis rules are deterministic and intentionally small:

- fewer than 5 sessions or fewer than 10 page views means more data is needed
- healthy form starts with weak submits indicates form friction
- low average scroll depth plus low CTA click-through indicates weak
  above-the-fold interest
- low CTA click-through alone indicates CTA engagement is the bottleneck
- good scroll depth with weak submits indicates interest is present but
  conversion is weak
- otherwise the funnel is treated as healthy enough for an incremental test
