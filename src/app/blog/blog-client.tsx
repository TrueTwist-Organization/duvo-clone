"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { blogPosts } from "@/content/blog";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export function BlogClient() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [page, setPage] = useState(1);

  const tags = useMemo(
    () => ["All", ...new Set(blogPosts.map((p) => p.tag))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesTag = tag === "All" || post.tag === tag;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tag.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [query, tag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const featured = blogPosts[0];

  return (
    <section className="border-t border-[var(--line)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {featured ? (
          <FadeIn direction="up">
            <article className="mb-12 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg-soft)] p-8 md:p-10">
              <p className="text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                Featured · {featured.tag}
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
                {featured.excerpt}
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-5 inline-block text-sm font-semibold"
              >
                Read article →
              </Link>
            </article>
          </FadeIn>
        ) : null}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="search"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full max-w-md rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--fg)]/30 md:w-auto"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTag(t);
                  setPage(1);
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  tag === t
                    ? "border-[var(--fg)] bg-[var(--fg)] text-white"
                    : "border-[var(--line)] bg-white",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm text-[var(--muted)]">
          Showing {(currentPage - 1) * PAGE_SIZE + 1}–
          {Math.min(currentPage * PAGE_SIZE, filtered.length)} of{" "}
          {filtered.length}
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {slice.map((post, i) => (
            <FadeIn key={post.slug} direction="up" delay={i * 0.03}>
              <article className="h-full rounded-3xl border border-[var(--line)] bg-white p-6">
                <p className="text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
                  {post.tag} · {post.date}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold"
                >
                  Read article →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-semibold disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-3 text-sm text-[var(--muted)]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-semibold disabled:opacity-40"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
