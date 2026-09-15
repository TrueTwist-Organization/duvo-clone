import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";
import { blogPosts, getPost } from "@/content/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog - Duvo" };
  return { title: `${post.title} - Duvo`, description: post.excerpt };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <MarketingHero
        eyebrow={`${post.tag} · ${post.date}`}
        title={post.title}
        description={post.excerpt}
        ctas={[
          { href: "/blog", label: "All posts" },
          { href: "/contact", label: "Talk to Duvo", primary: true },
        ]}
      />
      <article className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-5 md:px-8">
          {post.body.map((para, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.05}>
              <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
                {para}
              </p>
            </FadeIn>
          ))}
          <Link href="/blog" className="inline-block pt-6 text-sm font-semibold">
            ← Back to blog
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
