import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { MarketingHero } from "./MarketingHero";
import { PageShell } from "./PageShell";

export type OutcomeContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  deliverables: { title: string; body: string }[];
  method: { title: string; body: string }[];
  proof: { metric: string; label: string; quote?: string };
  next?: { href: string; label: string };
};

export function OutcomePage({ content }: { content: OutcomeContent }) {
  return (
    <PageShell>
      <MarketingHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        ctas={[
          { ...content.primaryCta, primary: true },
          ...(content.secondaryCta ? [content.secondaryCta] : []),
        ]}
      />

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">What Duvo delivers</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">
              See what you get from the reviewed process.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.deliverables.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-[var(--line)] bg-white p-6">
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
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">How it is built</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">
              Capture. Reconcile. Deliver.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.method.map((step, i) => (
              <FadeIn key={step.title} direction="up" delay={i * 0.06}>
                <div>
                  <p className="font-mono text-sm text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[#22222c] py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--yellow)] uppercase">
              Customer proof
            </p>
            <p className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
              {content.proof.metric}
            </p>
            <p className="mt-3 max-w-xl text-white/65">{content.proof.label}</p>
            {content.proof.quote ? (
              <blockquote className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
                “{content.proof.quote}”
              </blockquote>
            ) : null}
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              Start with one process.
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Leave with the outcome your team needs next.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={content.primaryCta.href}
              className="pill bg-[#2a2b3b] px-6 py-3.5 text-sm font-semibold !text-white"
            >
              {content.primaryCta.label}
            </Link>
            {content.next ? (
              <Link
                href={content.next.href}
                className="pill border border-[var(--line)] px-6 py-3.5 text-sm font-semibold"
              >
                {content.next.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
