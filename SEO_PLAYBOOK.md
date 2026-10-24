# CoreDraft Studio — Organic Acquisition and Search Visibility Playbook

Last audited: 24 October 2026  
Canonical website: https://coredraftstudio.com/  
Company: CoreDraft Studio (Private) Limited  
Product mix: QuoteDesk, ProcureFlow, PharmaDocs, People & Compliance, Construction Control. Public roadmap contains ServiceDesk and ContractDesk as ideas only.

## 1. Technical search baseline delivered in this release

- Unique intent-aware titles and descriptions across the homepage, product hub, five product pages, future roadmap and OEM qualification service.
- Canonical URL and OpenGraph metadata across those routes.
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication on product pages, Article on practical guides, and Service on OEM qualification. Structured data intentionally **does not fabricate reviews, pricing, ratings, certification, office addresses or customer endorsements**.
- Four useful, original guides (see keyword map) plus guides directory and About page.
- Sitemap at `https://coredraftstudio.com/sitemap.xml`, enumerating 17 canonical URLs. All modified pages show their real change date, 2026-10-24.
- robots.txt already allows public crawling and advertises the sitemap.
- Root IndexNow key file and GitHub Actions workflow submit modified public HTML URLs after merges to `main`. Requires GitHub Actions enabled and the key publicly reachable after Cloudflare deploy. Alerts are **notifications, not indexing guarantees**.
- Original design, module descriptions, animation and authentic sanitized screenshots preserved.

## 2. What account owners must do (not automatically completed by code)

### Google Search Console — highest priority
1. Open https://search.google.com/search-console/welcome
2. Add **Domain property** `coredraftstudio.com` (without https) and copy the generated TXT token.
3. In Cloudflare DNS add TXT `@` with **the exact Google-generated value**; do not use placeholder tokens.
4. Verify property; use **Sitemaps → Add**: `https://coredraftstudio.com/sitemap.xml`
5. URL Inspection: test homepage, `/products/quotedesk/`, `/products/construction-control/`, one /guides/ URL. Request indexing selectively where appropriate.
6. Inspect Pages/indexing reason reports, HTML enhancements and search performance weekly. **Do not** presume submission forces indexing.

### Bing Webmaster Tools — next
1. Open https://www.bing.com/webmasters
2. Import the verified site from Google Search Console if available, or verify independently.
3. Review sitemap import and use the sitemap URL above if missing.
4. Confirm IndexNow receipts after the GitHub Actions workflow and Cloudflare deployment. IndexNow is used by participating engines, not a substitute for Google Search Console.
5. Look at crawl, indexing and query reports.

### Cloudflare / technical configuration
- In Cloudflare Pages Deployments verify `main` is deployed and all 17 canonical URLs return successful HTML (not login, challenge, or a 404 fallback).
- Test `/robots.txt`, `/sitemap.xml`, and `/<indexnow-key>.txt` from a browser outside the admin session; check real HTTP statuses.
- Ensure only `https://coredraftstudio.com/` is treated as canonical. Test the `www` and `http` versions and configure proper permanent redirects where DNS/control allows. Do not guess that a canonical HTML tag alone is a server redirect.
- If Cloudflare serves a default `.pages.dev` mirror, ensure it is canonicalized to the custom domain, and consider redirect policy if appropriate.
- Enable security/CDN performance features carefully, but **do not** challenge ordinary search engine crawlers.
- Test Core Web Vitals with https://pagespeed.web.dev/ on mobile and desktop. The existing Tailwind runtime CDN and large animated homepage should be evaluated; replacing runtime Tailwind with a tested compiled stylesheet is a future performance project, **not silently attempted** in this release because it could break layout.
- Avoid custom splash/loading overlays that hide the main page text from search crawlers.

## 3. Search intent map

| Search intent / audience | Canonical destination | Editorial angle |
| --- | --- | --- |
| industrial quotation approval software, quotation management system | /products/quotedesk/ | control from offer to customer PO/invoice |
| how to manage quotation approvals | /guides/quotation-approval-process/ | five decision points and a diagnostic |
| purchase requisition approval software, procurement workflow | /products/procureflow/ | purchasing queues and supplier decisions |
| purchase requisition approval process | /guides/purchase-requisition-approval-workflow/ | how to coordinate request through receipt |
| construction project cost tracking software, RA billing | /products/construction-control/ | costs, billing, certification and receivables |
| project cost tracking vs committed costs | /guides/construction-project-cost-control/ | realistic budget/commitment/cash distinctions |
| pharmaceutical document management eQMS | /products/pharmadocs/ | controlled documents and related quality events |
| GMP document control checklist | /guides/pharmaceutical-document-control/ | practical lifecycle and validation boundaries |
| HR payroll administration for SMEs | /products/people-compliance/ | controlled payroll periods and admin |
| equipment qualification documentation | /oem-qualification/ | service-specific process support |
| branded searches | /, /about/, /products/ | clear identity, independent proof and navigation |

Do not spin up dozens of near-identical city pages or over-optimize keyword repetition. Expand only when new real expertise, examples or original explanations exist.

## 4. Third-party listings — honest priority

**Agency/company directories (profiles, not fake product reviews)**
- Clutch: https://clutch.co/get-listed — Basic listing available free; confirm whether a backlink is included at that tier, as current information says it may not be.
- GoodFirms: https://www.goodfirms.co/ — create a company listing through the Get Listed flow; listing free, subject to approval.
- TechBehemoths: https://techbehemoths.com/ — Get Listed or claim the company; complete profile and genuine verification using the business email.
- DesignRush: https://www.designrush.com/ — agency provider listing; verify whether the free tier matches your needs.
- LinkedIn Company Page — create a complete CoreDraft company profile. Add products and links where supported.
- Relevant Karachi/Pakistan business/industry associations and chamber listings **only if membership/eligibility is real**.

