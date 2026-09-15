"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Kanban,
  FileText,
  CreditCard,
  LogOut,
  Building2,
  Mail,
} from "lucide-react";
import type { SessionUser } from "@/lib/crm-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  {
    href: "/crm",
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["ADMIN", "SALES", "ACCOUNTING"],
  },
  {
    href: "/crm/leads",
    label: "Leads",
    icon: Users,
    roles: ["ADMIN", "SALES"],
  },
  {
    href: "/crm/pipeline",
    label: "Pipeline",
    icon: Kanban,
    roles: ["ADMIN", "SALES"],
  },
  {
    href: "/crm/emails",
    label: "Emails",
    icon: Mail,
    roles: ["ADMIN", "SALES"],
  },
  {
    href: "/crm/team",
    label: "Sales team",
    icon: Building2,
    roles: ["ADMIN"],
  },
  {
    href: "/crm/invoices",
    label: "Invoices",
    icon: FileText,
    roles: ["ADMIN", "ACCOUNTING"],
  },
  {
    href: "/crm/payments",
    label: "Payments",
    icon: CreditCard,
    roles: ["ADMIN", "ACCOUNTING"],
  },
] as const;

export function CrmShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/crm/auth", { method: "DELETE" });
    router.push("/crm/login");
    router.refresh();
  }

  const items = nav.filter((item) =>
    (item.roles as readonly string[]).includes(user.role),
  );

  return (
    <div className="crm-app flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r bg-white md:flex md:flex-col">
        <div className="border-b px-5 py-5">
          <Link href="/crm" className="text-sm font-semibold tracking-tight">
            Duvo MicroCRM
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{user.role}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {items.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/crm"
                ? pathname === "/crm"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start gap-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              MicroCRM
            </p>
            <h1 className="text-lg font-semibold tracking-tight">
              {items.find((i) =>
                i.href === "/crm"
                  ? pathname === "/crm"
                  : pathname.startsWith(i.href),
              )?.label ?? "Dashboard"}
            </h1>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Website
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
