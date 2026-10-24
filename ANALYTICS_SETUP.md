# CoreDraft Website — Google Analytics 4 integration

Updated: 24 October 2026

## Verified configuration

- Google Analytics 4 property: **CoreDraft Website**
- Account identifier returned by the connected Windsor.ai data source: `560596661` (connector account ID; do not confuse with GA4 Measurement ID)
- GA4 web Measurement ID: **`G-DHYTVG7HMP`**, verified from the owner-provided Google Analytics setup screenshot.
- Connected Windsor.ai read connectors: Google Analytics 4 and Google Search Console (`sc-domain:coredraftstudio.com`).
- Public canonical site: `https://coredraftstudio.com/`
- Tracking implementation: `Assets/analytics-consent.js`, referenced on every public HTML page, including /privacy/.
- Published explanation: `/privacy/`

## Visitor tracking behavior

Analytics is optional and defaults to **off** for a new browser:

1. Visitors see a small consent prompt with **Allow analytics** and **Decline**.
2. Until the visitor accepts, the script does not fetch `gtag.js`, initialize a GA4 connection or issue any GA4 page-view event.
3. Consent or decline is stored locally under `coredraft_analytics_consent_v1`; a compact **Analytics settings** control can reopen the prompt.
4. On acceptance, the page loads Google's analytics script with the above measurement ID and tracks page views and ordinary GA4 enhanced measurement.
5. If a visitor clicks a `mailto:` or `tel:` link after accepting, a custom `contact_click` event is sent with a channel (`email` or `phone`) and a page path — **not a recipient email address, phone number, message body, or personal name**.
6. A contact click is **not** a confirmed lead, sent email, or sale. It can be used as a weak interest signal.
7. If consent is revoked, the site attempts to clear recognized first-party `_ga*` cookies and reloads. This doesn't delete historical Google data.
8. Script loading occurs only on `coredraftstudio.com` and `www.coredraftstudio.com`; Cloudflare Pages preview and local hostnames don't inflate production traffic.
9. A network/ad blocker may suppress GA4 requests; this is normal and does not mean the site's page is broken.

No credentials, private client information, identity document, test fixture or actual quote/invoice values are sent by this custom event script.

## How to confirm the live installation

After GitHub release and the Cloudflare Pages deployment complete:

1. Open a private/incognito browser window to `https://coredraftstudio.com/` (incognito avoids a previously saved choice).
2. When the privacy prompt appears, select **Allow analytics**. This is necessary: the tag is intentionally not loaded until permission.
3. Open Google Analytics 4 → **Reports → Realtime**. A page view / active user may appear after processing; allow time for reporting. Alternatively use **Admin → Data streams → CoreDraft Website → View tag instructions → Test installation** after accepting.
4. Browse `/products/quotedesk/`, `/products/construction-control/` and `/guides/`. Realtime reports can be less detailed than debug mode and may be delayed.
5. Test a contact link if you want to see a `contact_click` event. Do not mark it as a qualified lead conversion: a clicked mailto link is not a sent enquiry.
6. Return to the site and select **Analytics settings → Decline**. Reload and verify the site remains usable while GA4 collection stops in that browser.
7. Use Windsor.ai GA4 once the connector has had time to ingest the new property data; zero results immediately after installation are expected and not grounds to declare a failure.

## Owner-level Google Analytics considerations

- In GA4 web stream settings, confirm Enhanced measurement and internal traffic exclusions suit the business.
- Configure appropriate data retention, event naming governance and any required consent settings for the audience.
- Keep GDPR/UK and other relevant data protection requirements under review if serving visitors in those regions. This code is a privacy-oriented technical implementation, **not legal certification**.
- Consider a genuine contact enquiry form only when necessary and secured. If built, measure a successful submission event server- or client-side without transmitting personally identifying field contents to GA.
- Google Analytics 4 and Google Search Console are different data sources; Search Console reports search visibility, GA4 reports site interactions.
- An increase in `contact_click` should not be sold internally as an increase in actual paying leads.

## Scope

Only marketing website HTML, one consent script, site privacy notice, sitemap, and related documentation were updated. No customer SaaS databases, authentication, finance systems, payroll records or eQMS regulated production configurations are affected.
