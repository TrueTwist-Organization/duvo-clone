"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { FadeIn } from "./FadeIn";

const tabs = [
  {
    id: "Capture",
    src: "https://gp6mhebfdmbr6vff.public.blob.vercel-storage.com/video%20pt.%201.mp4",
  },
  {
    id: "Diagnose",
    src: "https://gp6mhebfdmbr6vff.public.blob.vercel-storage.com/video%20pt2.mp4",
  },
  {
    id: "Deliver",
    src: "https://gp6mhebfdmbr6vff.public.blob.vercel-storage.com/video%20pt3.mp4",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function MotionWorkflow() {
  const [tab, setTab] = useState<TabId>("Capture");
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.src = active.src;
    el.load();
    const tryPlay = () => {
      void el.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    };
    tryPlay();
  }, [active.src]);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <section
      id="workflow"
      className="relative scroll-mt-28 overflow-hidden bg-[#22222c] px-5 py-16 text-white md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <FadeIn direction="up">
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl lg:text-[3.4rem]">
            Watch the operating loop in motion.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60 md:text-lg">
            See Duvo capture the real process, reveal what should change, and
            carry a reviewed outcome into operation.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.1} className="mt-8">
          <div
            role="tablist"
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
          >
            {tabs.map((item) => {
              const selected = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(item.id)}
                  className="relative w-[5.8rem] rounded-full px-3 py-2.5 text-center text-[0.84rem] font-semibold sm:w-[7.15rem] sm:text-[0.88rem] md:w-[8rem] md:px-4 md:text-[0.92rem]"
                >
                  {selected ? (
                    <motion.span
                      layoutId="workflow-tab-pill"
                      className="absolute inset-0 rounded-full bg-[var(--yellow)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  <span
                    className={`relative z-10 ${
                      selected
                        ? "text-[#121217]"
                        : "text-white/65 hover:text-white"
                    }`}
                  >
                    {item.id}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.15}>
          <div className="group relative mt-10 w-full overflow-hidden rounded-3xl bg-black/20 pt-[56.25%] shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:mt-12">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 h-full w-full border-0 object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
            />

            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex cursor-pointer items-end justify-end bg-black/0 p-4 transition-colors hover:bg-black/10"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#121217] shadow-lg">
                {playing ? (
                  <Pause className="h-3.5 w-3.5 fill-current" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-current" />
                )}
                {playing ? "Pause" : "Play video"}
              </span>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
