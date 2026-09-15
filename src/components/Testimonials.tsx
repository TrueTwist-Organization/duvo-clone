"use client";

import Image from "next/image";
import { FadeIn } from "./FadeIn";

const quotes = [
  {
    name: "Ajay Kavan",
    role: "Amazon ex-VP Amazon Fresh International",
    quote:
      "I’ve backed Duvo because the founding team understands retail operations from the inside. That’s why it goes live in days instead of months and survives the messy reality of retail and CPG operations.",
    image: "/testimonials/ajay-kavan.png",
  },
  {
    name: "Mark Simpson",
    role: "ex-SVP Supply Chain, ex-Chief Transformation Officer, ASDA",
    quote:
      "UK retail margins are incredibly thin at usually around 1–3%. Every CFO has a number to hit. Duvo is the rare answer that takes cost out without breaking the operation.",
    image: "/testimonials/mark-simpson.png",
  },
  {
    name: "Ross Eggleton",
    role: "ex-Group Logistics & Supply Chain Director, Morrisons",
    quote:
      "I’ve never seen anything quite like Duvo - it maps the real process, not the assumed one, helping retailers simplify operations and unlock multi-million-pound efficiency opportunities.",
    image: "/testimonials/ross-eggleton.png",
  },
];

export function Testimonials() {
  return (
    <section
      id="endorsements"
      className="border-t border-[var(--line)] bg-[var(--bg)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <FadeIn direction="up" className="max-w-3xl">
          <p className="section-label">Testimonials</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">
            The people closest to operations see the difference.
          </h2>
          <p className="mt-4 text-[var(--muted)] md:text-lg">
            Leaders who have run complex, multi-system operations on why
            understanding the real process changes what becomes possible.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map((item, i) => (
            <FadeIn key={item.name} direction="up" delay={i * 0.06}>
              <figure className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-white">
                <div className="relative h-48 overflow-hidden bg-[var(--bg-soft)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <blockquote className="flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{item.role}</p>
                  </figcaption>
                </div>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
