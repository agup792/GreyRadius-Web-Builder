import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env["NODE_ENV"] !== "production") {
  app.use((_req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    next();
  });
}

app.use("/api", router);

const websiteDir = path.resolve(process.cwd(), "../../greyradius-website");
app.use(express.static(websiteDir));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(websiteDir, "index.html"));
});

export default app;
