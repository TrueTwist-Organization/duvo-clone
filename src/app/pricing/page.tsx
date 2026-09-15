import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Duvo pricing: process outcomes, SAP and automation",
  description:
    "Price the outcome you need now — process catalogue, transformation, SAP fact base, training, or production automation.",
};

const models = [
  {
    title: "Process outcomes",
    price: "Fixed-scope",
    body: "Catalogue, improvement plan, training pack, or similar deliverable scoped to one workflow, team, or department.",
    points: ["Clear deliverable", "Reviewed evidence attached", "Days to weeks"],
  },
  {
    title: "Transformation & SAP",
    price: "Programme",
    body: "Roadmaps and migration fact bases spanning SAP and non-SAP work, ready for SI handoff.",
    points: ["BPMN export", "Exception economics", "Exec-ready plan"],
  },
  {
    title: "Production automation",
    price: "Per unit of work",
    body: "Priced per agreed completed work — not seats, tokens, or bot licenses. Audit solutions can include outcome guarantees.",
    points: ["Human gates", "Audit trail", "Existing systems"],
  },
];

const faqs = [
  {
    q: "Do we pay for AI usage separately?",
    a: "Production automation is engineered into the unit of work so cost stays predictable. If the cheapest correct path uses no AI, we say so.",
  },
  {
    q: "Can we start with Clarity only?",
    a: "Yes. Many teams start with one workflow and leave with a catalogue, roadmap, or automation brief — then decide what to run in production.",
  },
  {
    q: "How do guarantees work?",
    a: "For selected audit solutions, we agree the unit of work and the acceptance path before scale. Guarantees require reviewed process evidence first.",
  },
  {
    q: "Do you charge per seat or per token?",
    a: "No. Duvo prices outcomes and units of approved work — not seats, bot licenses, or raw token consumption.",
  },
  {
    q: "What about high-volume automation?",
    a: "Volume tiers are scoped per process with predictable unit economics. Pulse and operational dashboards are included for production automations.",
  },
  {
    q: "Is there a trial?",
    a: "Most teams start with one workflow through Clarity or a scoped automation pilot. We agree success criteria before production scale.",
  },
  {
    q: "How does SAP migration pricing work?",
    a: "Migration fact bases are programme-scoped with BPMN export and exception economics ready for SI handoff.",
  },
  {
    q: "Can we mix outcomes and automation?",
    a: "Yes. Catalogue and roadmap work often precedes automation. Each phase is priced to the deliverable or unit of work.",
  },
  {
    q: "Who owns the process evidence?",
    a: "You do. Duvo delivers portable artefacts — catalogues, maps, training packs, and automation specs — that stay with your organization.",
  },
];

const economics = [
  {
    title: "Outcome-priced",
    body: "Pay for the catalogue, roadmap, training pack, or automation unit — not platform shelfware.",
  },
  {
    title: "Predictable at scale",
    body: "Unit economics are agreed before production. No surprise token bills or seat creep.",
  },
  {
    title: "Guarantees where it matters",
    body: "Selected audit automations include outcome guarantees when the process evidence supports them.",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Pricing"
        title="Price the outcome you need now."
        description="Start with a process catalogue, improvement or transformation workstream, SAP migration fact base, training, or production automation."
        ctas={[
          { href: "/contact", label: "Discuss the right starting point", primary: true },
          { href: "/solutions", label: "Automation economics" },
        ]}
      />
      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3 md:px-8">
          {models.map((model, i) => (
            <FadeIn key={model.title} direction="up" delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-white p-6">
                <p className="text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                  {model.price}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  {model.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {model.body}
                </p>
                <ul className="mt-5 space-y-2">
                  {model.points.map((p) => (
                    <li key={p} className="text-sm font-medium">
                      · {p}
                    </li>
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
            <p className="section-label">Automation economics</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight">
              Tokens and seats are someone else&apos;s problem.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {economics.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-[var(--line)] bg-[var(--bg-soft)] p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="text-2xl font-medium tracking-tight">FAQ</h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{f.a}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="pill mt-10 inline-flex bg-[var(--yellow)] px-5 py-3 text-sm font-semibold !text-[var(--fg)]"
          >
            Get a scoped proposal
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
