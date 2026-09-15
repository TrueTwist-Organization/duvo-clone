import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryPage } from "@/components/StoryPage";
import { customerStories, getStory } from "@/content/stories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return customerStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Customer story - Duvo" };
  return {
    title: `${story.company}: ${story.title.slice(0, 60)} | Duvo`,
    description: story.summary,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  return <StoryPage story={story} />;
}
