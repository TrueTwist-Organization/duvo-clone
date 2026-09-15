import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Enterprise security, compliance & deployment controls - Duvo",
  description:
    "Use only the access the outcome needs. Controls, approvals, and deployment stay visible from first review.",
};

const ladder = [
  {
    title: "No-access discovery",
    body: "Start from workshops, walkthroughs, interviews, and documents. No system access required to begin.",
  },
  {
    title: "Read-only analysis",
    body: "Deepen the fact base with read-only connections when the outcome needs system evidence.",
  },
  {
    title: "Write-capable automation",
    body: "Governed execution with human approval gates before sensitive write-backs.",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        title="Use only the access the outcome needs."
        description="Start with the level of access the outcome actually needs. Controls, approvals, and deployment stay visible from first review."
        ctas={[
          { href: "/trust-center", label: "Open trust center", primary: true },
          { href: "/contact", label: "Talk to security" },
        ]}
      />
      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Access ladder</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
              Escalate access only when the outcome requires it.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ladder.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.05}>
                <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                  <p className="font-mono text-sm text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 rounded-3xl border border-[var(--line)] bg-[var(--bg-soft)] p-6 md:p-8">
            <h3 className="text-lg font-semibold">Compliance & deployment</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              SOC 2 Type II, ISO 27001, ISO 42001, and GDPR aligned. EU/US data
              routing, BYOA options, SIEM/audit export, and premium SLAs for
              enterprise programmes.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
