# Liftpilot Phase 0 Schema

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
- `events`: validated snippet events. Stores session, page, event type,
  flexible payload JSON, and occurrence time.
- `variants`: one generated variant proposal. Stores page, optional source
  audit, approval status, structured variant content, and rationale.
- `experiments`: one A/B test for a page and variant. Stores status, primary
  conversion event, and lifecycle timestamps.
- `conversions`: conversion attribution for an experiment arm. Stores
  experiment, session, page, arm, event name, and occurrence time.

## Enums

- `audit_status`: `queued`, `processing`, `completed`, `failed`
- `event_type`: `page_view`, `scroll_milestone`, `cta_click`, `form_start`,
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
