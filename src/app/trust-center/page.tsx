import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Security & compliance trust center: SOC 2, ISO - Duvo",
  description:
    "Policies, certifications, subprocessors, and review contacts in one place.",
};

const badges = [
  { src: "/badges-icons/trust-soc2.svg", alt: "SOC 2 Type II Certified" },
  { src: "/badges-icons/trust-ISO-27001.svg", alt: "ISO 27001 Certified" },
  { src: "/badges-icons/trust-ISO-42001.svg", alt: "ISO 42001 Certified" },
  { src: "/badges-icons/trust-GDPR.svg", alt: "GDPR Compliant" },
  { src: "/badges-icons/trust-badge-zdr.svg", alt: "Zero Data Retention" },
];

const policies = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

const subprocessors = [
  { name: "Google Cloud Platform", purpose: "Infrastructure & compute" },
  { name: "Vercel", purpose: "Application hosting" },
  { name: "GitHub", purpose: "Source control & CI" },
  { name: "Anthropic", purpose: "AI model inference" },
  { name: "E2B", purpose: "Secure sandbox execution" },
  { name: "Slack", purpose: "Customer notifications" },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Trust center"
        title="Security review should not require a second sales call."
        description="Policies, certifications, subprocessors, and review contacts in one place."
        ctas={[
          { href: "/enterprise", label: "Enterprise controls", primary: true },
          { href: "/contact", label: "Contact security" },
        ]}
      />
      <section className="border-t border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <h2 className="text-2xl font-medium tracking-tight">Certifications</h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
              Duvo maintains SOC 2 Type II, ISO 27001, and ISO 42001 certifications.
              Customer data is not used to train models. Zero data retention options
              are available for enterprise deployments.
            </p>
          </FadeIn>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {badges.map((badge) => (
              <Image
                key={badge.alt}
                src={badge.src}
                alt={badge.alt}
                width={96}
                height={96}
                className="h-20 w-20 object-contain"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <h2 className="text-2xl font-medium tracking-tight">Policies</h2>
          </FadeIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {policies.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-2xl border border-[var(--line)] bg-white p-5 text-sm font-semibold hover:border-[var(--fg)]/20"
              >
                {p.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <h2 className="text-2xl font-medium tracking-tight">Subprocessors</h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
              Representative subprocessors that may process customer data as part
              of delivering the Duvo service.
            </p>
          </FadeIn>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-white">
            <div className="grid grid-cols-2 gap-0 border-b border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              <span>Provider</span>
              <span>Purpose</span>
            </div>
            {subprocessors.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-1 gap-1 border-b border-[var(--line)] px-4 py-4 last:border-0 sm:grid-cols-2"
              >
                <p className="text-sm font-semibold">{row.name}</p>
                <p className="text-sm text-[var(--muted)]">{row.purpose}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--muted)]">
            For security questionnaires or vendor review packs, contact{" "}
            <a href="mailto:security@duvo.ai" className="font-semibold text-[var(--fg)]">
              security@duvo.ai
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
