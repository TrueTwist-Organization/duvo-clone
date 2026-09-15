import nodemailer from "nodemailer";
import { Resend } from "resend";
import { ensureSeeded } from "./crm-store";

export type MailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  tag?: string;
};

function ownerEmail() {
  return (
    process.env.GMAIL_USER?.trim() ||
    process.env.EMAIL_TO?.trim() ||
    "vani23789a@gmail.com"
  );
}

function fromAddress() {
  const owner = ownerEmail();
  if (process.env.GMAIL_APP_PASSWORD?.trim()) {
    return `Duvo <${owner}>`;
  }
  return (
    process.env.EMAIL_FROM?.trim() || "Duvo Demo <onboarding@resend.dev>"
  );
}

function meetLink() {
  return process.env.MEET_LINK?.trim() || "https://meet.google.com/new";
}

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

function calendarLink(input: {
  title: string;
  details: string;
  startLocal?: string;
  endLocal?: string;
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    details: input.details,
    location: meetLink(),
  });
  if (input.startLocal && input.endLocal) {
    params.set("dates", `${input.startLocal}/${input.endLocal}`);
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toCalendarStamp(dateIso: string, timeHHmm: string) {
  const [y, m, d] = dateIso.split("-");
  const [hh, mm] = timeHHmm.split(":");
  if (!y || !m || !d || !hh || !mm) return undefined;
  return `${y}${m}${d}T${hh}${mm}00`;
}

function addMinutesStamp(stamp: string, minutes: number) {
  const y = Number(stamp.slice(0, 4));
  const mo = Number(stamp.slice(4, 6)) - 1;
  const d = Number(stamp.slice(6, 8));
  const h = Number(stamp.slice(9, 11));
  const mi = Number(stamp.slice(11, 13));
  const dt = new Date(y, mo, d, h, mi);
  dt.setMinutes(dt.getMinutes() + minutes);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
}

function hasGmailSmtp() {
  return Boolean(process.env.GMAIL_APP_PASSWORD?.trim());
}

type EmailRow = { label: string; value: string; isHtml?: boolean };

function formatBookingDate(dateIso: string) {
  const [y, m, d] = dateIso.split("-").map(Number);
  if (!y || !m || !d) return dateIso;
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatBookingTime(timeHHmm: string) {
  const [h, mi] = timeHHmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(mi)) return timeHHmm;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(mi).padStart(2, "0")} ${period}`;
}

function detailTable(rows: EmailRow[]) {
  const visible = rows.filter((row) => row.value.trim().length > 0);
  if (visible.length === 0) return "";
  return `
    <table role="presentation" style="width:100%;border-collapse:collapse;margin:20px 0;background:#fafafa;border:1px solid #ececf0;border-radius:12px;overflow:hidden">
      <tbody>
        ${visible
          .map(
            (row) => `
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #ececf0;color:#6b6d7a;width:130px;vertical-align:top;font-size:13px;font-weight:600">${escapeHtml(row.label)}</td>
            <td style="padding:12px 16px;border-bottom:1px solid #ececf0;color:#121217;font-size:14px;vertical-align:top">${row.isHtml ? row.value : escapeHtml(row.value)}</td>
          </tr>`,
          )
          .join("")}
      </tbody>
    </table>`;
}

function actionButtons(meet: string, cal: string) {
  return `
    <div style="margin:24px 0 8px">
      <a href="${escapeHtml(meet)}" style="display:inline-block;background:#ffdd04;color:#121217;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:999px;margin-right:10px;margin-bottom:10px">Join Google Meet</a>
      <a href="${escapeHtml(cal)}" style="display:inline-block;background:#121217;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:999px;margin-bottom:10px">Add to Calendar</a>
    </div>
    <p style="margin:8px 0 0;font-size:13px;color:#6b6d7a;word-break:break-all">Meet link: <a href="${escapeHtml(meet)}" style="color:#121217">${escapeHtml(meet)}</a></p>`;
}

function emailLayout(input: {
  title: string;
  intro: string;
  rows: EmailRow[];
  actions?: string;
  footer: string;
}) {
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#121217;max-width:600px;margin:0 auto;background:#ffffff">
      <div style="padding:24px 24px 8px;border-bottom:3px solid #ffdd04">
        <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b6d7a">Duvo</p>
        <h1 style="margin:0;font-size:22px;font-weight:700;line-height:1.3">${escapeHtml(input.title)}</h1>
      </div>
      <div style="padding:8px 24px 24px">
        <p style="margin:16px 0 0;font-size:15px;color:#3a3b45">${input.intro}</p>
        ${detailTable(input.rows)}
        ${input.actions ?? ""}
        <p style="margin-top:28px;padding-top:16px;border-top:1px solid #ececf0;font-size:12px;color:#6b6d7a">${input.footer}</p>
      </div>
    </div>`;
}

