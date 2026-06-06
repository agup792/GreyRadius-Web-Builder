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
      server.middlewares.use((req, res, next) => {
        next();
      });
      return () => {
        server.middlewares.use((req, res, next) => {
          if (res.statusCode === 404) {
            const page404 = path.join(websiteDir, "404.html");
            if (fs.existsSync(page404)) {
              res.statusCode = 404;
              res.setHeader("Content-Type", "text/html; charset=utf-8");
              res.end(fs.readFileSync(page404, "utf-8"));
              return;
            }
          }
          next();
        });
      };
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
