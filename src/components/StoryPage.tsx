import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";
import type { CustomerStory } from "@/content/stories";

export function StoryPage({ story }: { story: CustomerStory }) {
  return (
    <PageShell>
      <MarketingHero
        eyebrow={`${story.category} · ${story.tag}`}
        title={story.title}
        description={story.summary}
        ctas={[
          { href: "/contact", label: "Start with one process", primary: true },
          { href: "/customer-stories", label: "All stories" },
        ]}
      />

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-3 md:px-8">
          {story.metrics.map((m, i) => (
            <FadeIn key={m.label} direction="up" delay={i * 0.05}>
              <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                <p className="text-3xl font-medium tracking-tight">{m.value}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{m.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">The challenge</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
              Why the old path broke down
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              {story.challenge}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.08}>
            <p className="section-label">What Duvo did</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
              Capture → reconcile → deliver
            </h2>
            <ol className="mt-4 space-y-3">
              {story.approach.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                  <span className="font-mono text-[var(--fg)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Outcome</p>
            <p className="mt-4 text-xl font-medium tracking-tight md:text-2xl">
              {story.outcome}
            </p>
            {story.quote ? (
              <blockquote className="mt-10 border-l-2 border-[var(--yellow)] pl-5">
                <p className="text-lg leading-relaxed">&ldquo;{story.quote.text}&rdquo;</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{story.quote.role}</p>
              </blockquote>
            ) : null}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="pill bg-[var(--yellow)] px-5 py-3 text-sm font-semibold !text-[var(--fg)]"
              >
                Start with one process
              </Link>
              <Link
                href="/proof"
                className="pill border border-[var(--line)] px-5 py-3 text-sm font-semibold"
              >
                See proof library
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
}
