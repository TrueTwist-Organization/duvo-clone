"use client";

import Image from "next/image";
import Link from "next/link";
import { BackgroundMesh } from "./BackgroundMesh";
import { FadeIn } from "./FadeIn";
import { MarkerHighlight } from "./MarkerHighlight";

const outcomes = [
  {
    company: "Notino",
    logo: "/logos/notino.svg",
    area: "Finance",
    metric: "~€40M",
    label: "Working capital released",
    title: "Bonus reconciliation cut from 70 days to 15.",
    body: "Duvo runs the full collect, consolidate, and escalate loop across Notino's 7 bonus data streams and 9 L'Oréal hubs, consolidating the master workbook, verifying every field on write-back, and escalating delayed approvals by hub.",
    href: "/customer-stories/bonus-reconciliation",
  },
  {
    company: "Rohlik Group",
    logo: "/logos/rohlik.svg",
    area: "Supply chain",
    metric: "€10–27M",
    label: "Modelled annual revenue recapture",
    title: "Every OOS signal reviewed and acted on.",
    body: "Rohlik had the signals, but they were split across stock data, delivery confirmations, supplier replies, slots, and warehouse status. Duvo runs the loop 24/7 so risk turns into confirmation, slot change, order adjustment, substitution, or escalation before cut-off.",
    href: "/customer-stories/rohlik-out-of-stock-prevention",
  },
  {
    company: "Pilulka",
    logo: "/logos/pilulka.svg",
    area: "Supply chain",
    metric: "~€1.5m",
    label: "Annualized net sales recovered",
    title: "Stock availability improved 15% in two weeks.",
    body: "Duvo read proposed supplier orders, recalculated better options, sent changes for Slack approval, and executed through the existing UI. The team improved availability without waiting for APIs or rebuilding forecasting tools.",
    href: "/customer-stories/availability-recovery",
  },
];

export function PartnersAndOutcomes() {
  return (
    <section
      id="customer-outcomes"
      className="relative overflow-hidden bg-[var(--bg)]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <FadeIn direction="up" className="mx-auto max-w-4xl text-center">
          <p className="section-label">Proven in production</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl lg:text-[3.4rem]">
            Driving measurable top & bottom line impact.{" "}
            <MarkerHighlight>In weeks, not months.</MarkerHighlight>
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {outcomes.map((item, index) => (
            <FadeIn key={item.company} direction="up" delay={0.08 * index}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-white/70 p-6 backdrop-blur md:p-7">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                  <BackgroundMesh mode="spiral" theme="light" />
                </div>
                <div className="relative z-[1] flex items-center justify-between gap-3">
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={96}
                    height={28}
                    className="h-7 w-auto object-contain"
                  />
                  <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    {item.area}
                  </span>
                </div>
                <p className="relative z-[1] mt-10 text-4xl font-medium tracking-tight md:text-5xl">
                  {item.metric}
                </p>
                <p className="relative z-[1] mt-2 text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                  {item.label}
                </p>
                <h3 className="relative z-[1] mt-6 text-lg font-semibold leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="relative z-[1] mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="relative z-[1] mt-6 inline-flex text-sm font-semibold underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--fg)]"
                >
                  Read story
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
