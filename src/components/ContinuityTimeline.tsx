"use client";

import { motion, useInView } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useRef } from "react";

const GRADIENT =
  "linear-gradient(90deg, rgb(95, 229, 215) 0%, rgb(255, 221, 4) 33.333%, rgb(140, 166, 255) 66.666%, rgb(252, 105, 81) 100%)";

const steps = [
  {
    label: "v1 · Reviewed process",
    title: "Current reality agreed",
    body: "Evidence, decisions, and exceptions linked",
    color: "rgb(95, 229, 215)",
    glow: "rgba(95, 229, 215, 0.28)",
  },
  {
    label: "Change delivered",
    title: "A better way put into practice",
    body: "The first useful outcome lands",
    color: "rgb(255, 221, 4)",
    glow: "rgba(255, 221, 4, 0.3)",
  },
  {
    label: "v2 · Reviewed again",
    title: "See what changed",
    body: "The new reality is compared with v1",
    color: "rgb(140, 166, 255)",
    glow: "rgba(140, 166, 255, 0.28)",
  },
  {
    label: "Next outcome",
    title: "Continue from shared context",
    body: "Improve, train, migrate, or automate",
    color: "rgb(252, 105, 81)",
    glow: "rgba(252, 105, 81, 0.26)",
  },
] as const;

export function ContinuityTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} className="relative mt-12 md:mt-16">
      <div className="absolute top-[0.3125rem] right-[12.5%] left-[12.5%] hidden h-[2px] overflow-hidden md:block">
        <div className="absolute inset-0 opacity-25" style={{ background: GRADIENT }} />
        <motion.div
          aria-hidden
          className="absolute inset-0 origin-left"
          style={{ background: GRADIENT }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ol className="relative grid gap-5 md:grid-cols-4 md:gap-5">
        {steps.map((step, index) => (
          <motion.li
            key={step.label}
            className="relative flex flex-col"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              delay: 0.12 + index * 0.12,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              aria-hidden
              className="relative z-10 mx-auto block size-3 rounded-full"
              style={{
                backgroundColor: step.color,
                boxShadow: `0 0 0 5px ${step.glow}, 0 0 20px ${step.glow}`,
              }}
            />
            <div className="mt-4 flex-1 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-5 py-5 md:mt-6 md:px-5 md:py-6">
              <p
                className="text-[0.59rem] font-semibold tracking-[0.13em] uppercase"
                style={{ color: step.color }}
              >
                {step.label}
              </p>
              <h4 className="mt-3 text-[0.88rem] font-semibold leading-[1.36] text-white/90 md:text-[0.92rem]">
                {step.title}
              </h4>
              <p className="mt-2 text-[0.72rem] leading-[1.55] text-white/48 md:text-[0.75rem]">
                {step.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-9 flex w-fit items-center gap-2.5 rounded-full border border-yellow/20 bg-yellow/[0.06] px-4 py-2.5 text-center text-[0.62rem] font-semibold tracking-[0.115em] text-white/62 uppercase md:mt-11"
      >
        <RefreshCw className="h-3.5 w-3.5 text-[var(--yellow)]" strokeWidth={1.7} />
        Same record. New evidence. Stronger next move.
      </motion.p>
    </div>
  );
}
