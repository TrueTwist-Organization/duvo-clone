import { redirect } from "next/navigation";
import { getSession } from "@/lib/crm-auth";
import { ensureSeeded } from "@/lib/crm-store";
import { CrmInvoicesClient } from "./invoices-client";

export default async function CrmInvoicesPage() {
  await ensureSeeded();
  const session = await getSession();
  if (!session) redirect("/crm/login");

  return <CrmInvoicesClient user={session} />;
}
