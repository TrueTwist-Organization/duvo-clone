import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

type Props = {
  children: React.ReactNode;
  nav?: "light" | "dark";
  className?: string;
};

export function PageShell({
  children,
  nav = "light",
  className = "bg-[var(--bg)] text-[var(--fg)]",
}: Props) {
  return (
    <div className={`min-h-screen ${className}`}>
      <SiteNav variant={nav} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
