"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LiveAutomationScene } from "./automation/LiveAutomationScene";

export const automationCarouselSteps = [
  {
    id: "brief",
    n: "1",
    label: "Reviewed brief",
    title: "Start from reviewed process evidence.",
    body: "The steps, systems, decision rules, exceptions, controls, and approval paths are already visible and reviewed.",
  },
  {
    id: "systems",
    n: "2",
    label: "Existing systems",
    title: "Keep the operating reality intact.",
    body: "Legacy screens, no-API tools, and the handoffs between them remain part of the implementation brief.",
  },
  {
    id: "execution",
    n: "3",
    label: "Governed execution",
    title: "Run the rules with approval where risk requires it.",
    body: "Duvo agents work from reviewed rules and exceptions, with human approval kept exactly where the team needs it.",
  },
  {
    id: "evidence",
    n: "4",
    label: "Operational evidence",
    title: "Carry every result into the next decision.",
    body: "Each run leaves a visible history of what happened, what required judgment, and what should improve next.",
    href: "/automation",
    linkLabel: "Explore reliable automation",
  },
] as const;

type Props = {
  autoPlay?: boolean;
  intervalMs?: number;
  showLink?: boolean;
  scrollDriven?: boolean;
  className?: string;
};

function smoothstep(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

function cardOpacity(progress: number, index: number) {
  return Math.max(0, 1 - smoothstep((Math.abs(progress - index) - 0.18) / 0.36));
}

export function AutomationCarousel({
  autoPlay = true,
  intervalMs = 5000,
  showLink = true,
  scrollDriven = true,
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetCardProgress = useRef(0);
  const currentCardProgress = useRef(0);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [cardProgress, setCardProgress] = useState(0);

  useEffect(() => {
    if (!scrollDriven) return;

    const scrollEl = scrollRef.current;
    const stickyEl = stickyRef.current;
    if (!scrollEl || !stickyEl) return;

    function syncStickyTop() {
      if (!scrollEl || !stickyEl) return;
      const sceneEl = sceneRef.current;
      const ratio = window.innerWidth >= 768 ? 0.56 : 0.57;
      const contentHeight = sceneEl
        ? Math.max(sceneEl.offsetHeight, sceneEl.scrollHeight)
        : stickyEl.offsetHeight;
      const top = Math.max(16, window.innerHeight * ratio - contentHeight / 2);
      stickyEl.style.top = `${Math.round(top)}px`;
    }

    function readScrollProgress() {
      const el = scrollRef.current;
      if (!el) return { rotation: 0, card: 0 };

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const maxScroll = Math.max(el.offsetHeight - viewport, 1);
      const raw = Math.max(0, Math.min(1, -rect.top / maxScroll));
      const adjusted = Math.max(0, Math.min(1, (raw - 0.04) / 0.92));
      const steps = automationCarouselSteps.length;
      const scaled = adjusted * (steps - 1);
      const base = Math.floor(scaled);
      const fraction = scaled - base;
      let card = base;
      if (fraction > 0.28) {
        card =
          fraction >= 0.72
            ? base + 1
            : base + smoothstep((fraction - 0.28) / (1 - 0.56));
      }

      return {
        rotation: scaled,
        card: Math.min(card, steps - 1),
      };
    }

    function onScroll() {
      const { rotation, card } = readScrollProgress();
      setRotationProgress(rotation);
      targetCardProgress.current = card;
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    }

    function tick() {
      const delta = targetCardProgress.current - currentCardProgress.current;
      if (Math.abs(delta) < 0.0015) {
        currentCardProgress.current = targetCardProgress.current;
        setCardProgress(currentCardProgress.current);
        rafRef.current = 0;
        return;
      }
      currentCardProgress.current += delta * 0.12;
      setCardProgress(currentCardProgress.current);
      rafRef.current = window.requestAnimationFrame(tick);
    }

    syncStickyTop();
    const init = window.requestAnimationFrame(() => {
      onScroll();
    });
    const observer = new ResizeObserver(() => {
      syncStickyTop();
      onScroll();
    });
    observer.observe(scrollEl);
    if (sceneRef.current) observer.observe(sceneRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncStickyTop);
    return () => {
      window.cancelAnimationFrame(init);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncStickyTop);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [scrollDriven]);

  useEffect(() => {
    if (scrollDriven || !autoPlay || reduceMotion) return;
    const id = window.setInterval(() => {
      setRotationProgress((prev) => {
        const next = (prev + 1) % automationCarouselSteps.length;
        setCardProgress(next);
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoPlay, intervalMs, reduceMotion, scrollDriven]);


  if (!scrollDriven) {
    return (
      <div className={`relative mx-auto w-full max-w-[54.8rem] ${className}`}>
        <LiveAutomationScene progress={rotationProgress} className="w-full" />
        <div className="relative z-10 mx-auto -mt-[18%] max-w-[24rem] px-4">
          <StepStack progress={cardProgress} showLink={showLink} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className={`relative mt-6 min-h-[320vh] pb-32 md:mt-8 md:min-h-[400vh] md:pb-0 ${className}`}
    >
      <div
        ref={stickyRef}
        className="sticky"
      >
        <div ref={sceneRef} className="relative w-full">
          <LiveAutomationScene
            progress={rotationProgress}
            className="w-[135%] max-w-none -ml-[17.5%] md:mx-auto md:w-full md:max-w-[54.8rem]"
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(65%+0.75rem)] z-[1] mx-auto w-full max-w-[22rem] transform-gpu md:top-[calc(65%+0.9rem)] md:max-w-[24rem]"
          >
            <StepStack progress={cardProgress} showLink={showLink} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StepStack({
  progress,
  showLink,
}: {
  progress: number;
  showLink: boolean;
}) {
  return (
    <div className="grid">
      {automationCarouselSteps.map((step, index) => {
        const opacity = cardOpacity(progress, index);
        return (
          <article
            key={step.id}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#22222c] px-7 pb-5 pt-5 text-center text-white shadow-[0_18px_48px_-24px_rgba(42,43,59,0.45)] [grid-area:1/1] ${
              opacity < 0.5 ? "pointer-events-none" : ""
            }`}
            style={{
              opacity,
              transform: `translateY(${(1 - opacity) * 14}px)`,
            }}
            aria-hidden={opacity < 0.5}
          >
            <span
              aria-hidden
              className="absolute -top-1.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-[3px] bg-[#22222c]"
            />
            <p className="flex items-center justify-center gap-2">
              <span className="relative flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFDD04]/70" />
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#FFDD04] text-[0.7rem] font-bold text-[#121217]">
                  {step.n}
                </span>
              </span>
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#FFDD04]">
                {step.label}
              </span>
            </p>
            <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug tracking-tight">
              {step.title}
            </h3>
            <p className="mx-auto mt-2.5 text-[0.86rem] leading-relaxed text-white/55 sm:text-sm">
              {step.body}
            </p>
            {showLink && "href" in step && step.href && opacity > 0.5 ? (
              <Link
                href={step.href}
                className="mt-4 inline-flex text-sm font-semibold text-[#FFDD04] hover:underline"
              >
                {step.linkLabel} →
              </Link>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
