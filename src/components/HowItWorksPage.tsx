"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { MotionWorkflow } from "./MotionWorkflow";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { BackgroundMesh } from "./BackgroundMesh";
import {
  JourneyTimeline,
  TimelineAccordion,
} from "./JourneyTimeline";

const DuvoOrb = dynamic(() => import("./DuvoOrb").then((m) => m.DuvoOrb), {
  ssr: false,
});


const captureItems = [
  {
    title: "Workshop notetaker",
    count: "1",
    heading: "Processes, value streams and opportunities",
    body: "Duvo’s notetaker joins a workshop focused on a business area, follows the discussion, and surfaces the processes, value streams, dependencies, and optimisation proposals.",
    chips: ["Processes and value streams", "Pain points and dependencies", "Optimisation proposals"],
  },
  {
    title: "Guided walkthroughs",
    count: "3",
    heading: "Follow the real screens and handoffs",
    body: "Agents guide screen walkthroughs so the map includes legacy UIs, no-API tools, and the messy middle between systems.",
    chips: ["Screen steps", "System hops", "Exception paths"],
  },
  {
    title: "AI interviews",
    count: "5",
    heading: "Capture judgment from the people doing the work",
    body: "Interviews reveal decision rules, tribal knowledge, and why the same process looks different across teams or markets.",
    chips: ["Decision rules", "Ownership", "Hidden variants"],
  },
  {
    title: "Existing evidence",
    count: "9",
    heading: "Reconcile SOPs with operational reality",
    body: "Existing SOPs, tickets, and workbooks become evidence — compared against what people actually do.",
    chips: ["SOPs", "Tickets", "Workbooks"],
  },
];

const deliverItems = [
  {
    title: "Process catalogue",
    heading: "Searchable process records",
    body: "Build a searchable view of how work runs, with the source evidence and operational judgment attached.",
    chips: ["Searchable process records", "Roles and ownership", "Linked source evidence"],
  },
  {
    title: "Process improvement",
    heading: "Prioritised change with evidence",
    body: "Surface friction, costly variance, and control gaps so the team can improve what matters first.",
    chips: ["Friction points", "Costly variance", "Control gaps"],
  },
  {
    title: "Transformation roadmap",
    heading: "A plan leaders can take forward",
    body: "Reconcile conflicting accounts into one transformation plan grounded in reviewed operating reality.",
    chips: ["Exec-ready plan", "Exception cost", "Cross-team alignment"],
  },
  {
    title: "SAP migration",
    heading: "SAP and non-SAP mapped together",
    body: "Map the real process across systems before migration and export agreed maps through BPMN.",
    chips: ["SAP + non-SAP", "BPMN export", "Migration fact base"],
  },
  {
    title: "Onboarding & training",
    heading: "Role-specific guides from real work",
    body: "Turn the reviewed process into training that matches how the job actually runs.",
    chips: ["Role guides", "Real exceptions", "Faster ramp"],
  },
  {
    title: "Reliable automation",
    heading: "Governed execution when you choose it",
    body: "Move from reviewed evidence into automation with approvals kept where risk requires judgment.",
    chips: ["Human gates", "Audit trail", "Existing systems"],
  },
];

const loopSteps = [
  {
    label: "V1 · Reviewed",
    title: "Current reality agreed",
    body: "Evidence and exceptions linked",
  },
  {
    label: "Change delivered",
    title: "A better way goes live",
    body: "The first useful outcome lands",
  },
  {
    label: "New evidence",
    title: "Duvo sees what changed",
    body: "Reality is compared with v1",
  },
  {
    label: "V2 · Ready",
    title: "The next move has context",
    body: "Improve, train, migrate, or automate",
  },
];

const press = ["SiliconANGLE", "Wired", "Lebensmittel Zeitung", "Tech.eu", "Omni Talk"];

