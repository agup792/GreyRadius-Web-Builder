"""Import the approved 12–18 October uploads without replacing earlier issues."""
import copy
import hashlib
import html
import json
from pathlib import Path
import re
import subprocess

from bs4 import BeautifulSoup
from docx import Document

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "greyradius-website"
UPLOADS = ROOT / "attached_assets"
DATE = "2026-10-23"
WEEK = "12–18 October 2026"
NEWS = [
    ("healthcare", "healthcare-brief", "GreyRadius_Healthcare_Oct12_18", "Healthcare acquisitions, hospital capacity and AI-enabled care",
     "Park Hospital · Mankind Pharma · Digital pathology and healthcare AI"),
    ("charged", "ev-battery-intelligence", "The_Charged_Oct12_18", "EV demand, lithium supply and India charging economics",
     "September global sales · EnergyX–Trafigura · HPCL tariffs and Jio-bp access"),
    ("the-signal", "enterprise-ai-intelligence", "The_Signal_Oct12_18", "Governed agentic AI, India partnerships and enterprise controls",
     "HCLTech–Anthropic · IBM–MeitY · OpenAI enterprise adoption"),
    ("the-stack", "infrastructure-brief", "The_Stack_Oct12_18", "India data-centre construction, power pipelines and global capacity",
     "Colt DCS–RMZ · Tata Power · AI infrastructure equipment and permitting"),
    ("the-wafer", "semiconductor-intelligence", "The_Wafer_Oct12_18", "Foundry earnings, silicon carbide supply and AI packaging",
     "TSMC and ASML results · GlobalFoundries · AI connectivity and power"),
]


def parse(text):
    return BeautifulSoup(text, "html.parser")


def save(relative, text):
    target = SITE / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text)


def metadata(title, description, url):
    absolute = "https://greyradius.com" + url
    image = "https://greyradius.com/assets/images/og-insights.png"
    fields = [
        ('name', 'description', description),
        ('property', 'og:title', title),
        ('property', 'og:description', description),
        ('property', 'og:type', 'article'),
        ('property', 'og:site_name', 'GreyRadius Consulting'),
        ('property', 'og:url', absolute),
        ('property', 'og:image', image),
        ('name', 'twitter:card', 'summary_large_image'),
        ('name', 'twitter:site', '@greyradius'),
        ('name', 'twitter:title', title),
        ('name', 'twitter:description', description),
        ('name', 'twitter:image', image),
    ]
    result = '\n<link rel="canonical" href="' + absolute + '"/>\n'
    result += '\n'.join(
        f'<meta {key}="{name}" content="{html.escape(value, quote=True)}"/>'
        for key, name, value in fields
    )
    return result + '\n'


def make_article(template, url, title, description, eyebrow, body, subtitle=None):
    page = parse((SITE / template).read_text())
    page.title.string = title + " | GreyRadius Consulting"
    for tag in page.select('link[rel="canonical"],meta[name="description"],meta[property^="og:"],meta[name^="twitter:"],script[type="application/ld+json"]'):
        tag.decompose()
    page.head.append(parse(metadata(title, description, url)))
    page.select_one("h1").string = title
    page.select_one('.breadcrumb li[aria-current="page"]').string = title
    page.select_one(".hero-block__eyebrow").string = eyebrow
    time = page.select_one("time")
    time["datetime"] = DATE
    time.string = "23 October 2026"
    sub = page.select_one(".hero-block__sub")
    if sub and subtitle:
        sub.string = subtitle
    article = page.select_one("article.article-body")
    article.clear()
    article.append(parse(body))
    for table in list(article.select("table")):
        wrapper = page.new_tag("div", attrs={"class": "table-wrap"})
        table.wrap(wrapper)
    if url.startswith("/blogs/"):
        related = "/case-studies/market-entry-qualified-pipeline-gtm-execution/"
        related_text = "Read the related market-entry execution case study"
        parent_url, parent_label = "/insights/", "Insights"
    else:
        related = "/blogs/gtm-execution-as-a-service-embedded-team/"
        related_text = "Explore the GTM execution-as-a-service guide"
        parent_url, parent_label = "/case-studies/", "Case Studies"
    article.append(parse(
        f'<p><a href="{related}">{related_text}</a>, or '
        '<a href="/contact.html">contact GreyRadius</a> to discuss your execution priorities.</p>'
    ))
    schemas = [
        {
            "@context": "https://schema.org", "@type": "Article", "headline": title,
            "datePublished": DATE, "dateModified": DATE, "description": description,
            "author": {"@type": "Organization", "name": "GreyRadius Consulting"},
            "publisher": {"@type": "Organization", "name": "GreyRadius Consulting"},
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://greyradius.com" + url},
        },
        {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": i + 1, "name": label, "item": "https://greyradius.com" + path}
                for i, (path, label) in enumerate([("/", "Home"), (parent_url, parent_label), (url, title)])
            ],
        },
    ]
    for schema in schemas:
        tag = page.new_tag("script", attrs={"type": "application/ld+json"})
        tag.string = json.dumps(schema, ensure_ascii=False)
        page.head.append(tag)
    save(url.lstrip("/") + "index.html", str(page))


