import { OutcomePage } from "@/components/OutcomePage";
import { sapMigration } from "@/content/outcomes";

export const metadata = {
  title: "SAP migration and clean-core process readiness - Duvo",
  description: sapMigration.description,
};

export default function Page() {
  return <OutcomePage content={sapMigration} />;
}