export function HowItWorksPage() {
  const timelineSteps = [
    {
      label: "Capture fresh evidence",
      title: "Duvo agents capture how the work really runs.",
      contentOnLeft: true,
      visual: <TimelineAccordion items={captureItems} />,
    },
    {
      label: "Diagnose the operating reality",
      title: "Duvo reconciles the sources.",
      contentOnLeft: false,
      contentExtra: (
        <ul className="mt-6 max-w-[24rem] space-y-3 md:max-w-none">
          {[
            "Source evidence attached",
            "People review the truth",
            "Every version stays visible",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-[0.78rem] font-semibold text-white/60"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#5fe5d7]/30 bg-[#5fe5d7]/[0.08] text-[#5fe5d7]">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      ),
      visual: (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-semibold tracking-wide text-white/45 uppercase">
            Reconciled process
          </p>
          <p className="mt-2 text-lg font-semibold">
            Supplier statement reconciliation
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold tracking-wide uppercase">
            <span className="inline-flex items-center gap-2 text-[#5fe5d7]">
              <span className="h-2 w-2 rounded-full bg-[#5fe5d7]" />
              Records reconciled
            </span>
            <span className="inline-flex items-center gap-2 text-[#fc6951]">
              <span className="h-2 w-2 rounded-sm bg-[#fc6951]" />
              Judgment routed
            </span>
          </div>
          <div className="mt-6 h-40 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#1f1f2a,transparent_50%),linear-gradient(225deg,rgba(255,221,4,0.18),transparent_40%)]">
            <motion.div
              className="h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,221,4,0.35),transparent)]"
              animate={{ x: ["-60%", "280%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Deliver what comes next",
      title: "The reviewed process becomes the outcome you need.",
      contentOnLeft: true,
      visual: (
        <TimelineAccordion
          eyebrow="Outcome path"
          items={deliverItems.map((item) => ({
            title: item.title,
            heading: item.heading,
            body: item.body,
            chips: item.chips,
          }))}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#22222c] text-white">
      <SiteNav variant="dark" />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#22222c] pt-[8.2rem] pb-10 text-white md:pt-36 md:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]"
        >
          <BackgroundMesh mode="spiral" theme="dark" connectors riders />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center md:px-8">
          <FadeIn direction="up" delay={0.05}>
            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--yellow)] uppercase">
              How Duvo works
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <h1 className="mt-6 text-[2.4rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.4rem]">
              A living view of how{" "}
              <span className="text-[var(--yellow)]">work really runs.</span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Duvo’s AI notetaker joins workshops, while Duvo agents guide
              walkthroughs, interview the people doing the work, and analyse
              existing evidence. They reconcile what they find, surface variants
              and exceptions, and turn the reviewed process into the outcome your
              team needs to improve performance.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.35}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="pill bg-white px-6 py-3.5 text-sm font-semibold !text-[#121217]"
              >
                See what Duvo finds
              </Link>
              <a
                href="#workflow"
                className="pill border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                Watch the workflow
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.45} className="mt-12 md:mt-16">
            <DuvoOrb size={220} color="#ffffff" showStatus />
          </FadeIn>
        </div>
      </section>

      {/* Timeline with scroll-rail animation */}
      <section
        id="product-journey"
        className="relative scroll-mt-28 overflow-hidden bg-[#22222c] px-5 py-16 text-white md:px-8 md:py-24"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#faf7f2]/[0.035] to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <JourneyTimeline steps={timelineSteps} />

          <FadeIn direction="up" className="mx-auto mt-20 max-w-[56rem]">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
              Not a one-off mapping project
            </p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-4xl">
              Improving performance starts with a current view of how work runs
            </h3>
            <p className="mt-4 text-white/60">
              Each new workshop, document, or walkthrough is compared with the
              last reviewed version, so the next improvement, training plan,
              migration, or automation starts with current operating evidence
              instead of another discovery project.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {loopSteps.map((step) => (
                <div
                  key={step.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-xs font-semibold tracking-wide text-[var(--yellow)] uppercase">
                    {step.label}
                  </p>
                  <p className="mt-3 font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm text-white/55">{step.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">
              Same record. New evidence. Stronger next move.
            </p>
          </FadeIn>
        </div>
      </section>

      <MotionWorkflow />

      <section className="border-t border-white/10 px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            Featured in
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-white/45">
            {press.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-white/10 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn direction="up">
            <p className="section-label !text-white/45">
              What the shared record changes
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
              One operating truth. Different valuable outcomes.
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FadeIn direction="up" delay={0.05}>
              <article className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <p className="text-sm font-semibold text-white/55">Notino</p>
                <p className="mt-6 text-5xl font-medium tracking-tight">14 → 1</p>
                <p className="mt-2 text-xs font-semibold tracking-wide text-white/45 uppercase">
                  Versions of one process
                </p>
                <h3 className="mt-6 text-2xl font-medium">
                  One reviewed truth in a week
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Duvo reconciled fourteen accounts of the work, exposed what the
                  exceptions cost, and produced a transformation plan leaders could
                  use.
                </p>
                <Link
                  href="/#stories"
                  className="mt-6 inline-flex text-sm font-semibold text-[var(--yellow)]"
                >
                  Explore Clarity
                </Link>
              </article>
            </FadeIn>
            <FadeIn direction="up" delay={0.12}>
              <article className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <p className="text-sm font-semibold text-white/55">Pilulka</p>
                <p className="mt-6 text-5xl font-medium tracking-tight">+15%</p>
                <p className="mt-2 text-xs font-semibold tracking-wide text-white/45 uppercase">
                  Availability in two weeks
                </p>
                <h3 className="mt-6 text-2xl font-medium">
                  Reviewed context became controlled action
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Pilulka moved from the mapped process into approved execution
                  through the interfaces its team already used, without an IT
                  rebuild.
                </p>
                <Link
                  href="/#stories"
                  className="mt-6 inline-flex text-sm font-semibold text-[var(--yellow)]"
                >
                  Read the customer story
                </Link>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-5 py-20 md:px-8 md:py-28">
        <FadeIn direction="up" className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-white/45 uppercase">
            Next step
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            Start with one process. Leave with the outcome you need.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60 md:text-lg">
            Bring a walkthrough, SOP, or team. Duvo turns the evidence into a
            process catalogue, improvement plan, transformation roadmap, migration
            fact base, training guide, or reliable automation.
          </p>
          <Link
            href="/#start"
            className="pill mt-8 inline-flex bg-[var(--yellow)] px-6 py-3.5 text-sm font-semibold text-[#121217]"
          >
            Start with one process
          </Link>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold tracking-wide text-white/45 uppercase">
            {[
              "SOC 2 Type II",
              "ISO 27001",
              "ISO 42001",
              "GDPR",
              "Zero Data Retention",
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/15 px-4 py-2"
              >
                {badge}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      <div className="bg-[var(--bg-soft)] text-[var(--fg)]">
        <SiteFooter />
      </div>
    </div>
  );
}
