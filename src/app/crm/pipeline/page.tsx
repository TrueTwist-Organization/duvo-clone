import { redirect } from "next/navigation";
import { getSession } from "@/lib/crm-auth";
import { ensureSeeded } from "@/lib/crm-store";
import { CrmPipelineClient } from "./pipeline-client";

export default async function CrmPipelinePage() {
  await ensureSeeded();
  const session = await getSession();
  if (!session) redirect("/crm/login");

  return <CrmPipelineClient user={session} />;
}
