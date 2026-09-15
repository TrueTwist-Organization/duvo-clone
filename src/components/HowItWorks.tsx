"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

const captureItems = [
  {
    title: "Workshop notetaker",
    heading: "Surface the processes and value streams",
    body: "Duvo’s notetaker joins a workshop focused on a business area, follows the discussion, and surfaces the processes, value streams, dependencies, and optimisation proposals.",
    chips: ["Processes and value streams", "Pain points and dependencies", "Optimisation proposals"],
  },
  {
    title: "Walkthroughs",
    heading: "Follow the real screens and handoffs",
    body: "Agents guide screen walkthroughs so the map includes legacy UIs, no-API tools, and the messy middle between systems.",
    chips: ["Screen steps", "System hops", "Exception paths"],
  },
  {
    title: "Interviews",
    heading: "Capture judgment from the people doing the work",
    body: "Interviews reveal decision rules, tribal knowledge, and why the same process looks different across teams or markets.",
    chips: ["Decision rules", "Ownership", "Hidden variants"],
  },
  {
    title: "Documents",
    heading: "Reconcile SOPs with operational reality",
    body: "Existing SOPs, tickets, and workbooks become evidence — compared against what people actually do.",
    chips: ["SOPs", "Tickets", "Workbooks"],
  },
];

const deliverItems = [
  "Process catalogue",
  "Process improvement",
  "Transformation roadmap",
  "SAP migration",
  "Reliable automation",
  "Onboarding & training",
];

export function HowItWorks() {
  const [open, setOpen] = useState(0);

  return (
    <section id="how" className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <FadeIn direction="up">
          <p className="section-label">How Duvo works</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
            Capture the process. Reveal what should change. Deliver the outcome.
          </h2>
          <p className="mt-5 max-w-3xl text-[var(--muted)] md:text-lg">
            Duvo’s AI notetaker joins workshops, while Duvo agents guide screen
            walkthroughs, interview the people doing the work, and analyse existing
            documents. They reconcile conflicting evidence, surface exceptions, and
            turn the findings into the outcome your team needs.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn direction="up" delay={0.1}>
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)]">
              01 · CAPTURE
            </p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight">
              Duvo agents capture how the work really runs.
            </h3>
            <div className="mt-6 space-y-2">
              {captureItems.map((item, index) => {
                const active = open === index;
                return (
                  <div
                    key={item.title}
                    className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(index)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
                    >
                      <span>
                        {index + 1} {item.title}
                      </span>
                      <span className="text-[var(--muted)]">{active ? "–" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="border-t border-[var(--line)] px-4 pb-4"
                        >
                          <p className="pt-3 text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                            Evidence captured
                          </p>
                          <p className="mt-2 text-base font-semibold">{item.heading}</p>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                            {item.body}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.chips.map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full bg-[var(--bg-soft)] px-3 py-1 text-xs text-[var(--fg)]"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.18}>
            <div className="rounded-3xl border border-[var(--line)] bg-white p-6 md:p-8">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)]">
                02 · DIAGNOSE
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">
                See how the process runs and what should improve
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Duvo resolves conflicting accounts, then surfaces friction, costly
                variance, control gaps, and transformation opportunities for the team
                to review.
              </p>
              <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-5">
                <p className="text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                  Reconciled process
                </p>
                <p className="mt-2 text-lg font-semibold">Purchase order confirmation</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-[var(--muted)]">Variants reconciled</p>
                    <p className="mt-1 text-2xl font-medium">14</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-[var(--muted)]">Exceptions surfaced</p>
                    <p className="mt-1 text-2xl font-medium">7</p>
                  </div>
                </div>
                <div className="mt-5 h-28 overflow-hidden rounded-xl bg-gradient-to-br from-[#fff7b0] via-white to-[#ececef]">
                  <motion.div
                    className="h-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,221,4,0.35),transparent)]"
                    animate={{ x: ["-40%", "160%"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.1} className="mt-16">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)]">
            03 · DELIVER
          </p>
          <h3 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight md:text-3xl">
            Duvo turns the findings into the outcome you need.
          </h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {deliverItems.map((item) => (
              <span
                key={item}
                className="pill border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
