import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";
import { customerStories } from "@/content/stories";

export const metadata = {
  title: "Customer proof: process clarity and production outcomes - Duvo",
  description:
    "Evidence from process truth to measurable outcomes across discovery, transformation, and production automation.",
};

const cards = [
  {
    title: "Understand & transform",
    items: [
      "Notino: 14 versions → 1 transformation plan in a week",
      "Rohlik: 2 weeks to an agreed cross-market process view",
    ],
  },
  {
    title: "Run & recover",
    items: [
      "€20M+ availability and working-capital impact in production",
      "€2.1M revenue and €1.4M margin protected on inbound invoices",
      "Promo margin 17% → 27% with 3× promo revenue in selected markets",
    ],
  },
  {
    title: "Validation",
    items: [
      "SOC 2 Type II · ISO 27001 · ISO 42001 · GDPR aligned",
      "No model training on customer data",
      "Human approval gates before sensitive actions",
    ],
  },
];

export default function Page() {
  const featured = customerStories.slice(0, 6);
  return (
    <PageShell>
      <MarketingHero
        title="Evidence from process truth to measurable outcomes."
        description="See how Duvo reconciles the real process, reveals what should improve, and turns findings into shared knowledge, transformation plans, migration readiness, and measurable outcomes."
        ctas={[
          { href: "/contact", label: "Start with one process", primary: true },
          { href: "/customer-stories", label: "Customer stories" },
        ]}
      />
      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3 md:px-8">
          {cards.map((card, i) => (
            <FadeIn key={card.title} direction="up" delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-[var(--line)] bg-white p-6">
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
                  {card.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Proof library</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight">
              Published production outcomes
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {featured.map((s, i) => (
              <FadeIn key={s.slug} direction="up" delay={i * 0.04}>
                <Link
                  href={`/customer-stories/${s.slug}`}
                  className="block rounded-3xl border border-[var(--line)] bg-white p-6 transition hover:border-[var(--fg)]/25"
                >
                  <p className="text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                    {s.company} · {s.tag}
                  </p>
                  <p className="mt-3 font-semibold tracking-tight">{s.title}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {s.metrics.map((m) => m.value).join(" · ")}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
          <Link
            href="/customer-stories"
            className="pill mt-10 inline-flex border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-semibold"
          >
            All customer stories
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
