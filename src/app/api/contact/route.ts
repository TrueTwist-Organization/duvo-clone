import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/crm-store";
import { sendLeadEmails } from "@/lib/email";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
    outcome?: string;
    bookingDate?: string;
    bookingTime?: string;
    durationMins?: number;
    timezone?: string;
    guests?: string[];
  };

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim();
  const outcome = body.outcome?.trim() || "General inquiry";
  const message =
    body.message?.trim() ||
    `Interested in: ${outcome}${company ? ` · ${company}` : ""}`;

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Please enter your full name (at least 2 characters)." },
      { status: 400 },
    );
  }
  if (!email.includes("@")) {
    return NextResponse.json(
      { error: "Please enter a valid work email." },
      { status: 400 },
    );
  }

  const store = await ensureSeeded();
  const now = new Date().toISOString();
  const isBooking =
    /booked \d+ min demo/i.test(message) || Boolean(body.bookingDate);
  const lead = {
    id: `lead_${crypto.randomUUID().slice(0, 8)}`,
    name,
    email,
    company,
    process: outcome,
    message,
    source: isBooking ? "booking" : "contact",
    status: "NEW" as const,
    valueCents: 0,
    currency: "EUR",
    createdAt: now,
    updatedAt: now,
  };
  store.leads.unshift(lead);
  store.activities.unshift({
    id: `act_${crypto.randomUUID().slice(0, 8)}`,
    leadId: lead.id,
    type: "created",
    note: isBooking
      ? "Demo booked — customer confirmation emailed"
      : "Lead captured — confirmation emailed",
    createdAt: now,
  });

  const mail = await sendLeadEmails({
    name,
    email,
    company,
    outcome,
    message,
    kind: isBooking ? "booking" : "contact",
    bookingDate: body.bookingDate,
    bookingTime: body.bookingTime,
    durationMins: body.durationMins,
    timezone: body.timezone,
    guests: body.guests,
  });

  const viaGmail = Boolean(process.env.GMAIL_APP_PASSWORD?.trim());

  return NextResponse.json(
    {
      ok: true,
      leadId: lead.id,
      emailMode: viaGmail
        ? "gmail"
        : process.env.RESEND_API_KEY?.trim()
          ? "resend"
          : "mock",
      autoReplyOk: mail.autoReplyOk,
      notifiedSales: mail.notifiedSales,
      customerEmail: mail.customerEmail,
      fromEmail: mail.fromEmail,
      deliveredTo: mail.deliveredTo,
      guestInvitesSent: mail.guestInvitesSent,
      guestInvitesRequested: mail.guestInvitesRequested,
      guestInviteResults: mail.guestInviteResults,
    },
    { status: 201 },
  );
}
