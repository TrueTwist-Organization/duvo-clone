"use client";

import Image from "next/image";
import { BackgroundMesh } from "./BackgroundMesh";
import { FadeIn } from "./FadeIn";
import { MarkerHighlight } from "./MarkerHighlight";
import { TypewriterOutcomes } from "./TypewriterOutcomes";

const endings = [
  "reliable process automation",
  "a shared process catalogue",
  "a process knowledge base",
  "a process improvement plan",
  "a transformation roadmap",
  "an SAP migration fact base",
  "a role-specific training guide",
];

const partners = [
  { src: "/logos/notino-full.svg", alt: "Notino", w: 110 },
  { src: "/logos/rohlik-group-full.svg", alt: "Rohlik Group", w: 120 },
  { src: "/logos/pilulka-full.svg", alt: "Pilulka", w: 100 },
  { src: "/logos/boden.png", alt: "BODEN", w: 90 },
  { src: "/logos/flosman.png", alt: "Flosman", w: 100 },
  { src: "/logos/allegro.png", alt: "Allegro", w: 100 },
  { src: "/logos/deloitte-full.svg", alt: "Deloitte", w: 110 },
  { src: "/logos/anthropic-full.svg", alt: "Anthropic", w: 110 },
  { src: "/logos/heureka-full.svg", alt: "Heureka", w: 100 },
  { src: "/logos/cz.png", alt: "CZ", w: 70 },
  { src: "/logos/ctp.png", alt: "CTP", w: 70 },
  { src: "/logos/ich.png", alt: "ICH", w: 70 },
];

export function Hero() {
  const loop = [...partners, ...partners];

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[var(--bg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1020px] [mask-image:linear-gradient(to_bottom,black_0px,black_820px,transparent_1020px)] md:h-[880px] md:[mask-image:linear-gradient(to_bottom,black_0px,black_700px,transparent_880px)]"
      >
        <BackgroundMesh mode="spiral" theme="light" connectors riders />
      </div>

      <div className="relative z-[1]">
        <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center gap-8 px-5 pt-[8.2rem] pb-10 md:gap-9 md:px-8 md:pt-36 md:pb-16">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center text-center">
            <FadeIn direction="up" duration={0.5} delay={0.05}>
              <p className="section-label">
                <span className="block sm:inline">
                  Improve operational performance
                </span>
                <span className="block sm:inline"> with Duvo</span>
              </p>
            </FadeIn>

            <FadeIn direction="up" duration={0.5} delay={0.17}>
              <h1 className="mt-6 text-[2.25rem] font-medium leading-[0.98] tracking-[-0.05em] text-[var(--fg)] sm:text-[3.1rem] md:text-[3.65rem] lg:text-[4.15rem] xl:text-[4.7rem]">
                <span className="block">See how work runs.</span>
                <span className="mt-1 block md:mt-2">Improve how the</span>
                <span className="mt-1 block md:mt-2">
                  <MarkerHighlight>business performs.</MarkerHighlight>
                </span>
              </h1>
            </FadeIn>

            <FadeIn
              direction="up"
              duration={0.45}
              delay={0.29}
              className="mt-7 md:mt-8"
            >
              <TypewriterOutcomes outcomes={endings} />
            </FadeIn>

            <FadeIn direction="up" duration={0.4} delay={0.41}>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:mt-10">
                <a
                  href="#customer-outcomes"
                  className="pill bg-[#2a2b3b] px-6 py-3.5 text-sm font-semibold !text-white transition hover:opacity-90"
                >
                  Explore the outcomes
                </a>
                <a
                  href="/contact"
                  className="pill border border-[var(--line)] bg-white/80 px-6 py-3.5 text-sm font-semibold text-[var(--fg)] backdrop-blur transition hover:bg-white"
                >
                  Bring us a process
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn
            direction="up"
            duration={0.45}
            delay={0.55}
            className="mt-auto w-full pt-14 md:pt-20"
          >
            <p className="section-label text-center">Partnering with</p>
            <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="partner-marquee flex w-max items-center gap-12 px-6">
                {loop.map((p, i) => (
                  <Image
                    key={`${p.alt}-${i}`}
                    src={p.src}
                    alt={p.alt}
                    width={p.w}
                    height={36}
                    className="h-8 w-auto object-contain opacity-80 md:h-9"
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
