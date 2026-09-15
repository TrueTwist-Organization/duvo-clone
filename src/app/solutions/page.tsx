import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Automation solutions for finance, supply chain & sales - Duvo",
  description:
    "Production automation patterns for finance, supply chain, and commercial operations.",
};

const solutions = [
  {
    href: "/solutions/deductions-recovery",
    title: "Deductions Recovery",
    body: "Validate every deduction against PO, POD, and promo terms, then file invalid ones for recovery.",
    tag: "Commercial",
  },
  {
    href: "/solutions/freight-audit",
    title: "Freight Audit",
    body: "Audit 100% of carrier invoices against contracts before payment. Typically finds 3–5% of freight spend.",
    tag: "Finance",
  },
  {
    href: "/solutions/inventory-planning",
    title: "Inventory Planning",
    body: "Act on availability risk across stock, slots, and supplier confirmations before cut-off.",
    tag: "Supply chain",
  },
  {
    href: "/solutions/otif-recovery",
    title: "OTIF Recovery",
    body: "Dispute OTIF fines with evidence from the real delivery and confirmation trail.",
    tag: "Supply chain",
  },
  {
    href: "/solutions/payables-audit",
    title: "Payables Audit",
    body: "Check supplier invoices against POs, receipts, contracts, and statements before the pay run.",
    tag: "Finance",
  },
  {
    href: "/solutions/returns-claims",
    title: "Returns & Claims",
    body: "Process returns and claims end to end after approval, with write-back into existing systems.",
    tag: "Operations",
  },
  {
    href: "/solutions/supplier-reconciliation",
    title: "Supplier Reconciliation",
    body: "Reconcile statements, resolve mismatches, and keep working capital moving.",
    tag: "Finance",
  },
  {
    href: "/solutions/working-capital-recovery",
    title: "Capital Recovery",
    body: "Close the collect, consolidate, and escalate loop that frees trapped cash.",
    tag: "Finance",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Automation solutions"
        title="Run the approved work that keeps leaking cash and time."
        description="Production automation patterns for finance, supply chain, and commercial ops across ERP, portals, inboxes, and approvals."
        ctas={[
          { href: "/contact", label: "Assess an automation process", primary: true },
          { href: "/automation", label: "How automation works" },
        ]}
      />

      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {solutions.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.04}>
                <Link
                  href={item.href}
                  className="block h-full rounded-3xl border border-[var(--line)] bg-white p-6 transition hover:border-[var(--fg)]/25"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    {item.tag}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
