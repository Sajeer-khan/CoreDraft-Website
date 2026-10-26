#!/usr/bin/env python3
"""Public CoreDraft SEO health audit. Only public HTTP endpoints; no tokens/secrets."""
from __future__ import annotations
import datetime as dt
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

BASE = "https://coredraftstudio.com"
OUT = Path("seo-health-report.json")
UA = "Mozilla/5.0 (compatible; CoreDraftSEOHealth/1.0; +https://coredraftstudio.com/)"
TIMEOUT = 18
RETRIES = 3
DELAY_SECONDS = 4


def request(path: str) -> tuple[int, str, str, str]:
    url = BASE + path
    last = None
    for attempt in range(RETRIES):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xml,text/plain,*/*"})
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
                return response.status, response.geturl(), response.headers.get("Content-Type", ""), response.read(4 * 1024 * 1024).decode("utf-8", "replace")
        except urllib.error.HTTPError as exc:
            if exc.code not in (429, 500, 502, 503, 504):
                return exc.code, url, exc.headers.get("Content-Type", ""), exc.read(4096).decode("utf-8", "replace")
            last = f"HTTP {exc.code}"
        except Exception as exc:
            last = f"{type(exc).__name__}: {exc}"
        if attempt < RETRIES - 1:
            time.sleep(DELAY_SECONDS * (attempt + 1))
    return 0, url, "", f"Fetch failed: {last}"


def probe_www_redirect(path: str) -> dict:
    """Check the first HTTP response only: canonical tags are not a redirect."""
    src = "https://www.coredraftstudio.com" + path
    expected = BASE + path

    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, hdrs, newurl):
            return None

    opener = urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(src, headers={"User-Agent": UA})
    try:
        with opener.open(req, timeout=TIMEOUT) as response:
            status = response.status
            location = response.headers.get("Location", "")
    except urllib.error.HTTPError as exc:
        status = exc.code
        location = exc.headers.get("Location", "")
    except Exception as exc:
        return {"source": src, "expected": expected, "status": 0, "location": "", "error": str(exc)}
    return {"source": src, "expected": expected, "status": status, "location": location}


def get_canonical(text: str) -> str:
    tags = re.findall(r"<link\b[^>]*>", text, re.IGNORECASE)
    for tag in tags:
        if not re.search(r'rel\s*=\s*["\']canonical["\']', tag, flags=re.IGNORECASE):
            continue
        match = re.search(r'href\s*=\s*["\']([^"\']+)["\']', tag, re.IGNORECASE)
        if match:
            return html.unescape(match.group(1))
    return ""


def is_noindex(text: str) -> bool:
    tags = re.findall(r"<meta\b[^>]*>", text, re.IGNORECASE)
    for tag in tags:
        if re.search(r'(?:name|http-equiv)\s*=\s*["\'](?:robots|googlebot|x-robots-tag)["\']', tag, re.IGNORECASE):
            if re.search(r'content\s*=\s*["\'][^"\']*\bnoindex\b', tag, re.IGNORECASE):
                return True
    return False


def audit() -> dict:
    issues, warnings, pages = [], [], []
    status, url, content_type, robots = request("/robots.txt")
    if status != 200:
        issues.append(f"robots.txt returned HTTP {status} (or couldn't be reached)")
    else:
        if "Sitemap: " + BASE + "/sitemap.xml" not in robots:
            issues.append("robots.txt does not advertise the canonical XML sitemap")
        if re.search(r"(?im)^\s*disallow\s*:\s*/\s*$", robots):
            issues.append("robots.txt may block the entire site with Disallow: /")
    status, url, content_type, sitemap = request("/sitemap.xml")
    paths = []
    if status != 200:
        issues.append(f"sitemap.xml returned HTTP {status} (or couldn't be reached)")
    else:
        try:
            root = ET.fromstring(sitemap)
            paths = [elem.text.strip() for elem in root.iter() if elem.tag.endswith("loc") and elem.text]
            if not paths:
                issues.append("XML sitemap has no <loc> URLs")
            if len(paths) != len(set(paths)):
                issues.append("XML sitemap contains duplicate URLs")
            if any(not p.startswith(BASE + "/") for p in paths):
                issues.append("XML sitemap lists URLs outside the canonical host")
        except Exception as e:
            issues.append(f"sitemap.xml is not parseable XML: {e}")
    # The older Google brand result explicitly shows www; verify an HTTP permanent
    # redirect, rather than accepting duplicate live hostnames with canonical tags.
    www_checks = [
        probe_www_redirect("/"),
        probe_www_redirect("/oem-qualification/?seo_host_check=1"),
    ]
    for check in www_checks:
        if check["status"] not in (301, 308) or check["location"] != check["expected"]:
            issues.append(
                f"www canonical redirect missing or incorrect: {check['source']} "
                f"returned HTTP {check['status']} Location={check['location']!r}; "
                f"expected permanent redirect to {check['expected']}"
            )
    for absolute in paths:
        path = absolute[len(BASE):]
        page_status, redirect, ctype, body = request(path)
        result = {"url": absolute, "http_status": page_status, "effective_url": redirect, "canonical": "", "title": "", "json_ld_count": 0}
        if page_status != 200:
            issues.append(f"{path}: HTTP {page_status} (expected 200)")
        elif "html" not in ctype.lower() and not re.search(r"<html\b", body, re.IGNORECASE):
            issues.append(f"{path}: response is not HTML ({ctype})")
        else:
            canonical = get_canonical(body)
            result["canonical"] = canonical
            if canonical != absolute:
                issues.append(f"{path}: canonical is {canonical!r}, expected {absolute!r}")
            match = re.search(r"<title[^>]*>(.*?)</title>", body, re.IGNORECASE | re.DOTALL)
            result["title"] = html.unescape(re.sub(r"\s+", " ", match.group(1)).strip()) if match else ""
            if not result["title"]:
                issues.append(f"{path}: no HTML <title>")
            if path == "/" and result["title"] != "CoreDraft Studio | Business Software & SaaS Solutions":
                issues.append("Homepage title is not the current SaaS-first brand title")
            if is_noindex(body):
                issues.append(f"{path}: contains a noindex directive")
            if re.search(r"<meta\s+name=['\"]description['\"]", body, re.IGNORECASE) is None:
                warnings.append(f"{path}: no meta description")
            raw = re.findall(r'<script\s+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', body, re.IGNORECASE | re.DOTALL)
            result["json_ld_count"] = len(raw)
            for block in raw:
                try:
                    json.loads(block)
                except json.JSONDecodeError:
                    issues.append(f"{path}: invalid JSON-LD")
            if not raw:
                warnings.append(f"{path}: no JSON-LD found")
        pages.append(result)
    expected_key = "9f248b2d14884227ab3d2f0b7e45a6c1"
    key_status, _, _, key_body = request(f"/{expected_key}.txt")
    if key_status != 200 or key_body.strip() != expected_key:
        warnings.append(f"IndexNow ownership key is not serving expected content (HTTP {key_status})")
    return {
        "checked_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
        "site": BASE, "robots_http_status": (200 if "robots.txt returned" not in " ".join(issues) else 0),
        "sitemap_url": BASE + "/sitemap.xml",
        "sitemap_entries": len(paths), "pages": pages, "www_redirect_checks": www_checks,
        "critical_errors": issues, "warnings": warnings,
        "note": "A valid live crawl does not imply Google indexing or search ranking."
    }


