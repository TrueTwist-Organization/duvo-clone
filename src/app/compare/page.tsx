import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Duvo Compare",
  description:
    "How Duvo compares to enterprise automation platforms, workflow builders, and agent frameworks.",
};

const rows = [
  {
    vs: "Process capture tools",
    them: "Recordings & guides",
    duvo: "Reconciled fact base → chosen outcome",
  },
  {
    vs: "Process mining / modeling",
    them: "System event logs & BPMN",
    duvo: "Screens + judgment + non-SAP reality",
  },
  {
    vs: "ServiceNow / enterprise suites",
    them: "Platform redesign & ITSM-first",
    duvo: "Outcomes from reviewed evidence, existing systems intact",
  },
  {
    vs: "UiPath / RPA vendors",
    them: "Bot licenses & attended automation",
    duvo: "Governed automation priced per unit of work",
  },
  {
    vs: "RPA / iPaaS suites",
    them: "Seats, bots, connectors",
    duvo: "Per unit of approved work",
  },
  {
    vs: "Agent frameworks",
    them: "Build your own ops layer",
    duvo: "Queues, approvals, MCP, guarantees",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        title="Duvo Compare"
        description="Duvo turns reviewed evidence about how work really happens into the outcome your team needs — catalogue, training, improvement, migration fact base, or automation."
        ctas={[
          { href: "/contact", label: "Talk to Duvo", primary: true },
          { href: "/how-it-works", label: "How Duvo works" },
        ]}
      />
      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Where Duvo wins</p>
            <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
              Competitors are not missing agents or audit trails. Duvo is
              differentiated by selling guaranteed business outcomes from the
              same evidence-backed process context.
            </p>
          </FadeIn>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-white">
            <div className="grid grid-cols-3 gap-0 border-b border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3 text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
              <span>Category</span>
              <span>Typical tools</span>
              <span>Duvo</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.vs}
                className="grid grid-cols-1 gap-2 border-b border-[var(--line)] px-4 py-4 last:border-0 md:grid-cols-3 md:gap-4"
              >
                <p className="text-sm font-semibold">{row.vs}</p>
                <p className="text-sm text-[var(--muted)]">{row.them}</p>
                <p className="text-sm font-medium">{row.duvo}</p>
              </div>
            ))}
          </div>
          <Link
            href="/clarity"
            className="mt-10 inline-flex text-sm font-semibold"
          >
            See Duvo Clarity →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
