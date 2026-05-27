import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const diagnosticLeadsTable = pgTable("diagnostic_leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  q1: text("q1").notNull(),
  q2: text("q2").notNull(),
  q3Market: text("q3_market").notNull(),
  q3Timeline: text("q3_timeline").notNull(),
  hubspotContactId: text("hubspot_contact_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDiagnosticLeadSchema = createInsertSchema(
  diagnosticLeadsTable,
).omit({ id: true, createdAt: true, hubspotContactId: true });

export type InsertDiagnosticLead = z.infer<typeof insertDiagnosticLeadSchema>;
export type DiagnosticLead = typeof diagnosticLeadsTable.$inferSelect;
