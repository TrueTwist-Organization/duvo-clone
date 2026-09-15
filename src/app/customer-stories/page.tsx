import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";
import { CustomerStoriesClient } from "./stories-client";

export const metadata = {
  title: "Customer stories: measurable production outcomes - Duvo",
  description:
    "Published results from approved processes running in production.",
};

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        title="Customer stories."
        description="Published results from approved processes running in production. For process-discovery and transformation evidence, see the full proof library."
        ctas={[
          { href: "/proof", label: "See proof library", primary: true },
          { href: "/contact", label: "Start with one process" },
        ]}
      />
      <CustomerStoriesClient />
    </PageShell>
  );
}
