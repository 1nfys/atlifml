import { useEffect, useRef } from "react";

const LETTER_A: [number, number][] = [
  [99.0, 968.0],
  [123.21, 923.37],
  [150.51, 880.56],
  [177.86, 837.78],
  [205.01, 794.88],
  [232.12, 751.95],
  [259.03, 708.89],
  [287.02, 664.36],
  [314.73, 619.65],
  [342.22, 574.81],
  [369.68, 529.94],
  [396.89, 484.93],
  [424.61, 438.87],
  [452.36, 392.84],
  [479.91, 346.69],
  [507.32, 300.44],
  [534.72, 254.2],
  [562.13, 207.96],
  [589.79, 161.88],
  [627.1, 125.5],
  [642.03, 177.1],
  [649.39, 230.31],
  [656.66, 283.53],
  [664.04, 336.74],
  [672.09, 389.84],
  [680.84, 442.84],
  [689.42, 495.87],
  [697.88, 548.91],
  [705.69, 602.06],
  [726.55, 651.47],
  [736.83, 702.93],
  [753.3, 752.77],
  [775.36, 800.4],
  [799.81, 846.86],
  [828.37, 890.9],
  [870.4, 922.1],
  [876.52, 866.2],
  [856.82, 812.83],
  [830.71, 762.52],
  [799.48, 722.14],
  [766.1, 683.72],
  [726.55, 651.47],
];

const HOOP: [number, number][] = [
  [687.32, 615.41],
  [642.29, 586.78],
  [595.99, 560.23],
  [548.31, 536.26],
  [498.96, 515.94],
  [448.43, 498.77],
  [396.89, 484.93],
  [343.53, 476.96],
  [289.72, 473.42],
  [235.91, 476.4],
  [183.43, 488.47],
  [136.76, 515.02],
  [113.88, 562.38],
  [130.69, 612.95],
  [167.65, 652.06],
  [211.95, 682.81],
  [259.03, 708.89],
  [309.54, 724.99],
  [360.44, 739.78],
  [412.07, 751.77],
  [464.3, 760.81],
  [516.92, 767.2],
  [569.77, 771.27],
  [622.76, 772.88],
  [675.77, 772.57],
  [728.73, 770.2],
];

const LETTER_B: [number, number][] = [
  [781.7, 768.2],
  [830.71, 762.52],
  [884.48, 753.01],
  [939.0, 750.0],
];

const ROUTE: [number, number][] = [...LETTER_A, ...HOOP, ...LETTER_B];

const seen = new Set<string>();
const UNIQUE_DOTS: [number, number][] = [];
for (const [x, y] of ROUTE) {
  const key = `${x.toFixed(2)},${y.toFixed(2)}`;
  if (!seen.has(key)) {
    seen.add(key);
    UNIQUE_DOTS.push([x, y]);
  }
}

const DOT_R = 9.8;
const STEP_MS = 360;
const LIGHT_MS = 1400;
const LIGHT_RADIUS = 20;
const LIGHT_RADIUS_SQ = LIGHT_RADIUS * LIGHT_RADIUS;

export default function LogoDots({ className = "" }: { className?: string }) {
  const runnerRef = useRef<SVGGElement | null>(null);
  const dotsRef = useRef<Map<string, SVGCircleElement>>(new Map());

  useEffect(() => {
    let active = true;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let curr = 0;
    const litTimers = new Map<string, ReturnType<typeof setTimeout>>();

    const lightNear = (x: number, y: number) => {
      for (const [key, circle] of dotsRef.current.entries()) {
        const [dx, dy] = key.split(",").map(Number);
        const distSq = (dx - x) * (dx - x) + (dy - y) * (dy - y);
        if (distSq <= LIGHT_RADIUS_SQ) {
          circle.classList.add("recent");
          const existing = litTimers.get(key);
          if (existing) clearTimeout(existing);
          const t = setTimeout(() => {
            circle.classList.remove("recent");
            litTimers.delete(key);
          }, LIGHT_MS);
          litTimers.set(key, t);
        }
      }
    };

    const tick = () => {
      if (!active) return;

      const [x, y] = ROUTE[curr];
      if (runnerRef.current) {
        runnerRef.current.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      }
      lightNear(x, y);

      curr = (curr + 1) % ROUTE.length;
      timerId = setTimeout(tick, STEP_MS);
    };

    const [startX, startY] = ROUTE[0];
    if (runnerRef.current) {
      runnerRef.current.setAttribute("transform", `translate(${startX.toFixed(2)} ${startY.toFixed(2)})`);
    }
    lightNear(startX, startY);

    timerId = setTimeout(tick, STEP_MS);

    return () => {
      active = false;
      if (timerId) clearTimeout(timerId);
      for (const t of litTimers.values()) clearTimeout(t);
    };
  }, []);

  return (
    <div className={`hero-logo-wrap ${className}`}>
      <svg
        className="hero-logo-svg"
        viewBox="0 0 1024 1024"
        role="img"
        aria-label="atlifm animated dot logo"
      >
        <g className="dots-group">
          {UNIQUE_DOTS.map(([x, y]) => {
            const key = `${x.toFixed(2)},${y.toFixed(2)}`;
            return (
              <circle
                key={key}
                cx={x}
                cy={y}
                r={DOT_R}
                className="dot"
                ref={(el) => {
                  if (el) dotsRef.current.set(key, el);
                  else dotsRef.current.delete(key);
                }}
              />
            );
          })}
        </g>

        <g id="runner" ref={runnerRef}>
          <circle cx="0" cy="0" r="16.5" fill="none" stroke="#ffffff" strokeWidth="2.6" />
        </g>
      </svg>
    </div>
  );
}
