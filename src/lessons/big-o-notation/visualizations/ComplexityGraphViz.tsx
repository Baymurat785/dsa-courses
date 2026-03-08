import { useState, useMemo, useCallback } from "react";

const PADDING = { left: 48, right: 20, top: 20, bottom: 36 };
const WIDTH = 520;
const HEIGHT = 300;
const PLOT_W = WIDTH - PADDING.left - PADDING.right;
const PLOT_H = HEIGHT - PADDING.top - PADDING.bottom;

const MAX_N = 25;
const MAX_STEPS = 625; // 25²

interface Series {
  label: string;
  color: string;
  darkColor: string;
  fn: (n: number) => number;
}

const SERIES: Series[] = [
  { label: "O(1)", color: "#10b981", darkColor: "#34d399", fn: () => 1 },
  {
    label: "O(log n)",
    color: "#0ea5e9",
    darkColor: "#38bdf8",
    fn: (n) => (n <= 1 ? 1 : Math.ceil(Math.log2(n))),
  },
  { label: "O(n)", color: "#f59e0b", darkColor: "#fbbf24", fn: (n) => n },
  {
    label: "O(n log n)",
    color: "#f97316",
    darkColor: "#fb923c",
    fn: (n) => (n <= 1 ? 1 : Math.round(n * Math.log2(n))),
  },
  { label: "O(n²)", color: "#ef4444", darkColor: "#f87171", fn: (n) => n * n },
];

function toX(n: number) {
  return PADDING.left + (n / MAX_N) * PLOT_W;
}

function toY(steps: number) {
  return PADDING.top + (1 - Math.min(steps, MAX_STEPS) / MAX_STEPS) * PLOT_H;
}

export function ComplexityGraphViz() {
  const [hoverN, setHoverN] = useState<number | null>(null);

  const paths = useMemo(() => {
    return SERIES.map((s) => {
      const points: string[] = [];
      for (let n = 1; n <= MAX_N; n++) {
        const steps = s.fn(n);
        const x = toX(n);
        const y = toY(steps);
        points.push(`${n === 1 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      return { ...s, d: points.join(" ") };
    });
  }, []);

  const xTicks = [1, 5, 10, 15, 20, 25];
  const yTicks = [0, 125, 250, 375, 500, 625];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const svgX = (clientX / rect.width) * WIDTH;
      const n = Math.round(((svgX - PADDING.left) / PLOT_W) * MAX_N);
      if (n >= 1 && n <= MAX_N) {
        setHoverN(n);
      } else {
        setHoverN(null);
      }
    },
    []
  );

  return (
    <div className="space-y-3">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto max-w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverN(null)}
          aria-label="Graph comparing O(1), O(log n), O(n), O(n log n), and O(n²) growth rates"
        >
          {/* Grid lines */}
          {yTicks.slice(1).map((steps) => (
            <line
              key={`y-${steps}`}
              x1={PADDING.left}
              y1={toY(steps)}
              x2={WIDTH - PADDING.right}
              y2={toY(steps)}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeDasharray="4 2"
            />
          ))}
          {xTicks.slice(1).map((n) => (
            <line
              key={`x-${n}`}
              x1={toX(n)}
              y1={PADDING.top}
              x2={toX(n)}
              y2={HEIGHT - PADDING.bottom}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeDasharray="4 2"
            />
          ))}

          {/* Curves */}
          {paths.map((p) => (
            <path
              key={p.label}
              d={p.d}
              fill="none"
              stroke={p.color}
              className="dark:hidden"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {paths.map((p) => (
            <path
              key={`${p.label}-dark`}
              d={p.d}
              fill="none"
              stroke={p.darkColor}
              className="hidden dark:block"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Hover line */}
          {hoverN !== null && (
            <>
              <line
                x1={toX(hoverN)}
                y1={PADDING.top}
                x2={toX(hoverN)}
                y2={HEIGHT - PADDING.bottom}
                stroke="currentColor"
                strokeOpacity={0.3}
                strokeWidth={1}
              />
              {SERIES.map((s) => {
                const steps = s.fn(hoverN);
                const y = toY(steps);
                return (
                  <circle
                    key={s.label}
                    cx={toX(hoverN)}
                    cy={y}
                    r={4}
                    fill={s.color}
                    className="dark:hidden"
                    stroke="white"
                    strokeWidth={2}
                  />
                );
              })}
              {SERIES.map((s) => {
                const steps = s.fn(hoverN);
                const y = toY(steps);
                return (
                  <circle
                    key={`${s.label}-dark`}
                    cx={toX(hoverN)}
                    cy={y}
                    r={4}
                    fill={s.darkColor}
                    className="hidden dark:block"
                    stroke="#1e293b"
                    strokeWidth={2}
                  />
                );
              })}
            </>
          )}

          {/* X axis labels */}
          {xTicks.map((n) => (
            <text
              key={`xl-${n}`}
              x={toX(n)}
              y={HEIGHT - 10}
              textAnchor="middle"
              className="fill-slate-500 text-[10px] font-medium dark:fill-slate-400"
            >
              {n}
            </text>
          ))}
          {/* Y axis labels */}
          {yTicks.map((steps) => (
            <text
              key={`yl-${steps}`}
              x={PADDING.left - 8}
              y={toY(steps) + 4}
              textAnchor="end"
              className="fill-slate-500 text-[10px] font-medium dark:fill-slate-400"
            >
              {steps}
            </text>
          ))}

          {/* Axis titles */}
          <text
            x={PADDING.left + PLOT_W / 2}
            y={HEIGHT - 2}
            textAnchor="middle"
            className="fill-slate-600 text-xs font-medium dark:fill-slate-300"
          >
            Input size (n)
          </text>
          <text
            x={14}
            y={PADDING.top + PLOT_H / 2}
            textAnchor="middle"
            className="fill-slate-600 text-xs font-medium dark:fill-slate-300"
            transform={`rotate(-90, 14, ${PADDING.top + PLOT_H / 2})`}
          >
            Steps
          </text>
        </svg>
      </div>

      {/* Hover tooltip */}
      {hoverN !== null && (
        <div className="rounded-lg bg-slate-100 px-4 py-2 dark:bg-slate-800">
          <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            n = {hoverN}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {SERIES.map((s) => (
              <span key={s.label} className="text-sm">
                <span
                  className="mr-1 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {s.label}:
                </span>{" "}
                <span className="text-slate-600 dark:text-slate-400">
                  {s.fn(hoverN).toLocaleString()}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      {hoverN === null && (
        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-slate-200 pt-3 dark:border-slate-700">
          {SERIES.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span
                className="h-1 w-6 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
