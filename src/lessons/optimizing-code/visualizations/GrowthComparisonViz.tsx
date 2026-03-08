import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = {
  n: { line: "#3b82f6", label: "N", bg: "bg-blue-500" },
  n2x: { line: "#14b8a6", label: "2N", bg: "bg-teal-500" },
  n4x: { line: "#f59e0b", label: "4N", bg: "bg-amber-500" },
  nsq: { line: "#ef4444", label: "N²", bg: "bg-red-500" },
};

export function GrowthComparisonViz() {
  const [maxN, setMaxN] = useState(20);

  const chartData = useMemo(() => {
    const points = 50;
    const step = maxN / points;
    const data: { n: number; y_n: number; y_2n: number; y_4n: number; y_nsq: number }[] = [];

    for (let i = 0; i <= points; i++) {
      const n = Math.round(step * i);
      data.push({
        n,
        y_n: n,
        y_2n: 2 * n,
        y_4n: 4 * n,
        y_nsq: n * n,
      });
    }
    return data;
  }, [maxN]);

  const maxY = maxN * maxN;
  const chartW = 400;
  const chartH = 250;
  const padL = 50;
  const padB = 30;
  const padT = 10;
  const padR = 10;

  const toX = (n: number) => padL + (n / maxN) * (chartW - padL - padR);
  const toY = (y: number) =>
    chartH - padB - (Math.min(y, maxY) / maxY) * (chartH - padB - padT);

  const makePath = (key: "y_n" | "y_2n" | "y_4n" | "y_nsq") =>
    chartData
      .map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.n)} ${toY(d[key])}`)
      .join(" ");

  // Y axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((frac) => ({
    val: Math.round(maxY * frac),
    y: toY(maxY * frac),
  }));

  // X axis ticks
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((frac) => ({
    val: Math.round(maxN * frac),
    x: toX(maxN * frac),
  }));

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Max data size (N)
          </label>
          <span className="rounded-lg bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            N = {maxN}
          </span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          value={maxN}
          onChange={(e) => setMaxN(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>5</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full max-w-[500px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {yTicks.map((t) => (
            <line
              key={`yg-${t.val}`}
              x1={padL}
              y1={t.y}
              x2={chartW - padR}
              y2={t.y}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
              strokeWidth={0.5}
            />
          ))}

          {/* Axes */}
          <line
            x1={padL}
            y1={padT}
            x2={padL}
            y2={chartH - padB}
            stroke="currentColor"
            className="text-slate-400 dark:text-slate-500"
            strokeWidth={1}
          />
          <line
            x1={padL}
            y1={chartH - padB}
            x2={chartW - padR}
            y2={chartH - padB}
            stroke="currentColor"
            className="text-slate-400 dark:text-slate-500"
            strokeWidth={1}
          />

          {/* Y labels */}
          {yTicks.map((t) => (
            <text
              key={`yl-${t.val}`}
              x={padL - 6}
              y={t.y + 3}
              textAnchor="end"
              className="fill-slate-400 text-[9px] dark:fill-slate-500"
            >
              {t.val.toLocaleString()}
            </text>
          ))}

          {/* X labels */}
          {xTicks.map((t) => (
            <text
              key={`xl-${t.val}`}
              x={t.x}
              y={chartH - padB + 14}
              textAnchor="middle"
              className="fill-slate-400 text-[9px] dark:fill-slate-500"
            >
              {t.val}
            </text>
          ))}

          {/* Lines */}
          <path d={makePath("y_n")} fill="none" stroke={COLORS.n.line} strokeWidth={2} />
          <path d={makePath("y_2n")} fill="none" stroke={COLORS.n2x.line} strokeWidth={2} />
          <path d={makePath("y_4n")} fill="none" stroke={COLORS.n4x.line} strokeWidth={2} />
          <path
            d={makePath("y_nsq")}
            fill="none"
            stroke={COLORS.nsq.line}
            strokeWidth={2.5}
            strokeDasharray="6 3"
          />

          {/* Labels on lines */}
          <text
            x={chartW - padR - 4}
            y={toY(maxN) - 4}
            textAnchor="end"
            className="text-[10px] font-bold"
            fill={COLORS.n.line}
          >
            N
          </text>
          <text
            x={chartW - padR - 4}
            y={toY(2 * maxN) - 4}
            textAnchor="end"
            className="text-[10px] font-bold"
            fill={COLORS.n2x.line}
          >
            2N
          </text>
          <text
            x={chartW - padR - 4}
            y={toY(4 * maxN) - 4}
            textAnchor="end"
            className="text-[10px] font-bold"
            fill={COLORS.n4x.line}
          >
            4N
          </text>
          <text
            x={chartW - padR - 4}
            y={toY(maxN * maxN) - 6}
            textAnchor="end"
            className="text-[10px] font-bold"
            fill={COLORS.nsq.line}
          >
            N²
          </text>

          {/* Axis labels */}
          <text
            x={chartW / 2}
            y={chartH - 2}
            textAnchor="middle"
            className="fill-slate-500 text-[10px] dark:fill-slate-400"
          >
            Data size (N)
          </text>
          <text
            x={12}
            y={chartH / 2}
            textAnchor="middle"
            className="fill-slate-500 text-[10px] dark:fill-slate-400"
            transform={`rotate(-90, 12, ${chartH / 2})`}
          >
            Steps
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {[
          { color: COLORS.n.bg, label: "N — O(N)", desc: "Linear" },
          { color: COLORS.n2x.bg, label: "2N — O(N)", desc: "Still linear!" },
          { color: COLORS.n4x.bg, label: "4N — O(N)", desc: "Still linear!" },
          { color: COLORS.nsq.bg, label: "N² — O(N²)", desc: "Quadratic" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-sm ${item.color}`} />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {item.label}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              ({item.desc})
            </span>
          </div>
        ))}
      </div>

      {/* Comparison at current N */}
      <motion.div
        key={maxN}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800"
      >
        <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          At N = {maxN}:
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "N", value: maxN, color: "text-blue-600 dark:text-blue-400" },
            { label: "2N", value: 2 * maxN, color: "text-teal-600 dark:text-teal-400" },
            { label: "4N", value: 4 * maxN, color: "text-amber-600 dark:text-amber-400" },
            { label: "N²", value: maxN * maxN, color: "text-red-600 dark:text-red-400" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {item.label}
              </p>
              <p className={`text-lg font-bold ${item.color}`}>
                {item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        {maxN >= 20 && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            N² is{" "}
            <strong className="text-red-600 dark:text-red-400">
              {(maxN * maxN / (4 * maxN)).toFixed(0)}x
            </strong>{" "}
            larger than 4N. At N = {maxN * 10}, it would be{" "}
            <strong className="text-red-600 dark:text-red-400">
              {((maxN * 10) / 4).toFixed(0)}x
            </strong>{" "}
            larger.
          </p>
        )}
      </motion.div>
    </div>
  );
}
