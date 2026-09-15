import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/crm-store";
import { sendLeadEmails } from "@/lib/email";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name?: string;
    email?: string;
    company?: string;
    process?: string;
    message?: string;
    source?: string;
  };

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email required" },
      { status: 400 },
    );
  }

  const store = await ensureSeeded();
  const now = new Date().toISOString();
  const lead = {
    id: `lead_${crypto.randomUUID().slice(0, 8)}`,
    name: body.name,
    email: body.email,
    company: body.company,
    process: body.process,
    message: body.message,
    source: body.source ?? "website",
    status: "NEW" as const,
    valueCents: 0,
    currency: "EUR",
    createdAt: now,
    updatedAt: now,
  };
  store.leads.unshift(lead);

  await sendLeadEmails({
    name: body.name,
    email: body.email,
    company: body.company,
    outcome: body.process || "Website lead",
    message: body.message || "New website lead",
    kind: "website",
  });

  return NextResponse.json({ lead }, { status: 201 });
}

export async function GET() {
  const store = await ensureSeeded();
  return NextResponse.json({ leads: store.leads });
}
