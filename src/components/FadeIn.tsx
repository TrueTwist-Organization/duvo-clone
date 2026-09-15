"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const offsets = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
} as const;

type Direction = keyof typeof offsets;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  forceVisible?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0.1,
  direction = "up",
  duration = 0.5,
  forceVisible = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const offset = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        forceVisible || inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
