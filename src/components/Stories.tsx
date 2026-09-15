"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";

const stories = [
  {
    tag: "Shared source of truth",
    company: "Notino",
    logo: "/logos/notino-full.svg",
    title:
      "14 versions of one process reconciled into a transformation plan in a week.",
    quote:
      "Ask 14 people how the process works and you get 14 different answers. Duvo reconciled them in a week, quantified what the exceptions were actually costing us, and gave us a transformation plan we could take straight to the exec team.",
    role: "Head of AI Automation",
    org: "Notino",
    cta: "Explore Clarity",
    href: "/clarity",
  },
  {
    tag: "Cross-market standardization",
    company: "Rohlik Group",
    logo: "/logos/rohlik-group-full.svg",
    title:
      "One honest view of how every market runs the same process differently.",
    quote:
      "We thought we knew our promo process. Two weeks with Duvo showed us we did not, and that the gap was costing us a lot in some markets. It gave us one honest picture so we could optimize and unify the process.",
    role: "CEO",
    org: "Rohlik Group",
    cta: "Explore Clarity",
    href: "/clarity",
  },
  {
    tag: "Mapped process to automation",
    company: "Pilulka",
    logo: "/logos/pilulka-full.svg",
    title:
      "Stock availability improved by 15% in 2 weeks. No APIs. No IT rebuild.",
    quote:
      "IT did not have capacity to rebuild our ordering process, so we brought in Duvo. It validates orders, sends improvements to Slack for approval, and executes the change through our internal UI.",
    role: "Petr Marek",
    org: "Supply Chain Manager, Pilulka",
    cta: "Read case study",
    href: "/customer-stories/availability-recovery",
  },
];

export function Stories() {
  return (
    <section id="stories" className="border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <FadeIn direction="up" className="max-w-3xl">
          <p className="section-label">Customer stories</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            One process. Different outcomes. Proven value.
          </h2>
          <p className="mt-5 text-[var(--muted)] md:text-lg">
            Teams use the same reviewed process evidence to align on the work,
            standardize it across markets, plan change, or automate when that
            creates value.{" "}
            <span className="font-medium text-[var(--fg)]">
              In weeks, not months.
            </span>
          </p>
          <Link
            href="/customer-stories"
            className="mt-6 inline-flex text-sm font-semibold underline decoration-[var(--line)] underline-offset-4"
          >
            Explore customer stories
          </Link>
        </FadeIn>

        <div className="mt-14 space-y-5">
          {stories.map((story, index) => (
            <FadeIn key={story.company} direction="up" delay={0.05 * index}>
              <article className="rounded-[1.6rem] border border-[var(--line)] bg-white/70 p-6 backdrop-blur md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="section-label">{story.tag}</p>
                  <Image
                    src={story.logo}
                    alt={story.company}
                    width={120}
                    height={28}
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <h3 className="mt-5 max-w-3xl text-2xl font-medium tracking-tight md:text-3xl">
                  {story.title}
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  “{story.quote}”
                </p>
                <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{story.role}</p>
                    <p className="text-sm text-[var(--muted)]">{story.org}</p>
                  </div>
                  <Link
                    href={story.href}
                    className="text-sm font-semibold underline decoration-[var(--line)] underline-offset-4"
                  >
                    {story.cta}
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}

          <FadeIn direction="up" delay={0.2}>
            <article className="rounded-[1.6rem] border border-[var(--yellow)]/40 bg-[var(--yellow)] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
              <div>
                <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-[#121217]/70 uppercase">
                  Interactive demo · Try it
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#121217] md:text-3xl">
                  Watch Duvo in action.
                </h3>
                <p className="mt-3 max-w-xl text-sm text-[#121217]/75 md:text-base">
                  Step through a live operation end-to-end. See exactly what
                  Duvo sees, decides, and acts on, in your own time.
                </p>
              </div>
              <Link
                href="/how-it-works#workflow"
                className="pill mt-6 inline-flex bg-[#121217] px-6 py-3.5 text-sm font-semibold !text-white md:mt-0"
              >
                Open interactive demo
              </Link>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
