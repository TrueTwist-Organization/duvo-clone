"use client";

import { FadeIn } from "./FadeIn";
import { ContinuityTimeline } from "./ContinuityTimeline";
import { JourneyTimeline, TimelineAccordion } from "./JourneyTimeline";

const captureItems = [
  {
    count: "1",
    title: "Workshop notetaker",
    heading: "Surface the processes and value streams",
    body: "Duvo’s notetaker joins a workshop focused on a business area, follows the discussion, and surfaces the processes, value streams, dependencies, and optimisation proposals.",
    chips: [
      "Processes and value streams",
      "Pain points and dependencies",
      "Optimisation proposals",
    ],
  },
  {
    count: "4",
    title: "Walkthroughs",
    heading: "See the work as it happens",
    body: "Duvo agents guide people through the process screen by screen, capturing the steps, systems, handoffs, judgment, and workarounds.",
    chips: [
      "Screens and systems",
      "Handoffs and decisions",
      "Workarounds in context",
    ],
  },
  {
    count: "7",
    title: "Interviews",
    heading: "Capture the judgment behind the steps",
    body: "Duvo agents interview the people doing the work, compare their accounts, and ask follow-up questions wherever the evidence conflicts.",
    chips: ["Role-specific context", "Decision rationale", "Conflicting accounts"],
  },
  {
    count: "12",
    title: "Documents",
    heading: "Ground the process in existing evidence",
    body: "Duvo ingests and analyses SOPs, policies, and source documents, linking what is written to what people actually do.",
    chips: [
      "SOPs and policies",
      "Forms and source files",
      "Evidence linked to steps",
    ],
  },
];

const deliverItems = [
  {
    title: "Process catalogue",
    heading: "Living process catalogue",
    body: "Build a searchable view of how work runs, with the source evidence and operational judgment attached.",
    chips: [
      "Searchable process records",
      "Roles and ownership",
      "Linked source evidence",
    ],
  },
  {
    title: "Process improvement",
    heading: "Approved standard process",
    body: "Compare local variants and agree on one better way of working without losing important exceptions.",
    chips: ["Variant comparison", "Best-practice design", "Review and sign-off"],
  },
  {
    title: "Transformation roadmap",
    heading: "Prioritized transformation roadmap",
    body: "See where the process breaks, what it costs, and which changes will create the most value.",
    chips: ["Friction and cost hotspots", "Change proposals", "Value-based priorities"],
  },
  {
    title: "SAP migration",
    heading: "Migration-ready process model",
    body: "Give SAP teams and partners a fact base spanning SAP, non-SAP work, handoffs, and exceptions.",
    chips: ["Current-state model", "Gap and workaround register", "BPMN 2.0 handoff"],
  },
  {
    title: "Reliable automation",
    heading: "Automation implementation brief",
    body: "Run an approved process with its rules, controls, and exceptions intact from the first production version.",
    chips: [
      "System and action map",
      "Decision rules",
      "Approvals and escalation paths",
    ],
  },
  {
    title: "Onboarding & training",
    heading: "Role-specific onboarding guide",
    body: "Turn the real process into a practical guide for people doing the work for the first time.",
    chips: [
      "Step-by-step walkthrough",
      "Decision rationale",
      "Exception handling",
    ],
  },
];


