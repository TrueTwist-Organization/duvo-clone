"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { customerStories } from "@/content/stories";
import { cn } from "@/lib/utils";

const filters = ["All", "Supply Chain", "Finance", "Sales"] as const;
type Filter = (typeof filters)[number];

export function CustomerStoriesClient() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (active === "All") return customerStories;
    return customerStories.filter((s) => s.category === active);
  }, [active]);

  return (
    <section className="border-t border-[var(--line)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                active === f
                  ? "border-[var(--fg)] bg-[var(--fg)] text-white"
                  : "border-[var(--line)] bg-white hover:border-[var(--fg)]/30",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="mb-8 text-sm text-[var(--muted)]">
          {filtered.length} stor{filtered.length === 1 ? "y" : "ies"}
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((story, i) => (
            <FadeIn key={story.slug} direction="up" delay={i * 0.03}>
              <article className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-white p-6 md:p-8">
                <p className="text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                  {story.category} · {story.tag}
                </p>
                <p className="mt-3 text-sm font-semibold">{story.company}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  {story.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {story.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  {story.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <p className="text-lg font-medium">{m.value}</p>
                      <p className="text-xs text-[var(--muted)]">{m.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/customer-stories/${story.slug}`}
                  className="mt-6 text-sm font-semibold"
                >
                  Read story →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