def main():
    # Snapshot all older edition files, including legacy alternative presentations.
    old_files = {
        p: hashlib.sha256(p.read_bytes()).hexdigest()
        for p in (SITE / "insights/newsletters").glob("*/*/index.html")
        if "oct12-18-2026" not in str(p)
    }
    latest_path = SITE / "assets/js/newsletter-data.js"
    latest = latest_path.read_text()
    hub_path = SITE / "insights/newsletters/index.html"
    hub = parse(hub_path.read_text())
    new_urls = []
    for series, prefix, source_prefix, headline, summary in NEWS:
        source = next(UPLOADS.glob(source_prefix + "*17927367*.html"))
        raw = source.read_text()
        url = f"/insights/newsletters/{series}/{prefix}-oct12-18-2026/"
        title = parse(raw).title.get_text(strip=True)
        # Preserve supplied markup, figures, source URLs, filters and embedded images.
        result = raw.replace("</head>", metadata(title, headline + ". " + summary + ".", url) + "</head>", 1)
        back = (
            f'<nav aria-label="Newsletter navigation" style="padding:.85rem 1rem;background:#132846;color:white;font:14px sans-serif;">'
            f'<a href="/insights/newsletters/{series}/" style="color:white;">All editions</a>'
            ' · <a href="/insights/newsletters/" style="color:white;">Newsletter hub</a></nav>'
        )
        result = re.sub(r"(<body\b[^>]*>)", lambda m: m[0] + back, result, count=1)
        save(url.lstrip("/") + "index.html", result)
        # Source body may gain navigation only. No editorial or numerical rewriting.
        imported = parse(result)
        imported.select_one('nav[aria-label="Newsletter navigation"]').decompose()
        assert str(imported.body) == str(parse(raw).body), source.name

        archive_path = SITE / f"insights/newsletters/{series}/index.html"
        archive = parse(archive_path.read_text())
        existing = archive.find("a", href=url)
        if not existing:
            current = archive.select_one("a[data-newsletter-current]")
            card = copy.deepcopy(current)
            for tag in [current, *current.select("[data-newsletter-issue],[data-newsletter-headline]")]:
                for attr in ["data-newsletter-current", "data-newsletter-issue", "data-newsletter-headline"]:
                    tag.attrs.pop(attr, None)
            card["href"] = url
            card.select_one("[data-newsletter-issue]").string = "Weekly edition · " + WEEK
            card.select_one("[data-newsletter-headline]").string = headline
            card.find_all(["p", "h2"])[-1].string = summary
            current.insert_before(card)
        save(f"insights/newsletters/{series}/index.html", str(archive))
        link = hub.select_one(f'[data-newsletter-latest="{series}"]')
        link["href"] = url
        link.string = re.sub(r" for .*$", " for " + WEEK, link.get_text())
        # Update just this record; the archive is never mutated by the runtime.
        key = r'"?' + re.escape(series) + r'"?'
        pattern = rf'({key}: Object\.freeze\(\{{)([\s\S]*?)(\n    \}}\))'
        def update_record(match):
            record = match[2]
            record = re.sub(r'url: "[^"]+"', 'url: "' + url + '"', record)
            record = re.sub(r'date: "[^"]+"', 'date: "' + WEEK + '"', record)
            record = re.sub(r'headline:\s*"[^"]+"', 'headline: ' + json.dumps(headline, ensure_ascii=False), record)
            record = re.sub(r'issue: "\d+"', lambda m: 'issue: "' + format(int(m[0].split('"')[1]) + 1, "03") + '"', record) if "oct5-11" in match[2] else record
            return match[1] + record + match[3]
        latest, count = re.subn(pattern, update_record, latest, count=1)
        assert count == 1, series
        new_urls.append(url)
    save("assets/js/newsletter-data.js", latest)
    save("insights/newsletters/index.html", str(hub))

    blog_source = next(UPLOADS.glob("GTM_Execution_As_A_Service*17927367*.md"))
    markdown = blog_source.read_text()
    title = markdown.splitlines()[0].removeprefix("# ")
    markdown_it = next((ROOT / "node_modules/.pnpm").glob("markdown-it@*/node_modules/markdown-it/index.mjs"))
    rendered = subprocess.run(
        ["node", "--input-type=module", "-e",
         f'import MarkdownIt from {json.dumps(str(markdown_it))};let input="";for await(const chunk of process.stdin)input+=chunk;process.stdout.write(new MarkdownIt({{html:false}}).render(input));'],
        input="\n".join(markdown.splitlines()[1:]), capture_output=True, text=True, check=True,
    ).stdout
    blog_url = "/blogs/gtm-execution-as-a-service-embedded-team/"
    make_article(
        "blogs/saudi-arabia-or-uae-first-gcc-market-entry/index.html",
        blog_url, title,
        "When an embedded GTM team makes more sense than hiring in-house: responsibilities, a 90-day engagement, qualification, measurement and handover.",
        "GTM Strategy · Embedded Execution", rendered,
    )

    doc = Document(next(UPLOADS.glob("GreyRadius_Market_Entry_Case_Study*17927367*.docx")))
    paras = [p for p in doc.paragraphs if p.text.strip()]
    case_title, subtitle = paras[0].text, paras[1].text
    parts = []
    for para in paras[2:]:
        tag = "h2" if para.style.name.startswith("Heading") else "p"
        parts.append(f"<{tag}>{html.escape(para.text)}</{tag}>")
    case_url = "/case-studies/market-entry-qualified-pipeline-gtm-execution/"
    make_article(
        "case-studies/gcc-market-entry-first-contract-expansion/index.html",
        case_url, case_title, subtitle,
        "Market Entry · B2B GTM Execution", "\n".join(parts), subtitle,
    )
    # Reuse established card structures and filters, leaving earlier cards intact.
    for index, previous, target, heading, label in [
        ("insights", "/blogs/saudi-arabia-or-uae-first-gcc-market-entry/", blog_url, title, "GTM Execution"),
        ("case-studies", "/case-studies/gcc-market-entry-first-contract-expansion/", case_url, case_title, "B2B GTM Execution"),
    ]:
        path = SITE / index / "index.html"
        page = parse(path.read_text())
        if not page.find("a", href=target):
            old = page.find("a", href=previous)
            card = copy.deepcopy(old)
            card["href"] = target
            card.find(["h2", "h3"]).string = heading
            if index == "insights":
                card.select_one(".cs-photo-tag").string = "GTM · Embedded Execution"
                card.select_one(".case-study-card__tag").string = "Go-to-Market / Execution"
                card.select_one(".case-study-card__image div span").string = "GTM"
            else:
                card["data-geo"] = "global"
                card.select_one(".cs-card-image span").string = label
                card.select_one(".tag-geo").string = "Not disclosed"
                card.select_one(".cs-card-outcome").string = "Connected buyer qualification, conversion ownership and sales handover; revenue and conversion results remain unverified."
                card.select_one(".cs-card-kpi").string = "Buyer intent · qualified opportunities · accountable handover"
            old.insert_before(card)
        save(index + "/index.html", str(page))
    new_urls += [blog_url, case_url]
    sitemap_path = SITE / "sitemap.xml"
    sitemap = sitemap_path.read_text()
    additions = "".join(
        f"  <url><loc>https://greyradius.com{url}</loc><lastmod>{DATE}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n"
        for url in new_urls if "https://greyradius.com" + url + "</loc>" not in sitemap
    )
    save("sitemap.xml", sitemap.replace("</urlset>", additions + "</urlset>"))
    for file, digest in old_files.items():
        assert hashlib.sha256(file.read_bytes()).hexdigest() == digest, f"Changed older edition: {file}"
    print(f"Imported {len(new_urls)} new pages. Preserved {len(old_files)} older newsletter files byte-for-byte.")


if __name__ == "__main__":
    main()
