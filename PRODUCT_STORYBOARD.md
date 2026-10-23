# CoreDraft Studio — Public Product Story and Screenshot Register

## Marketing positions

- **QuoteDesk:** Active in business operations. On-demand adaptation available.
- **Construction Control:** Active in business operations. Implementation tailored to each organization.
- **ProcureFlow:** On-demand customization.
- **PharmaDocs:** On-demand customization. Regulated production usage requires project-specific validation.
- **People & Compliance:** On-demand customization.

No client names appear in marketing copy. No invented subscriber counts, performance statistics, endorsements, or independent validation claims.

## Visuals already in the website repository

The Construction Control chapter contains three authentic UI screenshots from its separate source repository, captured with fictional sample records:
- `Assets/product-screens/construction-expense-preview.png`
- `Assets/product-screens/construction-billing-preview.png`
- `Assets/product-screens/construction-evidence-preview.png`

## Product screenshot assets — committed to the website

All twelve additional optimized WebP screenshots have been committed under `Assets/product-screens/` and are referenced automatically by the homepage motion engine.

- QuoteDesk: `quotedesk-editor.webp`, `quotedesk-workflow.webp`, `quotedesk-review.webp`
- ProcureFlow: `procureflow-overview.webp`, `procureflow-requisitions.webp`, `procureflow-pipeline.webp`
- PharmaDocs: `pharmadocs-overview.webp`, `pharmadocs-authoring.webp`, `pharmadocs-governance.webp`

The screenshot assets come from existing application source previews and historical user screenshots; they are not fresh customer-production captures. ProcureFlow shows three crops from one local demonstration dashboard, not three independent views. QuoteDesk and People & Compliance screenshots have been cropped and/or redacted to avoid exposing company identifiers, payroll figures, names and addresses. All are optimized WebP assets.

- People & Compliance: `people-overview.webp`, `people-payroll.webp`, `people-master.webp`

**Published asset verification:** Each of the twelve new WebP files was transferred to the repository using the Git blobs API and its resulting Git blob SHA was matched against the local file's `git hash-object` digest. No manual screenshot upload is required. The motion-enabled homepage still has a graceful editorial fallback if an image request fails.

## People & Compliance screenshots

Three redacted historical captures of the existing business-operations UI are included in the separate upload pack. These show the overview, payroll controls, and regulatory-readiness layout, not a publicly exposed tenant or subscriber interface. The original images contained sensitive company and compensation data, which are removed or obscured in the supplied files.

## Scrollytelling behaviors

- Desktop: animated hero, background orbs and marshalling ticker, sticky product copy, scrubbed 3D screenshot movement, depth transitions, reveal effects, scene flourishes, chapter progress, focus rail.
- Mobile: reduced-cost stacked animations that avoid excessive pinning, clipping and motion-induced slowdowns.
- Accessibility: prefers-reduced-motion disables continuous and scrubbed transforms. Screen images have alt descriptions and product navigation remains keyboard accessible.
- Resilience: GSAP + ScrollTrigger loaded from CDN when available. Native requestAnimationFrame scroll choreography works as fallback if CDN is blocked.

## Final QA

Verify full page at 1440px desktop and 390px mobile; refresh with JavaScript disabled; keyboard traversal; prefers-reduced-motion; network offline to ensure native fallback; and absence of private identifiers within any screenshot before public promotion.