**SaaS/product directories (eligibility first)**
- Capterra: https://www.capterra.com/vendors/ — submit mature, legitimately offered B2B products only when product eligibility and buyer expectations are met.
- G2: https://documentation.g2.com/help/docs/finding-or-listing-a-product-on-g2 — B2B products must satisfy listing eligibility; alpha/beta software is not eligible. Do not misstate privately configured workflows as generally available commercial products.
- Product Hunt: do not launch unfinished/internal-only products as public SaaS.
- Category-specific QA/engineering/software directories only where audience and eligibility match.

**Google Business Profile: NOT automatic for an online SaaS brand.** Under Google policy, an online-only company is ineligible unless there is a legitimate customer-facing in-person interaction during stated business hours. Do not invent a public storefront or expose a residential address.

Every public profile should use consistent real brand/business details (CoreDraft Studio, legal identity where requested, website, public email, actual eligible city), accurate service categories, and only authorized testimonials or client references. **No fake five-star reviews, referral farms, purchased links, or spam directories.**

## 5. Minimum repeatable distribution plan

Every useful new article:
1. Publish on CoreDraft.
2. Post a concise, genuinely useful key point to the CoreDraft LinkedIn Company Page with a link (not just marketing slogans).
3. Publish a separate founder/operator viewpoint based on real operational experience, with a natural reference back to the guide.
4. Share in a relevant procurement, engineering, construction or pharmaceutical QA community only if discussion rules permit and the answer is relevant.
5. Offer a printable checklist or demo walkthrough only when the landing page genuinely provides it.
6. Ask real consenting clients for an anonymized case narrative and a voluntary review, without fabricating an outcome figure.

Ideas for the **next** four articles (write only when supported by actual examples):
- How partial invoicing and receiving closure should connect to an industrial quotation
- Construction subcontractor commitments versus cash outflows
- Why quality training evidence should follow a controlled document revision
- How to evaluate supplier quotations beyond unit price

## 6. Metrics to track

| Frequency | Metric | Desired direction |
| --- | --- | --- |
| Weekly | Valid indexed canonical pages in GSC/Bing | Gradual growth; investigate exclusions |
| Weekly | Non-branded organic impressions by buyer-intent query | Growth |
| Weekly | Non-branded organic clicks and click-through rate | Growth, with attention to query fit |
| Monthly | Engaged organic users by landing page | Qualified growth |
| Monthly | Genuine walkthrough/contact enquiries attributed to organic | Growth |
| Monthly | Qualified opportunities and conversion to paying customer | Growth |
| Monthly | Mobile Core Web Vitals, especially LCP/INP/CLS | Improve without harming experience |
| Quarterly | Real directory listings and referral leads | Quality > quantity |

Avoid promising a fixed ranking or visitors-per-month. No analytics property or search platform account has been connected or verified in this development release.

## 7. Next technical backlog

1. Production visual validation: header, animation, responsive layout, screenshots and no broken pages after Cloudflare deploy.
2. Verify Search Console sitemap/indexing and first queries.
3. Check Lighthouse mobile performance. Tailwind's browser-play CDN in the homepage is an identified potential bottleneck; migrate to a compiled, locally hosted utility CSS bundle only after full regression testing.
4. Evaluate full site conversion measurement with privacy-respecting analytics; use consent controls where applicable.
5. Add demonstrable real use cases or measured anonymized case studies with explicit client permission.
6. Revisit structured data after actual product commercial packaging, customer reviews and pricing exist. Google SoftwareApplication rich results have additional required properties; current semantic markup alone does not guarantee enhanced listings.

## 8. Automated live-site checks (added 24 October 2026)

A new `.github/workflows/seo-health.yml` GitHub Actions job checks the public site daily at approximately 08:20 Pakistan Standard Time, after relevant changes to `main`, and through manual workflow dispatch.

It runs `scripts/public_seo_health.py` using only public URLs, without tokens or search-console credentials. The audit checks:
- `robots.txt` availability, broad crawl blocking and the canonical sitemap declaration;
- XML sitemap availability and parseability, duplicate/foreign URLs;
- Every XML sitemap page for HTTP 200, HTML body, canonical tags and noindex;
- HTML titles, metadata, JSON-LD parseability;
- Public IndexNow key verification.

GitHub Actions shows a summary and stores a JSON report artifact for 30 days. **A passing check confirms public crawlability, not that Google indexed the URLs.** Scheduled workflows may run later than their stated cron time.

Google Search Console is connected via Windsor.ai for read-only access. It currently returns no search queries, landing page metrics or sitemap rows, including when fresh data is requested. Windsor.ai does not expose a Search Console sitemap submission/write action. Google can discover the sitemap via the existing `Sitemap:` line in `robots.txt`; direct Search Console report management requires an appropriately authorized account/API scope. Do not claim sitemap submission or account-level indexing verification was completed.

GA4 is not yet connected in Windsor.ai. Analytics source authorization and any new Google property setup require the account owner's authorization; no arbitrary measurement identifier is to be inserted into the site.

## 9. Public business contacts

The user-provided CoreDraft Studio telephone and WhatsApp number is **+92 327 2934549** (international dialing link `tel:+923272934549` and WhatsApp URL `https://wa.me/923272934549`). It is publicly visible as clickable, crawlable HTML on the homepage, the product pages, the knowledge hub and dedicated `https://coredraftstudio.com/contact/`. SEO and directory listings must use the same business contact details and should not invent an office address, opening hours, or other identity claims.
