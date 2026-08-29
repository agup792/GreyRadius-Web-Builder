import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(root, "greyradius-website");
const write = process.argv.includes("--write");

const excludedDirectories = new Set(["templates"]);
const utilityUrls = new Set([
  "/404.html",
  "/search.html",
  "/og-preview.html",
]);
const legacyAliases = new Map([
  ["/terms.html", "/legal/terms.html"], ["/privacy.html", "/legal/privacy.html"],
  ["/privacy-policy.html", "/legal/privacy.html"], ["/industries/technology/", "/industries/technology.html"],
  ["/industries/fintech-payments/", "/industries/bfsi.html"], ["/industries/bfsi/", "/industries/bfsi.html"],
  ["/industries/islamic-finance/", "/industries/bfsi.html"], ["/industries/insurtech/", "/industries/bfsi.html"],
  ["/industries/cpg-fmcg-retail/", "/industries/cpg-fmcg-retail.html"],
  ["/industries/health-supplements/", "/industries/cpg-fmcg-retail.html"],
  ["/industries/hospitality-tourism/", "/industries/cpg-fmcg-retail.html"],
  ["/industries/ecommerce-tech/", "/industries/cpg-fmcg-retail.html"],
  ["/industries/healthtech/", "/industries/healthcare-and-life-sciences.html"],
  ["/industries/healthcare-life-sciences/", "/industries/healthcare-and-life-sciences.html"],
  ["/industries/pharma/", "/industries/healthcare-and-life-sciences.html"],
  ["/industries/renewable-energy/", "/industries/energy-and-chemicals.html"],
  ["/industries/carbon-markets/", "/industries/energy-and-chemicals.html"],
  ["/industries/energy-storage/", "/industries/energy-and-chemicals.html"],
  ["/industries/proptech/", "/industries/real-estate-and-infrastructure.html"],
  ["/industries/enterprise-saas/", "/industries/technology.html"],
  ["/industries/satellite-connectivity/", "/industries/technology.html"],
  ["/industries/manufacturing-industrials/", "/industries/industrials-manufacturing-and-infrastructure.html"],
  ["/industries/logistics-supply-chain/", "/industries/industrials-manufacturing-and-infrastructure.html"],
  ["/industries/electric-vehicles/", "/industries/industrials-manufacturing-and-infrastructure.html"],
  ["/industries/agritech/", "/industries/industrials-manufacturing-and-infrastructure.html"],
  ["/industries/education-edtech/", "/industries/education-and-edtech.html"],
  ["/industries/media-entertainment/", "/industries/technology.html"],
]);

const industryRules = [
  ["Beauty & Personal Care", /\b(beauty|cosmetic|personal care|hair care|skincare)\b/i],
  ["Technology & SaaS", /\b(saas|software|technology|digital|cyber|cloud|data center|ai |artificial intelligence)\b/i],
  ["Healthcare & Life Sciences", /\b(health|hospital|pharma|medical|clinical|oncology|ophthalm|neurotech)\b/i],
  ["CPG / FMCG / Retail", /\b(cpg|fmcg|retail|consumer goods|food|beverage|dairy|snack)\b/i],
  ["Energy & Chemicals", /\b(energy|chemical|solar|renewable|battery|mining|coal|oil|gas)\b/i],
  ["Manufacturing & Industrials", /\b(manufactur|industrial|factory|equipment|gearbox|robot|metal|supply chain)\b/i],
  ["Education & EdTech", /\b(education|edtech|e-learning|elearning|school|university)\b/i],
  ["Financial Services", /\b(fintech|bank|insurance|wealth|payment|financial services|investment)\b/i],
  ["Real Estate & Infrastructure", /\b(real estate|infrastructure|housing|construction|proptech)\b/i],
];

