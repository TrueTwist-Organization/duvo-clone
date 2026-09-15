"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  DISC_PLATFORMS,
  FLOW_ANGLES,
  FOUNDATION_RINGS,
  TILE_PATH,
  WHITE_TILES,
  arcPath,
  ew,
  ev,
} from "./live-scene-math";
import { ICON_LAYOUT } from "./scene-icons";

type Props = {
  progress?: number;
  className?: string;
};

const DISC_COLOR = "#A6A6A6";

function tileInk(theta: number, rotation: number) {
  const n = Math.round(178 * (1 - ev(theta, rotation)));
  return `rgb(${n} ${n} ${n})`;
}

function FoundationRings({
  play,
  reduceMotion,
}: {
  play: boolean;
  reduceMotion: boolean;
}) {
  return (
    <g transform="translate(285.5 420)">
      <g mask="url(#cq-foundation-mask)">
        {FOUNDATION_RINGS.map((y, index) => (
          <motion.g
            key={y}
            initial={reduceMotion ? false : { opacity: 0, y: -118, scale: 0.99 }}
            animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    delay: 0.05 + 0.06 * index,
                    duration: 0.56,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
            style={{ transformOrigin: "388px 119px" }}
          >
            <ellipse
              cx="386.598"
              cy="119.231"
              rx="386.598"
              ry="119.231"
              transform={`matrix(1 0 0 -1 1.42188 ${y})`}
              fill="white"
              stroke="black"
              strokeOpacity={0.14}
              strokeWidth="2.83862"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        ))}
        <motion.path
          d="M774.619 119.231C774.619 185.081 601.533 238.463 388.02 238.463C174.508 238.463 1.42188 185.081 1.42188 119.231C1.42188 53.3817 174.508 0 388.02 0C601.533 0 774.619 53.3817 774.619 119.231Z"
          fill="#D4D4D4"
          initial={reduceMotion ? false : { opacity: 0, y: -88, scale: 0.985 }}
          animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { delay: 0.65, duration: 0.58, ease: [0.22, 1, 0.36, 1] }
          }
          style={{ transformOrigin: "388px 119px" }}
        />
      </g>
    </g>
  );
}

function DiscPlatforms({
  rotation,
  play,
  reduceMotion,
}: {
  rotation: number;
  play: boolean;
  reduceMotion: boolean;
}) {
  return (
    <g clipPath="url(#cq-disc-clip)">
      {DISC_PLATFORMS.map((platform) => {
        const offset = ew(platform.theta, rotation);
        const rad = ((platform.theta + rotation) * Math.PI) / 180;
        const bob = {
          x: 22 * Math.cos(rad),
          y: 22 * Math.sin(rad) * 0.36912114014251785,
        };
        return (
          <g
            key={platform.id}
            transform={`translate(${offset.x + bob.x} ${offset.y + bob.y})`}
          >
            <motion.g
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={
                reduceMotion ? { duration: 0 } : { delay: 0.9, duration: 0.42 }
              }
            >
              <path
                transform={`translate(${platform.x} ${platform.y + 250 + 28})`}
                d={TILE_PATH}
                fill={DISC_COLOR}
                stroke={DISC_COLOR}
                strokeWidth="5.67725"
                strokeLinejoin="round"
              />
            </motion.g>
          </g>
        );
      })}
      <motion.g
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={reduceMotion ? { duration: 0 } : { delay: 1.1, duration: 0.42 }}
      >
        {FLOW_ANGLES.map((angle) => {
          const yOffset =
            28 +
            10 * Math.max(0, -Math.sin(((angle + rotation) * Math.PI) / 180) / 0.7071);
          return (
            <path
              key={`${angle}-${rotation}`}
              d={arcPath(angle + rotation, yOffset)}
              stroke={DISC_COLOR}
              strokeWidth="1.54846"
              strokeLinejoin="round"
            />
          );
        })}
      </motion.g>
    </g>
  );
}

function WhitePlatforms({
  rotation,
  play,
  reduceMotion,
}: {
  rotation: number;
  play: boolean;
  reduceMotion: boolean;
}) {
  return (
    <g transform="translate(0 250)">
      {WHITE_TILES.map((tile) => {
        const offset = ew(tile.theta, rotation);
        const ink = tileInk(tile.theta, rotation);
        return (
          <g key={tile.theta} transform={`translate(${offset.x} ${offset.y})`}>
            <motion.g
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={
                reduceMotion ? { duration: 0 } : { delay: 0.95, duration: 0.72 }
              }
            >
              <g transform={tile.transform}>
                <path d={tile.fill} fill="white" />
                <path
                  d={tile.stroke}
                  stroke={ink}
                  strokeOpacity={0.8}
                  strokeWidth="5.67725"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d={tile.detail}
                  stroke={ink}
                  strokeOpacity={0.6}
                  strokeWidth="2.83862"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </motion.g>
          </g>
        );
      })}
    </g>
  );
}

