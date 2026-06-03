import { Router, type IRouter } from "express";
import { z } from "zod";
import { db, newsletterSubscriptionsTable } from "@workspace/db";

const router: IRouter = Router();

const newsletterBodySchema = z.object({
  email: z.string().email("A valid email is required"),
  topic: z.string().optional(),
});

router.post("/newsletter-subscribe", async (req, res) => {
  const parsed = newsletterBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message);
    res.status(400).json({ ok: false, errors: messages });
    return;
  }

  const { email, topic } = parsed.data;

  try {
    await db.insert(newsletterSubscriptionsTable).values({ email, topic: topic ?? null });
    req.log.info({ email, topic }, "Newsletter subscription saved");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to save newsletter subscription");
    res.status(500).json({ ok: false, errors: ["Server error — please try again."] });
  }
});

export default router;
