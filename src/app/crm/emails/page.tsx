import { redirect } from "next/navigation";
import { getSession } from "@/lib/crm-auth";
import { ensureSeeded } from "@/lib/crm-store";
import { CrmEmailsClient } from "./emails-client";

export default async function CrmEmailsPage() {
  await ensureSeeded();
  const session = await getSession();
  if (!session) redirect("/crm/login");

  return <CrmEmailsClient user={session} />;
}