function buildBookingRows(input: {
  name: string;
  email: string;
  company?: string;
  outcome: string;
  bookingDate?: string;
  bookingTime?: string;
  durationMins: number;
  timezone?: string;
  guests?: string[];
  meet: string;
  invitedBy?: string;
}) {
  const rows: EmailRow[] = [
    { label: "Meeting", value: `Duvo demo — ${input.outcome}` },
    { label: "Topic", value: input.outcome },
  ];
  if (input.bookingDate) {
    rows.push({ label: "Date", value: formatBookingDate(input.bookingDate) });
  }
  if (input.bookingTime) {
    rows.push({ label: "Time", value: formatBookingTime(input.bookingTime) });
  }
  rows.push({
    label: "Duration",
    value: `${input.durationMins} minutes`,
  });
  if (input.timezone) {
    rows.push({ label: "Timezone", value: input.timezone });
  }
  rows.push({ label: "Platform", value: "Google Meet (video call)" });
  rows.push({
    label: "Meet link",
    value: `<a href="${escapeHtml(input.meet)}" style="color:#121217;font-weight:600">${escapeHtml(input.meet)}</a>`,
    isHtml: true,
  });
  if (input.invitedBy) {
    rows.push({ label: "Organiser", value: input.invitedBy });
  }
  rows.push({ label: "Attendee", value: `${input.name} <${input.email}>` });
  if (input.company) {
    rows.push({ label: "Company", value: input.company });
  }
  if (input.guests && input.guests.length > 0) {
    rows.push({ label: "Guests", value: input.guests.join(", ") });
  }
  return rows;
}

function buildContactRows(input: {
  name: string;
  email: string;
  company?: string;
  outcome: string;
  message: string;
}) {
  return [
    { label: "Name", value: input.name },
    { label: "Email", value: input.email },
    ...(input.company ? [{ label: "Company", value: input.company }] : []),
    { label: "Interest", value: input.outcome },
    { label: "Message", value: input.message },
  ];
}

export async function sendMail(payload: MailPayload) {
  const to = Array.isArray(payload.to) ? payload.to : [payload.to];
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.trim();
  const gmailUser = ownerEmail();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const store = await ensureSeeded();
  const now = new Date().toISOString();

  const record = {
    id: `mail_${crypto.randomUUID().slice(0, 8)}`,
    to,
    from: fromAddress(),
    subject: payload.subject,
    html: payload.html,
    replyTo: payload.replyTo,
    tag: payload.tag ?? "general",
    mode: (gmailPass ? "gmail" : resendKey ? "resend" : "mock") as
      | "gmail"
      | "resend"
      | "mock",
    status: "queued" as "queued" | "sent" | "failed",
    error: undefined as string | undefined,
    createdAt: now,
  };

  if (gmailPass) {
    try {
      const pass = gmailPass.replace(/\s+/g, "");
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: gmailUser, pass },
      });
      await transporter.sendMail({
        from: fromAddress(),
        to: to.join(", "),
        subject: payload.subject,
        html: payload.html,
        replyTo: payload.replyTo || gmailUser,
      });
      record.status = "sent";
      store.emails.unshift(record);
      return { ok: true as const, mode: "gmail" as const, id: record.id };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gmail send failed";
      record.status = "failed";
      record.error = message;
      store.emails.unshift(record);
      console.error("[email:gmail]", err);
      return { ok: false as const, mode: "gmail" as const, error: message };
    }
  }

  if (!resendKey) {
    record.status = "sent";
    store.emails.unshift(record);
    console.info(`[email:mock] → ${to.join(", ")} | ${payload.subject}`);
    return { ok: true as const, mode: "mock" as const, id: record.id };
  }

  try {
    const resend = new Resend(resendKey);
    const result = await resend.emails.send({
      from: fromAddress(),
      to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo || gmailUser,
    });
    if (result.error) {
      record.status = "failed";
      record.error = result.error.message;
      store.emails.unshift(record);
      console.error("[email:resend]", result.error);
      return {
        ok: false as const,
        mode: "resend" as const,
        error: result.error.message,
      };
    }
    record.status = "sent";
    store.emails.unshift(record);
    return {
      ok: true as const,
      mode: "resend" as const,
      id: result.data?.id ?? record.id,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Send failed";
    record.status = "failed";
    record.error = message;
    store.emails.unshift(record);
    console.error("[email:resend]", err);
    return { ok: false as const, mode: "resend" as const, error: message };
  }
}

