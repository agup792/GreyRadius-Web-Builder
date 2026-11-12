"""Import the 2–8 November uploads, preserving previous content and DOCX illustrations."""
import copy
import hashlib
import html
import importlib.util
import json
from pathlib import Path
import re
import struct

from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

SPEC = importlib.util.spec_from_file_location("previous", Path(__file__).with_name("publish-oct19-25-2026.py"))
previous = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(previous)
weekly = previous.weekly
weekly.DATE = "2026-11-12"
SITE, UPLOADS = weekly.SITE, weekly.UPLOADS
WEEK = "2–8 November 2026"
BLOG = "/blogs/china-plus-one-manufacturing-india-vietnam-indonesia/"
CASE = "/case-studies/manufacturing-location-selection-asia/"
NEWS = [
    ("healthcare", "healthcare-brief", "GreyRadius_Healthcare",
     "Hospital growth, capacity investment and FDA manufacturing guidance",
     "Medanta · Fortis · Yatharth · Oncology access and potency assurance"),
    ("charged", "ev-battery-intelligence", "GreyRadius_The_Charged",
     "India battery investment, storage support and EV market demand",
     "Amara Raja · Energy storage incentives · EV registrations and Gulf distribution"),
    ("the-signal", "enterprise-ai-intelligence", "GreyRadius_The_Signal",
     "Enterprise AI deployment, workflow economics and governance",
     "AI platforms · Agent controls · Energy operations and enterprise adoption"),
    ("the-stack", "infrastructure-brief", "GreyRadius_The_Stack",
     "AI data-centre investment, commissioning and power delivery",
     "Wyoming investment · Singapore and Jakarta capacity · Power and resilience"),
    ("the-wafer", "semiconductor-intelligence", "GreyRadius_The_Wafer",
     "AI chip earnings, foundry economics and packaging supply risk",
     "AMD · Qualcomm · GlobalFoundries · Semiconductor materials and metrology"),
]
ILLUSTRATIONS = [
    ("Country screening to investment resilience",
     "Country screen: India, Vietnam and Indonesia. Cluster readiness: suppliers, power and logistics. "
     "Landed economics: inputs, freight and inventory. Investment resilience: base, disruption and scale-up."),
    ("The layers of delivered-product competitiveness",
     "Factory labour and utilities, supply-base inputs, quality and capacity, movement through freight, "
     "duties and lead time, and cash and disruption risk together determine total landed cost, "
     "delivery reliability and scale readiness."),
]


def newsletter(config, hub):
    series, prefix, source_prefix, heading, summary = config
    source = next(UPLOADS.glob(source_prefix + "*17944947824*.html"))
    raw = source.read_text()
    original = weekly.parse(raw)
    url = f"/insights/newsletters/{series}/{prefix}-nov02-08-2026/"
    back = (
        '<nav aria-label="Newsletter navigation" style="padding:.85rem 1rem;background:#132846;color:white;font:14px sans-serif;">'
        f'<a href="/insights/newsletters/{series}/" style="color:white;">All editions</a> · '
        '<a href="/insights/newsletters/" style="color:white;">Newsletter hub</a></nav>'
    )
    result = raw.replace("</head>", weekly.metadata(original.title.get_text(), heading + ". " + summary + ".", url) + "</head>", 1)
    result = re.sub(r"(<body\b[^>]*>)", lambda m: m[0] + back, result, count=1)
    # Correct only the stale footer date; preserve all reporting, figures and original uploads.
    old_footer = "GreyRadius | Weekly Healthcare Brief | 26 October–1 November 2026"
    new_footer = "GreyRadius | Weekly Healthcare Brief | " + WEEK
    if series == "healthcare":
        assert result.count(old_footer) == 1
        result = result.replace(old_footer, new_footer)
    check = weekly.parse(result)
    check.select_one('nav[aria-label="Newsletter navigation"]').decompose()
    if series == "healthcare":
        check = weekly.parse(str(check).replace(new_footer, old_footer))
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
    return url


