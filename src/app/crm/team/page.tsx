import { redirect } from "next/navigation";
import { getSession } from "@/lib/crm-auth";
import { ensureSeeded } from "@/lib/crm-store";
import { CrmTeamClient } from "./team-client";

export default async function CrmTeamPage() {
  await ensureSeeded();
  const session = await getSession();
  if (!session) redirect("/crm/login");

  return <CrmTeamClient user={session} />;
}
