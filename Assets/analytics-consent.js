/* CoreDraft Studio — GA4 with explicit, reversible analytics opt-in.
   Measurement ID is public configuration, not a secret.
   No analytics script or Google Analytics cookie is loaded before acceptance. */
(function () {
  "use strict";
  var MEASUREMENT_ID = "G-DHYTVG7HMP";
  var STORAGE_KEY = "coredraft_analytics_consent_v1";
  var initialized = false;
  var root = null;
  var toggle = null;
  var accepted = false;

  function preference() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return value === "accepted" || value === "declined" ? value : null;
    } catch (_) { return null; }
  }

  function setPreference(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
  }

  function startAnalytics() {
    if (initialized) return;
    // Ignore Cloudflare preview / alternate domains so production reports stay clean.
    var hostname = window.location.hostname.toLowerCase();
    if (hostname !== "coredraftstudio.com" && hostname !== "www.coredraftstudio.com") return;
    initialized = true;
    accepted = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
    script.setAttribute("data-coredraft-ga4", MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function clearFirstPartyAnalyticsCookies() {
    var names = document.cookie.split(";").map(function (item) {
      return item.trim().split("=")[0];
    }).filter(function (name) { return name === "_ga" || name.indexOf("_ga_") === 0; });
    var host = window.location.hostname;
    var domains = [host, "." + host];
    if (host === "coredraftstudio.com" || host.endsWith(".coredraftstudio.com")) {
      domains.push("coredraftstudio.com", ".coredraftstudio.com");
    }
    names.forEach(function (name) {
      domains.forEach(function (domain) {
        document.cookie = name + "=; Max-Age=0; Path=/; Domain=" + domain + "; SameSite=Lax; Secure";
      });
      document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax";
    });
  }

  function injectStyles() {
    if (document.getElementById("cd-privacy-style")) return;
    var css = document.createElement("style");
    css.id = "cd-privacy-style";
    css.textContent = [
      ".cd-cookie-ui{position:fixed;z-index:2147483000;left:18px;right:18px;bottom:18px;margin:auto;max-width:790px;background:#122840;color:#f2fafb;border:1px solid #aac9ce6b;border-radius:13px;box-shadow:0 24px 75px #07182855;padding:21px 23px;font:13px/1.7 Inter,system-ui,sans-serif;display:flex;align-items:center;gap:22px}",
      ".cd-cookie-ui[hidden],.cd-cookie-settings[hidden]{display:none!important}",
      ".cd-cookie-copy{flex:1;min-width:0}",
      ".cd-cookie-title{font-weight:750;font-size:15px;color:#fff;margin:0 0 3px}",
      ".cd-cookie-description{font-size:12px;line-height:1.65;color:#cad9e1;margin:0}",
      ".cd-cookie-description a{color:#b4f4e5;text-decoration:underline;text-underline-offset:3px}",
      ".cd-cookie-actions{display:flex;gap:9px;align-items:center;flex-wrap:wrap;flex:none}",
      ".cd-cookie-actions button{cursor:pointer;border-radius:5px;font:750 12px Inter,system-ui,sans-serif;padding:11px 14px;min-height:39px}",
      ".cd-cookie-accept{background:#b2f1e2!important;color:#142e42!important;border:1px solid #b2f1e2!important}",
      ".cd-cookie-decline{background:transparent!important;color:#f0f8fb!important;border:1px solid #a6c4d2!important}",
      ".cd-cookie-settings{position:fixed;z-index:2147482999;bottom:8px;left:11px;padding:6px 8px;background:#f6fbfaff;color:#33546a;border:1px solid #cadadd;border-radius:5px;font:10px/1.3 Inter,system-ui,sans-serif;cursor:pointer}",
      ".cd-cookie-ui :focus-visible,.cd-cookie-settings:focus-visible{outline:3px solid #70e2d1;outline-offset:3px}",
      "@media(max-width:660px){.cd-cookie-ui{left:10px;right:10px;bottom:12px;padding:17px;display:block}.cd-cookie-actions{margin-top:15px}.cd-cookie-actions button{flex:1}.cd-cookie-settings{left:5px;bottom:3px}}",
      "@media(prefers-reduced-motion:reduce){.cd-cookie-ui *{scroll-behavior:auto}}"
    ].join("\n");
    document.head.appendChild(css);
  }

  function buildInterface() {
    if (!document.body || root) return;
    injectStyles();
    root = document.createElement("section");
    root.className = "cd-cookie-ui";
    root.setAttribute("aria-label", "Analytics cookie preferences");
    root.setAttribute("role", "region");

    var copy = document.createElement("div");
    copy.className = "cd-cookie-copy";
    var title = document.createElement("p");
    title.className = "cd-cookie-title";
    title.textContent = "Help us improve CoreDraft";
    var description = document.createElement("p");
    description.className = "cd-cookie-description";
    description.appendChild(document.createTextNode("With your permission, we use Google Analytics to understand which pages help visitors. You can decline or change your choice any time. "));
    var policy = document.createElement("a");
    policy.href = window.location.origin + "/privacy/";
    policy.textContent = "Privacy details";
    description.appendChild(policy);
    copy.appendChild(title);
    copy.appendChild(description);

    var actions = document.createElement("div");
    actions.className = "cd-cookie-actions";
    var reject = document.createElement("button");
    reject.type = "button";
    reject.className = "cd-cookie-decline";
    reject.textContent = "Decline";
    var accept = document.createElement("button");
    accept.type = "button";
    accept.className = "cd-cookie-accept";
    accept.textContent = "Allow analytics";
    actions.appendChild(reject);
    actions.appendChild(accept);
    root.appendChild(copy);
    root.appendChild(actions);

    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "cd-cookie-settings";
    toggle.textContent = "Analytics settings";
    toggle.setAttribute("aria-label", "Change analytics cookie preferences");

    accept.addEventListener("click", function () {
      setPreference("accepted");
      startAnalytics();
      root.hidden = true;
      toggle.hidden = false;
    });
    reject.addEventListener("click", function () {
      setPreference("declined");
      clearFirstPartyAnalyticsCookies();
      root.hidden = true;
      toggle.hidden = false;
      if (accepted) window.location.reload();
    });
    toggle.addEventListener("click", function () {
      root.hidden = false;
      toggle.hidden = true;
      accept.focus();
    });
    document.body.appendChild(root);
    document.body.appendChild(toggle);

    if (preference()) {
      root.hidden = true;
      toggle.hidden = false;
    } else {
      toggle.hidden = true;
    }
  }

  document.addEventListener("click", function (event) {
    if (!initialized || typeof window.gtag !== "function") return;
    var target = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!target) return;
    var href = target.getAttribute("href") || "";
    var contactType = href.slice(0,7).toLowerCase() === "mailto:" ? "email" :
      href.slice(0,4).toLowerCase() === "tel:" ? "phone" : null;
    if (contactType) {
      // Intent signal only; a click is not a confirmed enquiry or sale. No address or user text sent.
      window.gtag("event", "contact_click", {
        contact_channel: contactType,
        page_path: window.location.pathname
      });
    }
  }, { passive: true });

  if (preference() === "accepted") startAnalytics();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildInterface, { once: true });
  } else {
    buildInterface();
  }
})();
