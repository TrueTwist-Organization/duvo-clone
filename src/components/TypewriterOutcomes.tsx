"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  outcomes: string[];
};

export function TypewriterOutcomes({ outcomes }: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(outcomes[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);
  const current = outcomes[index] ?? "";

  useEffect(() => {
    if (reduced || outcomes.length < 2) return;

    let delay = deleting ? 20 : 38;
    if (!deleting && chars === current.length) delay = 1800;
    if (deleting && chars === 0) delay = 160;

    const id = window.setTimeout(() => {
      if (!deleting && chars === current.length) {
        setDeleting(true);
        return;
      }
      if (deleting && chars === 0) {
        setIndex((prev) => (prev + 1) % outcomes.length);
        setDeleting(false);
        return;
      }
      setChars((prev) => prev + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(id);
  }, [chars, deleting, current.length, outcomes, reduced]);

  const visible = reduced ? (outcomes[0] ?? "") : current.slice(0, chars);

  return (
    <span
      aria-hidden
      className="relative block min-h-[2.2em] text-[1.05rem] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--fg)]/70 sm:text-[1.35rem] md:text-[1.5rem] lg:min-h-[1.1em]"
    >
      <span className="mx-auto grid w-full grid-cols-1 text-center lg:w-fit lg:grid-cols-[auto_auto] lg:text-left">
        <span className="whitespace-nowrap lg:pr-[0.28em]">
          Duvo turns the findings into
        </span>
        <span className="relative block min-h-[1.06em]">
          <span
            aria-hidden
            className="invisible hidden whitespace-nowrap lg:inline-grid"
          >
            {outcomes.map((item) => (
              <span key={item} className="[grid-area:1/1]">
                {item}
              </span>
            ))}
          </span>
          <span className="absolute inset-x-0 top-0 block w-full text-center lg:text-left">
            {visible}
            <span className="ml-[0.06em] inline-block h-[0.82em] w-[0.035em] translate-y-[0.06em] animate-pulse bg-current motion-reduce:hidden" />
          </span>
        </span>
      </span>
    </span>
  );
}
