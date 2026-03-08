import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const COMPLEXITIES = [
  { label: "O(1)", color: "bg-emerald-500", fn: (_n: number) => 1 },
  { label: "O(log n)", color: "bg-sky-500", fn: (n: number) => Math.max(1, Math.ceil(Math.log2(n))) },
  { label: "O(n)", color: "bg-amber-500", fn: (n: number) => n },
  { label: "O(n log n)", color: "bg-orange-500", fn: (n: number) => Math.max(1, Math.round(n * Math.log2(n))) },
  { label: "O(n²)", color: "bg-red-500", fn: (n: number) => n * n },
];

export function StepCounterViz() {
  const [inputSize, setInputSize] = useState(8);

  const results = useMemo(
    () =>
      COMPLEXITIES.map((c) => ({
        ...c,
        steps: c.fn(inputSize),
      })),
    [inputSize]
  );

  const maxSteps = Math.max(...results.map((r) => r.steps));

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Input size (n)
          </label>
          <span className="rounded-lg bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            n = {inputSize}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={32}
          value={inputSize}
          onChange={(e) => setInputSize(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>1</span>
          <span>8</span>
          <span>16</span>
          <span>24</span>
          <span>32</span>
        </div>
      </div>

      <div className="space-y-3">
        {results.map((r) => {
          const barWidth = maxSteps > 0 ? Math.max(2, (r.steps / maxSteps) * 100) : 2;
          return (
            <div key={r.label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-right text-sm font-mono font-medium text-slate-700 dark:text-slate-300">
                {r.label}
              </span>
              <div className="relative flex-1 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full rounded-lg ${r.color}`}
                  initial={false}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ opacity: 0.85 }}
                />
                <div className="relative z-10 flex h-full items-center px-3">
                  <span className="text-xs font-bold text-white drop-shadow-sm">
                    {r.steps.toLocaleString()} step{r.steps !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {inputSize <= 4 ? (
            <>At small sizes, the differences are tiny. Try sliding to n = 16 or higher to see them diverge.</>
          ) : inputSize <= 16 ? (
            <>
              Notice how O(n²) is already at{" "}
              <strong className="text-slate-900 dark:text-white">
                {(inputSize * inputSize).toLocaleString()}
              </strong>{" "}
              steps while O(log n) is only at{" "}
              <strong className="text-slate-900 dark:text-white">
                {Math.ceil(Math.log2(inputSize))}
              </strong>. Keep sliding!
            </>
          ) : (
            <>
              At n = {inputSize}, O(n²) needs{" "}
              <strong className="text-slate-900 dark:text-white">
                {(inputSize * inputSize).toLocaleString()}
              </strong>{" "}
              steps — that's{" "}
              <strong className="text-slate-900 dark:text-white">
                {Math.round((inputSize * inputSize) / Math.ceil(Math.log2(inputSize))).toLocaleString()}x
              </strong>{" "}
              more than O(log n)'s {Math.ceil(Math.log2(inputSize))} steps!
            </>
          )}
        </p>
      </div>
    </div>
  );
}
