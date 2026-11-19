"""Import the 9–15 November sources without modifying previous detail pages."""
import argparse
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import re

SPEC = importlib.util.spec_from_file_location("prior", Path(__file__).with_name("publish-nov02-08-2026.py"))
prior = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(prior)
weekly = prior.weekly
weekly.DATE = "2026-11-18"
SITE, UPLOADS = weekly.SITE, weekly.UPLOADS
WEEK = "9–15 November 2026"
BLOG = "/blogs/enterprise-ai-sales-gcc-pilot-to-paid-deployment/"
CASE = "/case-studies/gcc-enterprise-ai-pilot-commercialisation/"
NEWS = [
    ("healthcare", "healthcare-brief", "GreyRadius_Healthcare",
     "Hospital investment, pharma earnings and oncology regulatory decisions",
     "Yatharth · Jubilant Pharmova · FDA and European regulatory pathways"),
    ("charged", "ev-battery-intelligence", "GreyRadius_The_Charged",
     "EV registrations, battery recycling policy and fleet electrification",
     "India EV demand · Battery materials · Electric fleets and charging"),
    ("the-signal", "enterprise-ai-intelligence", "GreyRadius_The_Signal",
     "Enterprise AI delivery, commercial platforms and sovereign deployment",
     "Cognizant · IBM · OpenAI · Voice AI and purchasing pathways"),
    ("the-stack", "infrastructure-brief", "GreyRadius_The_Stack",
     "AI infrastructure commissioning, financing and power readiness",
     "India and GCC campuses · Singapore capacity · Compute and power delivery"),
    ("the-wafer", "semiconductor-intelligence", "GreyRadius_The_Wafer",
     "Semiconductor equipment earnings, foundry revenue and power-chip demand",
     "Applied Materials · Infineon · TSMC · MediaTek · Onto Innovation"),
]


def newsletter(config, hub, wafer_policy):
    series, prefix, source_prefix, heading, summary = config
    source = next(UPLOADS.glob(source_prefix + "*1795011002340.html"))
    raw = source.read_text()
    original = weekly.parse(raw)
    url = f"/insights/newsletters/{series}/{prefix}-nov09-15-2026/"
    # The Stack's supplied footer still names the previous reporting week.
    if series == "the-stack":
        old = "GreyRadius | The Stack | Weekly Infrastructure Brief | 2–8 November 2026"
        assert raw.count(old) == 1
        raw = raw.replace(old, old.replace("2–8 November 2026", WEEK))
    if series == "the-wafer" and wafer_policy == "exclude":
        page = weekly.parse(raw)
        for story_id in ["wafer-story-6", "wafer-story-7"]:
            page.select_one("#" + story_id).decompose()
        for element in list(page.select(".highlight, tbody tr")):
            if any(name in element.get_text() for name in ["SMIC", "GlobalFoundries"]):
                element.decompose()
        assert len(page.select("article.story")) == 5
        assert len(page.select(".highlight")) == 5
        assert len(page.select("tbody tr")) == 5
        raw = str(page)
    # User approved retaining the complete supplied Wafer edition unchanged,
    # including both verification-pending stories and its existing editorial note.
    expected = weekly.parse(raw)
    back = (
        '<nav aria-label="Newsletter navigation" style="padding:.85rem 1rem;background:#132846;color:white;font:14px sans-serif;">'
        f'<a href="/insights/newsletters/{series}/" style="color:white;">All editions</a> · '
        '<a href="/insights/newsletters/" style="color:white;">Newsletter hub</a></nav>'
    )
    result = raw.replace("</head>", weekly.metadata(original.title.get_text(), heading + ". " + summary + ".", url) + "</head>", 1)
    result = re.sub(r"(<body\b[^>]*>)", lambda m: m[0] + back, result, count=1)
    check = weekly.parse(result)
    check.select_one('nav[aria-label="Newsletter navigation"]').decompose()
    assert str(check.body) == str(expected.body)
    weekly.save(url.lstrip("/") + "index.html", result)
    path = f"insights/newsletters/{series}/index.html"
    archive = weekly.parse((SITE / path).read_text())
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
    weekly.save(path, str(archive))
    link = hub.select_one(f'[data-newsletter-latest="{series}"]')
    link["href"] = url
    link.string = re.sub(r" for .*$", " for " + WEEK, link.get_text())
    return url


def article(source_prefix, url, template, description, related):
    source = next(UPLOADS.glob(source_prefix + "*17950110023*.docx"))
    doc, body = prior.convert_docx(source, 2)
    title, subtitle = [p.text.replace("—", "–") for p in doc.paragraphs[:2]]
    weekly.make_article(template, url, title, description, "Enterprise AI · GCC Commercialisation",
                        body, subtitle, related=(related, "Read the related enterprise AI " +
                        ("case study" if url == BLOG else "guide")))
    return title


