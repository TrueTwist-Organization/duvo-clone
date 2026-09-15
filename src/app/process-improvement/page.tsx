import { OutcomePage } from "@/components/OutcomePage";
import { processImprovement } from "@/content/outcomes";

export const metadata = {
  title: "Process improvement grounded in real work - Duvo",
  description: processImprovement.description,
};

export default function Page() {
  return <OutcomePage content={processImprovement} />;
}
