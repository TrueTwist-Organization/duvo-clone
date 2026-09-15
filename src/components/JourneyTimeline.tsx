"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

type Step = {
  label: string;
  title: string;
  contentOnLeft: boolean;
  contentExtra?: ReactNode;
  visual: ReactNode;
};

type Props = {
  steps: Step[];
};

function TimelineStep({
  index,
  label,
  title,
  contentOnLeft,
  contentExtra,
  visual,
  isLast,
  active,
  nodeRef,
}: {
  index: number;
  label: string;
  title: string;
  contentOnLeft: boolean;
  contentExtra?: ReactNode;
  visual: ReactNode;
  isLast: boolean;
  active: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.28, margin: "0px 0px -12% 0px" });
  const visible = active || inView;

  return (
    <div
      ref={ref}
      data-timeline-stage={label.toLowerCase()}
      className={`relative md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-24 ${
        isLast ? "" : "pb-20 md:pb-28"
      }`}
    >
      <div
        ref={nodeRef}
        data-timeline-node
        className="absolute top-0 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center md:flex"
      >
        <motion.span
          initial={false}
          animate={
            active
              ? {
                  backgroundColor: "#FFDD04",
                  borderColor: "#FFDD04",
                  color: "#2A2B3B",
                  boxShadow:
                    "0 0 0 6px rgba(255,221,4,0.14), 0 0 22px rgba(255,221,4,0.4)",
                }
              : {
                  backgroundColor: "#22222C",
                  borderColor: "rgba(255,255,255,0.24)",
                  color: "rgba(255,255,255,0.48)",
                  boxShadow: "0 0 0 0 rgba(255,221,4,0)",
                }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-11 w-11 items-center justify-center rounded-full border font-mono text-[0.72rem] font-semibold tracking-[0.08em]"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      <motion.div
        data-timeline-content
        initial={false}
        animate={{ opacity: visible ? 1 : 0.36, y: visible ? 0 : 20 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`md:row-start-1 ${
          contentOnLeft
            ? "md:col-start-1 md:pr-12 md:text-right"
            : "md:col-start-2 md:pl-12 md:text-left"
        }`}
      >
        <p className="flex items-center gap-3 text-[0.67rem] font-semibold tracking-[0.16em] text-[var(--yellow)] uppercase md:block md:translate-y-3">
          <span className="font-mono md:hidden">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-7 bg-[var(--yellow)]/45 md:hidden" />
          {label}
        </p>
        <h3 className="mt-5 font-medium leading-[1.05] tracking-[-0.032em] text-white md:text-[2.2rem] text-[1.8rem]">
          {title}
        </h3>
        {contentExtra}
      </motion.div>

      <motion.div
        data-timeline-visual
        initial={false}
        animate={{ opacity: visible ? 1 : 0.36, y: visible ? 0 : 20 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-9 md:row-start-1 md:mt-0 ${
          contentOnLeft
            ? "md:col-start-2 md:pl-12"
            : "md:col-start-1 md:pr-12"
        }`}
      >
        {visual}
      </motion.div>
    </div>
  );
}

export function JourneyTimeline({ steps }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [railHeight, setRailHeight] = useState(0);
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [activeCount, setActiveCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 46%", "end 46%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    [0, 1, 1, 0],
  );

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!track || nodes.length === 0) return;

      const top = track.getBoundingClientRect().top;
      const last = nodes[nodes.length - 1].getBoundingClientRect();
      const height = last.top + last.height / 2 - top;
      const marks = nodes.map((node) => {
        const box = node.getBoundingClientRect();
        const mid = box.top + box.height / 2 - top;
        return height > 0 ? Math.min(1, Math.max(0, mid / height)) : 0;
      });
      setRailHeight(height);
      setThresholds(marks);
      const progress = scrollYProgress.get();
      setActiveCount(marks.filter((mark) => progress + 0.0015 >= mark).length);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [scrollYProgress, steps.length]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveCount(thresholds.filter((mark) => value + 0.0015 >= mark).length);
  });

  return (
    <div ref={trackRef} className="relative mx-auto max-w-[68rem] pt-16 md:pt-20">
      <div
        ref={railRef}
        data-timeline-rail
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 w-px -translate-x-1/2"
        style={{ height: railHeight }}
      >
        <div className="absolute inset-0 hidden [mask-image:linear-gradient(to_bottom,transparent_0px,black_80px,black_100%)] md:block">
          <div className="absolute inset-0 border-l border-dashed border-white/18" />
          <motion.div
            className="absolute top-0 left-0 h-full w-px origin-top bg-[var(--yellow)]"
            style={{ scaleY }}
          />
          <motion.div
            data-timeline-head
            className="absolute left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--yellow)] shadow-[0_0_12px_rgba(255,221,4,0.7)]"
            style={{ top: headTop, opacity: headOpacity }}
          />
          <span
            data-timeline-end
            className="absolute bottom-0 left-0 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--yellow)] shadow-[0_0_12px_rgba(255,221,4,0.55)]"
          />
        </div>
      </div>

      {steps.map((step, index) => (
        <TimelineStep
          key={step.label}
          index={index}
          label={step.label}
          title={step.title}
          contentOnLeft={step.contentOnLeft}
          contentExtra={step.contentExtra}
          visual={step.visual}
          isLast={index === steps.length - 1}
          active={activeCount > index}
          nodeRef={(el) => {
            nodeRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}

type AccordionItem = {
  count?: string;
  title: string;
  heading: string;
  body: string;
  chips: string[];
};

export function TimelineAccordion({
  items,
  eyebrow = "Evidence captured",
}: {
  items: AccordionItem[];
  eyebrow?: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <div
            key={item.title}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-white/20"
          >
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold"
            >
              <span>
                {item.count ? `${item.count} ` : ""}
                {item.title}
              </span>
              <span className="text-white/40">{active ? "–" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="border-t border-white/10 px-4 pb-4"
                >
                  <p className="pt-3 text-xs font-semibold tracking-wide text-white/45 uppercase">
                    {eyebrow}
                  </p>
                  <p className="mt-2 text-base font-semibold">{item.heading}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.body}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                    {item.chips.map((chip) => (
                      <li key={chip} className="flex items-center gap-2">
                        <span className="text-[#fc6951]">✓</span>
                        {chip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
