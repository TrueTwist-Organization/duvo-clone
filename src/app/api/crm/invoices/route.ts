import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/crm-store";

export async function GET() {
  const store = await ensureSeeded();
  return NextResponse.json({ invoices: store.invoices });
}