const geographyRules = [
  ["India", /\b(india|indian|delhi|mumbai|bengaluru|bangalore)\b/i],
  ["GCC", /\b(gcc|gulf|uae|dubai|abu dhabi|saudi|bahrain|qatar|kuwait|oman)\b/i],
  ["Southeast Asia", /\b(southeast asia|asean|singapore|indonesia|vietnam|malaysia|thailand|philippines|myanmar)\b/i],
  ["Africa", /\b(africa|nigeria|kenya|ethiopia|rwanda|tanzania|ghana|south africa|lagos)\b/i],
  ["North America", /\b(north america|united states|usa|canada)\b/i],
  ["Europe", /\b(europe|european|belgium|uk|united kingdom|germany|france)\b/i],
  ["Global", /\b(global|international|emerging markets)\b/i],
];

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || excludedDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&middot;/gi, "·")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pageUrl(filePath) {
  let url = `/${path.relative(siteRoot, filePath).split(path.sep).join("/")}`;
  if (url.endsWith("/index.html")) url = url.slice(0, -"index.html".length);
  return url;
}

function classify(url) {
  if (url.startsWith("/case-studies/")) return "Case Study";
  if (url.startsWith("/insights/newsletters/")) return "Newsletter";
  if (url.startsWith("/insights/")) return "Insight";
  if (url.startsWith("/blogs/")) return "Blog";
  if (url.startsWith("/industries/")) return "Industry";
  if (url.startsWith("/services/")) return "Service";
  if (url.startsWith("/market-entry/")) return "Market Entry Guide";
  if (url.startsWith("/about/")) return "About";
  return "Page";
}

function firstMatch(text, expression) {
  return expression.exec(text)?.[1] ?? "";
}

function resolveInternalHref(href, sourceUrl) {
  if (
    !href ||
    href.includes("${") ||
    href.includes("{{") ||
    href.startsWith("#") ||
    /^(mailto:|tel:|javascript:|data:)/i.test(href)
  ) return null;
  let parsed;
  try {
    parsed = new URL(href, `https://greyradius.com${sourceUrl}`);
  } catch {
    return null;
  }
  if (!["greyradius.com", "www.greyradius.com"].includes(parsed.hostname)) return null;
  let pathname = decodeURIComponent(parsed.pathname).replace(/\/+/g, "/");
  if (pathname === "/index.html") pathname = "/";
  if (pathname.endsWith("/index.html")) pathname = pathname.slice(0, -"index.html".length);
  if (legacyAliases.has(pathname)) pathname = legacyAliases.get(pathname);
  return pathname;
}

function destinationExists(url, knownUrls) {
  if (knownUrls.has(url)) return true;
  if (url.endsWith("/") && knownUrls.has(`${url}index.html`)) return true;
  if (!path.extname(url) && knownUrls.has(`${url}.html`)) return true;
  return false;
}

function matchedLabels(text, rules) {
  return rules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

const files = walk(siteRoot).sort();
const pages = files.map((filePath) => {
  const html = fs.readFileSync(filePath, "utf8");
  const url = pageUrl(filePath);
  const title = decodeHtml(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i))
    .replace(/\s*[|–-]\s*GreyRadius(?: Consulting)?\s*$/i, "")
    .trim();
  const descriptionMatch =
    /<meta\s+name=["']description["']\s+content=(["'])([\s\S]*?)\1/i.exec(html) ||
    /<meta\s+property=["']og:description["']\s+content=(["'])([\s\S]*?)\1/i.exec(html);
  const description = decodeHtml(descriptionMatch?.[2] ?? "");
  const canonical = firstMatch(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const noindex = /<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const redirect = /<meta\s+http-equiv=["']refresh["']/i.test(html);
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)]
    .map((match) => resolveInternalHref(match[1], url))
    .filter(Boolean);
  const searchableText = `${title} ${description} ${url.replace(/[-/]/g, " ")}`;
  return {
    filePath,
    url,
    title,
    description,
    canonical,
    noindex,
    redirect,
    hrefs,
    type: classify(url),
    industries: matchedLabels(searchableText, industryRules),
    geographies: matchedLabels(searchableText, geographyRules),
  };
});

