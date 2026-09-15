"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookingCalendar } from "@/components/BookingCalendar";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

const outcomes = [
  {
    key: "understand",
    eyebrow: "Understand, share & improve",
    title: "Create a catalogue, training guide, or improvement plan.",
    body: "Best for process discovery, knowledge sharing, onboarding, cross-team alignment, and prioritizing practical improvements.",
    bookingTitle: "Book a discovery conversation",
  },
  {
    key: "transform",
    eyebrow: "Transform or migrate",
    title: "Turn process evidence into a transformation roadmap.",
    body: "Best for standardization, operating-model change, SAP migration, Signavio handoff, and SI readiness.",
    bookingTitle: "Book a transformation conversation",
  },
  {
    key: "automate",
    eyebrow: "Automate",
    title: "Run an approved process with context.",
    body: "Best when the process is already clear and you want governed automation with approvals intact.",
    bookingTitle: "Book an automation conversation",
  },
] as const;

export default function ContactPage() {
  const search = useSearchParams();
  const initial = search.get("outcome") ?? "automate";
  const [selected, setSelected] = useState(initial);

  useEffect(() => {
    const key = search.get("outcome");
    if (key && outcomes.some((o) => o.key === key)) setSelected(key);
    const message = search.get("message");
    if (message) {
      const el = document.getElementById("book-demo");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [search]);

  const active = useMemo(
    () => outcomes.find((o) => o.key === selected) ?? outcomes[2],
    [selected],
  );

  return (
    <PageShell>
      <MarketingHero
        title="What do you want from this process?"
        description="Start with the outcome you need now. Duvo captures the real work, reveals what should improve or transform, and delivers the result your team can act on."
        align="center"
      />

      <section className="border-t border-[var(--line)] py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3 md:px-8">
          {outcomes.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setSelected(item.key);
                const url = new URL(window.location.href);
                url.searchParams.set("outcome", item.key);
                url.hash = "book-demo";
                window.history.replaceState({}, "", url.toString());
              }}
              className={`rounded-3xl border p-5 text-left transition ${
                selected === item.key
                  ? "border-[#2a2b3b] bg-white shadow-sm"
                  : "border-[var(--line)] bg-[var(--bg-soft)] hover:bg-white"
              }`}
            >
              <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                {item.eyebrow}
              </p>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.body}
              </p>
              <p className="mt-4 text-sm font-semibold">Choose this outcome →</p>
            </button>
          ))}
        </div>
      </section>

      <section
        id="book-demo"
        className="scroll-mt-28 bg-[var(--bg)] pb-20 md:pb-28"
      >
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="mx-auto mb-8 max-w-xl text-center md:mb-10">
            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--muted)] uppercase">
              {active.eyebrow}
            </p>
            <h2 className="mt-4 text-[2rem] font-medium tracking-tight md:text-[2.55rem]">
              {active.bookingTitle}
            </h2>
          </div>
          <BookingCalendar outcomeLabel={active.eyebrow} />
        </div>
      </section>
    </PageShell>
  );
}
