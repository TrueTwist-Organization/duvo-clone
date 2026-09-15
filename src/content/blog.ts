export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "headline-ai-europe-100-system-builder",
    title: "Headline AI Europe 100 System Builder",
    date: "Jul 13, 2026",
    tag: "Company",
    excerpt:
      "Why we build the operational intelligence layer that turns real work into reliable outcomes.",
    body: [
      "Duvo exists because critical work still depends on scattered screens, documents, and memory. Teams document the status quo and call it transformation — then rediscover the same process a quarter later.",
      "Being named among Europe’s system builders is useful recognition. The real test is whether operators get a living view of how work runs, and leaders get outcomes they can ship: catalogues, roadmaps, training, migrations, and governed automation.",
      "We keep building with Duvo on Duvo — capturing how we work, reconciling evidence, and delivering the next outcome without another discovery project.",
    ],
  },
  {
    slug: "why-process-truth-beats-assumed-sops",
    title: "Why process truth beats assumed SOPs",
    date: "Jun 28, 2026",
    tag: "Process",
    excerpt:
      "Assumed SOPs describe the happy path. Process truth includes the exceptions that actually move money and risk.",
    body: [
      "SOPs are usually written for audit theatre or onboarding decks. The people doing the work carry the real rules in their heads — and in workarounds the SOP forbids.",
      "Duvo starts from evidence: walkthroughs, interviews, documents, and system hops. When those sources conflict, we reconcile them into a reviewed record instead of picking the cleanest slide.",
      "That record is what makes improvement, training, migration, and automation honest. Without it you automate fiction.",
    ],
  },
  {
    slug: "guaranteed-outcomes-vs-toolkit-pricing",
    title: "Guaranteed outcomes vs toolkit pricing",
    date: "Jun 12, 2026",
    tag: "Automation",
    excerpt:
      "Seat licenses and token bills reward activity. Outcome pricing rewards completed, approved work.",
    body: [
      "Toolkit pricing makes sense when the buyer wants a sandbox. Production ops need a different contract: an agreed unit of work, human gates where risk requires judgment, and an audit trail.",
      "Duvo prices production automation per completed unit — not seats. Audit solutions can include outcome guarantees because the process evidence is reviewed before execution scales.",
      "If the cheapest correct path uses no AI, we say so. Cost belongs in the unit of work, not in surprise invoices.",
    ],
  },
  {
    slug: "sap-clean-core-without-another-discovery-fight",
    title: "SAP clean core without another discovery fight",
    date: "May 30, 2026",
    tag: "Migration",
    excerpt:
      "S/4 programmes stall when SAP and non-SAP reality never share one fact base.",
    body: [
      "Clean core fails when the migration map is built from workshops that never touch the screens people actually use.",
      "Duvo maps SAP and non-SAP steps together, attaches ownership and exceptions, and exports BPMN when SI partners need a portable handoff.",
      "The point is not prettier diagrams. It is a migration fact base leadership can defend.",
    ],
  },
  {
    slug: "human-approval-gates-that-operators-actually-use",
    title: "Human approval gates that operators actually use",
    date: "May 14, 2026",
    tag: "Engineering",
    excerpt:
      "Approvals die when they live in a portal nobody opens. Put gates where work already happens.",
    body: [
      "We design approvals for Slack, email, and existing UIs — not a new inbox of ignored tickets.",
      "High-risk paths stay human. Routine paths can execute with an audit trail. Both need the same reviewed process underneath.",
      "If operators bypass the gate, the process design failed — not the people.",
    ],
  },
  {
    slug: "from-14-process-versions-to-one-exec-plan",
    title: "From 14 process versions to one exec plan",
    date: "Apr 22, 2026",
    tag: "Customer",
    excerpt:
      "Notino’s lesson: reconcile conflicting accounts before you brief the board.",
    body: [
      "Fourteen people produced fourteen answers. Duvo reconciled them in a week, quantified exception cost, and produced a transformation plan the exec team could use.",
      "That is Clarity in practice: evidence in, reviewed fact base out, outcome chosen by the team that has to live with it.",
      "Read the full customer story for the operating detail behind the headline metrics.",
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
