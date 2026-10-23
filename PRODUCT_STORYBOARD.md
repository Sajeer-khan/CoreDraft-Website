# CoreDraft Studio — SaaS product storytelling register

The homepage is SaaS-first. It tells one product story at a time. Existing documentation and engineering services stay available below the portfolio.

## Product maturity statements (public copy)

| Chapter | Public label | Important qualification |
| --- | --- | --- |
| QuoteDesk | Live — internal operations | Deployed for internal commercial operations. No claim of general public self-service subscriptions. |
| ProcureFlow | In browser testing | UAT has not demonstrated full production readiness. |
| PharmaDocs | In development — validation pending | No claim of GxP validation or regulated production suitability. |
| People & Compliance | Internal capability — evolving | Not marketed as a separate generally available subscription. |
| Construction Control | Development preview | Authentic screenshots of offline, fictional preview workflows, not a proof of live integration. |

## Screenshot storyboard and asset register

The front page is prepared for three illustrated steps per product. **Never label drawings or marketing mockups as actual product screenshots.**

### 01 — QuoteDesk (real captures to be supplied)
1. Quotation editor, version controls and approval handoff.
2. Customer outcome and purchase order record.
3. Invoice, controlled print packet or customer receiving closure.

### 02 — ProcureFlow (real captures to be supplied)
1. Requisition authoring.
2. Independent approver queue.
3. RFQ, supplier comparison or purchase order workspace.

### 03 — PharmaDocs (real captures to be supplied)
1. Controlled document review with annotations.
2. Deviation/CAPA or OOS/OOT investigation.
3. Audit trail, QA intelligence or management report.

### 04 — People & Compliance (real captures to be supplied)
1. Company/employee master records with no sensitive personal data.
2. Payroll period with synthetic pay components.
3. Company obligations, register or compliance overview.

### 05 — Construction Control (captured and included)
1. `Assets/product-screens/construction-expense-preview.png` — expense controls (development preview).
2. `Assets/product-screens/construction-billing-preview.png` — RA billing and receivables (offline preview).
3. `Assets/product-screens/construction-evidence-preview.png` — evidence workflow (offline design review).

All three assets were copied from genuine UI preview images in the private construction-control-erp development repository. They contain fictional sample data. They are now part of this public website source so they can be served locally on Cloudflare Pages.

## Production capture protocol

- Capture desktop viewport approximately 1440 px wide. Include the useful application interface and preserve the context of the selected module.
- If desired, add mobile captures for selected chapters. Use real rendered interface screens, not reconstructed replicas.
- Use a demo/fictional tenant or sanitize customer names, employee names, rates, IDs, phone numbers, email addresses, uploaded documents and commercially sensitive information.
- Validate that any screenshot's label, release version and actual product readiness still match the published wording.
- Prefer optimized PNG/WebP assets kept at `Assets/product-screens/` in this repository; do not link directly to private apps or private repository assets.
- Replace the matching `.story-concept` element in each `.story-scene` with a `.story-real-screen` frame containing the capture, preserving the `figcaption` and accessible alt text.
- Verify aspect ratios, responsive cropping, keyboard behavior and small-screen performance before the next public release.

## Release approach

The page uses native HTML/CSS and lightweight progressive-enhancement JavaScript; no build command is necessary. Push to `main` only after reviewing public marketing claims and page behavior. QuoteDesk's existing `/products/quotedesk/` page and the original `/oem-qualification/` services page are preserved.
