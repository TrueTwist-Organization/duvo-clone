import { redirect } from "next/navigation";
import { getSession } from "@/lib/crm-auth";
import { ensureSeeded } from "@/lib/crm-store";
import { CrmLeadsClient } from "./leads-client";

export default async function CrmLeadsPage() {
  await ensureSeeded();
  const session = await getSession();
  if (!session) redirect("/crm/login");

  return <CrmLeadsClient user={session} />;
}
