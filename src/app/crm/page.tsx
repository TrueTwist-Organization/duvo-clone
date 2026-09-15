import { redirect } from "next/navigation";
import { getSession } from "@/lib/crm-auth";
import { ensureSeeded } from "@/lib/crm-store";
import { CrmShell } from "@/components/crm/CrmShell";

export default async function CrmHome() {
  await ensureSeeded();
  const session = await getSession();
  if (!session) redirect("/crm/login");

  return (
    <CrmShell user={session}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome, {session.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          Role: {session.role}. Use the sidebar for leads, pipeline, invoices,
          and payments. Website forms feed into CRM leads automatically.
        </p>
      </div>
    </CrmShell>
  );
}