def main() -> int:
    report = audit()
    OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    lines = [
        "## CoreDraft public SEO health check",
        "",
        f"Checked (UTC): {report['checked_utc']}",
        f"Public pages discovered: **{report['sitemap_entries']}**",
        f"Critical failures: **{len(report['critical_errors'])}**",
        f"Warnings: **{len(report['warnings'])}**",
        "",
        "| Page | HTTP | Canonical |",
        "|---|---:|---|",
    ]
    for page in report["pages"]:
        canonical = "OK" if page["canonical"] == page["url"] else "Mismatch"
        lines.append(f"| {page['url']} | {page['http_status']} | {canonical} |")
    lines += ["", "### www to apex host redirects", "", "| URL | HTTP | Location |", "|---|---:|---|"]
    for check in report["www_redirect_checks"]:
        lines.append(f"| {check['source']} | {check['status']} | {check['location'] or 'None'} |")
    lines += ["", "### Critical errors"]
    lines += [f"- {err}" for err in report["critical_errors"]] or ["- None"]
    lines += ["", "### Warnings"]
    lines += [f"- {err}" for err in report["warnings"]] or ["- None"]
    lines += ["", "This is public page accessibility and crawlability, **not** a measurement of Google indexing."]
    summary_file = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_file:
        with open(summary_file, "a", encoding="utf-8") as handle:
            handle.write("\n".join(lines) + "\n")
    else:
        print("\n".join(lines))
    return 1 if report["critical_errors"] else 0


if __name__ == "__main__":
    sys.exit(main())
