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

## New genuine screenshot pack

The repository homepage and motion engine support the following assets. They are supplied as a separate ZIP for upload into the repository's `Assets/product-screens/` directory.

- QuoteDesk: `quotedesk-editor.webp`, `quotedesk-workflow.webp`, `quotedesk-review.webp`
- ProcureFlow: `procureflow-overview.webp`, `procureflow-requisitions.webp`, `procureflow-pipeline.webp`
- PharmaDocs: `pharmadocs-overview.webp`, `pharmadocs-authoring.webp`, `pharmadocs-governance.webp`

The historical sample-data captures came from existing application source previews and user Library screenshots; they are not freshly authenticated production captures. The three ProcureFlow files are crops of the same local dashboard screenshot and do not represent three separate product screens. QuoteDesk screenshots are cropped / redacted to remove company, staff and sample customer identification. All are optimized WebP assets.

**Important:** Screenshot files in the separate ZIP have not been committed to GitHub because the available GitHub connector cannot transfer local binary files. The motion-enabled homepage uses a graceful editorial fallback for any missing asset, without broken images or misleading claims. Upload the supplied assets to the corresponding repository paths to activate real screenshots automatically on the next Cloudflare Git deployment.

## People & Compliance

No suitable sanitized standalone image was located. Its chapter uses a dedicated animated workflow composition rather than a misleading screenshot from a different product. Capture three synthetic-data screens from the actual People & Compliance module before presenting them as product screenshots.

## Scrollytelling behaviors

- Desktop: animated hero, background orbs and marshalling ticker, sticky product copy, scrubbed 3D screenshot movement, depth transitions, reveal effects, scene flourishes, chapter progress, focus rail.
- Mobile: reduced-cost stacked animations that avoid excessive pinning, clipping and motion-induced slowdowns.
- Accessibility: prefers-reduced-motion disables continuous and scrubbed transforms. Screen images have alt descriptions and product navigation remains keyboard accessible.
- Resilience: GSAP + ScrollTrigger loaded from CDN when available. Native requestAnimationFrame scroll choreography works as fallback if CDN is blocked.

## Final QA

Verify full page at 1440px desktop and 390px mobile; refresh with JavaScript disabled; keyboard traversal; prefers-reduced-motion; network offline to ensure native fallback; and absence of private identifiers within any screenshot before public promotion.
