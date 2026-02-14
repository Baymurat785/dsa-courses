import { useMemo } from "react";

const PADDING = { left: 44, right: 16, top: 16, bottom: 28 };
const WIDTH = 480;
const HEIGHT = 260;
const PLOT_WIDTH = WIDTH - PADDING.left - PADDING.right;
const PLOT_HEIGHT = HEIGHT - PADDING.top - PADDING.bottom;

const N_VALUES = [1, 10, 100, 1000, 10000, 100000, 1000000];

function binarySteps(n: number): number {
  if (n <= 1) return 1;
  return Math.ceil(Math.log2(n));
}

function formatLabel(n: number): string {
  if (n >= 1000000) return "1M";
  if (n >= 1000) return `${n / 1000}K`;
  return String(n);
}

export function SearchPerformanceGraph() {
  const { linearPath, binaryPath, xTicks, yTicks } = useMemo(() => {
    const xMax = Math.log10(1000000);
    const yMax = Math.log10(1000000);

    const toX = (n: number) =>
      PADDING.left + (Math.log10(n) / xMax) * PLOT_WIDTH;
    const toY = (steps: number) =>
      PADDING.top + (1 - Math.log10(steps) / yMax) * PLOT_HEIGHT;

    const linearPoints = N_VALUES.map((n) => ({
      x: toX(n),
      y: toY(n),
    }));
    const binaryPoints = N_VALUES.map((n) => ({
      x: toX(n),
      y: toY(binarySteps(n)),
    }));

    const linearPath = linearPoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const binaryPath = binaryPoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

    const xTicks = N_VALUES.map((n) => ({
      x: toX(n),
      label: formatLabel(n),
    }));
    const yTickValues = [1, 10, 100, 1000, 10000, 100000, 1000000];
    const yTicks = yTickValues.map((steps) => ({
      y: toY(steps),
      label: formatLabel(steps),
    }));

    return { linearPath, binaryPath, xTicks, yTicks };
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="max-w-full h-auto"
        aria-label="Graph comparing linear search steps (N) vs binary search steps (log₂ N) as array size grows"
      >
        <defs>
          <linearGradient
            id="linearLineGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity={1} />
            <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient
            id="binaryLineGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity={1} />
            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity={0.6} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.slice(1).map((tick, i) => (
          <line
            key={i}
            x1={PADDING.left}
            y1={tick.y}
            x2={WIDTH - PADDING.right}
            y2={tick.y}
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeDasharray="4 2"
            strokeWidth={1}
          />
        ))}
        {xTicks.slice(1).map((tick, i) => (
          <line
            key={i}
            x1={tick.x}
            y1={PADDING.top}
            x2={tick.x}
            y2={HEIGHT - PADDING.bottom}
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeDasharray="4 2"
            strokeWidth={1}
          />
        ))}

        {/* Curves */}
        <path
          d={linearPath}
          fill="none"
          stroke="url(#linearLineGradient)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-500"
        />
        <path
          d={binaryPath}
          fill="none"
          stroke="url(#binaryLineGradient)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-indigo-500"
        />

        {/* X axis labels */}
        {xTicks.map((tick, i) => (
          <text
            key={i}
            x={tick.x}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-slate-500 text-[10px] font-medium dark:fill-slate-400"
          >
            {tick.label}
          </text>
        ))}

        {/* Y axis labels */}
        {yTicks.map((tick, i) => (
          <text
            key={i}
            x={PADDING.left - 8}
            y={tick.y + 4}
            textAnchor="end"
            className="fill-slate-500 text-[10px] font-medium dark:fill-slate-400"
          >
            {tick.label}
          </text>
        ))}

        {/* Axis titles */}
        <text
          x={PADDING.left + PLOT_WIDTH / 2}
          y={HEIGHT - 4}
          textAnchor="middle"
          className="fill-slate-600 text-xs font-medium dark:fill-slate-300"
        >
          Array size (N)
        </text>
        <text
          x={14}
          y={PADDING.top + PLOT_HEIGHT / 2}
          textAnchor="middle"
          className="fill-slate-600 text-xs font-medium dark:fill-slate-300"
          transform={`rotate(-90, 14, ${PADDING.top + PLOT_HEIGHT / 2})`}
        >
          Steps (log scale)
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 border-t border-slate-200 pt-3 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span
            className="h-1 w-8 rounded-full bg-red-500 dark:bg-red-400"
            aria-hidden
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Linear search (N steps)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-1 w-8 rounded-full bg-indigo-500 dark:bg-indigo-400"
            aria-hidden
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Binary search (log₂N steps)
          </span>
        </div>
      </div>
    </div>
  );
}
