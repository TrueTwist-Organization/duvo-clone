"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Dot = {
  x: number;
  y: number;
  z: number;
  revealDelay: number;
  dx: number;
  dy: number;
};

type Props = {
  size?: number;
  color?: string;
  symbolStrength?: number;
  dotSize?: number;
  pushRadius?: number;
  densityScale?: number;
  statusWords?: string[];
  showStatus?: boolean;
};

const DEFAULT_WORDS = ["idle", "mapping", "processing", "routing", "resolving"];

function rgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function symbolMask(
  px: number,
  py: number,
  cx: number,
  cy: number,
  radius: number,
  rotationDeg: number,
  morph: number,
) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 3; i += 1) {
    const angle = ((120 * i + rotationDeg) * Math.PI) / 180;
    points.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  }

  const edge = 0.24 * radius;
  const soft = 1.18 * edge;
  let best = 0;

  for (let i = 0; i < 3; i += 1) {
    const a = points[i];
    const b = points[(i + 2) % 3];
    const mx = a.x + (b.x - a.x) * morph;
    const my = a.y + (b.y - a.y) * morph;
    const dx = mx - a.x;
    const dy = my - a.y;
    const len2 = dx * dx + dy * dy;
    let t = 0;
    if (len2 > 1e-6) {
      t = Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / len2));
    }
    const nearestX = a.x + dx * t;
    const nearestY = a.y + dy * t;
    const along = Math.exp(-((Math.hypot(px - nearestX, py - nearestY) / soft) ** 2)) * t;
    const toMorph = Math.hypot(px - mx, py - my);
    const blob =
      toMorph < edge
        ? 1
        : Math.exp(-(((toMorph - edge) / (0.18 * edge)) ** 2));
    best = Math.max(best, along, blob);
  }

  return Math.min(1, best);
}

