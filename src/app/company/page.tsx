import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Company & careers: built inside live operations - Duvo",
  description:
    "We ran the operation first. Useful outcomes start with shared understanding of how work really happens.",
};

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Origin"
        title="We ran the operation first."
        description="Built and ran a retail operation before building software. Useful outcomes start with shared understanding of how work really happens."
        ctas={[
          { href: "/culture", label: "Read culture", primary: true },
          { href: "/contact", label: "Get in touch" },
        ]}
      />
      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["85,000", "products"],
              ["1,700", "suppliers"],
              ["14", "warehouses"],
              ["$1.5B", "retailer scale"],
            ].map(([metric, label], i) => (
              <FadeIn key={label} direction="up" delay={i * 0.05}>
                <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                  <p className="text-3xl font-medium tracking-tight">{metric}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 max-w-3xl space-y-4 text-[var(--muted)]">
            <p>
              ~40 people. $16M raised (Index Ventures, Dec 2025). Live with
              multi-billion-euro retailers and ~€10M+ measured impact.
            </p>
            <p>
              Founders: Tomáš Čupr (CEO) and Marek Paris (CPTO). Open roles span
              AI Platform, Forward Deployed Engineering, SRE, and Design
              Engineering.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
