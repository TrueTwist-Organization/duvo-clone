import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/HowItWorksPage";

export const metadata: Metadata = {
  title: "How Duvo works: a living view of how work runs",
  description:
    "Duvo’s AI notetaker joins workshops, while Duvo agents guide walkthroughs, interview the people doing the work, and analyse existing evidence.",
};

export default function Page() {
  return <HowItWorksPage />;
}