/**
 * Without Gmail App Password, Resend can only deliver to ownerEmail().
 * So we always send a full confirmation + Meet link to vani23789a@gmail.com.
 * If Gmail SMTP is configured, we ALSO send the same mail to the customer.
 */
export async function sendLeadEmails(input: {
  name: string;
  email: string;
  company?: string;
  outcome: string;
  message: string;
  kind: "contact" | "booking" | "website";
  bookingDate?: string;
  bookingTime?: string;
  durationMins?: number;
  timezone?: string;
  guests?: string[];
}): Promise<{
  autoReplyOk: boolean;
  notifiedSales: boolean;
  customerEmail: string;
  fromEmail: string;
  deliveredTo: string;
  guestInvitesSent: number;
  guestInvitesRequested: number;
  guestInviteResults: { email: string; sent: boolean; reason?: string }[];
}> {
  const owner = ownerEmail();
  const meet = meetLink();
  const duration = input.durationMins ?? 30;
  const canEmailAnyone = hasGmailSmtp();

  let startStamp: string | undefined;
  let endStamp: string | undefined;
  if (input.bookingDate && input.bookingTime) {
    startStamp = toCalendarStamp(input.bookingDate, input.bookingTime);
    if (startStamp) endStamp = addMinutesStamp(startStamp, duration);
  }

  const cal = calendarLink({
    title: `Duvo demo — ${input.outcome}`,
    details: [
      `Meeting with ${input.name} (${input.email})`,
      input.company ? `Company: ${input.company}` : "",
      input.bookingDate && input.bookingTime
        ? `When: ${formatBookingDate(input.bookingDate)} at ${formatBookingTime(input.bookingTime)}`
        : "",
      input.timezone ? `Timezone: ${input.timezone}` : "",
      `Duration: ${duration} minutes`,
      input.guests?.length ? `Guests: ${input.guests.join(", ")}` : "",
      `Google Meet: ${meet}`,
      siteUrl(),
    ]
      .filter(Boolean)
      .join("\n"),
    startLocal: startStamp,
    endLocal: endStamp,
  });

  const isBooking = input.kind === "booking";
  const guestList = (input.guests ?? [])
    .map((g) => g.trim().toLowerCase())
    .filter((g) => g.includes("@"));
  const bookingRows = buildBookingRows({
    name: input.name,
    email: input.email,
    company: input.company,
    outcome: input.outcome,
    bookingDate: input.bookingDate,
    bookingTime: input.bookingTime,
    durationMins: duration,
    timezone: input.timezone,
    guests: guestList,
    meet,
  });
  const bookingActions = actionButtons(meet, cal);

  const ownerHtml = isBooking
    ? emailLayout({
        title: "New demo booking",
        intro: `A new demo has been confirmed. All meeting details are below.`,
        rows: bookingRows,
        actions: bookingActions,
        footer: `Sales notification · Reply to ${escapeHtml(input.email)} · Sent from ${escapeHtml(owner)}`,
      })
    : emailLayout({
        title: "New contact message",
        intro: `Someone submitted the contact form on your website.`,
        rows: buildContactRows({
          name: input.name,
          email: input.email,
          company: input.company,
          outcome: input.outcome,
          message: input.message,
        }),
        footer: `Sales notification · Reply to ${escapeHtml(input.email)} · Sent from ${escapeHtml(owner)}`,
      });

  const customerHtml = isBooking
    ? emailLayout({
        title: "Your demo is confirmed",
        intro: `Hi ${escapeHtml(input.name)}, thanks for booking a conversation with Duvo. Here is everything you need for your meeting.`,
        rows: bookingRows,
        actions: bookingActions,
        footer: `Need to reschedule? Reply to this email. · From ${escapeHtml(owner)}`,
      })
    : emailLayout({
        title: "We received your message",
        intro: `Hi ${escapeHtml(input.name)}, thanks for reaching out to Duvo. Our team will get back to you shortly.`,
        rows: buildContactRows({
          name: input.name,
          email: input.email,
          company: input.company,
          outcome: input.outcome,
          message: input.message,
        }),
        footer: `From ${escapeHtml(owner)}`,
      });

  const guestHtml = (guestEmail: string) =>
    emailLayout({
      title: "You're invited to a Duvo demo",
      intro: `${escapeHtml(input.name)} invited you to join their Duvo demo. Save the details below and use the Meet link at the scheduled time.`,
      rows: buildBookingRows({
        name: input.name,
        email: input.email,
        company: input.company,
        outcome: input.outcome,
        bookingDate: input.bookingDate,
        bookingTime: input.bookingTime,
        durationMins: duration,
        timezone: input.timezone,
        guests: guestList,
        meet,
        invitedBy: `${input.name} (${input.email})`,
      }),
      actions: bookingActions,
      footer: `You were invited as ${escapeHtml(guestEmail)} · From ${escapeHtml(owner)}`,
    });

  // Always deliver here (works with free Resend today)
  const toOwner = await sendMail({
    to: owner,
    subject: isBooking
      ? `[Duvo] Demo booked — ${input.name} · ${input.bookingDate ? formatBookingDate(input.bookingDate) : "TBC"}`
      : `[Duvo] New message — ${input.name}`,
    replyTo: input.email,
    tag: `${input.kind}-confirm`,
    html: ownerHtml,
  });

  // Also email the customer when Gmail SMTP is available
  let toCustomerOk = false;
  if (canEmailAnyone) {
    const customer = await sendMail({
      to: input.email,
      subject: isBooking
        ? `Confirmed: Duvo demo on ${input.bookingDate ? formatBookingDate(input.bookingDate) : "your selected date"}`
        : "We got your message — Duvo",
      replyTo: owner,
      tag: `${input.kind}-customer`,
      html: customerHtml,
    });
    toCustomerOk = customer.ok;
  }

  const guestEmails = [...new Set(guestList)];
  const guestInviteResults: {
    email: string;
    sent: boolean;
    reason?: string;
  }[] = [];

  for (const guestEmail of guestEmails) {
    if (guestEmail === input.email.trim().toLowerCase()) {
      guestInviteResults.push({
        email: guestEmail,
        sent: false,
        reason: "same as your email — you already got confirmation",
      });
      continue;
    }
    if (guestEmail === owner.trim().toLowerCase()) {
      guestInviteResults.push({
        email: guestEmail,
        sent: false,
        reason: "organiser inbox — notification already sent",
      });
      continue;
    }
    if (!canEmailAnyone) {
      guestInviteResults.push({
        email: guestEmail,
        sent: false,
        reason: "Gmail SMTP not configured",
      });
      continue;
    }
    if (!isBooking) {
      guestInviteResults.push({
        email: guestEmail,
        sent: false,
        reason: "guest invites only for bookings",
      });
      continue;
    }

    const result = await sendMail({
      to: guestEmail,
      subject: `Invitation: Duvo demo with ${input.name} · ${input.bookingDate ? formatBookingDate(input.bookingDate) : ""}`.trim(),
      replyTo: owner,
      tag: "booking-guest",
      html: guestHtml(guestEmail),
    });
    guestInviteResults.push({
      email: guestEmail,
      sent: result.ok,
      reason: result.ok ? undefined : result.error ?? "send failed",
    });
  }

  const guestInvitesSent = guestInviteResults.filter((g) => g.sent).length;
  const guestInvitesRequested = guestEmails.length;

  const same =
    input.email.trim().toLowerCase() === owner.trim().toLowerCase();

  const deliveredParts = [owner];
  if (canEmailAnyone && !same) deliveredParts.push(input.email);
  if (guestInvitesSent > 0) {
    deliveredParts.push(
      `${guestInvitesSent} guest${guestInvitesSent === 1 ? "" : "s"}`,
    );
  }

  return {
    autoReplyOk: toOwner.ok || toCustomerOk || guestInvitesSent > 0,
    notifiedSales: toOwner.ok,
    customerEmail: canEmailAnyone ? input.email : owner,
    fromEmail: owner,
    deliveredTo: deliveredParts.join(" + "),
    guestInvitesSent,
    guestInvitesRequested,
    guestInviteResults,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
