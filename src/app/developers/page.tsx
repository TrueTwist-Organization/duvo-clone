import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Duvo Developer Platform",
  description:
    "Production operating layer: durable queues, agents, tools, approvals, files, schedules, webhooks, multi-agent routing, MCP, and audit-ready runs.",
};

const links = [
  { title: "OpenAPI", href: "https://www.duvo.ai/openapi.json", body: "Live OpenAPI for public API endpoints." },
  { title: "Auth guide", href: "https://www.duvo.ai/auth.md", body: "Scopes, SSO, tenant controls, credentials." },
  { title: "Webhooks", href: "https://www.duvo.ai/webhooks.md", body: "Delivery, retry, signatures, events." },
  { title: "MCP", href: "https://www.duvo.ai/mcp.md", body: "Hosted and custom MCP servers for Duvo agents." },
  { title: "CLI", href: "https://www.npmjs.com/package/@duvoai/cli", body: "npm i -g @duvoai/cli · Node ≥ 22.22" },
  { title: "Docs hub", href: "https://docs.duvo.ai/", body: "Product documentation and quick starts." },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        title="Duvo Developer Platform"
        description="Production operating layer for durable queues, agents, tools, approvals, files, schedules, webhooks, multi-agent routing, MCP, and audit-ready runs."
        ctas={[
          { href: "https://docs.duvo.ai/getting-started/quick-start", label: "Quick start", primary: true },
          { href: "/contact", label: "Request workspace access" },
        ]}
      />
      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Resources</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight">
              Predictable URLs for agents and humans.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {links.map((link, i) => (
              <FadeIn key={link.title} direction="up" delay={i * 0.04}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full rounded-3xl border border-[var(--line)] bg-white p-6 transition hover:border-[var(--fg)]/25"
                >
                  <h3 className="font-semibold">{link.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{link.body}</p>
                </a>
              </FadeIn>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm text-[var(--muted)]">
            API, MCP, webhook, and sandbox access require a provisioned Duvo
            workspace. Agents cannot bypass customer RBAC, SSO, policy gates, or
            required human approvals.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
