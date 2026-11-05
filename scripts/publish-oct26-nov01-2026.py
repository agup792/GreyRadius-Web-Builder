"""Publish the supplied 26 October–1 November editions without changing older pages."""
import copy
import hashlib
import html
import importlib.util
import json
from pathlib import Path
import re

SPEC = importlib.util.spec_from_file_location("previous", Path(__file__).with_name("publish-oct19-25-2026.py"))
previous = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(previous)
weekly = previous.weekly
weekly.DATE = "2026-11-05"
SITE, UPLOADS = weekly.SITE, weekly.UPLOADS
WEEK = "26 October–1 November 2026"
BLOG = "/blogs/india-quick-commerce-market-entry-unit-economics/"
CASE = "/case-studies/india-quick-commerce-city-sku-pilot/"
NEWS = [
    ("healthcare", "healthcare-brief", "GreyRadius_Healthcare",
     "Hospital expansion, clinical trials and biomarker-directed treatment",
     "Max Healthcare capacity · FDA decisions · Clinical evidence and access"),
    ("charged", "ev-battery-intelligence", "The_Charged",
     "Battery testing, electric freight and public charging economics",
     "ARAI testing lab · Amazon and JSW fleets · European charging"),
    ("the-signal", "enterprise-ai-intelligence", "The_Signal",
     "Enterprise AI workflows, agent controls and sovereign investment",
     "Platform adoption · Evaluation and governance · Sovereign AI"),
    ("the-stack", "infrastructure-brief", "The_Stack",
     "Chennai AI capacity, cloud accelerators and power commitments",
     "L&T and AdaniConneX · Oracle cloud · Grid access and financing"),
    ("the-wafer", "semiconductor-intelligence", "The_Wafer",
     "Foundry utilisation, equipment earnings and AI memory supply",
     "UMC · Intel and KLA · HBM, packaging and qualification"),
]


def add_newsletter(series, prefix, source_prefix, heading, summary, hub):
    source = next(UPLOADS.glob(source_prefix + "*17938987597*.html"))
    raw = source.read_text()
    original = weekly.parse(raw)
    url = f"/insights/newsletters/{series}/{prefix}-oct26-nov01-2026/"
    navigation = (
        '<nav aria-label="Newsletter navigation" style="padding:.85rem 1rem;background:#132846;color:white;font:14px sans-serif;">'
        f'<a href="/insights/newsletters/{series}/" style="color:white;">All editions</a> · '
        '<a href="/insights/newsletters/" style="color:white;">Newsletter hub</a></nav>'
    )
    result = raw.replace("</head>", weekly.metadata(original.title.get_text(), heading + ". " + summary + ".", url) + "</head>", 1)
    result = re.sub(r"(<body\b[^>]*>)", lambda m: m[0] + navigation, result, count=1)
    check = weekly.parse(result)
    check.select_one('nav[aria-label="Newsletter navigation"]').decompose()
    assert str(check.body) == str(original.body), source.name
    if series == "healthcare":
        # Preserve the source's figures pending approval; clearly flag its stale template strip.
        note = (
            '<aside data-editorial-note="source-summary" style="max-width:1120px;margin:1rem auto;padding:1rem;background:#fff6e8;color:#132846;font:14px/1.6 sans-serif;">'
            '<strong>Editorial note:</strong> This edition contains six developments. The supplied '
            '“Healthcare Intelligence | This Week” strip below repeats older figures '
            '(11 developments, a 2030 phase-out target, US$275M and 254 Alaska projects). '
            'Those figures are not a summary of the 26 October–1 November reporting above.</aside>'
        )
        page = weekly.parse(result)
        strip = page.select_one(".signals")
        assert strip is not None
        strip.parent.insert_before(weekly.parse(note))
        result = str(page)
    weekly.save(url.lstrip("/") + "index.html", result)
    archive = weekly.parse((SITE / f"insights/newsletters/{series}/index.html").read_text())
    if not archive.find("a", href=url):
        current = archive.select_one("a[data-newsletter-current]")
        card = copy.deepcopy(current)
        for tag in [current, *current.select("[data-newsletter-issue],[data-newsletter-headline]")]:
            for attr in ["data-newsletter-current", "data-newsletter-issue", "data-newsletter-headline"]:
                tag.attrs.pop(attr, None)
        card["href"] = url
        card.select_one("[data-newsletter-issue]").string = "Weekly edition · " + WEEK
        card.select_one("[data-newsletter-headline]").string = heading
        card.find_all(["p", "h2"])[-1].string = summary
        current.insert_before(card)
    weekly.save(f"insights/newsletters/{series}/index.html", str(archive))
    link = hub.select_one(f'[data-newsletter-latest="{series}"]')
    link["href"] = url
    link.string = re.sub(r" for .*$", " for " + WEEK, link.get_text())
    return url


