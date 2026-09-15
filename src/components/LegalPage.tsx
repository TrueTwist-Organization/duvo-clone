import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

type Props = {
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; body: string }[];
};

export function LegalPage({ title, description, updated, sections }: Props) {
  return (
    <PageShell>
      <MarketingHero eyebrow="Document" title={title} description={description} />
      <section className="border-t border-[var(--line)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-5 md:px-8">
          <p className="text-sm text-[var(--muted)]">Last updated: {updated}</p>
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
