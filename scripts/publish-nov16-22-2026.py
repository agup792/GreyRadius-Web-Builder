"""Add the five 16–22 November newsletters, preserving source bodies and archives."""
import copy
from datetime import date
import hashlib
import importlib.util
import json
from pathlib import Path
import re

SPEC = importlib.util.spec_from_file_location("weekly", Path(__file__).with_name("publish-oct12-18-2026.py"))
weekly = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(weekly)
SITE, UPLOADS = weekly.SITE, weekly.UPLOADS
WEEK = "16–22 November 2026"
SLUG = "nov16-22-2026"
NEWS = [
    ("healthcare", "healthcare-brief", "GreyRadius_Healthcare",
     "Oncology biosimilars, healthcare acquisitions and licensing partnerships",
     "Biocon · Arcera · Viatris · Lilly · Pharmaceutical commercialisation"),
    ("charged", "ev-battery-intelligence", "GreyRadius_The_Charged",
     "Electric fleets, battery supply and charging economics",
     "Mahindra and Uber · CEER financing · LFP batteries · Fleet charging"),
    ("the-signal", "enterprise-ai-intelligence", "GreyRadius_The_Signal",
     "Enterprise AI governance, sovereign delivery and workflow integration",
     "IBM · Microsoft and Salesforce · OpenAI · HCLTech and Cohere"),
    ("the-stack", "infrastructure-brief", "GreyRadius_The_Stack",
     "AI infrastructure investment, sovereign cloud and power readiness",
     "India and GCC infrastructure · Compute contracts · Power and permitting"),
    ("the-wafer", "semiconductor-intelligence", "GreyRadius_The_Wafer",
     "Semiconductor export controls, advanced packaging and AI supply chains",
     "Micron · NVIDIA · Intel Foundry · Photonics and semiconductor investment"),
]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    detail = [p for section in ["insights/newsletters", "blogs", "case-studies"]
              for p in (SITE / section).glob("**/index.html")
              if len(p.relative_to(SITE / section).parts) > (2 if section == "insights/newsletters" else 1)]
    unchanged = {p: digest(p) for p in detail if SLUG not in str(p)}
    sources = {p: digest(p) for p in UPLOADS.glob("*17956849709*.html")}
    assert len(sources) == 5
    hub = weekly.parse((SITE / "insights/newsletters/index.html").read_text())
    latest = (SITE / "assets/js/newsletter-data.js").read_text()
    urls = []
    for series, prefix, source_prefix, heading, summary in NEWS:
        source = next(UPLOADS.glob(source_prefix + "*17956849709*.html"))
        raw = source.read_text()
        original = weekly.parse(raw)
        url = f"/insights/newsletters/{series}/{prefix}-{SLUG}/"
        assert WEEK in original.title.get_text()
        assert WEEK in original.footer.get_text()
        assert not original.select('link[rel="canonical"],meta[name="description"]')
        back = (
            '<nav aria-label="Newsletter navigation" style="padding:.85rem 1rem;background:#132846;color:white;font:14px sans-serif;">'
            f'<a href="/insights/newsletters/{series}/" style="color:white;">All editions</a> · '
            '<a href="/insights/newsletters/" style="color:white;">Newsletter hub</a></nav>'
        )
        result = raw.replace("</head>", weekly.metadata(original.title.get_text(), heading + ". " + summary + ".", url) + "</head>", 1)
        result = re.sub(r"(<body\b[^>]*>)", lambda match: match[0] + back, result, count=1)
        check = weekly.parse(result)
        check.select_one('nav[aria-label="Newsletter navigation"]').decompose()
        assert str(check.body) == str(original.body), source.name
        weekly.save(url.lstrip("/") + "index.html", result)

        archive_path = f"insights/newsletters/{series}/index.html"
        archive = weekly.parse((SITE / archive_path).read_text())
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
        weekly.save(archive_path, str(archive))
        link = hub.select_one(f'[data-newsletter-latest="{series}"]')
        link["href"] = url
        link.string = re.sub(r" for .*$", " for " + WEEK, link.get_text())

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
    sitemap = (SITE / "sitemap.xml").read_text()
    entries = "".join(
        f"<url><loc>https://greyradius.com{url}</loc><lastmod>{date.today().isoformat()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n"
        for url in urls if "https://greyradius.com" + url + "</loc>" not in sitemap)
    weekly.save("sitemap.xml", sitemap.replace("</urlset>", entries + "</urlset>"))
    for p, before in {**unchanged, **sources}.items():
        assert digest(p) == before, f"Unexpected changes: {p}"
    print(f"Added five newsletters. Preserved {len(unchanged)} previous detail pages and all five uploaded originals.")


if __name__ == "__main__":
    main()
