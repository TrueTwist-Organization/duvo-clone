import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const outcomes = [
    { href: "/how-it-works", label: "How Duvo Works" },
    { href: "/clarity", label: "Duvo Clarity" },
    { href: "/process-catalogue", label: "Process Catalogue" },
    { href: "/process-improvement", label: "Process Improvement" },
    { href: "/transformation-roadmap", label: "Transformation Roadmap" },
    { href: "/sap-migration", label: "SAP Migration" },
    { href: "/automation", label: "Reliable Automation" },
    { href: "/onboarding-training", label: "Onboarding & Training" },
    { href: "/solutions", label: "Automation Solutions" },
    { href: "/pulse", label: "Duvo Pulse" },
  ];

  const resources = [
    { href: "/customer-stories", label: "Customer Stories" },
    { href: "/proof", label: "Proof" },
    { href: "/compare", label: "Compare" },
    { href: "/pricing", label: "Pricing" },
    { href: "/enterprise", label: "Enterprise" },
    { href: "/developers", label: "Developer Platform" },
    { href: "/company", label: "Company" },
    { href: "/culture", label: "Culture" },
    { href: "/managers", label: "Manager Playbook" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const legal = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms-of-use", label: "Terms of Use" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/trust-center", label: "Trust Center" },
  ];

  return (
    <footer className="bg-[#1a1a22] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logos/duvo-logo-dark.svg"
              alt="duvo.ai"
              width={110}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <h3 className="mt-6 text-xl font-medium tracking-tight">
            One real process. The outcome you need.
          </h3>
          <p className="mt-3 max-w-sm text-sm text-white/55">
            Duvo captures what is real and delivers what comes next.
          </p>
          <a
            href="mailto:friends@duvo.ai"
            className="mt-6 inline-block text-sm font-medium text-white/80 hover:text-white"
          >
            friends@duvo.ai
          </a>
        </div>

        {(
          [
            ["Outcomes", outcomes],
            ["Resources", resources],
            ["Legal", legal],
          ] as const
        ).map(([title, items]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold">{title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              {items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} taskcrew Inc.</p>
          <p>1111B S Governors Ave STE 28731 Dover, DE, 19904 US</p>
        </div>
      </div>
    </footer>
  );
}
