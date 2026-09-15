import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Duvo Clarity: One process, the outcome you need",
  description:
    "In days, Duvo reconciles walkthroughs, interviews, and documents, then delivers the catalogue, training guide, roadmap, or automation brief you choose.",
};

const pillars = [
  {
    title: "What goes in",
    body: "Capture real evidence — screens, guided interviews, SOPs, or all three.",
  },
  {
    title: "What Duvo reveals",
    body: "Reconcile tasks, systems, decisions, handoffs, and exceptions. Surface rework, root causes, and costly variance.",
  },
  {
    title: "What you leave with",
    body: "Choose the deliverable: catalogue, training guide, improvement plan, transformation roadmap, migration fact base, or automation brief.",
  },
  {
    title: "What comes out",
    body: "One reviewed fact base and a clear path forward — with evidence and priorities attached.",
  },
];

const deliverables = [
  "Process catalogue with roles, systems, and exceptions",
  "Training guide from the reviewed process",
  "Improvement plan with prioritized friction",
  "Transformation roadmap with economics",
  "SAP migration fact base with BPMN export",
  "Automation brief ready for production",
];

const captureModes = [
  {
    title: "Screen recording",
    body: "Capture real work as it happens across ERP, portals, inboxes, and spreadsheets.",
  },
  {
    title: "AI-guided interview",
    body: "Structured interviews that reconcile judgment, exceptions, and workarounds.",
  },
  {
    title: "Document ingestion",
    body: "SOPs, policies, and process docs reconciled against what people actually do.",
  },
];

const faqs = [
  {
    q: "How long does Clarity take?",
    a: "Most single-workflow engagements deliver in days, not months — depending on scope and number of sources.",
  },
  {
    q: "Do we need APIs?",
    a: "No. Clarity starts from walkthroughs, interviews, and documents. No system integration required to begin.",
  },
  {
    q: "Can we export to Signavio or SAP?",
    a: "Yes. Agreed process maps export as portable BPMN for SI partners and SAP programmes.",
  },
  {
    q: "What if sources conflict?",
    a: "Duvo reconciles conflicting evidence into a reviewed record — not the cleanest slide.",
  },
];
const why = [
  {
    title: "Build a living process catalogue",
    body: "One searchable view of the real work with roles, systems, decisions, exceptions, and source evidence.",
  },
  {
    title: "Find what should improve first",
    body: "Expose friction and costly variance, then agree a better standard without losing exceptions that matter.",
  },
  {
    title: "Plan change from evidence",
    body: "Prioritize redesign, migration, human control, and automation using the economics behind the process.",
  },
  {
    title: "Onboard and train with the real process",
    body: "Give teams the reviewed process instead of idealized SOPs and tribal knowledge.",
  },
  {
    title: "Keep knowledge in the organization",
    body: "Capture judgment and workarounds before experienced colleagues move on.",
  },
  {
    title: "Portable BPMN when you need it",
    body: "Export agreed maps for SI partners and SAP programmes without another discovery fight.",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Duvo Clarity"
        title="Turn one real workflow into the outcome your team needs."
        description="In days, Duvo reconciles walkthroughs, interviews, and documents, reveals where the process can improve, and delivers the catalogue, training guide, improvement plan, transformation roadmap, migration fact base, or automation brief your team chooses."
        ctas={[
          { href: "/contact?outcome=understand#book-demo", label: "Start with one process", primary: true },
          { href: "/sap-migration", label: "Running SAP? See migration path" },
        ]}
        align="center"
      />

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
          {pillars.map((item, i) => (
            <FadeIn key={item.title} direction="up" delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-[var(--line)] bg-white p-5">
                <h2 className="text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Why Clarity</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
              Stop documenting the status quo and calling it transformation.
            </h2>
            <p className="mt-5 max-w-2xl text-[var(--muted)] md:text-lg">
              Most discovery rebuilds the process from memory and meetings. Duvo
              starts from evidence, reconciles the live process, then shows where
              time, value, and control are being lost.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {why.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.04}>
                <div className="h-full rounded-3xl border border-[var(--line)] bg-[var(--bg-soft)] p-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="pill bg-[var(--yellow)] px-5 py-3 text-sm font-semibold !text-[var(--fg)]"
            >
              Start with one workflow
            </Link>
            <Link
              href="/how-it-works"
              className="pill border border-[var(--line)] px-5 py-3 text-sm font-semibold"
            >
              How Duvo works
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Capture modes</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight">
              Three ways to capture process truth.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {captureModes.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.04}>
                <div className="h-full rounded-3xl border border-[var(--line)] bg-white p-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Choose your deliverable</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight">
              One workflow. The outcome you need.
            </h2>
          </FadeIn>
          <ol className="mt-10 space-y-3">
            {deliverables.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-4 text-sm"
              >
                <span className="font-bold text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
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
        </div>
      </section>
    </PageShell>
  );
}
