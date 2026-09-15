import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { MarketingHero } from "@/components/MarketingHero";
import { MarkerHighlight } from "@/components/MarkerHighlight";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Pulse: chat-driven dashboards on live Duvo data",
  description:
    "Turn a sentence into a live dashboard. Pulse builds interactive KPI boards on your real automation data in seconds.",
};

const problems = [
  {
    title: "The data-plumbing tax",
    body: "Before you can chart anything, you export from reporting tools, clean it, and wire it up. The plumbing was the job.",
  },
  {
    title: "Days of work per view",
    body: "Excel, Sheets, pivot tables, and a chain of people just to get one view that's easy to interpret. Every new question restarted the cycle.",
  },
  {
    title: "Stale numbers, single owner",
    body: "Snapshots go out of date the moment they're built. If the spreadsheet owner is away, nobody updates the numbers.",
  },
];

const features = [
  {
    title: "Live KPIs",
    body: "Cards calculate from live Duvo data. KPIs refresh with the viewer's permissions — no stale snapshots.",
  },
  {
    title: "Versioned",
    body: "Every generated dashboard is versioned. Preview, restore, share, and keep the current board clean.",
  },
  {
    title: "Edit in chat",
    body: "Refine metrics, charts, filters, and layout by chatting beside the canvas. Changes apply in place.",
  },
  {
    title: "Trend view",
    body: "Chart backlog, risk, or throughput over time while keeping underlying cases available for follow-up.",
  },
];

const kpiBoards = [
  "Automation rate, processing speed, failure rate, throughput, time-to-first-action",
  "Agent-performance monitoring: trends, timelines, spikes, drop-offs",
  "Management-ready overviews with drill-down to case level",
  "Ad-hoc investigation by queue, reason, or status",
  "Replace the Excel + pivot workflow — data already lives in Duvo",
];

const execMetrics = [
  {
    num: "01",
    title: "Footprint",
    body: "Agents in production, % deployed, new agents this period.",
  },
  {
    num: "02",
    title: "Usage",
    body: "Runs, and runs per user / per headcount.",
  },
  {
    num: "03",
    title: "Reliability",
    body: "Eval pass rate, fallback success, P1 incidents, recovered vs failed runs.",
  },
  {
    num: "04",
    title: "Adoption",
    body: "Active users, % of headcount, per department.",
  },
];

const quotes = [
  {
    text: "I can't even count the days I've spent on this. It was days of work: different people involved, all sequential. Now it's reduced to seconds, down to one Pulse dashboard.",
    role: "Operations / process-excellence lead",
  },
  {
    text: "We actually built an agent to monitor an agent's performance, just to extract the data. With Pulse you're working in the same environment, on the same data that's already there.",
    role: "Operations / process-excellence lead",
  },
];

export default function Page() {
  return (
    <PageShell>
      <MarketingHero
        eyebrow="Duvo Pulse"
        title="Turn a sentence into a live dashboard."
        description="Pulse is a chat-driven dashboard builder. Describe what you want in plain language, and a Duvo agent builds a live, interactive, drill-down dashboard on your real data — in seconds."
        ctas={[
          { href: "/contact?outcome=pulse#book-demo", label: "Book a Pulse session", primary: true },
          { href: "#how-pulse-works", label: "See Pulse in action" },
        ]}
        align="center"
      />

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-10">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3 px-5 text-sm font-medium text-[var(--muted)] md:px-8">
          {[
            "Days of work, now seconds",
            "Always live, never stale",
            "No BI tickets, no SQL",
            "One home for automation KPIs",
          ].map((item) => (
            <span key={item}>✓ {item}</span>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">The problem</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
              The hard part of dashboarding was never the chart.{" "}
              <MarkerHighlight>The plumbing was the job.</MarkerHighlight>
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problems.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-[var(--line)] bg-white p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="how-pulse-works" className="border-t border-[var(--line)] bg-[#22222c] py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-white/55 uppercase">
              How Pulse works
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-4xl">
              You describe it. The agent builds it. You refine by chatting.
            </h2>
            <p className="mt-4 max-w-2xl text-white/65">
              Split-screen workspace: dashboard on the left, chat on the right.
              The output is a real interactive micro-app — not a static export.
            </p>
          </FadeIn>
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a22] p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Open exceptions", value: "40", delta: "+12%" },
                { label: "Critical", value: "22", delta: "+8%" },
                { label: "Overdue", value: "28", delta: "-5%" },
                { label: "Value at risk", value: "€460K", delta: "+15%" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{kpi.value}</p>
                  <p className="mt-1 text-xs text-emerald-400">{kpi.delta}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-white/45">
              PO Exception Monitor — live preview from Pulse
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">One place for automation KPIs</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-4xl">
              Every automation KPI, in one live place.
            </h2>
          </FadeIn>
          <ol className="mt-12 space-y-4">
            {kpiBoards.map((item, i) => (
              <FadeIn key={item} direction="up" delay={i * 0.03}>
                <li className="flex gap-4 rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-5">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed">{item}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">The executive angle</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-4xl">
              Point Pulse across every team — a boardroom instrument for ROI.
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {execMetrics.map((item, i) => (
              <FadeIn key={item.title} direction="up" delay={i * 0.04}>
                <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
                  <p className="text-xs font-bold text-[var(--muted)]">{item.num}</p>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <FadeIn direction="up">
            <p className="section-label">Voice of the customer</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
              From days of work to a single chat.
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {quotes.map((q) => (
              <blockquote
                key={q.text.slice(0, 40)}
                className="rounded-3xl border border-[var(--line)] bg-white p-8"
              >
                <p className="text-lg leading-relaxed">&ldquo;{q.text}&rdquo;</p>
                <footer className="mt-4 text-sm text-[var(--muted)]">{q.role}</footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/contact?outcome=pulse#book-demo"
              className="pill bg-[var(--yellow)] px-5 py-3 text-sm font-semibold !text-[var(--fg)]"
            >
              Build your org-wide ROI board
            </Link>
            <Link
              href="/contact"
              className="pill border border-[var(--line)] px-5 py-3 text-sm font-semibold"
            >
              See Pulse in action
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
