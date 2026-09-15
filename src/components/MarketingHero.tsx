import Link from "next/link";
import { FadeIn } from "./FadeIn";

type Cta = { href: string; label: string; primary?: boolean };

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  ctas?: Cta[];
  dark?: boolean;
  align?: "left" | "center";
};

export function MarketingHero({
  eyebrow,
  title,
  description,
  ctas = [],
  dark = false,
  align = "left",
}: Props) {
  const center = align === "center";
  return (
    <section
      className={`relative overflow-hidden pt-[7.5rem] pb-14 md:pt-36 md:pb-20 ${
        dark ? "bg-[#22222c] text-white" : "bg-[var(--bg)]"
      }`}
    >
      <div
        className={`relative mx-auto max-w-6xl px-5 md:px-8 ${
          center ? "text-center" : ""
        }`}
      >
        {eyebrow ? (
          <FadeIn direction="up">
            <p
              className={`text-[0.72rem] font-semibold tracking-[0.16em] uppercase ${
                dark ? "text-[var(--yellow)]" : "text-[var(--muted)]"
              }`}
            >
              {eyebrow}
            </p>
          </FadeIn>
        ) : null}
        <FadeIn direction="up" delay={0.08}>
          <h1
            className={`mt-4 max-w-4xl text-[2.4rem] font-medium leading-[1.05] tracking-[-0.04em] md:text-5xl lg:text-[3.6rem] ${
              center ? "mx-auto" : ""
            }`}
          >
            {title}
          </h1>
        </FadeIn>
        {description ? (
          <FadeIn direction="up" delay={0.16}>
            <p
              className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${
                dark ? "text-white/65" : "text-[var(--muted)]"
              } ${center ? "mx-auto" : ""}`}
            >
              {description}
            </p>
          </FadeIn>
        ) : null}
        {ctas.length > 0 ? (
          <FadeIn direction="up" delay={0.24}>
            <div
              className={`mt-8 flex flex-wrap gap-3 ${
                center ? "justify-center" : ""
              }`}
            >
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={`pill px-6 py-3.5 text-sm font-semibold transition ${
                    cta.primary
                      ? dark
                        ? "bg-white !text-[#121217] hover:opacity-90"
                        : "bg-[#2a2b3b] !text-white hover:opacity-90"
                      : dark
                        ? "border border-white/20 !text-white hover:bg-white/5"
                        : "border border-[var(--line)] bg-white/80 text-[var(--fg)] hover:bg-white"
                  }`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
