"use client";

import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { MarkerHighlight } from "./MarkerHighlight";
import { AutomationCarousel } from "./AutomationCarousel";

export function AutomationSection() {
  return (
    <section id="automation" className="border-t border-[var(--line)] bg-[#faf7f2]">
      <div className="mx-auto max-w-6xl px-5 pt-20 text-center md:px-8 md:pt-28">
        <FadeIn direction="up">
          <p className="section-label">Automation, when you choose it</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-medium tracking-tight md:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
            <span className="block">
              The automation brief starts with agreed reality.
            </span>{" "}
            <MarkerHighlight>No assumptions.</MarkerHighlight>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[var(--muted)] md:text-lg">
            The steps, systems, decision rules, exceptions, controls, and
            approval paths are already visible and reviewed. Duvo can move from
            understanding to execution without asking the team to redesign its
            stack first.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/automation"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--fg)]"
            >
              See Duvo automation
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--yellow)] transition group-hover:scale-105">
                →
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>

      <AutomationCarousel showLink scrollDriven className="w-full" />
    </section>
  );
}
