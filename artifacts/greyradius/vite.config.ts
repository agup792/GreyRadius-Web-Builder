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
