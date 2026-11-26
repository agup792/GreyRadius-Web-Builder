import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../greyradius-website");
const script = fs.readFileSync(path.join(root, "assets/js/newsletter-data.js"), "utf8");
const series = ["healthcare", "charged", "the-signal", "the-stack", "the-wafer"];
const latestContext = { window: {}, document: { querySelectorAll: () => [] } };
vm.runInNewContext(script, latestContext);
const latest = latestContext.window.GREYRADIUS_NEWSLETTER_LATEST;
const archive = (name) => fs.readFileSync(path.join(root, "insights/newsletters", name, "index.html"), "utf8");
const cardLinks = (html) => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>[\s\S]*?<\/a>/g)]
  .filter(([card]) => /data-newsletter-current|(?:Issue \d{3}|Weekly edition)(?:\s|&)/.test(card))
  .map(([, href]) => href);

test("every archive lists each weekly edition only once", () => {
  for (const name of series) {
    const html = archive(name);
    const links = cardLinks(html);
    assert.ok(links.length > 0, name);
    assert.equal(new Set(links).size, links.length, `${name}: duplicate edition card`);
    assert.equal((html.match(/data-newsletter-current(?=[\s=>])/g) || []).length, 1, name);
    assert.equal(links[0], latest[name].url, `${name}: newest card must match latest data`);
    const allLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/g)].map(([, url]) => url);
    const directory = path.join(root, "insights/newsletters", name);
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory() || !fs.existsSync(path.join(directory, entry.name, "index.html"))) continue;
      const url = `/insights/newsletters/${name}/${entry.name}/`;
      assert.equal(allLinks.filter((href) => href === url).length, 1, `${name}: ${entry.name} must remain linked once`);
    }
  }
  const links = cardLinks(archive("the-signal"));
  for (const week of ["sep21-27", "sep28-oct4", "oct5-11", "oct12-18", "oct19-25", "oct26-nov01", "nov02-08", "nov09-15", "nov16-22"]) {
    assert.equal(links.filter((url) => url.includes(`${week}-2026`)).length, 1, week);
  }
  const recent = ["nov16-22", "nov09-15", "nov02-08", "oct26-nov01", "oct19-25", "oct12-18", "oct5-11", "sep28-oct4", "sep21-27"];
  recent.forEach((week, i) => assert.ok(links[i].includes(`${week}-2026`)));
});

test("even stale latest-issue data cannot rewrite or duplicate archive cards", () => {
  // Reproduce the screenshot's failure mode: an older script contains Sep 21
  // as latest, while the HTML already contains October and September cards.
  const staleScript = script.replace(
    /("the-signal": Object\.freeze\(\{[\s\S]*?\n    \}\)),/,
    (record) => record.replaceAll(latest["the-signal"].url, "/insights/newsletters/the-signal/enterprise-ai-intelligence-sep21-27-2026/")
      .replaceAll(latest["the-signal"].date, "21–27 September 2026"),
  );
  assert.notEqual(staleScript, script);
  for (const name of series) {
    const card = { href: cardLinks(archive(name))[0] };
    const original = card.href;
    const issue = { textContent: "Original issue label" };
    const headline = { textContent: "Original headline" };
    card.querySelector = (selector) => selector === "[data-newsletter-issue]" ? issue : headline;
    const context = {
      window: {},
      document: {
        body: { dataset: { newsletter: name } },
        querySelector: () => card,
        querySelectorAll: () => [],
      },
    };
    vm.runInNewContext(staleScript, context);
    assert.equal(card.href, original, name);
    assert.equal(issue.textContent, "Original issue label");
    assert.equal(headline.textContent, "Original headline");
  }
});

test("hub latest links still work", () => {
  const links = series.map((name) => ({ dataset: { newsletterLatest: name } }));
  const context = { window: {}, document: { querySelectorAll: () => links } };
  vm.runInNewContext(script, context);
  for (const link of links) {
    const current = latest[link.dataset.newsletterLatest];
    assert.equal(link.href, current.url);
    assert.ok(link.textContent.includes(current.date));
    assert.ok(archive("").includes(`href="${current.url}"`), "Static hub link must match runtime");
  }
});

