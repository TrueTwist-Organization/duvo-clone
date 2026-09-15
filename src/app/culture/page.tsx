import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Duvo Culture",
  description:
    "The bar for everyone at Duvo: high agency, outcomes obsession, and how we work.",
};

const values = [
  "Own it",
  "Obsess over the customer",
  "Grow and compound",
  "Prove, don't argue",
  "Say it straight, now",
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        title="Duvo Culture"
        description="The bar for everyone at Duvo. Managers also read the Manager Playbook. We hire senior people into an early-stage company that handles critical customer work."
        ctas={[
          { href: "/managers", label: "Manager Playbook", primary: true },
          { href: "/company", label: "Company" },
        ]}
      />
      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">The bar</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight">
              Builds from zero. High agency. Obsess over outcomes. Pro-AI.
              Chooses Duvo deliberately.
            </h2>
          </FadeIn>
          <div className="mt-10 flex flex-wrap gap-3">
            {values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold"
              >
                {value}
              </span>
            ))}
          </div>
          <p className="mt-10 text-sm text-[var(--muted)]">
            Work scores: customer outcomes, focus, dependable delivery, role
            craft, team multiplier.{" "}
            <Link href="/managers" className="font-semibold text-[var(--fg)]">
              Read the Manager Playbook →
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