function DiagnoseVisual() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <p className="text-xs font-semibold tracking-wide text-white/45 uppercase">
        Reconciled process
      </p>
      <p className="mt-2 text-lg font-semibold tracking-tight">
        Purchase order confirmation
      </p>
      <div className="mt-4 flex flex-wrap gap-4 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
        <span className="inline-flex items-center gap-2 text-[#5fe5d7]">
          <span className="h-2 w-2 rounded-full bg-[#5fe5d7]" />
          Variants reconciled
        </span>
        <span className="inline-flex items-center gap-2 text-[#fc6951]">
          <span className="h-2 w-2 rounded-sm bg-[#fc6951]" />
          Exceptions surfaced
        </span>
      </div>

      <div className="mt-6 space-y-3 font-mono text-[0.72rem] text-white/70">
        <div className="flex flex-wrap gap-2">
          {["Start", "Open PO", "SAP", "Check confirmation rule"].map((step) => (
            <span
              key={step}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1"
            >
              {step}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-[#5fe5d7]/25 bg-[#5fe5d7]/[0.06] p-3">
          <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#5fe5d7] uppercase">
            Variance surfaced
          </p>
          <p className="mt-1.5 font-sans text-sm text-white/85">
            Critical items follow a different confirmation rule
          </p>
          <p className="mt-2 text-white/50">
            No · standard path · Yes · critical item
          </p>
        </div>
        <div className="rounded-2xl border border-[#fc6951]/25 bg-[#fc6951]/[0.06] p-3">
          <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#fc6951] uppercase">
            Exception surfaced
          </p>
          <p className="mt-1.5 font-sans text-sm text-white/85">
            No response after 48 hours triggers an undocumented escalation
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductJourney() {
  const steps = [
    {
      label: "Capture",
      title: "Duvo agents capture how the work really runs.",
      contentOnLeft: true,
      visual: <TimelineAccordion items={captureItems} />,
    },
    {
      label: "Diagnose",
      title: "See how the process runs and what should improve",
      contentOnLeft: false,
      contentExtra: (
        <p className="mt-5 max-w-[26rem] text-sm leading-relaxed text-white/60 md:ml-auto md:text-base">
          Duvo resolves conflicting accounts, then surfaces friction, costly
          variance, control gaps, and transformation opportunities for the team
          to review.
        </p>
      ),
      visual: <DiagnoseVisual />,
    },
    {
      label: "Deliver",
      title: "Duvo turns the findings into the outcome you need.",
      contentOnLeft: true,
      visual: (
        <TimelineAccordion eyebrow="Outcome path" items={deliverItems} />
      ),
    },
  ];

  return (
    <section
      id="product-journey"
      className="relative scroll-mt-28 overflow-hidden bg-[#22222c] py-16 text-white md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#faf7f2]/[0.035] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <div className="mx-auto max-w-[56rem] text-center">
            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--yellow)] uppercase">
              How Duvo works
            </p>
            <h2 className="mt-5 text-[2.45rem] font-medium leading-[1.01] tracking-[-0.043em] text-white md:text-[3.55rem]">
              <span className="block">Capture the process.</span>
              <span className="mt-1 block md:mt-2">Reveal what should change.</span>
              <span className="mt-2 block md:mt-3">
                <span className="text-[var(--yellow)]">Deliver the outcome.</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-[46rem] text-[1rem] leading-[1.65] text-white/60 md:text-[1.08rem]">
              Duvo’s AI notetaker joins workshops, while Duvo agents guide screen
              walkthroughs, interview the people doing the work, and analyse
              existing documents. They reconcile conflicting evidence, surface
              exceptions and process variants, and turn the findings into the
              outcome your team needs. No system access is needed to begin.
            </p>
          </div>
        </FadeIn>

        <JourneyTimeline steps={steps} />

        <FadeIn direction="up" className="mx-auto mt-20 max-w-[56rem] md:mt-28">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="text-[0.68rem] font-semibold tracking-[0.17em] text-[var(--yellow)] uppercase">
              After the first outcome
            </p>
            <h3 className="mx-auto mt-4 max-w-[21ch] text-[2rem] font-medium leading-[1.03] tracking-[-0.038em] text-white md:text-[2.65rem]">
              The next outcome starts from evidence, not zero.
            </h3>
            <p className="mx-auto mt-5 max-w-[44rem] text-[0.9rem] leading-[1.68] text-white/56 md:text-[0.98rem]">
              Every reviewed process becomes a shared record the team can return
              to. When the work changes, compare the new reality with the last
              agreed version and use the updated evidence for the next
              improvement, training plan, migration, or automation.
            </p>
          </div>

          <ContinuityTimeline />
        </FadeIn>
      </div>
    </section>
  );
}
