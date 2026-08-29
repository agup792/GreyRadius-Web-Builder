import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import type { Plugin } from "vite";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const websiteDir = path.resolve(import.meta.dirname, "../../greyradius-website");
const legacyAliases: Record<string, string> = {
  "/terms.html": "/legal/terms.html",
  "/privacy.html": "/legal/privacy.html",
  "/privacy-policy.html": "/legal/privacy.html",
  "/industries/technology/": "/industries/technology.html",
  "/industries/fintech-payments/": "/industries/bfsi.html",
  "/industries/bfsi/": "/industries/bfsi.html",
  "/industries/islamic-finance/": "/industries/bfsi.html",
  "/industries/insurtech/": "/industries/bfsi.html",
  "/industries/cpg-fmcg-retail/": "/industries/cpg-fmcg-retail.html",
  "/industries/health-supplements/": "/industries/cpg-fmcg-retail.html",
  "/industries/hospitality-tourism/": "/industries/cpg-fmcg-retail.html",
  "/industries/ecommerce-tech/": "/industries/cpg-fmcg-retail.html",
  "/industries/healthtech/": "/industries/healthcare-and-life-sciences.html",
  "/industries/healthcare-life-sciences/": "/industries/healthcare-and-life-sciences.html",
  "/industries/pharma/": "/industries/healthcare-and-life-sciences.html",
  "/industries/renewable-energy/": "/industries/energy-and-chemicals.html",
  "/industries/carbon-markets/": "/industries/energy-and-chemicals.html",
  "/industries/energy-storage/": "/industries/energy-and-chemicals.html",
  "/industries/proptech/": "/industries/real-estate-and-infrastructure.html",
  "/industries/enterprise-saas/": "/industries/technology.html",
  "/industries/satellite-connectivity/": "/industries/technology.html",
  "/industries/manufacturing-industrials/": "/industries/industrials-manufacturing-and-infrastructure.html",
  "/industries/logistics-supply-chain/": "/industries/industrials-manufacturing-and-infrastructure.html",
  "/industries/electric-vehicles/": "/industries/industrials-manufacturing-and-infrastructure.html",
  "/industries/agritech/": "/industries/industrials-manufacturing-and-infrastructure.html",
  "/industries/education-edtech/": "/industries/education-and-edtech.html",
  "/industries/media-entertainment/": "/industries/technology.html",
};

function custom404Plugin(): Plugin {
  return {
    name: "custom-404",
    configureServer(server) {
      // Intercept BEFORE Vite's internal handlers so Vite's index.html
      // fallback never fires for paths that don't map to real files.
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "/";

        // Pass through Vite-internal paths and HMR websocket
        if (
          url.startsWith("/@") ||
          url.startsWith("/node_modules/") ||
          url.startsWith("/__")
        ) {
          return next();
        }

        // Strip query-string / hash
        const pathname = url.split("?")[0].split("#")[0];
        if (legacyAliases[pathname]) {
          res.statusCode = 301;
          res.setHeader("Location", legacyAliases[pathname]);
          res.end();
          return;
        }

        // Candidate file paths to check
        const candidates: string[] = [];
        if (pathname.endsWith("/")) {
          candidates.push(path.join(websiteDir, pathname, "index.html"));
        } else {
          candidates.push(path.join(websiteDir, pathname));
          // also try appending .html when no extension present
          if (!path.extname(pathname)) {
            candidates.push(path.join(websiteDir, pathname + ".html"));
            candidates.push(path.join(websiteDir, pathname, "index.html"));
          }
        }

        const exists = candidates.some(
          (f) => fs.existsSync(f) && fs.statSync(f).isFile()
        );

        if (exists) return next();

        // File genuinely not found — serve 404.html with HTTP 404
        const page404 = path.join(websiteDir, "404.html");
        if (fs.existsSync(page404)) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(fs.readFileSync(page404, "utf-8"));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  base: "/",
  root: websiteDir,
  plugins: [custom404Plugin()],
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