def convert_docx(source, skip):
    """Preserve paragraphs, tables, emphasis, source URLs and embedded pictures in order."""
    doc = Document(source)
    chunks, position, listing, image_count = [], 0, False, 0
    for element in doc.element.body:
        if element.tag == qn("w:p"):
            paragraph = Paragraph(element, doc)
            position += 1
            if position <= skip:
                continue
            drawings = element.xpath(".//w:drawing")
            if not paragraph.text.strip() and not drawings:
                continue
            bullet = paragraph.style.name.startswith("List")
            if listing and not bullet:
                chunks.append("</ul>")
                listing = False
            if bullet and not listing:
                chunks.append("<ul>")
                listing = True
            if paragraph.text.strip():
                style = paragraph.style.name
                # Both DOCX heading levels represent article sections below the page H1.
                tag = "li" if bullet else "h2" if style in ["Heading 1", "Heading 2"] else "h3" if style.startswith("Heading") else "p"
                chunks.append(f"<{tag}>{previous.inline(paragraph)}</{tag}>")
            for drawing in drawings:
                blip = drawing.xpath(".//a:blip")[0]
                part = paragraph.part.related_parts[blip.get(qn("r:embed"))]
                title, description = ILLUSTRATIONS[image_count]
                image_count += 1
                relative = f"assets/images/case-studies/manufacturing-asia-decision-{image_count}.png"
                target = SITE / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(part.blob)
                width, height = struct.unpack(">II", part.blob[16:24])
                chunks.append(
                    f'<figure style="margin:2rem 0;"><img src="/{relative}" alt="{html.escape(description, quote=True)}" '
                    f'width="{width}" height="{height}" loading="eager" style="display:block;width:100%;height:auto;"/>'
                    f'<figcaption style="font-size:.85rem;line-height:1.6;margin-top:.65rem;">'
                    f'<strong>{html.escape(title)}.</strong> {html.escape(description)}</figcaption></figure>'
                )
        elif element.tag == qn("w:tbl"):
            if listing:
                chunks.append("</ul>")
                listing = False
            table = Table(element, doc)
            rows = []
            for i, row in enumerate(table.rows):
                tag = "th" if i == 0 else "td"
                rows.append("<tr>" + "".join(
                    f"<{tag}>" + "<br/>".join(previous.inline(p) for p in c.paragraphs) + f"</{tag}>"
                    for c in row.cells
                ) + "</tr>")
            chunks.append("<table><thead>" + rows[0] + "</thead><tbody>" + "".join(rows[1:]) + "</tbody></table>")
    if listing:
        chunks.append("</ul>")
    body = weekly.parse("\n".join(chunks).replace("—", "–"))
    # DOCX research references are plain text URLs, not Word hyperlink relationships.
    for text in list(body.find_all(string=True)):
        if text.parent.name == "a" or not re.search(r"https?://", str(text)):
            continue
        linked = re.sub(r'https?://[^\s<>]+', lambda m: f'<a href="{html.escape(m[0], quote=True)}">{html.escape(m[0])}</a>', str(text))
        text.replace_with(weekly.parse(linked))
    assert image_count == len(doc.inline_shapes)
    return doc, str(body)


def article(source, url, template, skip, description, related_url):
    doc, body = convert_docx(source, skip)
    title, subtitle = [p.text.replace("—", "–") for p in doc.paragraphs[:2]]
    weekly.make_article(template, url, title, description, "Manufacturing · Asia Strategy", body, subtitle,
                        related=(related_url, "Read the related manufacturing " + ("case study" if url == BLOG else "guide")))
    path = url.lstrip("/") + "index.html"
    page = weekly.parse((SITE / path).read_text())
    if not page.select_one(".hero-block__sub"):
        sub = page.new_tag("p", attrs={"class": "hero-block__sub"})
        sub.string = subtitle
        page.select_one("h1").insert_after(sub)
    weekly.save(path, str(page))
    return title


