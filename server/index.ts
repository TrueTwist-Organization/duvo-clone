import "dotenv/config";
import cors from "cors";
import express from "express";
import { z } from "zod";
import type { PrismaClient } from "../src/generated/prisma/client";

type LeadRecord = {
  id: string;
  name: string;
  email: string;
  company?: string;
  process?: string;
  message?: string;
  createdAt: string;
};

type ContactRecord = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  body: string;
  createdAt: string;
};

const memoryLeads: LeadRecord[] = [];
const memoryContacts: ContactRecord[] = [];

let prisma: PrismaClient | null = null;
let dbMode: "postgres" | "memory" = "memory";

async function initDb() {
  try {
    const mod = await import("../src/lib/prisma");
    prisma = mod.prisma;
    await prisma.lead.findMany({ take: 1 });
    dbMode = "postgres";
    console.log("Connected to PostgreSQL");
  } catch (error) {
    dbMode = "memory";
    prisma = null;
    console.warn(
      "PostgreSQL unavailable — using in-memory store. Start Docker Postgres and run `npm run db:push`.",
    );
    console.warn(String(error));
  }
}

const app = express();
const port = Number(process.env.PORT ?? 4000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000";

app.use(
  cors({
    origin: corsOrigin,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "duvo-api", db: dbMode });
});

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(160).optional(),
  process: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
});

app.post("/api/leads", async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid payload",
      details: parsed.error.flatten(),
    });
    return;
  }

  try {
    if (prisma && dbMode === "postgres") {
      const lead = await prisma.lead.create({ data: parsed.data });
      res.status(201).json({
        id: lead.id,
        createdAt: lead.createdAt,
        storage: "postgres",
      });
      return;
    }

    const lead: LeadRecord = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };
    memoryLeads.unshift(lead);
    res.status(201).json({
      id: lead.id,
      createdAt: lead.createdAt,
      storage: "memory",
    });
  } catch (error) {
    console.error("Lead create failed:", error);
    res.status(500).json({ error: "Could not save lead" });
  }
});

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional(),
  body: z.string().min(5).max(4000),
});

app.post("/api/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid payload",
      details: parsed.error.flatten(),
    });
    return;
  }

  try {
    if (prisma && dbMode === "postgres") {
      const message = await prisma.contactMessage.create({
        data: parsed.data,
      });
      res.status(201).json({
        id: message.id,
        createdAt: message.createdAt,
        storage: "postgres",
      });
      return;
    }

    const message: ContactRecord = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };
    memoryContacts.unshift(message);
    res.status(201).json({
      id: message.id,
      createdAt: message.createdAt,
      storage: "memory",
    });
  } catch (error) {
    console.error("Contact create failed:", error);
    res.status(500).json({ error: "Could not save message" });
  }
});

app.get("/api/leads", async (_req, res) => {
  try {
    if (prisma && dbMode === "postgres") {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      res.json({ leads, storage: "postgres" });
      return;
    }
    res.json({ leads: memoryLeads.slice(0, 50), storage: "memory" });
  } catch (error) {
    console.error("Lead list failed:", error);
    res.status(500).json({ error: "Could not list leads" });
  }
});

async function main() {
  await initDb();
  app.listen(port, () => {
    console.log(`Duvo API listening on http://localhost:${port} (${dbMode})`);
  });
}

main();
