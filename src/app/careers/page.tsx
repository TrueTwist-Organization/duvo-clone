import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Careers: build the operational intelligence layer - Duvo",
  description:
    "Critical work should not depend on scattered screens, documents, and memory. We're changing that.",
};

const principles = [
  { title: "Obsess over the customer", body: "Start from the operator’s reality, not the slide deck." },
  { title: "Grow and compound", body: "Ship learning into the product every week." },
  { title: "Prove, don’t argue", body: "Evidence beats opinion in every debate." },
  { title: "Say it straight, now", body: "Clear feedback, no politics theatre." },
];

const life = [
  "Builder Days",
  "Demo Fridays",
  "Customer immersion trips",
  "How-to-get-better sessions",
];

const offers = [
  "Unlimited AI budget",
  "Real autonomy",
  "A real AI product, real customers",
  "Meaningful equity",
  "The gear you need",
  "Remote-friendly, with real hubs",
];

const roles = [
  {
    title: "Founding engineer — agent runtime",
    loc: "Remote EU · Full-time",
    body: "Own the path from reviewed process evidence to governed execution across existing UIs and systems.",
  },
  {
    title: "Product engineer — capture & reconcile",
    loc: "Remote EU · Full-time",
    body: "Build the surfaces that turn walkthroughs, interviews, and documents into one living process record.",
  },
  {
    title: "Forward-deployed engineer",
    loc: "Hybrid · Full-time",
    body: "Sit with operators, ship outcomes in weeks, and feed what you learn back into the platform.",
  },
  {
    title: "Customer outcomes lead",
    loc: "Remote EU · Full-time",
    body: "Own Clarity engagements end-to-end — from first workflow to catalogue, roadmap, or automation brief.",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Careers"
        title="Critical work should not depend on scattered screens, documents, and memory."
        description="We're changing that. Build the operational intelligence layer with people who obsess over real processes — not assumed SOPs."
        ctas={[
          { href: "#roles", label: "See open roles", primary: true },
          { href: "/culture", label: "How we operate" },
        ]}
      />

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">How we operate</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
              Five principles that decide how we actually behave.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {principles.map((p, i) => (
              <FadeIn key={p.title} direction="up" delay={i * 0.05}>
                <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Life at Duvo</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight">
              We do our best work from anywhere.
            </h2>
            <ul className="mt-6 space-y-3">
              {life.map((item) => (
                <li key={item} className="text-sm font-medium">
                  · {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn direction="up" delay={0.08}>
            <p className="section-label">What we offer</p>
            <ul className="mt-6 space-y-3">
              {offers.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3 text-sm font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section id="roles" className="scroll-mt-28 border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Open roles</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight">
              We won’t build this without people like you.
            </h2>
          </FadeIn>
          <div className="mt-10 space-y-4">
            {roles.map((role, i) => (
              <FadeIn key={role.title} direction="up" delay={i * 0.04}>
                <article className="rounded-3xl border border-[var(--line)] bg-white p-6 md:flex md:items-center md:justify-between md:gap-8">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                      {role.loc}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
                      {role.body}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="pill mt-4 inline-flex shrink-0 bg-[var(--yellow)] px-4 py-2.5 text-sm font-semibold !text-[var(--fg)] md:mt-0"
                  >
                    Apply
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