def main():
    old = {p: hashlib.sha256(p.read_bytes()).hexdigest()
           for section in ["insights/newsletters", "blogs", "case-studies"]
           for p in (SITE / section).glob("**/index.html")
           if len(p.relative_to(SITE / section).parts) > (2 if section == "insights/newsletters" else 1)
           and "oct26-nov01-2026" not in str(p) and BLOG.strip("/") not in str(p) and CASE.strip("/") not in str(p)}
    latest = (SITE / "assets/js/newsletter-data.js").read_text()
    hub = weekly.parse((SITE / "insights/newsletters/index.html").read_text())
    urls = []
    for series, prefix, source_prefix, heading, summary in NEWS:
        url = add_newsletter(series, prefix, source_prefix, heading, summary, hub)
        def update(match):
            record = re.sub(r'url: "[^"]+"', 'url: "' + url + '"', match[2])
            record = re.sub(r'date: "[^"]+"', 'date: "' + WEEK + '"', record)
            record = re.sub(r'headline:\s*"[^"]+"', "headline: " + json.dumps(heading), record)
            record = re.sub(r'\n\s*issue: "\d+",', "", record)
            return match[1] + record + match[3]
        latest, count = re.subn(rf'("?{re.escape(series)}"?: Object\.freeze\(\{{)([\s\S]*?)(\n    \}}\))', update, latest, count=1)
        assert count == 1
        urls.append(url)
    weekly.save("assets/js/newsletter-data.js", latest)
    weekly.save("insights/newsletters/index.html", str(hub))
    blog_doc, blog_body = previous.convert_docx(next(UPLOADS.glob("India_Quick_Commerce_Market_Entry*17938987597*.docx")), 1)
    case_doc, case_body = previous.convert_docx(next(UPLOADS.glob("GreyRadius_Quick_Commerce_Case_Study*17938987597*.docx")), 2)
    title = blog_doc.paragraphs[0].text.replace("—", "–")
    case_title = case_doc.paragraphs[0].text.replace("—", "–")
    weekly.make_article(
        "blogs/gtm-execution-as-a-service-embedded-team/index.html", BLOG, title,
        "Evaluate India quick-commerce entry through purchase occasions, SKU-level contribution, platform settlements, replenishment and limited city pilots.",
        "Consumer & Retail · India Market Entry", blog_body.replace("—", "–"),
        related=(CASE, "Read the related quick-commerce city-pilot case study"),
    )
    weekly.make_article(
        "case-studies/market-entry-qualified-pipeline-gtm-execution/index.html", CASE, case_title,
        case_doc.paragraphs[1].text, "Consumer & Retail · India Market Entry", case_body.replace("—", "–"),
        case_doc.paragraphs[1].text, related=(BLOG, "Explore the India quick-commerce market-entry guide"),
    )
    for index, previous_url, url, card_title in [
        ("insights", "/blogs/healthcare-market-entry-india-hospital-adoption/", BLOG, title),
        ("case-studies", "/case-studies/medical-device-india-hospital-adoption/", CASE, case_title),
    ]:
        page = weekly.parse((SITE / index / "index.html").read_text())
        existing = page.find("a", href=url)
        if not existing:
            previous_card = page.find("a", href=previous_url)
            card = copy.deepcopy(previous_card)
            card["href"] = url
            card.find(["h2", "h3"]).string = card_title
            card["data-industry"] = "cpg"
            if index == "insights":
                card.select_one(".cs-photo-tag").string = "Consumer & Retail · India"
                card.select_one(".case-study-card__tag").string = "Quick Commerce / Market Entry"
                card.select_one(".case-study-card__image div span").string = "Quick Commerce"
                card.select_one(".case-study-card__stat-chip").string = "Nov 2026"
            else:
                card["data-geo"] = "india"
                card.select_one(".cs-card-image span").string = "City-Level Quick Commerce Pilot"
                card.select_one(".tag-geo").string = "India"
                card.select_one(".tag-industry").string = "Consumer & Retail"
                card.select_one(".cs-card-outcome").string = "Aligned SKU-level demand, stock availability and contribution to guide inventory and promotional spend. Actual margins and expansion outcomes were undisclosed."
                card.select_one(".cs-card-kpi").string = "SKU demand · in-stock rates · contribution per order"
            previous_card.insert_before(card)
        else:
            existing["data-industry"] = "cpg"
            if index == "insights":
                existing.select_one(".case-study-card__stat-chip").string = "Nov 2026"
        weekly.save(index + "/index.html", str(page))
    sitemap = (SITE / "sitemap.xml").read_text()
    entries = "".join(
        f"<url><loc>https://greyradius.com{url}</loc><lastmod>{weekly.DATE}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n"
        for url in urls + [BLOG, CASE] if "https://greyradius.com" + url + "</loc>" not in sitemap
    )
    weekly.save("sitemap.xml", sitemap.replace("</urlset>", entries + "</urlset>"))
    for p, digest in old.items():
        assert hashlib.sha256(p.read_bytes()).hexdigest() == digest, f"Changed older content: {p}"
    print(f"Added seven pages. Preserved {len(old)} prior content pages byte-for-byte.")


if __name__ == "__main__":
    main()
