"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";
type Mode = "spiral" | "pulse" | "wave";

type Rider = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  x: number;
  y: number;
  opacity: number;
  age: number;
  duration: number;
  ease: (t: number) => number;
  glowRgb: string;
};

const BRANDS = [
  { rgb: "255, 221, 4", line: "rgba(120, 90, 0, 0.85)" },
  { rgb: "95, 229, 215", line: "rgba(20, 90, 85, 0.85)" },
  { rgb: "252, 105, 81", line: "rgba(110, 30, 18, 0.85)" },
];

const EASES = [(t: number) => t * t, (t: number) => t * t * t];

type Props = {
  mode?: Mode;
  theme?: Theme;
  connectors?: boolean;
  riders?: boolean;
  className?: string;
};

export function BackgroundMesh({
  mode = "spiral",
  theme = "light",
  connectors = true,
  riders = true,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dotColor =
      theme === "dark" ? "rgba(255, 255, 255, 0.40)" : "rgb(150, 150, 150)";
    const lineColor =
      theme === "dark" ? "rgba(255, 255, 255, 0.22)" : "rgb(180, 180, 180)";

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let originX = 0;
    let originY = -114.5;
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    let spawnAccum = 0;
    let nextSpawn = 80 + 120 * Math.random();
    const active: Rider[] = [];

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = 15;
    maskCanvas.height = 15;
    const maskCtx = maskCanvas.getContext("2d");
    const maskData = maskCtx?.createImageData(15, 15);

    const dotsLayer = document.createElement("canvas");
    const dotsCtx = dotsLayer.getContext("2d");
    const linesLayer = document.createElement("canvas");
    const linesCtx = linesLayer.getContext("2d");

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas!.width = Math.floor(width);
      canvas!.height = Math.floor(height);
      dotsLayer.width = canvas!.width;
      dotsLayer.height = canvas!.height;
      linesLayer.width = canvas!.width;
      linesLayer.height = canvas!.height;
      originX = (((width / 2) % 80) + 80) % 80;
      originY = -114.5;
      cols = Math.ceil((width - originX) / 80) + 1;
      rows = Math.ceil((height - originY) / 80) + 1;
    }

    function cell(col: number, row: number) {
      return {
        x: originX + 80 * col - 1.5,
        y: originY + 80 * row - 1.5,
      };
    }

    function writeMask(time: number) {
      if (!maskCtx || !maskData) return;
      const data = maskData.data;
      if (mode === "pulse") {
        for (let y = 0; y < 15; y += 1) {
          for (let x = 0; x < 15; x += 1) {
            const dx = x - 7.5;
            const dy = y - 7.5;
            const v = Math.pow(
              (Math.sin(Math.sqrt(dx * dx + dy * dy) / 15 * Math.PI * 5 - 2 * time) +
                1) /
                2,
              2,
            );
            const i = (15 * y + x) * 4;
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = Math.floor(255 * v);
          }
        }
      } else if (mode === "wave") {
        for (let i = 3; i < data.length; i += 4) data[i] = 0;
        for (let a = 0; a < 3; a += 1) {
          const cx = 15 * Math.cos(time + 0.6 * a) * 0.3 + 7.5;
          const cy = 15 * Math.sin(time + 0.6 * a) * 0.3 + 7.5;
          const radius = 8.25 * (1 - 0.18 * a);
          for (let y = 0; y < 15; y += 1) {
            for (let x = 0; x < 15; x += 1) {
              const dx = x - cx;
              const dy = y - cy;
              const add = 255 * Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / radius);
              const i = (15 * y + x) * 4;
              data[i] = 255;
              data[i + 1] = 255;
              data[i + 2] = 255;
              data[i + 3] = Math.min(255, data[i + 3] + add);
            }
          }
        }
      } else {
        for (let y = 0; y < 15; y += 1) {
          for (let x = 0; x < 15; x += 1) {
            const nx = (x - 7.5) / 15;
            const ny = (7.5 - y) / 15;
            const radius = Math.sqrt(nx * nx + ny * ny);
            const angle = Math.atan2(ny, nx);
            let best = Infinity;
            for (let arm = 0; arm < 12; arm += 1) {
              const delta =
                radius -
                0.18 *
                  Math.exp(
                    1.4 *
                      ((angle - ((2 * Math.PI * arm) / 4) + 0.55 * time) %
                        (2 * Math.PI)),
                  );
              if (Math.abs(delta) < Math.abs(best)) best = delta;
            }
            const alpha = Math.pow(
              Math.max(0, 1 - Math.min(Math.abs(best) / 0.35, 1)),
              5,
            );
            const i = (15 * y + x) * 4;
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = Math.floor(255 * alpha);
          }
        }
      }
      maskCtx.putImageData(maskData, 0, 0);
    }

    function applyMask(target: CanvasRenderingContext2D, time: number) {
      writeMask(time);
      target.save();
      target.globalCompositeOperation = "destination-in";
      target.drawImage(maskCanvas, 0, 0, width, height);
      target.restore();
    }

    function spawnRider(burst: boolean) {
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      const direction = Math.random() > 0.5 ? 1 : -1;
      const ease = EASES[Math.floor(Math.random() * EASES.length)];
      const pick = Math.random();
      const brand = pick < 0.48 ? BRANDS[0] : pick < 0.94 ? BRANDS[1] : BRANDS[2];
      const travel = burst ? 700 + 500 * Math.random() : 520 + 280 * Math.random();
      const duration = burst
        ? 850 + 500 * Math.random()
        : 2800 + 1600 * Math.random();

      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;

      if (burst) {
        const midCol = Math.round((width / 2 - originX) / 80);
        const midRow = Math.round((height / 2 - originY) / 80);
        const jitter = (range: number) =>
          Math.floor((Math.random() - 0.5) * (2 * range + 1));
        if (orientation === "horizontal") {
          const row = Math.max(0, Math.min(rows, midRow + jitter(2)));
          const y = originY + 80 * row;
          startX = originX + 80 * midCol;
          endX = startX + direction * travel;
          startY = endY = y;
        } else {
          const col = Math.max(0, Math.min(cols, midCol + jitter(2)));
          const x = originX + 80 * col;
          startY = originY + 80 * midRow;
          endY = startY + direction * travel;
          startX = endX = x;
        }
      } else if (orientation === "horizontal") {
        const y = originY + 80 * Math.floor(Math.random() * (rows + 1));
        startX = direction === 1 ? -90 : width + 90;
        endX = startX + direction * travel;
        startY = endY = y;
      } else {
        const x = originX + 80 * Math.floor(Math.random() * (cols + 1));
        startY = direction === 1 ? -90 : height + 90;
        endY = startY + direction * travel;
        startX = endX = x;
      }

      active.push({
        startX,
        startY,
        endX,
        endY,
        x: startX,
        y: startY,
        opacity: 0,
        age: 0,
        duration,
        ease,
        glowRgb: brand.rgb,
      });
    }

    function drawRiders(dt: number) {
      const bursting = elapsed < 1200;
      spawnAccum += dt;
      if (spawnAccum >= nextSpawn && active.length < (bursting ? 13 : 4)) {
        spawnRider(false);
        spawnAccum = 0;
        nextSpawn = bursting
          ? 110 + 140 * Math.random()
          : 900 + 1400 * Math.random();
      }

      for (const rider of active) {
        rider.age += dt;
        if (rider.age < 250) rider.opacity = rider.age / 250;
        else if (rider.age > rider.duration - 700) {
          rider.opacity = Math.max(0, (rider.duration - rider.age) / 700);
        } else rider.opacity = 1;
        const t = Math.min(1, Math.max(0, rider.age / rider.duration));
        const e = rider.ease(t);
        rider.x = rider.startX + (rider.endX - rider.startX) * e;
        rider.y = rider.startY + (rider.endY - rider.startY) * e;
      }
      for (let i = active.length - 1; i >= 0; i -= 1) {
        if (active[i].age >= active[i].duration) active.splice(i, 1);
      }

      for (const rider of active) {
        ctx!.save();
        ctx!.globalAlpha = rider.opacity;
        ctx!.translate(rider.x, rider.y);
        const outer = ctx!.createRadialGradient(0, 0, 0, 0, 0, 56);
        outer.addColorStop(0, `rgba(${rider.glowRgb}, 0.045)`);
        outer.addColorStop(0.5, `rgba(${rider.glowRgb}, 0.015)`);
        outer.addColorStop(1, `rgba(${rider.glowRgb}, 0)`);
        ctx!.fillStyle = outer;
        ctx!.beginPath();
        ctx!.arc(0, 0, 56, 0, Math.PI * 2);
        ctx!.fill();
        const mid = ctx!.createRadialGradient(0, 0, 0, 0, 0, 22);
        mid.addColorStop(0, `rgba(${rider.glowRgb}, 0.10)`);
        mid.addColorStop(1, `rgba(${rider.glowRgb}, 0)`);
        ctx!.fillStyle = mid;
        ctx!.beginPath();
        ctx!.arc(0, 0, 22, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${rider.glowRgb}, 0.95)`;
        ctx!.beginPath();
        ctx!.arc(0, 0, 2.4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    function frame(now: number) {
      const dt = last === 0 ? 16 : Math.min(64, now - last);
      last = now;
      elapsed += dt;
      if (!dotsCtx || !linesCtx) {
        raf = requestAnimationFrame(frame);
        return;
      }

      dotsCtx.clearRect(0, 0, width, height);
      dotsCtx.fillStyle = dotColor;
      for (let row = 0; row <= rows; row += 1) {
        for (let col = 0; col <= cols; col += 1) {
          const { x, y } = cell(col, row);
          dotsCtx.beginPath();
          dotsCtx.arc(x + 1.5, y + 1.5, 1.5, 0, Math.PI * 2);
          dotsCtx.fill();
        }
      }

      if (connectors) {
        linesCtx.clearRect(0, 0, width, height);
        linesCtx.strokeStyle = lineColor;
        linesCtx.lineWidth = 0.55;
        linesCtx.beginPath();
        for (let row = 0; row <= rows; row += 1) {
          for (let col = 0; col <= cols; col += 1) {
            const { x, y } = cell(col, row);
            if (col < cols) {
              const yy = y + 1.5;
              const x1 = x + 3 + 13;
              const x2 = x + 3 + 13 + 48;
              linesCtx.moveTo(x1, yy);
              linesCtx.lineTo(x2, yy);
            }
            if (row < rows) {
              const xx = originX + 80 * col;
              const y1 = y + 3 + 13;
              const y2 = y + 3 + 13 + 48;
              linesCtx.moveTo(xx, y1);
              linesCtx.lineTo(xx, y2);
            }
          }
        }
        linesCtx.stroke();
      }

      const t = 0.001 * elapsed;
      applyMask(dotsCtx, t);
      if (connectors) applyMask(linesCtx, 1.05 * t);

      ctx!.clearRect(0, 0, width, height);
      ctx!.drawImage(dotsLayer, 0, 0);
      if (connectors) ctx!.drawImage(linesLayer, 0, 0);
      if (riders) drawRiders(dt);

      raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [mode, theme, connectors, riders]);

  return (
    <motion.canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
}
