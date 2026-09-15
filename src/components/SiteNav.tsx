"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = {
  href: string;
  title: string;
  description?: string;
};

const outcomesMenu: MenuItem[] = [
  {
    href: "/clarity",
    title: "Duvo Clarity",
    description: "One workflow → your outcome",
  },
  {
    href: "/process-catalogue",
    title: "Process Catalogue",
    description: "Searchable process truth",
  },
  {
    href: "/process-improvement",
    title: "Process Improvement",
    description: "Agree a better process",
  },
  {
    href: "/transformation-roadmap",
    title: "Transformation Roadmap",
    description: "Prioritize what changes",
  },
  {
    href: "/sap-migration",
    title: "SAP Migration",
    description: "Prepare process for SAP",
  },
  {
    href: "/automation",
    title: "Reliable Automation",
    description: "Run the approved process",
  },
  {
    href: "/onboarding-training",
    title: "Onboarding & Training",
    description: "Onboard and train teams",
  },
];

const solutionsMenu: MenuItem[] = [
  {
    href: "/solutions/deductions-recovery",
    title: "Deductions Recovery",
    description: "Invalid deductions",
  },
  {
    href: "/solutions/freight-audit",
    title: "Freight Audit",
    description: "Carrier overbilling",
  },
  {
    href: "/solutions/inventory-planning",
    title: "Inventory Planning",
    description: "Replenishment risk",
  },
  {
    href: "/solutions/otif-recovery",
    title: "OTIF Recovery",
    description: "OTIF fines",
  },
  {
    href: "/solutions/payables-audit",
    title: "Payables Audit",
    description: "Duplicate payments",
  },
  {
    href: "/solutions/returns-claims",
    title: "Returns & Claims",
    description: "Returns claims",
  },
  {
    href: "/solutions/supplier-reconciliation",
    title: "Supplier Reconciliation",
    description: "Supplier gaps",
  },
  {
    href: "/solutions/working-capital-recovery",
    title: "Capital Recovery",
    description: "Supplier income",
  },
  {
    href: "/pulse",
    title: "Duvo Pulse",
    description: "Chat-driven live dashboards",
  },
];

const resourcesMenu: MenuItem[] = [
  { href: "/blog", title: "Blog" },
  { href: "/compare", title: "Compare" },
  { href: "/developers", title: "Developer Platform" },
  { href: "/company", title: "Company" },
  { href: "/careers", title: "Careers" },
  { href: "/trust-center", title: "Trust Center" },
];

type MenuKey = "outcomes" | "solutions" | "resources";