def listing(index, url, title):
    path = index + "/index.html"
    page = weekly.parse((SITE / path).read_text())
    if not page.find("a", href=url):
        selector = "a.case-study-card" if index == "insights" else "a.cs-card"
        current = page.select_one(selector)
        card = copy.deepcopy(current)
        card["href"], card["data-industry"] = url, "manufacturing"
        card.find(["h2", "h3"]).string = title
        if index == "insights":
            card.select_one(".cs-photo-tag").string = "Manufacturing · Asia"
            card.select_one(".case-study-card__tag").string = "China-Plus-One / Manufacturing"
            card.select_one(".case-study-card__image div span").string = "China-Plus-One"
            card.select_one(".case-study-card__stat-chip").string = "Nov 2026"
        else:
            card["data-geo"], card["data-service"] = "india sea", "feasibility market-entry"
            card.select_one(".cs-card-image span").string = "Manufacturing Location Strategy"
            card.select_one(".tag-service-primary").string = "Feasibility & Market Entry"
            card.select_one(".tag-geo").string = "India · Vietnam · Indonesia"
            card.select_one(".tag-industry").string = "Manufacturing"
            card.select_one(".cs-card-outcome").string = "Compared supplier readiness, landed economics and disruption scenarios. Realised savings and a final site selection were not established."
            card.select_one(".cs-card-kpi").string = "3 countries · 3 scenarios · supplier readiness"
            if not page.select_one('[data-dim="industry"][data-val="manufacturing"]'):
                button = page.new_tag("button", attrs={"class": "pill", "data-dim": "industry", "data-val": "manufacturing"})
                button.string = "Manufacturing & Industrials"
                page.select_one('[data-dim="industry"][data-val="beauty"]').insert_after(button)
        current.insert_before(card)
    if index == "insights":
        total = len(page.select("a.case-study-card[data-industry]"))
        page.select_one("#countNum").string = str(total)
        page.select_one(".hero-block .case-study-card__stat-chip").string = f"{total} articles"
    else:
        total = len(page.select("a.cs-card"))
        page.select_one("#cs-count").string = f"Showing all {total} case studies"
    weekly.save(path, str(page))


def main():
    detail = [p for section in ["insights/newsletters", "blogs", "case-studies"]
              for p in (SITE / section).glob("**/index.html")
              if len(p.relative_to(SITE / section).parts) > (2 if section == "insights/newsletters" else 1)]
    new_paths = {SITE / (url.strip("/") + "/index.html") for url in [BLOG, CASE]}
    old = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in detail
           if "nov02-08-2026" not in str(p) and p not in new_paths}
    sources = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in UPLOADS.glob("*17944947824*")}
    hub = weekly.parse((SITE / "insights/newsletters/index.html").read_text())
    latest = (SITE / "assets/js/newsletter-data.js").read_text()
    urls = []
    for config in NEWS:
        url = newsletter(config, hub)
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
    blog_title = article(next(UPLOADS.glob("China_Plus_One*17944947824*.docx")), BLOG,
                         "blogs/india-quick-commerce-market-entry-unit-economics/index.html", 4,
                         "Compare India, Vietnam and Indonesia for China-plus-one manufacturing using supplier readiness, landed costs, working capital, site feasibility and disruption scenarios.", CASE)
    case_title = article(next(UPLOADS.glob("GreyRadius_Manufacturing*17944947824*.docx")), CASE,
                         "case-studies/india-quick-commerce-city-sku-pilot/index.html", 2,
                         "How an international manufacturer reframed Asian location selection around supplier ecosystems, total landed economics and investment resilience.", BLOG)
    listing("insights", BLOG, blog_title)
    listing("case-studies", CASE, case_title)
    sitemap = (SITE / "sitemap.xml").read_text()
    entries = "".join(
        f"<url><loc>https://greyradius.com{url}</loc><lastmod>{weekly.DATE}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n"
        for url in urls + [BLOG, CASE] if "https://greyradius.com" + url + "</loc>" not in sitemap)
    weekly.save("sitemap.xml", sitemap.replace("</urlset>", entries + "</urlset>"))
    for p, digest in {**old, **sources}.items():
        assert hashlib.sha256(p.read_bytes()).hexdigest() == digest, f"Unexpected changes: {p}"
    print(f"Added seven pages. Preserved {len(old)} previous detail pages and all seven uploaded sources.")


if __name__ == "__main__":
    main()
