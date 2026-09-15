import { OutcomePage } from "@/components/OutcomePage";
import { transformationRoadmap } from "@/content/outcomes";

export const metadata = {
  title: "Transformation roadmap grounded in process evidence - Duvo",
  description: transformationRoadmap.description,
};

export default function Page() {
  return <OutcomePage content={transformationRoadmap} />;
}
