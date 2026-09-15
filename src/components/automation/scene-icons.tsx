import type { ReactNode } from "react";
import { AutomationIcon } from "./icons/automationIcon";
import { ClarityIcon } from "./icons/clarityIcon";
import { PulseIcon } from "./icons/pulseIcon";
import { SapIcon } from "./icons/sapIcon";

export const ICON_LAYOUT = [
  {
    id: "automation",
    theta: -90,
    x: 573.5,
    y: 189.7,
    width: 200,
    height: 168,
    viewBox: "0 0 200 168",
    Icon: AutomationIcon,
    shadow: (
      <ellipse
        cx="594"
        cy="318.7"
        rx="79.5"
        ry="33"
        fill="#D4D4D4"
      />
    ),
  },
  {
    id: "sap",
    theta: 0,
    x: 939.4,
    y: 314.7,
    width: 328,
    height: 183,
    viewBox: "0 0 328 183",
    Icon: SapIcon,
    shadow: (
      <path
        transform="translate(1025.4 449.7)"
        d="M59.585 2.28516C66.9008 -0.762558 78.7623 -0.76253 86.0781 2.28516L132.126 21.4688C139.441 24.5165 139.442 29.4582 132.126 32.5059L86.0781 51.6885C83.0712 52.9411 79.2962 53.6765 75.3848 53.8994L83.4424 57.2568C90.7582 60.3046 90.7582 65.2462 83.4424 68.2939L57.7109 79.0137C50.3951 82.0614 38.5336 82.0614 31.2178 79.0137L5.48633 68.2939C-1.82936 65.2462 -1.82939 60.3046 5.48633 57.2568L31.2178 46.5371C34.2242 45.2847 37.9984 44.5483 41.9092 44.3252L13.5381 32.5059C6.22225 29.4581 6.22225 24.5165 13.5381 21.4688L59.585 2.28516Z"
        fill="#D4D4D4"
      />
    ),
  },
  {
    id: "pulse",
    theta: 180,
    x: 136.6,
    y: 285.7,
    width: 233,
    height: 211,
    viewBox: "0 0 233 211",
    Icon: PulseIcon,
    shadow: (
      <ellipse
        cx="160.6"
        cy="458.7"
        rx="92"
        ry="32"
        fill="#D4D4D4"
      />
    ),
  },
  {
    id: "clarity",
    theta: 90,
    x: 571.5,
    y: 432.5,
    width: 187,
    height: 226,
    viewBox: "0 0 187 226",
    Icon: ClarityIcon,
    shadow: (
      <path
        transform="translate(580.5 633.5)"
        d="M28.7869 1.10312C32.8562 -0.281432 37.4525 -0.36948 40.8257 0.872498L137.224 36.3655C144.422 39.0158 142.577 45.9777 133.893 48.9323L112.881 56.0814C108.812 57.4659 104.216 57.554 100.842 56.312L4.44419 20.819C-2.75417 18.1687 -0.908936 11.2068 7.77501 8.25218L28.7869 1.10312Z"
        fill="#D4D4D4"
      />
    ),
  },
] as const;

export function accentVars(amount: number): React.CSSProperties {
  const mix = (from: number, to: number) =>
    Math.round(from + (to - from) * amount);
  return {
    ["--cq-accent" as string]: `rgb(${mix(224, 255)} ${mix(224, 221)} ${mix(224, 4)})`,
    ["--cq-accent-soft" as string]: `rgb(${mix(242, 255)} ${mix(242, 251)} ${mix(242, 238)})`,
  };
}

export function IconBlend({
  amount,
  children,
}: {
  amount: number;
  children: ReactNode;
}) {
  const inactiveStyle: React.CSSProperties = {
    ...accentVars(0),
    filter: "contrast(0.28) brightness(1.5)",
  };
  const activeStyle: React.CSSProperties = accentVars(1);

  return (
    <>
      {amount < 0.999 ? <g style={inactiveStyle}>{children}</g> : null}
      {amount > 0.001 ? (
        <g style={activeStyle} opacity={amount}>
          {children}
        </g>
      ) : null}
    </>
  );
}
