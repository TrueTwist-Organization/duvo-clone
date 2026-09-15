"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MarkerHighlight({
  children,
  className = "",
  delay = 0.45,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <span
      ref={ref}
      data-marker-highlight
      className={`relative isolate inline-block px-[0.05em] ${className}`}
    >
      <motion.span
        aria-hidden
        className="absolute -inset-x-[0.04em] -bottom-[0.05em] top-[0.06em] -z-10 origin-left -rotate-[0.35deg] transform-gpu [clip-path:polygon(0_8%,99%_1%,100%_92%,2%_100%)] bg-[linear-gradient(96deg,rgba(255,221,4,0.78),rgba(255,221,4,0.96)_14%,rgba(255,221,4,0.86)_86%,rgba(255,221,4,0.72))]"
        initial={!reduced ? { scaleX: 0 } : false}
        animate={inView || reduced ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }
        }
      />
      {children}
    </span>
  );
}
