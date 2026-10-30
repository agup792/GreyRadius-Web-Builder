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
  for (const week of ["sep21-27", "sep28-oct4", "oct5-11", "oct12-18", "oct19-25"]) {
    assert.equal(links.filter((url) => url.includes(`${week}-2026`)).length, 1, week);
  }
  const recent = ["oct19-25", "oct12-18", "oct5-11", "sep28-oct4", "sep21-27"];
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
