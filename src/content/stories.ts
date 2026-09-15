export type CustomerStory = {
  slug: string;
  company: string;
  category: "Supply Chain" | "Finance" | "Sales";
  tag: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
  quote?: { text: string; role: string };
};

export const customerStories: CustomerStory[] = [
  {
    slug: "bonus-reconciliation",
    company: "Notino",
    category: "Finance",
    tag: "Bonus reconciliation",
    title:
      "How Notino freed ~€40M and cut the L'Oréal bonus cycle from 70 days to 15.",
    summary:
      "Notino invoices L'Oréal LUXE for ~€40M/yr of supplier bonuses across 27+ markets. Every euro depended on 7 data streams pulled manually — trapping €10M+ of working capital past quarter close.",
    metrics: [
      { value: "~€40M", label: "working capital released" },
      { value: "€620K/yr", label: "recurring cost savings" },
      { value: "70 → 15 days", label: "bonus cycle time" },
    ],
    challenge:
      "Quarters had to clear in sequence. Q4 could still be open months later, blocking Q1. Specialists owned separate streams across Power BI, SharePoint, Martailer, FINIS, and cross-company invoices — so exceptions never reconciled into one operating truth.",
    approach: [
      "Capture how each specialist actually collected and checked bonus evidence.",
      "Reconcile conflicting sources into one reviewed process with exception routes.",
      "Automate collect → consolidate → escalate with human gates where judgment matters.",
    ],
    outcome:
      "The full loop now runs as approved work: capital clears faster, recurring cost drops, and finance leaders get a cycle they can take to the exec team.",
    quote: {
      text: "Ask 14 people how the process works and you get 14 different answers. Duvo reconciled them in a week and gave us a plan we could take straight to the exec team.",
      role: "Head of AI Automation, Notino",
    },
  },
  {
    slug: "rohlik-out-of-stock-prevention",
    company: "Rohlik Group",
    category: "Supply Chain",
    tag: "Out-of-stock prevention",
    title:
      "How Rohlik moved inbound confirmations from 52% to 90% and acted on every OOS signal.",
    summary:
      "Signals were scattered across SAP, warehouse systems, supplier emails, and slot bookings. Disponents could only triage a handful of products per day per market.",
    metrics: [
      { value: "52% → 90%", label: "inbound confirmations before cut-off" },
      { value: "100%", label: "of OOS signals reviewed and acted on" },
    ],
    challenge:
      "Overnight, weekends, and long-tail supplier follow-up left too many signals unresolved before warehouse cut-off — turning availability into lost revenue.",
    approach: [
      "Map the real OOS triage path across systems and humans.",
      "Route each signal into confirmation, adjustment, or escalation.",
      "Keep approvals where operators already work.",
    ],
    outcome:
      "Every OOS signal is reviewed and acted on. Inbound confirmations reach cut-off reliably instead of depending on daytime heroics.",
  },
  {
    slug: "invoice-reconciliation",
    company: "Rohlik Group",
    category: "Finance",
    tag: "Invoice reconciliation",
    title:
      "How Rohlik protected €2.1M in revenue and €1.4M in margin by fixing inbound invoice errors at the source.",
    summary:
      "A delivery note that does not match PO, goods received, or invoice blocks inbound, ties up capital, and can clear invoices for goods that never arrived.",
    metrics: [
      { value: "€2.1M/yr", label: "revenue protected" },
      { value: "€1.4M/yr", label: "margin protected" },
    ],
    challenge:
      "Across five markets the expensive part was not finding mismatches — it was tracing root cause so the same error did not return on the next delivery.",
    approach: [
      "Capture how AP and inbound teams actually chase mismatches today.",
      "Attach source evidence to each exception path.",
      "Automate root-cause routing with governed execution.",
    ],
    outcome:
      "Errors are fixed at the source. Revenue and margin stay protected without another spreadsheet war each week.",
  },
  {
    slug: "promo-management-margin-lift",
    company: "Rohlik Group",
    category: "Sales",
    tag: "Promo management",
    title:
      "How Rohlik Group lifted promo margin from 17% to 27% with daily agent-driven nominations.",
    summary:
      "Forecasting over-estimated promo demand by 9–14x. Nominations defaulted to gut feel and discount depth — diluting margin across DACH fulfilment centres.",
    metrics: [
      { value: "17% → 27%", label: "promo margin" },
      { value: "3x", label: "promo revenue (+275%)" },
    ],
    challenge:
      "Promo share of net revenue was stuck while inventory positions drifted from actual sell-through.",
    approach: [
      "Reconcile how nominations really happened vs the assumed process.",
      "Put daily agent nominations against live sell-through evidence.",
      "Keep commercial judgment at approval gates.",
    ],
    outcome:
      "Promo margin recovered while revenue scaled — without treating discount depth as the only lever.",
  },
  {
    slug: "availability-recovery",
    company: "Pilulka",
    category: "Supply Chain",
    tag: "Availability recovery",
    title:
      "How Pilulka improved stock availability by 15% in 2 weeks. No APIs. No IT rebuild.",
    summary:
      "Proposed supplier orders lived in in-house tools, but core products still stocked out. Manual checking could not scale to thousands of SKUs.",
    metrics: [
      { value: "+15%", label: "stock availability in 2 weeks" },
      { value: "0 APIs", label: "no IT rebuild required" },
    ],
    challenge:
      "Traditional integration work was too slow given IT capacity. Orders were often wrong on timing, quantity, or constraints.",
    approach: [
      "Follow the real ordering screens and Slack handoffs.",
      "Validate proposals against operating rules operators already use.",
      "Execute approved changes through existing UIs.",
    ],
    outcome:
      "Availability recovered in weeks because Duvo worked through the interfaces the team already trusted.",
    quote: {
      text: "IT did not have capacity to rebuild our ordering process, so we brought in Duvo. It validates orders, sends improvements to Slack for approval, and executes through our internal UI.",
      role: "Petr Marek, Supply Chain Manager, Pilulka",
    },
  },
  {
    slug: "rohlik-group-from-commodity-data-to-1.45m-eur-in-savings-in-one-week",
    company: "Rohlik Group",
    category: "Finance",
    tag: "Commodity savings",
    title: "From commodity data to €1.45M in savings in one week.",
    summary:
      "Scattered commodity and purchasing evidence hid savings that only appeared once the real process was reconciled.",
    metrics: [
      { value: "€1.45M", label: "savings surfaced in one week" },
    ],
    challenge:
      "Teams disagreed on what the data meant because each market ran the work differently.",
    approach: [
      "Capture market variants of the same commodity process.",
      "Reconcile into one reviewed fact base.",
      "Prioritize the highest-value exceptions first.",
    ],
    outcome:
      "Leadership got an evidence-backed savings path instead of another workshop debate.",
  },
  {
    slug: "npd-launch-cycles",
    company: "Enterprise retail",
    category: "Sales",
    tag: "NPD launch",
    title: "NPD launch cycles shortened with shared process evidence.",
    summary:
      "New product launches stalled because each function kept a different version of the launch path.",
    metrics: [
      { value: "Faster", label: "launch cycle with shared evidence" },
    ],
    challenge:
      "Handoffs between marketing, supply, and commercial lived in decks and tribal knowledge.",
    approach: [
      "Interview and walkthrough the real launch path.",
      "Publish one searchable process record.",
      "Attach owners and exception routes.",
    ],
    outcome:
      "Launches move on reviewed evidence instead of rediscovering the process every season.",
  },
  {
    slug: "promo-forecasting-sales",
    company: "Enterprise retail",
    category: "Sales",
    tag: "Promo forecasting",
    title: "Promo forecasting tied back to how sellers actually nominate.",
    summary:
      "Models failed because the nomination process in the field did not match the assumed SOP.",
    metrics: [
      { value: "Aligned", label: "forecast vs real nomination process" },
    ],
    challenge:
      "Forecast inputs ignored judgment calls and market exceptions that never made it into systems.",
    approach: [
      "Capture seller judgment and exception paths.",
      "Reconcile with system data.",
      "Feed a reviewed process into forecasting work.",
    ],
    outcome:
      "Forecasts start from operating reality instead of an idealized process.",
  },
  {
    slug: "expiry-decisioning-margin",
    company: "Grocery retail",
    category: "Supply Chain",
    tag: "Expiry decisioning",
    title: "Expiry decisioning protected margin without blanket markdowns.",
    summary:
      "Fresh categories lost margin when expiry decisions depended on whoever was on shift.",
    metrics: [
      { value: "Protected", label: "margin via governed expiry decisions" },
    ],
    challenge:
      "Rules lived in heads; markdowns were inconsistent across sites.",
    approach: [
      "Document decision rules from operators.",
      "Codify approvals for high-risk paths.",
      "Automate routine decisions with audit trail.",
    ],
    outcome:
      "Expiry decisions become consistent, explainable, and margin-aware.",
  },
  {
    slug: "negative-review-response-automation",
    company: "Consumer brand",
    category: "Sales",
    tag: "Review response",
    title: "Negative review responses automated with human judgment intact.",
    summary:
      "Support could not keep pace with review volume without copying tone-deaf templates.",
    metrics: [
      { value: "Faster", label: "response with approval gates" },
    ],
    challenge:
      "Brand risk meant full autonomy was unacceptable — but manual replies did not scale.",
    approach: [
      "Capture how great replies are actually written.",
      "Draft with evidence from prior cases.",
      "Require human approval before publish.",
    ],
    outcome:
      "Response speed rises without giving up brand control.",
  },
  {
    slug: "turnover-bonus-optimisation",
    company: "Retail finance",
    category: "Finance",
    tag: "Turnover bonus",
    title: "Turnover bonus optimisation from reconciled operating evidence.",
    summary:
      "Bonus logic differed by market and spreadsheet — so optimization debates never settled.",
    metrics: [
      { value: "Clearer", label: "bonus economics per market" },
    ],
    challenge:
      "Finance and commercial teams argued from different extracts of the same work.",
    approach: [
      "Reconcile market variants into one process record.",
      "Quantify exception cost.",
      "Prioritize changes with evidence.",
    ],
    outcome:
      "Bonus design decisions use one shared fact base.",
  },
  {
    slug: "annual-negotiations",
    company: "Buying organization",
    category: "Finance",
    tag: "Annual negotiations",
    title: "Annual negotiations grounded in how deals actually close.",
    summary:
      "Playbooks described an ideal negotiation path that buyers rarely followed under pressure.",
    metrics: [
      { value: "Shared", label: "negotiation playbook from real deals" },
    ],
    challenge:
      "New buyers inherited folklore instead of a reviewed process with exceptions.",
    approach: [
      "Interview experienced buyers and capture deal artifacts.",
      "Publish role guides with exception routes.",
      "Keep the record living as negotiations change.",
    ],
    outcome:
      "Negotiation readiness improves without waiting for another annual training cycle.",
  },
  {
    slug: "pilulka-demand-forecasting",
    company: "Pilulka",
    category: "Supply Chain",
    tag: "Demand forecasting",
    title: "Demand forecasting connected to real ordering constraints.",
    summary:
      "Forecast quality suffered because ordering constraints never made it into the model inputs.",
    metrics: [
      { value: "Better", label: "forecast fit to operating constraints" },
    ],
    challenge:
      "Planners adjusted forecasts manually for rules that only lived in ops knowledge.",
    approach: [
      "Capture constraints from the people who order.",
      "Attach them to the process record.",
      "Feed reviewed context into forecasting work.",
    ],
    outcome:
      "Forecasts reflect how the business actually orders — not just historical sales curves.",
  },
  {
    slug: "variance-reporting",
    company: "Finance ops",
    category: "Finance",
    tag: "Variance reporting",
    title: "Variance reporting that explains the exception, not just the delta.",
    summary:
      "Month-end variance packs listed numbers without the operating story behind them.",
    metrics: [
      { value: "Faster", label: "root-cause variance packs" },
    ],
    challenge:
      "Controllers chased owners across tools to reconstruct why a line moved.",
    approach: [
      "Link variances to process evidence and owners.",
      "Standardize exception narratives.",
      "Automate pack assembly with review gates.",
    ],
    outcome:
      "Variance conversations start with cause, not archaeology.",
  },
  {
    slug: "transfer-logging",
    company: "Warehouse ops",
    category: "Supply Chain",
    tag: "Transfer logging",
    title: "Transfer logging that matches how stock actually moves.",
    summary:
      "System transfers and physical moves diverged because workarounds never entered the SOP.",
    metrics: [
      { value: "Accurate", label: "transfer record vs floor reality" },
    ],
    challenge:
      "Audits failed when people skipped steps to keep fulfilment moving.",
    approach: [
      "Walk the real transfer path on the floor and in systems.",
      "Document approved shortcuts and risky ones.",
      "Govern automation around the safe path.",
    ],
    outcome:
      "Transfer logs become trustworthy enough for inventory and audit teams.",
  },
  {
    slug: "pilulka-supplier-analytics",
    company: "Pilulka",
    category: "Supply Chain",
    tag: "Supplier analytics",
    title: "Supplier analytics built on reviewed process evidence.",
    summary:
      "Supplier scorecards disagreed because each team measured performance from a different process slice.",
    metrics: [
      { value: "One view", label: "supplier performance fact base" },
    ],
    challenge:
      "Commercial, quality, and ops each owned a partial truth.",
    approach: [
      "Reconcile supplier-facing processes into one record.",
      "Attach metrics to the steps that create them.",
      "Share a living catalogue across teams.",
    ],
    outcome:
      "Supplier talks use shared evidence instead of competing dashboards.",
  },
  {
    slug: "google-ads-localisation",
    company: "Multi-market brand",
    category: "Sales",
    tag: "Ads localisation",
    title: "Google Ads localisation without losing brand controls.",
    summary:
      "Local teams adapted campaigns differently — quality and compliance drifted by market.",
    metrics: [
      { value: "Consistent", label: "localisation with approvals" },
    ],
    challenge:
      "Central brand rules and local speed were in permanent conflict.",
    approach: [
      "Capture how localisation actually happens per market.",
      "Codify must-approve vs safe-to-automate steps.",
      "Run governed automation with audit trail.",
    ],
    outcome:
      "Local campaigns move faster while brand and compliance stay intact.",
  },
];

export function getStory(slug: string) {
  return customerStories.find((s) => s.slug === slug);
}
