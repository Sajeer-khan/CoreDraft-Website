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

## Dedicated product pages — October 2026

Public landing pages:
- `/products/`: Product directory
- `/products/quotedesk/`: Commercial operations (9 user-facing capability groups)
- `/products/procureflow/`: Procurement (10 capability groups)
- `/products/pharmadocs/`: Pharmaceutical quality eQMS (10 capability groups)
- `/products/people-compliance/`: People and compliance (10 capability groups)
- `/products/construction-control/`: Construction operations and finance (10 capability groups)

All five product detail pages use one shared accessible CSS/JS foundation and show three sanitized interface screenshots each, consistent with the 15 actual published screenshot assets. The screenshots are kept at a limited public-safe level of detail. Module inventories are capability descriptions, not promises of independently verified live functionality. QuoteDesk and Construction Control are described as in active business use; the other three are available for on-demand customization discussions.

### Intellectual-property disclosure policy
- Public pages **can communicate product ideas and UI patterns**, and screenshots can be copied by visitors; there is no technical way to make a public visual completely AI-unreproducible.
- Do not publish source code, protected architecture, SQL/schema, API specifications, credential information, exact approval matrices, price algorithms, data fixtures or operational playbooks.
- Do not claim public screenshot watermark overlays are a security boundary; visitors can still inspect browser-delivered media.
- Retain full workflows and configuration specifications for private demonstrations, with confidentiality terms where appropriate.
- Images should contain fictional or redacted data and omit identifiable customers and internal financial detail.
- Product capability descriptions are intended for scoping; applicable regulated validation remains a separate obligation.

### Links and deployment
All homepage primary product CTAs navigate to dedicated product pages. Separate secondary CTAs remain available for enquiries. The product directory links all five products. The sitemap includes each page. This is a static Cloudflare Pages website (framework: none; root output directory), with progressive GSAP animation and reduced-motion/mobile fallbacks. Verify the production deployment after merging the release.

## Future concepts and private explorations — October 2026

A dedicated `/products/future/` page now groups prospective concepts without suggesting product availability or disclosing proprietary mechanics.

**Proposed business software concepts (concept in exploration, not committed releases):**
1. JobDesk — project/job execution coordination
2. ServiceDesk — maintenance and field service operations
3. LeadDesk — sales follow-through
4. MarginDesk — profit visibility
5. CollectDesk — receivables follow-up
6. VendorDesk — supplier record coordination
7. StockDesk — materials/inventory visibility
8. ContractDesk — contract obligation oversight
9. OwnerPulse — cross-product management exception visibility (could be a shared capability rather than separate SaaS)

**Separate exploratory mobile product:** TERVIAN — private Android-first progression initiative, outside the SME SaaS category. No commercial association, release status, hosted service or production readiness claimed.

Existing People & Compliance covers the previously proposed PeopleDesk category; the concept is not duplicated as another product.

### Publication safeguards

- Concepts are publicly described only at the problem/outcome level. No source code, architecture, approval matrices, detailed data models, algorithms, synthetic UI masquerading as a screenshot, delivery promises or dates.
- Proposal visibility is not commitment to build or release. An idea may become a module, evolve, be renamed, or not be pursued.
- “Concept in exploration” is intentionally different from current “On-demand customization” product positioning, while avoiding misleading claims that these ideas are operational systems.
- TERVIAN is introduced as a separate private incubation project, without presenting it as a mature SaaS.
- All new graphics are typographic/CSS-only abstract compositions, explicitly described as illustrative rather than product interfaces.
