import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/crm-store";

export async function GET() {
  const store = await ensureSeeded();
  return NextResponse.json({
    mode: process.env.RESEND_API_KEY?.trim() ? "resend" : "mock",
    emails: store.emails,
  });
}