export function DuvoOrb({
  size = 240,
  color = "#ffffff",
  symbolStrength = 1.25,
  dotSize = 0.85,
  pushRadius = 60,
  densityScale = 1,
  statusWords = DEFAULT_WORDS,
  showStatus = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovering, setHovering] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [statusVisible, setStatusVisible] = useState(false);

  useEffect(() => {
    if (!hovering) {
      const hide = window.setTimeout(() => setStatusVisible(false), 0);
      const reset = window.setTimeout(() => setWordIndex(0), 620);
      return () => {
        window.clearTimeout(hide);
        window.clearTimeout(reset);
      };
    }
    const showWord = window.setTimeout(() => setWordIndex(1), 0);
    const show = window.setTimeout(() => setStatusVisible(true), 340);
    const cycle = window.setInterval(() => {
      setWordIndex((prev) => (prev >= statusWords.length - 1 ? 1 : prev + 1));
    }, 1400);
    return () => {
      window.clearTimeout(showWord);
      window.clearTimeout(show);
      window.clearInterval(cycle);
    };
  }, [hovering, statusWords.length]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const count = Math.max(1, Math.round(1500 * densityScale));
    const golden = Math.PI * (Math.sqrt(5) - 1);
    const dots: Dot[] = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return {
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        revealDelay: 0.7 * Math.random() + (i / count) * 0.4,
        dx: 0,
        dy: 0,
      };
    });

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    let raf = 0;
    let started = performance.now();
    let last = started;
    let hoverMix = 0;
    let spin = 0;
    let morphPhase = 0;
    let morphT = 0.2830188679245283;
    const morphHold = 0.2830188679245283;
    const morphPeak = 0.5283018867924528;

    const onMove = (event: PointerEvent) => {
      const wrapBox = wrap.getBoundingClientRect();
      const canvasBox = canvas.getBoundingClientRect();
      if (!pointer.active) setHovering(true);
      pointer.active = true;
      pointer.x = event.clientX - canvasBox.left;
      pointer.y = event.clientY - canvasBox.top;
      void wrapBox;
    };
    const onEnter = (event: PointerEvent) => {
      setHovering(true);
      onMove(event);
    };
    const onLeave = () => {
      pointer.active = false;
      setHovering(false);
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const elapsed = (now - started) / 1000;

      const targetHover = pointer.active ? 1 : 0;
      const hoverSpeed = targetHover > hoverMix ? 3.5 : 1.4;
      hoverMix += (targetHover - hoverMix) * Math.min(1, dt * hoverSpeed);

      const speed = Math.max(0, (hoverMix - 0.05) / 0.95);
      morphT = (((morphT + (dt * speed) / 1.219) % 1) + 1) % 1;
      let morph = morphT < morphHold ? 1 - (1 - morphT / morphHold) ** 2.2 : 1;
      if (morphT >= morphPeak) {
        const e = Math.min(1, Math.max(0, (morphT - morphPeak) / (1 - morphPeak)));
        spin += dt * (-(6 * e * (1 - e) * 240 * 0.8695652173913045) * speed);
      }
      const snap = -120 * Math.round(-(spin / 120));
      spin += (snap - spin) * Math.min(1, dt * (1 - hoverMix) ** 2 * 5);

      const rotY = (spin + elapsed * 18) * (Math.PI / 180);
      const rotX = 0.18 * Math.sin(0.18 * elapsed);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const dpr = window.devicePixelRatio || 1;
      const canvasSize = Math.round(size * 1.58);
      wrap.style.width = `${Math.round(size * 1.58)}px`;
      canvas.style.width = `${canvasSize}px`;
      canvas.style.height = `${canvasSize}px`;
      const pixel = Math.round(canvasSize * dpr);
      if (canvas.width !== pixel || canvas.height !== pixel) {
        canvas.width = pixel;
        canvas.height = pixel;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        raf = requestAnimationFrame(frame);
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      const cx = canvasSize / 2;
      const cy = canvasSize / 2;
      const radius = 0.42 * size;

      for (const dot of dots) {
        dot.dx *= 0.85;
        dot.dy *= 0.85;
      }

      const projected = dots.map((dot) => {
        let x = dot.x * cosY - dot.z * sinY;
        let z = dot.x * sinY + dot.z * cosY;
        let y = dot.y;
        const y2 = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = y2;

        let sx = cx + x * radius;
        let sy = cy + y * radius;

        if (pointer.active && pushRadius > 0) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < pushRadius && dist > 0.01) {
            const falloff = 1 - dist / pushRadius;
            const force = falloff * falloff * 32;
            dot.dx += (dx / dist) * force * 0.18;
            dot.dy += (dy / dist) * force * 0.18;
          }
        }

        sx += dot.dx;
        sy += dot.dy;

        let reveal = 1;
        if (elapsed < 1.5) {
          const t = Math.max(
            0,
            Math.min(1, (elapsed - 0.9 * dot.revealDelay) / 0.6),
          );
          reveal = 1 - (1 - t) ** 3;
        }

        const mask =
          z >= -0.1
            ? symbolMask(sx - dot.dx, sy - dot.dy, cx, cy, 0.68 * radius, spin, morph) *
              ((z + 1) / 2) *
              symbolStrength
            : 0;

        return { sx, sy, z, mask, reveal };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const dot of projected) {
        const depth = (dot.z + 1) / 2;
        const edgeFade = Math.max(
          0,
          Math.min(1, (Math.hypot(dot.sx - cx, dot.sy - cy) / radius - 0.9) / 0.1),
        );
        const mask = Math.min(1, dot.mask);
        const rim = mask > 0.04 ? 1 : 1 - 0.65 * edgeFade;
        const alpha = (0.06 + 0.14 * depth) * rim + 0.85 * mask;
        const finalAlpha = Math.min(1, alpha) * dot.reveal;
        const radiusPx =
          (0.6 + depth) * dotSize + mask * 2 * dotSize * 1.0;
        const finalRadius = Math.max(0.1, radiusPx * dot.reveal);

        ctx.fillStyle = rgba(color, finalAlpha);
        ctx.beginPath();
        ctx.arc(dot.sx, dot.sy, finalRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [size, color, symbolStrength, dotSize, pushRadius, densityScale]);

  const longest = statusWords.reduce((m, w) => Math.max(m, w.length), 0);

  return (
    <div
      className="flex flex-col items-center overflow-visible"
      style={{ width: Math.round(1.58 * size) }}
    >
      <div
        ref={wrapRef}
        className="relative"
        style={{
          width: size,
          height: size,
          cursor: "pointer",
          touchAction: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2"
          style={{ width: Math.round(1.58 * size), height: Math.round(1.58 * size) }}
        />
      </div>

      {showStatus && (
        <div
          className="mt-3 flex h-8 items-center justify-center"
          style={{ minWidth: `max(6.5rem, calc(${longest}ch + 3.2rem))` }}
        >
          <AnimatePresence mode="wait">
            {statusVisible && (
              <motion.p
                key={statusWords[wordIndex] ?? "idle"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-[0.7rem] font-semibold tracking-[0.18em] text-white/55 uppercase"
              >
                {statusWords[wordIndex] ?? "idle"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