function FlowArrows({
  rotation,
  play,
  reduceMotion,
}: {
  rotation: number;
  play: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.g
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={play ? { opacity: 1 } : undefined}
      transition={reduceMotion ? { duration: 0 } : { delay: 1.1, duration: 0.42 }}
    >
      {FLOW_ANGLES.map((angle) => (
        <path
          key={`flow-${angle}-${rotation}`}
          d={arcPath(angle + rotation)}
          stroke="#6A6A6A"
          strokeWidth="1.54846"
          strokeLinejoin="round"
          strokeDasharray="7.35 6.19"
          fill="none"
          markerStart="url(#cq-arrowhead)"
          markerEnd="url(#cq-arrowhead)"
        />
      ))}
    </motion.g>
  );
}

function FloatingIcons({
  rotation,
  play,
  floatActive,
  reduceMotion,
}: {
  rotation: number;
  play: boolean;
  floatActive: boolean;
  reduceMotion: boolean;
}) {
  return (
    <>
      <g>
        {ICON_LAYOUT.map((icon, index) => {
          const offset = ew(icon.theta, rotation);
          return (
            <g key={`${icon.id}-shadow`} transform={`translate(${offset.x} ${offset.y})`}>
              <motion.g
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={play ? { opacity: 1 } : undefined}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { delay: 1.15 + index * 0.12, duration: 0.5 }
                }
              >
                {icon.shadow}
              </motion.g>
            </g>
          );
        })}
      </g>
      <g>
        {ICON_LAYOUT.map((icon, index) => {
          const offset = ew(icon.theta, rotation);
          const amount = ev(icon.theta, rotation);
          const Icon = icon.Icon;
          return (
            <g key={icon.id} transform={`translate(${offset.x} ${offset.y})`}>
              <motion.g
                initial={reduceMotion ? false : { opacity: 0, y: -30 }}
                animate={play ? { opacity: 1, y: 0 } : undefined}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        delay: 1.15 + index * 0.12,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                <motion.g
                  animate={
                    reduceMotion || !play
                      ? undefined
                      : floatActive
                        ? { y: [0, -8, 0] }
                        : { y: 0 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : floatActive
                        ? {
                            delay: 1.15 + index * 0.12 + 0.6,
                            duration: 4.2 + index * 0.3,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }
                        : { duration: 0.3 }
                  }
                >
                  <svg
                    x={icon.x}
                    y={icon.y}
                    width={icon.width}
                    height={icon.height}
                    viewBox={icon.viewBox}
                    fill="none"
                    overflow="visible"
                    shapeRendering="geometricPrecision"
                    opacity={0.35 + amount * 0.65}
                  >
                    <Icon />
                  </svg>
                </motion.g>
              </motion.g>
            </g>
          );
        })}
      </g>
    </>
  );
}

export function LiveAutomationScene({ progress = 0, className }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const floatActive = useInView(ref, { amount: 0.05 });
  const play = Boolean(reduceMotion || inView);
  const rotation = 90 * progress;

  return (
    <div
      ref={ref}
      className={cn("relative mx-auto max-w-[54.8rem]", className)}
    >
      <svg
        width="1348"
        height="940"
        viewBox="0 170 1348 940"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Duvo Case Queue composition showing aligned process tiles above a layered queue foundation"
        className="h-auto w-full overflow-visible"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient
            id="cq-foundation-fade"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="280"
            x2="0"
            y2="690"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="cq-foundation-mask" maskUnits="userSpaceOnUse">
            <rect x="-40" y="-170" width="860" height="960" fill="url(#cq-foundation-fade)" />
          </mask>
          <marker
            id="cq-arrowhead"
            viewBox="0 0 10 10"
            refX="6.5"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path
              d="M2.5 1.5L7.5 5L2.5 8.5"
              fill="none"
              stroke="#6A6A6A"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
          <clipPath id="cq-disc-clip">
            <ellipse cx="673.52" cy="539.231" rx="386.599" ry="119.231" />
          </clipPath>
        </defs>

        <FoundationRings play={play} reduceMotion={Boolean(reduceMotion)} />
        <DiscPlatforms
          rotation={rotation}
          play={play}
          reduceMotion={Boolean(reduceMotion)}
        />
        <WhitePlatforms
          rotation={rotation}
          play={play}
          reduceMotion={Boolean(reduceMotion)}
        />
        <FlowArrows
          rotation={rotation}
          play={play}
          reduceMotion={Boolean(reduceMotion)}
        />
        <FloatingIcons
          rotation={rotation}
          play={play}
          floatActive={floatActive}
          reduceMotion={Boolean(reduceMotion)}
        />
      </svg>
    </div>
  );
}