const knownUrls = new Set(pages.map(({ url }) => url));
const indexablePages = pages.filter(
  ({ title, noindex, redirect, url }) => title && !noindex && !redirect && !utilityUrls.has(url),
);
const searchPage = pages.find(({ url }) => url === "/search.html");
if (searchPage) {
  searchPage.hrefs.push(...indexablePages.map(({ url }) => url));
}
const inbound = new Map(pages.map(({ url }) => [url, 0]));
const brokenLinks = [];
const duplicateDestinations = [];

for (const page of pages) {
  const counts = new Map();
  for (const href of page.hrefs) {
    counts.set(href, (counts.get(href) ?? 0) + 1);
    if (destinationExists(href, knownUrls)) {
      inbound.set(href, (inbound.get(href) ?? 0) + 1);
    } else {
      brokenLinks.push({ source: page.url, destination: href });
    }
  }
  for (const [destination, count] of counts) {
    if (count >= 3) duplicateDestinations.push({ source: page.url, destination, count });
  }
}

const searchIndex = indexablePages
  .map((page) => ({
    id: crypto.createHash("sha1").update(page.url).digest("hex").slice(0, 10),
    title: page.title,
    description: page.description,
    url: page.url,
    type: page.type,
    industries: page.industries,
    geographies: page.geographies,
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    htmlFiles: pages.length,
    indexablePages: indexablePages.length,
    redirects: pages.filter(({ redirect }) => redirect).length,
    noindexPages: pages.filter(({ noindex }) => noindex).length,
    brokenInternalLinks: brokenLinks.length,
    orphanIndexablePages: indexablePages.filter(({ url }) => (inbound.get(url) ?? 0) === 0).length,
    lowInboundIndexablePages: indexablePages.filter(({ url }) => (inbound.get(url) ?? 0) < 3).length,
  },
  byType: Object.fromEntries(
    [...new Set(indexablePages.map(({ type }) => type))]
      .sort()
      .map((type) => [type, indexablePages.filter((page) => page.type === type).length]),
  ),
  brokenLinks,
  orphanPages: indexablePages
    .filter(({ url }) => (inbound.get(url) ?? 0) === 0)
    .map(({ url, title, type }) => ({ url, title, type })),
  lowInboundPages: indexablePages
    .filter(({ url }) => (inbound.get(url) ?? 0) < 3)
    .map(({ url, title, type }) => ({ url, title, type, inboundLinks: inbound.get(url) ?? 0 })),
  duplicateDestinations,
};

if (write) {
  fs.writeFileSync(
    path.join(siteRoot, "data/search-index.json"),
    `${JSON.stringify(searchIndex, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(siteRoot, "data/content-discovery-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  const searchPath = path.join(siteRoot, "search.html");
  const searchHtml = fs.readFileSync(searchPath, "utf8");
  const directory = [...new Set(searchIndex.map(({ type }) => type))]
    .sort()
    .map((type) => {
      const links = searchIndex
        .filter((item) => item.type === type)
        .map((item) => `<li><a href="${item.url}">${item.title}</a></li>`)
        .join("");
      return `<section><h3>${type}</h3><ul>${links}</ul></section>`;
    })
    .join("");
  const startMarker = "<!-- CONTENT-DIRECTORY:START -->";
  const endMarker = "<!-- CONTENT-DIRECTORY:END -->";
  const generatedDirectory =
    `${startMarker}<details class="search-directory"><summary>Browse the complete A-Z content directory</summary><div class="search-directory__groups">${directory}</div></details>${endMarker}`;
  if (!searchHtml.includes(startMarker) || !searchHtml.includes(endMarker)) {
    throw new Error("Content directory markers are missing from search.html");
  }
  fs.writeFileSync(
    searchPath,
    searchHtml.replace(
      new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`),
      generatedDirectory,
    ),
  );
}

console.log(JSON.stringify(report.totals, null, 2));
console.log(JSON.stringify(report.byType, null, 2));
if (!write) console.log("Read-only audit complete. Pass --write to refresh generated data.");
