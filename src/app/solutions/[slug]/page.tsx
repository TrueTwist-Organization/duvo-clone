import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

const catalog: Record<
  string,
  { title: string; description: string; guarantee?: string; bullets: string[] }
> = {
  "freight-audit": {
    title: "Freight Audit",
    description:
      "Check 100% of carrier invoices against contracts before payment. Typically finds 3 to 5% of freight spend in overcharges.",
    guarantee:
      "If Duvo finds less than 3% of audited spend, the audit is free.",
    bullets: [
      "Contract vs invoice matching before payment",
      "Claims built with evidence after approval",
      "Write-back into existing TMS and finance tools",
    ],
  },
  "payables-audit": {
    title: "Payables Audit",
    description:
      "Audit supplier invoices against purchase orders, goods receipts, contracts, and statements before the payment run.",
    guarantee:
      "If Duvo finds less than five times the price of the run in validated errors and missed credits, the audit is free.",
    bullets: [
      "PO, GR, contract, and statement cross-checks",
      "Missed credits and duplicate detection",
      "Human approval before payment changes",
    ],
  },
  "supplier-reconciliation": {
    title: "Supplier Reconciliation",
    description:
      "Reconcile supplier statements against operational reality and resolve mismatches before they trap cash.",
    bullets: [
      "Statement vs open items reconciliation",
      "Exception routing to the right owner",
      "Audit trail for every adjustment",
    ],
  },
  "inventory-planning": {
    title: "Inventory Planning",
    description:
      "Turn OOS and availability signals into confirmation, slot change, order adjustment, or escalation before cut-off.",
    bullets: [
      "Cross-system signal consolidation",
      "Slack or inbox approval for changes",
      "Execution through existing UIs when APIs are missing",
    ],
  },
  "working-capital-recovery": {
    title: "Capital Recovery",
    description:
      "Run the collect, consolidate, and escalate loop that frees working capital stuck in bonus and rebate processes.",
    bullets: [
      "Multi-stream data consolidation",
      "Field verification on write-back",
      "Hub-level escalation for delayed approvals",
    ],
  },
  "working-capital": {
    title: "Capital Recovery",
    description:
      "Run the collect, consolidate, and escalate loop that frees working capital stuck in bonus and rebate processes.",
    bullets: [
      "Multi-stream data consolidation",
      "Field verification on write-back",
      "Hub-level escalation for delayed approvals",
    ],
  },
  "deductions-recovery": {
    title: "Deductions Recovery",
    description:
      "Recover the deductions you write off as not worth chasing. Validate every deduction against PO, POD, and promo terms.",
    bullets: [
      "Case building from disputed lines",
      "Evidence packs for trading partners",
      "Recovery tracking with measurable ROI",
    ],
  },
  deductions: {
    title: "Deductions Recovery",
    description:
      "Build deduction cases, gather evidence, and recover value with governed write-back.",
    bullets: [
      "Case building from disputed lines",
      "Evidence packs for trading partners",
      "Recovery tracking with measurable ROI",
    ],
  },
  "otif-recovery": {
    title: "OTIF Recovery",
    description:
      "Dispute OTIF fines using the real delivery, confirmation, and exception trail.",
    bullets: [
      "Evidence from TMS, ASN, and dock events",
      "Dispute packages ready for review",
      "Protected revenue and margin",
    ],
  },
  otif: {
    title: "OTIF Recovery",
    description:
      "Dispute OTIF fines using the real delivery, confirmation, and exception trail.",
    bullets: [
      "Evidence from TMS, ASN, and dock events",
      "Dispute packages ready for review",
      "Protected revenue and margin",
    ],
  },
  "returns-claims": {
    title: "Returns & Claims",
    description:
      "Process returns and claims end to end after approval, writing outcomes back into the systems you already run.",
    bullets: [
      "Intake across portals and inboxes",
      "Approval gates for credit decisions",
      "Operational evidence for every claim",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(catalog).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalog[slug];
  if (!item) return {};
  return {
    title: `${item.title} - Duvo`,
    description: item.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalog[slug];
  if (!item) notFound();

  return (
    <PageShell>
      <MarketingHero
        eyebrow="Automation solution"
        title={item.title}
        description={item.description}
        ctas={[
          { href: "/contact", label: "Discuss this solution", primary: true },
          { href: "/solutions", label: "All solutions" },
        ]}
      />
      <section className="border-t border-[var(--line)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          {item.guarantee ? (
            <p className="rounded-2xl border border-[var(--yellow)]/40 bg-[var(--yellow)]/15 px-5 py-4 text-sm font-medium">
              Guarantee: {item.guarantee}
            </p>
          ) : null}
          <ul className="mt-8 space-y-3">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[var(--muted)]">
                <span className="text-[#fc6951]">✓</span>
                {bullet}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="pill mt-10 inline-flex bg-[#2a2b3b] px-6 py-3.5 text-sm font-semibold !text-white"
          >
            Start with one process
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
