import { Router, type IRouter } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, diagnosticLeadsTable } from "@workspace/db";

const router: IRouter = Router();

const answersSchema = z.object({
  q1: z.string().min(1),
  q2: z.string().min(1),
  q3_market: z.string().min(1),
  q3_timeline: z.string().min(1),
});

const diagnosticLeadBodySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("A valid email is required"),
  company: z.string().min(1, "Company is required"),
  answers: answersSchema,
});

async function pushToHubSpot(
  lead: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    q1: string;
    q2: string;
    q3Market: string;
    q3Timeline: string;
  },
  log: typeof console,
): Promise<string | null> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    log.warn("HUBSPOT_ACCESS_TOKEN not set — skipping HubSpot push");
    return null;
  }

  try {
    const body = {
      properties: {
        firstname: lead.firstName,
        lastname: lead.lastName,
        email: lead.email,
        company: lead.company,
        hs_lead_status: "NEW",
        // Store diagnostic answers as HubSpot notes-friendly fields
        // using custom properties named after the diagnostic
        gr_diagnostic_q1: lead.q1,
        gr_diagnostic_q2: lead.q2,
        gr_diagnostic_market: lead.q3Market,
        gr_diagnostic_timeline: lead.q3Timeline,
      },
    };

    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (response.status === 409) {
      // Contact already exists — write-only token can't look up by email, skip gracefully
      log.warn({ email: lead.email }, "HubSpot contact already exists — skipping duplicate");
      return null;
    }

    if (!response.ok) {
      const errText = await response.text();
      log.warn({ status: response.status, body: errText }, "HubSpot API error");
      return null;
    }

    const data = (await response.json()) as { id: string };
    return data.id ?? null;
  } catch (err) {
    log.warn({ err }, "HubSpot push failed — continuing without it");
    return null;
  }
}

router.post("/diagnostic-leads", async (req, res) => {
  const parsed = diagnosticLeadBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message);
    res.status(400).json({ ok: false, errors: messages });
    return;
  }

  const { firstName, lastName, email, company, answers } = parsed.data;

  // 1. Save to database (always)
  let dbId: number | undefined;
  try {
    const rows = await db
      .insert(diagnosticLeadsTable)
      .values({
        firstName,
        lastName,
        email,
        company,
        q1: answers.q1,
        q2: answers.q2,
        q3Market: answers.q3_market,
        q3Timeline: answers.q3_timeline,
      })
      .returning({ id: diagnosticLeadsTable.id });
    dbId = rows[0]?.id;
    req.log.info({ email, dbId }, "Diagnostic lead saved to DB");
  } catch (err) {
    req.log.error({ err }, "Failed to save diagnostic lead to DB");
    res.status(500).json({
      ok: false,
      errors: ["Server error — your results are still shown above."],
    });
    return;
  }

  // 2. Push to HubSpot (best-effort, non-blocking)
  const hubspotId = await pushToHubSpot(
    {
      firstName,
      lastName,
      email,
      company,
      q1: answers.q1,
      q2: answers.q2,
      q3Market: answers.q3_market,
      q3Timeline: answers.q3_timeline,
    },
    req.log as unknown as typeof console,
  );

  if (hubspotId && dbId) {
    try {
      await db
        .update(diagnosticLeadsTable)
        .set({ hubspotContactId: hubspotId })
        .where(eq(diagnosticLeadsTable.id, dbId));
    } catch {
      // Non-fatal — we already have the contact in HubSpot
    }
  }

  req.log.info({ email, hubspotId }, "Diagnostic lead processed");
  res.json({ ok: true, hubspotSynced: !!hubspotId });
});

export default router;
