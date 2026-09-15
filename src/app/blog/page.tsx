import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";
import { BlogClient } from "./blog-client";

export const metadata = {
  title: "Operational intelligence, process transformation, and AI - Duvo",
  description:
    "Product notes, practical guides, and operating lessons from turning real process knowledge into useful outcomes.",
};

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        title="Blog."
        description="Product notes, practical guides, and operating lessons from turning real process knowledge into useful outcomes."
        ctas={[{ href: "/contact", label: "Talk to Duvo", primary: true }]}
      />
      <BlogClient />
    </PageShell>
  );
}
