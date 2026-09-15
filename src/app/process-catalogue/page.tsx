import { OutcomePage } from "@/components/OutcomePage";
import { processCatalogue } from "@/content/outcomes";

export const metadata = {
  title: "Process catalogue grounded in how work really runs - Duvo",
  description: processCatalogue.description,
};

export default function Page() {
  return <OutcomePage content={processCatalogue} />;
}
