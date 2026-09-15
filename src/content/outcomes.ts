import type { OutcomeContent } from "@/components/OutcomePage";

export const processCatalogue: OutcomeContent = {
  eyebrow: "Process catalogue",
  title: "Build a searchable view of how work really runs.",
  description:
    "One reviewed, evidence-linked view of processes, roles, systems, decisions, handoffs, and exceptions — plus opportunities to improve.",
  primaryCta: { href: "/contact", label: "Build your process catalogue" },
  secondaryCta: { href: "/proof", label: "See customer proof" },
  deliverables: [
    {
      title: "Searchable process records",
      body: "Find how work runs across teams and markets, with source evidence attached.",
    },
    {
      title: "Roles, systems, and ownership",
      body: "See who does what, in which tools, and where handoffs break down.",
    },
    {
      title: "Exceptions and judgment",
      body: "Capture the undocumented rules and variants that never make it into SOPs.",
    },
    {
      title: "BPMN 2.0 export",
      body: "Hand agreed process maps to partners and SAP teams in a portable format.",
    },
  ],
  method: [
    {
      title: "Capture evidence",
      body: "Workshops, walkthroughs, interviews, and documents become one evidence set.",
    },
    {
      title: "Review and reconcile",
      body: "Conflicting accounts are resolved into a shared, approved process record.",
    },
    {
      title: "Grow coverage",
      body: "Each new process adds to a living catalogue the team can search and reuse.",
    },
  ],
  proof: {
    metric: "14 → 1",
    label: "Notino reconciled fourteen versions of one process into a single transformation plan in a week.",
    quote:
      "Ask 14 people how the process works and you get 14 different answers. Duvo reconciled them in a week.",
  },
  next: { href: "/process-improvement", label: "Explore process improvement" },
};

export const processImprovement: OutcomeContent = {
  eyebrow: "Process improvement",
  title: "Improve the process where performance breaks down.",
  description:
    "Reconcile how work really runs, compare variants, reveal where value, time, and control are lost, and leave with a prioritized improvement plan.",
  primaryCta: { href: "/contact", label: "Build an improvement plan" },
  secondaryCta: { href: "/customer-stories", label: "See stories" },
  deliverables: [
    {
      title: "Root-cause diagnosis",
      body: "See friction, costly variance, and control gaps with evidence attached.",
    },
    {
      title: "Prioritized backlog",
      body: "Rank changes by impact so the team improves what matters first.",
    },
    {
      title: "Target operating process",
      body: "Agree one better way of working without losing critical exceptions.",
    },
    {
      title: "Action plan and ownership",
      body: "Every improvement has an owner, sequence, and measurable outcome.",
    },
  ],
  method: [
    {
      title: "Capture the real work",
      body: "Agents gather how the process actually runs across people and systems.",
    },
    {
      title: "Reconcile and quantify",
      body: "Variants and exceptions are compared and costed against performance.",
    },
    {
      title: "Design and prioritize",
      body: "The team reviews a plan grounded in evidence, not assumptions.",
    },
  ],
  proof: {
    metric: "2 weeks",
    label: "Rohlik Group reached an agreed cross-market view of how promo work really ran.",
  },
  next: {
    href: "/transformation-roadmap",
    label: "Build a transformation roadmap",
  },
};

export const transformationRoadmap: OutcomeContent = {
  eyebrow: "Transformation roadmap",
  title: "Decide what should change, in what order, and why.",
  description:
    "Reconcile work across teams, markets, and systems, then turn evidence into agreed scope, business case, sequence, and ownership.",
  primaryCta: { href: "/contact", label: "Build a transformation roadmap" },
  secondaryCta: { href: "/proof", label: "See proof" },
  deliverables: [
    {
      title: "Agreed scope",
      body: "One fact base for what is in and out of the transformation.",
    },
    {
      title: "Business case and priorities",
      body: "Quantify where value leaks so leaders can fund the right work.",
    },
    {
      title: "Sequenced roadmap",
      body: "Know what to change first without breaking the operation.",
    },
    {
      title: "Ownership and handoff",
      body: "Clear owners for each change, with evidence ready for partners.",
    },
  ],
  method: [
    {
      title: "Establish the fact base",
      body: "Capture and reconcile how work runs today across markets.",
    },
    {
      title: "Agree the case for change",
      body: "Surface cost, risk, and opportunity with reviewed evidence.",
    },
    {
      title: "Sequence the roadmap",
      body: "Turn priorities into an ordered plan leaders can take forward.",
    },
  ],
  proof: {
    metric: "14 → 1",
    label: "Notino turned conflicting process versions into an exec-ready transformation plan.",
  },
  next: { href: "/sap-migration", label: "Explore SAP migration" },
};

export const sapMigration: OutcomeContent = {
  eyebrow: "Migration readiness",
  title: "The clean core you want. Without the fight you expect.",
  description:
    "An evidence-backed process fact base across SAP, non-SAP, people, documents, handoffs, and workarounds — so SI starts from a confirmed backlog.",
  primaryCta: { href: "/contact", label: "Build the migration fact base" },
  secondaryCta: { href: "/enterprise", label: "Enterprise controls" },
  deliverables: [
    {
      title: "Around SAP + inside SAP",
      body: "Map the messy edge without live access, then deepen with read-only OData when ready.",
    },
    {
      title: "Clean-core dispositions",
      body: "Flatten, extend cleanly, retire, or move to the edge — with evidence for each call.",
    },
    {
      title: "System scan insights",
      body: "Surface data gaps and missing confirmations before Realize.",
    },
    {
      title: "SAP-native handoff",
      body: "BPMN to Signavio and Activate-ready packages for SI partners.",
    },
  ],
  method: [
    {
      title: "Map current reality",
      body: "Capture SAP and non-SAP steps, workarounds, and ownership.",
    },
    {
      title: "Decide clean-core moves",
      body: "Review each exception against the target architecture.",
    },
    {
      title: "Hand off to Activate",
      body: "Give SI teams a confirmed backlog instead of another discovery cycle.",
    },
  ],
  proof: {
    metric: "BPMN 2.0",
    label: "Export agreed process maps spanning SAP and non-SAP work for migration partners.",
  },
  next: { href: "/automation", label: "Explore reliable automation" },
};

export const onboardingTraining: OutcomeContent = {
  eyebrow: "Onboarding and training",
  title: "Train every role on the real process.",
  description:
    "Turn expert practice, walkthroughs, and documents into role-specific guidance for steps, decisions, exceptions, and escalations.",
  primaryCta: { href: "/contact", label: "Build role-specific training" },
  secondaryCta: { href: "/process-catalogue", label: "See process catalogue" },
  deliverables: [
    {
      title: "Role-specific guides",
      body: "Each role gets the path they actually walk, not a generic SOP dump.",
    },
    {
      title: "Step-by-step context",
      body: "Screens, systems, and judgment points explained in order.",
    },
    {
      title: "Exception playbook",
      body: "Escalations and edge cases documented where they really happen.",
    },
    {
      title: "Reusable handoff",
      body: "New joiners ramp on the reviewed process, not tribal knowledge.",
    },
  ],
  method: [
    {
      title: "Capture judgment",
      body: "Interviews and walkthroughs surface how experts actually decide.",
    },
    {
      title: "Reconcile role paths",
      body: "Align variants into clear role-specific routes.",
    },
    {
      title: "Deliver guides",
      body: "Publish practical onboarding tied to the live process record.",
    },
  ],
  proof: {
    metric: "Same context",
    label: "Teams keep one operating context across markets for training and handoff.",
  },
  next: { href: "/process-improvement", label: "Explore process improvement" },
};