test("hub and archives request the current content-hashed script", () => {
  const version = crypto.createHash("sha256").update(script).digest("hex").slice(0, 12);
  for (const name of ["", ...series]) {
    const html = archive(name);
    assert.ok(html.includes(`newsletter-data.js?v=${version}`), name || "hub");
    assert.doesNotMatch(html, /newsletter-data\.js["']/);
  }
});

test("Oct 26 healthcare summary uses approved current-week figures", () => {
  const html = fs.readFileSync(path.join(root,
    "insights/newsletters/healthcare/healthcare-brief-oct26-nov01-2026/index.html"), "utf8");
  const stories = [...html.matchAll(/class="story(?:\s[^"]*)?"/g)].length;
  assert.equal(stories, 6);
  for (const [label, value] of [
    ["Developments", String(stories)],
    ["Max Healthcare approved investment", "₹415 crore"],
    ["Additional beds planned", "209"],
    ["Q2 bed occupancy", "77%"],
  ]) {
    assert.ok(html.includes(`<span>${label}</span><b>${value}</b>`), label);
  }
  assert.doesNotMatch(html, /data-editorial-note="source-summary"|India phase-out target|Nursing workforce|Alaska rural projects/);
});

test("Nov 2 healthcare edition has consistent dates without the previous summary strip", () => {
  const html = fs.readFileSync(path.join(root,
    "insights/newsletters/healthcare/healthcare-brief-nov02-08-2026/index.html"), "utf8");
  assert.equal([...html.matchAll(/class="story(?:\s[^"]*)?"/g)].length, 5);
  assert.ok(html.includes("GreyRadius | Weekly Healthcare Brief | 2–8 November 2026"));
  assert.doesNotMatch(html, /26 October|1 November|class="signals"/);
});

test("manufacturing content retains its tables, illustrations and evidence caveats", () => {
  const blog = fs.readFileSync(path.join(root,
    "blogs/china-plus-one-manufacturing-india-vietnam-indonesia/index.html"), "utf8");
  const caseStudy = fs.readFileSync(path.join(root,
    "case-studies/manufacturing-location-selection-asia/index.html"), "utf8");
  assert.equal([...blog.matchAll(/<table\b/g)].length, 4);
  assert.ok(blog.includes("not empirically verified cost or country rankings"));
  assert.doesNotMatch(blog, /Primary keyword:|Secondary keywords:/);
  assert.equal([...caseStudy.matchAll(/<figure\b/g)].length, 2);
  for (const number of [1, 2]) {
    const image = `assets/images/case-studies/manufacturing-asia-decision-${number}.png`;
    assert.ok(caseStudy.includes(`src="/${image}"`));
    assert.ok(fs.statSync(path.join(root, image)).size > 0);
  }
  assert.ok(caseStudy.includes("do not establish realised savings"));
  assert.ok(caseStudy.includes("no quantified investment outcome is claimed"));
});

test("Nov 9 newsletters retain current-week dates and matching highlights", () => {
  for (const [name, prefix, count] of [
    ["healthcare", "healthcare-brief", 11],
    ["charged", "ev-battery-intelligence", 17],
    ["the-signal", "enterprise-ai-intelligence", 14],
    ["the-stack", "infrastructure-brief", 21],
  ]) {
    const html = fs.readFileSync(path.join(root,
      `insights/newsletters/${name}/${prefix}-nov09-15-2026/index.html`), "utf8");
    assert.equal([...html.matchAll(/class="story(?:\s[^"]*)?"/g)].length, count, name);
    assert.equal([...html.matchAll(/class="highlight"/g)].length, count, name);
    assert.match(html, /9–15 November 2026/);
    assert.doesNotMatch(html, /2–8 November 2026/);
  }
});

test("Nov 9 Wafer keeps all seven supplied stories and verification labels", () => {
  const html = fs.readFileSync(path.join(root,
    "insights/newsletters/the-wafer/semiconductor-intelligence-nov09-15-2026/index.html"), "utf8");
  assert.equal([...html.matchAll(/class="story(?:\s[^"]*)?"/g)].length, 7);
  assert.equal([...html.matchAll(/class="highlight"/g)].length, 7);
  assert.ok(html.includes('id="wafer-story-6"'));
  assert.ok(html.includes('id="wafer-story-7"'));
  assert.ok(html.includes("Verification pending"));
  assert.ok(html.includes("This is a research candidate, not a verified financial announcement."));
  assert.ok(html.includes("The SMIC profit report and GlobalFoundries groundbreaking candidate are excluded pending original-source confirmation."));
});

test("GCC AI articles preserve all tables and limitations on claimed outcomes", () => {
  const blog = fs.readFileSync(path.join(root,
    "blogs/enterprise-ai-sales-gcc-pilot-to-paid-deployment/index.html"), "utf8");
  const caseStudy = fs.readFileSync(path.join(root,
    "case-studies/gcc-enterprise-ai-pilot-commercialisation/index.html"), "utf8");
  assert.equal([...blog.matchAll(/<table\b/g)].length, 5);
  assert.equal([...caseStudy.matchAll(/<table\b/g)].length, 1);
  assert.ok(blog.includes("hypothetical assumptions, not reported customer results"));
  assert.ok(blog.includes("not a guarantee of contract signature"));
  assert.ok(caseStudy.includes("No verified baseline, post-engagement performance figures, or signed-contract outcomes were supplied."));
  assert.ok(caseStudy.includes("actual reductions in cycle time, increases in conversion, and contracted revenue gains were not provided."));
  assert.doesNotMatch(blog + caseStudy, /w:pPr|w:tbl|Primary keyword:|Secondary keywords:/);
});

test("Nov 16 editions have matching story and highlight counts and current dates", () => {
  for (const [name, prefix, count] of [
    ["healthcare", "healthcare-brief", 7],
    ["charged", "ev-battery-intelligence", 14],
    ["the-signal", "enterprise-ai-intelligence", 9],
    ["the-stack", "infrastructure-brief", 27],
    ["the-wafer", "semiconductor-intelligence", 18],
  ]) {
    const html = fs.readFileSync(path.join(root,
      `insights/newsletters/${name}/${prefix}-nov16-22-2026/index.html`), "utf8");
    assert.equal([...html.matchAll(/class="story(?:\s[^"]*)?"/g)].length, count, name);
    assert.equal([...html.matchAll(/class="highlight"/g)].length, count, name);
    assert.match(html, /16–22 November 2026/);
    assert.doesNotMatch(html, /9–15 November 2026/);
    assert.ok(html.includes('rel="canonical"'), name);
  }
  const signal = fs.readFileSync(path.join(root,
    "insights/newsletters/the-signal/enterprise-ai-intelligence-nov16-22-2026/index.html"), "utf8");
  assert.ok(signal.includes("eligibility for this reporting window remains unconfirmed"));
});
