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
  }
  const links = cardLinks(archive("the-signal"));
  for (const week of ["sep21-27", "sep28-oct4", "oct5-11"]) {
    assert.equal(links.filter((url) => url.includes(`${week}-2026`)).length, 1, week);
  }
  assert.match(links[0], /oct5-11-2026/);
  assert.match(links[1], /sep28-oct4-2026/);
  assert.match(links[2], /sep21-27-2026/);
});

test("even stale latest-issue data cannot rewrite or duplicate archive cards", () => {
  // Reproduce the screenshot's failure mode: an older script contains Sep 21
  // as latest, while the HTML already contains Oct 5, Sep 28 and Sep 21 cards.
  const staleScript = script.replace(
    /("the-signal": Object\.freeze\(\{[\s\S]*?\n    \}\)),/,
    (record) => record.replaceAll("oct5-11-2026", "sep21-27-2026")
      .replaceAll("5–11 October 2026", "21–27 September 2026"),
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
    assert.match(link.href, /oct5-11-2026\/$/);
    assert.match(link.textContent, /5–11 October 2026/);
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
