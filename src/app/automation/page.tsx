import { AutomationCarousel } from "@/components/AutomationCarousel";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Reliable automation from an approved process record - Duvo",
  description:
    "Run the approved process with its context intact across SAP, portals, files, approvals, APIs, browsers, and desktops.",
};

const pillars = [
  {
    title: "Start from agreed process",
    body: "Automation begins with reviewed steps, decisions, exceptions, and controls — not a blank canvas.",
  },
  {
    title: "Browser + connections + desktop",
    body: "Agents work across 75+ connections, browser UIs, and legacy desktop paths when APIs are incomplete.",
  },
  {
    title: "Human approval where risk requires it",
    body: "Sensitive write-backs stay behind gates. Operators keep control; Duvo carries the evidence.",
  },
  {
    title: "Audit-ready run history",
    body: "Every action leaves a visible trail of what happened, what needed judgment, and what improved.",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Duvo Automation"
        title="Run the approved process with its context intact."
        description="Duvo carries agreed steps, decisions, exceptions, controls, and evidence into execution across SAP, portals, files, approvals, APIs, browsers, and desktops."
        ctas={[
          { href: "/contact", label: "Discuss an automation process", primary: true },
          { href: "/solutions", label: "See automation solutions" },
        ]}
      />

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up" className="text-center">
            <p className="section-label">How a run starts</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">
              The approved process record becomes the implementation brief.
            </h2>
          </FadeIn>
          <div className="mt-12">
            <AutomationCarousel />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 md:px-8">
          {pillars.map((item, i) => (
            <FadeIn key={item.title} direction="up" delay={i * 0.05}>
              <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                <h2 className="text-xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
