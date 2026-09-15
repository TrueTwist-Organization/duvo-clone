import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Duvo Manager Playbook",
  description:
    "Operating manual for people who manage someone at Duvo. Management sits on top of craft.",
};

const sections = [
  {
    title: "Manager standard",
    body: "Management sits on top of craft. There is no dedicated management track — you still ship.",
  },
  {
    title: "Hiring & onboarding",
    body: "Ashby for hiring, Humaans for people ops. 90-day and 6-month reviews, then bi-annual talent review.",
  },
  {
    title: "Performance & feedback",
    body: "Say it straight, now. 1:1s are for unblocking outcomes, not status theatre.",
  },
  {
    title: "Authority limits",
    body: "PTO is inform-not-request. People ops owns leave, compensation, and complaints.",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        title="Duvo Manager Playbook"
        description="Operating manual for people who manage someone at Duvo. Management sits on top of craft."
        ctas={[
          { href: "/culture", label: "Read culture", primary: true },
          { href: "/company", label: "Company & careers" },
        ]}
      />
      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2 md:px-8">
          {sections.map((section, i) => (
            <FadeIn key={section.title} direction="up" delay={i * 0.05}>
              <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{section.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
          <Link href="/culture" className="text-sm font-semibold">
            ← Back to culture
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
