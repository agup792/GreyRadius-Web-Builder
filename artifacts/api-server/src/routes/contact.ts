import { Router, type IRouter } from "express";
import { z } from "zod";
import { db, contactSubmissionsTable } from "@workspace/db";

const router: IRouter = Router();

const contactBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  geography: z.string().optional(),
  question: z.string().min(1, "Please describe what you are exploring"),
  offering: z.string().optional(),
});

router.post("/contact", async (req, res) => {
  const parsed = contactBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message);
    res.status(400).json({ ok: false, errors: messages });
    return;
  }

  const data = parsed.data;

  try {
    await db.insert(contactSubmissionsTable).values({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company,
      geography: data.geography ?? null,
      question: data.question,
      offering: data.offering ?? null,
    });

    req.log.info({ email: data.email }, "Contact form submission saved");
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ ok: false, errors: ["Server error — please try again or email us directly."] });
  }
});

export default router;