def listing(section, url, title):
    path = section + "/index.html"
    page = weekly.parse((SITE / path).read_text())
    selector = "a.case-study-card" if section == "insights" else "a.cs-card"
    if not page.find("a", href=url):
        first = page.select_one(selector)
        card = copy.deepcopy(first)
        card["href"], card["data-industry"] = url, "technology"
        card.find(["h2", "h3"]).string = title
        if section == "insights":
            card.select_one(".cs-photo-tag").string = "Enterprise AI · GCC"
            card.select_one(".case-study-card__tag").string = "Enterprise AI / Commercialisation"
            card.select_one(".case-study-card__image div span").string = "Enterprise AI in the GCC"
            card.select_one(".case-study-card__stat-chip").string = "Nov 2026"
        else:
            card["data-geo"], card["data-service"] = "gcc", "gtm market-entry ai"
            card.select_one(".cs-card-image span").string = "GCC Enterprise AI Commercialisation"
            card.select_one(".tag-service-primary").string = "GTM & AI Commercialisation"
            card.select_one(".tag-geo").string = "UAE · Saudi Arabia"
            card.select_one(".tag-industry").string = "Enterprise AI"
            card.select_one(".cs-card-outcome").string = "Connected pilot qualification to budget owners, procurement and production readiness. Verified conversion rates and signed-contract outcomes were not supplied."
            card.select_one(".cs-card-kpi").string = "3 performance indicators · purchasing readiness"
        first.insert_before(card)
    count = len(page.select(selector))
    if section == "insights":
        page.select_one("#countNum").string = str(count)
        page.select_one(".hero-block .case-study-card__stat-chip").string = f"{count} articles"
    else:
        page.select_one("#cs-count").string = f"Showing all {count} case studies"
    weekly.save(path, str(page))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--wafer-policy", choices=["exclude", "keep"], default="keep")
    args = parser.parse_args()
    own = {SITE / (u.lstrip("/") + "index.html") for u in [BLOG, CASE]}
    details = [p for section in ["insights/newsletters", "blogs", "case-studies"]
               for p in (SITE / section).glob("**/index.html")
               if len(p.relative_to(SITE / section).parts) > (2 if section == "insights/newsletters" else 1)]
    old = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in details
           if "nov09-15-2026" not in str(p) and p not in own}
    sources = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in UPLOADS.glob("*17950110023*")}
    hub = weekly.parse((SITE / "insights/newsletters/index.html").read_text())
    latest = (SITE / "assets/js/newsletter-data.js").read_text()
    urls = []
    for config in NEWS:
        url = newsletter(config, hub, args.wafer_policy)
        series, _, _, heading, _ = config
        def update(match):
            record = re.sub(r'url: "[^"]+"', 'url: "' + url + '"', match[2])
            record = re.sub(r'date: "[^"]+"', 'date: "' + WEEK + '"', record)
            record = re.sub(r'headline:\s*"[^"]+"', "headline: " + json.dumps(heading), record)
            return match[1] + record + match[3]
        latest, count = re.subn(rf'("?{re.escape(series)}"?: Object\.freeze\(\{{)([\s\S]*?)(\n    \}}\))', update, latest, count=1)
        assert count == 1
        urls.append(url)
    weekly.save("assets/js/newsletter-data.js", latest)
    weekly.save("insights/newsletters/index.html", str(hub))
    blog_title = article("Enterprise_AI_Sales_GCC", BLOG,
                         "blogs/china-plus-one-manufacturing-india-vietnam-indonesia/index.html",
                         "Convert GCC enterprise AI pilots into paid deployments through buyer mapping, measurable value, Arabic-language testing, production readiness and procurement planning.", CASE)
    case_title = article("GCC_Enterprise_AI_Commercialisation", CASE,
                         "case-studies/manufacturing-location-selection-asia/index.html",
                         "How an enterprise AI provider in the UAE and Saudi Arabia linked pilot qualification to budget ownership, procurement readiness and a defined purchasing pathway.", BLOG)
    listing("insights", BLOG, blog_title)
    listing("case-studies", CASE, case_title)
    sitemap = (SITE / "sitemap.xml").read_text()
    entries = "".join(
        f"<url><loc>https://greyradius.com{url}</loc><lastmod>{weekly.DATE}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n"
        for url in urls + [BLOG, CASE] if "https://greyradius.com" + url + "</loc>" not in sitemap)
    weekly.save("sitemap.xml", sitemap.replace("</urlset>", entries + "</urlset>"))
    for p, digest in {**old, **sources}.items():
        assert hashlib.sha256(p.read_bytes()).hexdigest() == digest, f"Unexpected changes: {p}"
    print(f"Added seven pages. Preserved {len(old)} previous detail pages and all seven sources. Wafer policy: {args.wafer_policy}.")


if __name__ == "__main__":
    main()
