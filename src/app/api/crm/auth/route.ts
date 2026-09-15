import { NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
  verifyPassword,
} from "@/lib/crm-auth";
import { ensureSeeded } from "@/lib/crm-store";

export async function GET() {
  await ensureSeeded();
  const session = await getSession();
  return NextResponse.json({ user: session });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 },
    );
  }
  const store = await ensureSeeded();
  const user = store.users.find(
    (u) => u.email.toLowerCase() === email && u.active,
  );
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const session = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  await setSessionCookie(await createSessionToken(session));
  return NextResponse.json({ user: session });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