type Props = {
  variant?: "light" | "dark";
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`ml-1 h-2.5 w-2.5 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ title }: { title: string }) {
  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--yellow)]/80 text-[11px] font-bold text-[var(--fg)]">
      {title.trim().charAt(0).toUpperCase()}
    </span>
  );
}

function MegaPanel({
  items,
  dark,
  columns = 3,
}: {
  items: MenuItem[];
  dark: boolean;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border p-1.5 shadow-[0_20px_50px_rgba(42,43,59,0.14)] ${
        dark
          ? "border-white/10 bg-[#1a1a22]"
          : "border-[var(--line)] bg-white"
      }`}
    >
      <div
        className={`grid gap-1 rounded-[12px] ${
          columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href + item.title}
            href={item.href}
            className={`flex items-start gap-3 rounded-xl px-3 py-3 transition ${
              dark
                ? "text-white hover:bg-white/5"
                : "text-[var(--fg)] hover:bg-[#f3efe8]"
            }`}
          >
            <MenuIcon title={item.title} />
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold leading-tight tracking-tight">
                {item.title}
              </span>
              {item.description ? (
                <span
                  className={`mt-1 block text-[12px] leading-snug ${
                    dark ? "text-white/50" : "text-[var(--muted)]"
                  }`}
                >
                  {item.description}
                </span>
              ) : null}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteNav({ variant = "light" }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dark = variant === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  }

  function cancelClose(key: MenuKey) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }

  const triggerClass = (key: MenuKey) =>
    `flex h-9 items-center rounded-full px-3.5 text-[13px] font-medium leading-none tracking-[-0.005em] transition ${
      open === key
        ? dark
          ? "bg-white/10 text-white"
          : "bg-[#ece8e1] text-[var(--fg)]"
        : dark
          ? "text-white/75 hover:text-white"
          : "text-[var(--fg)]/80 hover:text-[var(--fg)]"
    }`;

  const menus: Record<MenuKey, { label: string; href: string; items: MenuItem[]; columns?: 2 | 3 }> = {
    outcomes: {
      label: "Outcomes",
      href: "/#product-journey",
      items: outcomesMenu,
      columns: 3,
    },
    solutions: {
      label: "Automation Solutions",
      href: "/solutions",
      items: solutionsMenu,
      columns: 3,
    },
    resources: {
      label: "Resources",
      href: "/blog",
      items: resourcesMenu,
      columns: 3,
    },
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 pt-3 md:px-6 md:pt-5">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 pl-5 backdrop-blur-xl md:px-4 ${
          dark
            ? `border-white/10 text-white ${scrolled ? "bg-[#1a1a22]/95" : "bg-[#16161d]/80"}`
            : `border-[var(--line)] text-[var(--fg)] shadow-[0_8px_30px_rgba(42,43,59,0.06)] ${
                scrolled ? "bg-white/95" : "bg-[var(--nav)]"
              }`
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src={dark ? "/logos/duvo-logo-dark.svg" : "/logos/duvo-logo-light.svg"}
            alt="duvo.ai"
            width={96}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/how-it-works"
            className={`flex h-9 items-center rounded-full px-3.5 text-[13px] font-medium ${
              dark ? "text-white/75 hover:text-white" : "text-[var(--fg)]/80 hover:text-[var(--fg)]"
            }`}
          >
            How Duvo Works
          </Link>

          {(Object.keys(menus) as MenuKey[]).map((key) => {
            const menu = menus[key];
            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => cancelClose(key)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={menu.href}
                  className={triggerClass(key)}
                  aria-expanded={open === key}
                  onFocus={() => cancelClose(key)}
                >
                  {menu.label}
                  <Chevron open={open === key} />
                </Link>
              </div>
            );
          })}

          <Link
            href="/customer-stories"
            className={`flex h-9 items-center rounded-full px-3.5 text-[13px] font-medium ${
              dark ? "text-white/75 hover:text-white" : "text-[var(--fg)]/80 hover:text-[var(--fg)]"
            }`}
          >
            Customer Stories
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="https://app.duvo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden px-3 py-2 text-[13px] sm:inline ${
              dark ? "text-white/80 hover:text-white" : "text-[var(--fg)] hover:opacity-70"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/contact"
            className="pill bg-[var(--yellow)] px-4 py-2.5 text-[13px] font-semibold !text-[var(--fg)] transition hover:bg-[var(--yellow-hover)]"
          >
            See what Duvo finds
          </Link>
          <button
            type="button"
            className={`rounded-full px-3 py-2 text-[13px] font-medium lg:hidden ${
              dark ? "text-white" : "text-[var(--fg)]"
            }`}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </motion.nav>

      {/* Desktop mega menus */}
      <div className="relative z-[60] hidden w-full max-w-6xl lg:block">
        <AnimatePresence>
          {open ? (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute top-2 left-1/2 w-[min(780px,calc(100vw-2rem))] -translate-x-1/2"
              onMouseEnter={() => cancelClose(open)}
              onMouseLeave={scheduleClose}
            >
              <MegaPanel
                items={menus[open].items}
                dark={dark}
                columns={menus[open].columns}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mt-2 w-full max-w-6xl overflow-hidden rounded-3xl border p-4 lg:hidden ${
              dark
                ? "border-white/10 bg-[#1a1a22] text-white"
                : "border-[var(--line)] bg-white text-[var(--fg)]"
            }`}
          >
            <Link
              href="/how-it-works"
              className="block rounded-xl px-3 py-2.5 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              How Duvo Works
            </Link>
            {(Object.keys(menus) as MenuKey[]).map((key) => (
              <div key={key} className="mt-3 border-t border-current/10 pt-3">
                <p className="px-3 text-xs font-semibold tracking-[0.14em] uppercase opacity-50">
                  {menus[key].label}
                </p>
                <div className="mt-1">
                  {menus[key].items.map((item) => (
                    <Link
                      key={item.href + item.title}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/customer-stories"
              className="mt-3 block rounded-xl border-t border-current/10 px-3 py-2.5 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Customer Stories
            </Link>
            <Link
              href="https://app.duvo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="mt-2 block rounded-full bg-[var(--yellow)] px-3 py-2.5 text-center text-sm font-semibold text-[#121217]"
              onClick={() => setMobileOpen(false)}
            >
              See what Duvo finds
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
