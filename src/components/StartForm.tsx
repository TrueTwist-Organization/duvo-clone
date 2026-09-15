"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { BackgroundMesh } from "./BackgroundMesh";
import { FadeIn } from "./FadeIn";

type Status = "idle" | "loading" | "success" | "error";

const badges = [
  { src: "/badges-icons/trust-soc2.svg", alt: "SOC 2 Type II Certified" },
  { src: "/badges-icons/trust-ISO-27001.svg", alt: "ISO 27001 Certified" },
  { src: "/badges-icons/trust-ISO-42001.svg", alt: "ISO 42001 Certified" },
  { src: "/badges-icons/trust-GDPR.svg", alt: "GDPR Compliant" },
  { src: "/badges-icons/trust-badge-zdr.svg", alt: "Zero Data Retention" },
];

export function StartForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const message = String(form.get("message") ?? "").trim();
    const params = new URLSearchParams();
    if (message) params.set("message", message);
    router.push(`/contact${params.size ? `?${params.toString()}` : ""}#book-demo`);
  }

  return (
    <section
      id="start"
      className="relative overflow-hidden bg-[#22222c] text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <BackgroundMesh mode="spiral" theme="dark" connectors riders />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
        <FadeIn direction="up">
          <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-white/55 uppercase">
            Next step
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            Start with one process. Leave with the outcome you need.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/65 md:text-lg">
            Bring a walkthrough, SOP, or team. Duvo turns the evidence into a
            process catalogue, improvement plan, transformation roadmap,
            migration fact base, training guide, or reliable automation.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.15}>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-full border border-white/10 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
          >
            <input
              required
              name="message"
              placeholder="Describe the process and what your team needs…"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="pill bg-[var(--yellow)] px-5 py-3 text-sm font-semibold !text-[var(--fg)] disabled:opacity-60"
            >
              {status === "loading" ? "…" : "Enter"}
            </button>
          </form>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} className="mt-16">
          <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-white/55 uppercase">
            Trusted and certified
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {badges.map((badge) => (
              <Image
                key={badge.alt}
                src={badge.src}
                alt={badge.alt}
                width={88}
                height={88}
                className="h-16 w-16 object-contain md:h-20 md:w-20"
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
