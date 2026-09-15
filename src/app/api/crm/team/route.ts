import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/crm-store";

export async function GET() {
  const store = await ensureSeeded();
  const users = store.users.map(
    ({ id, email, name, role, active, createdAt }) => ({
      id,
      email,
      name,
      role,
      active,
      createdAt,
    }),
  );
  return NextResponse.json({ users });
}
