import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type Scenario = "sorted" | "nearly" | "random" | "reversed";

const SCENARIOS: { key: Scenario; label: string; description: string }[] = [
  { key: "sorted", label: "Already Sorted", description: "[1, 2, 3, 4, 5, 6, 7, 8]" },
  { key: "nearly", label: "Nearly Sorted", description: "[1, 2, 4, 3, 5, 6, 8, 7]" },
  { key: "random", label: "Random", description: "[5, 3, 8, 1, 6, 2, 7, 4]" },
  { key: "reversed", label: "Reversed", description: "[8, 7, 6, 5, 4, 3, 2, 1]" },
];

function getArray(scenario: Scenario): number[] {
  switch (scenario) {
    case "sorted": return [1, 2, 3, 4, 5, 6, 7, 8];
    case "nearly": return [1, 2, 4, 3, 5, 6, 8, 7];
    case "random": return [5, 3, 8, 1, 6, 2, 7, 4];
    case "reversed": return [8, 7, 6, 5, 4, 3, 2, 1];
  }
}

function runBubble(input: number[]): { comparisons: number; swaps: number } {
  const arr = [...input];
  let comparisons = 0, swaps = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      comparisons++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return { comparisons, swaps };
}

function runSelection(input: number[]): { comparisons: number; swaps: number } {
  const arr = [...input];
  let comparisons = 0, swaps = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      comparisons++;
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
    }
  }
  return { comparisons, swaps };
}

interface AlgoResult {
  name: string;
  comparisons: number;
  swaps: number;
  total: number;
  color: string;
}

export function ScenarioComparisonViz() {
  const [scenario, setScenario] = useState<Scenario>("random");

  const results: AlgoResult[] = useMemo(() => {
    const arr = getArray(scenario);
    const b = runBubble(arr);
    const s = runSelection(arr);
    return [
      { name: "Bubble Sort", comparisons: b.comparisons, swaps: b.swaps, total: b.comparisons + b.swaps, color: "bg-red-400 dark:bg-red-500" },
      { name: "Selection Sort", comparisons: s.comparisons, swaps: s.swaps, total: s.comparisons + s.swaps, color: "bg-sky-400 dark:bg-sky-500" },
    ];
  }, [scenario]);

  const maxTotal = Math.max(...results.map((r) => r.total), 1);

  const scenarioInfo = SCENARIOS.find((s) => s.key === scenario)!;

  return (
    <div className="space-y-5">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            onClick={() => setScenario(s.key)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              scenario === s.key
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Input: <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-700">{scenarioInfo.description}</code>
      </p>

      {/* Results */}
      <div className="space-y-4">
        {results.map((r) => (
          <div key={r.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {r.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {r.comparisons} comparisons + {r.swaps} swaps
              </span>
            </div>
            <div className="relative h-8 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
              <motion.div
                className={`absolute left-0 top-0 h-full rounded-lg ${r.color}`}
                initial={false}
                animate={{
                  width: `${Math.max(3, (r.total / maxTotal) * 100)}%`,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{ opacity: 0.85 }}
              />
              <span className="relative z-10 flex h-full items-center px-3 text-xs font-bold text-white">
                {r.total} total ops
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Insight */}
      <motion.div
        key={scenario}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {scenario === "sorted" && (
            <>
              On sorted data, <strong className="text-emerald-600 dark:text-emerald-400">Bubble Sort</strong> wins
              thanks to early termination — just one pass with zero swaps. Selection Sort still does all 28 comparisons.
            </>
          )}
          {scenario === "nearly" && (
            <>
              On nearly-sorted data, <strong className="text-emerald-600 dark:text-emerald-400">Bubble Sort</strong> benefits
              from early termination — fewer passes needed. Selection Sort still scans everything.
            </>
          )}
          {scenario === "random" && (
            <>
              On random data, <strong className="text-sky-600 dark:text-sky-400">Selection Sort</strong> wins
              with fewer total operations — same comparisons but far fewer swaps than Bubble Sort.
            </>
          )}
          {scenario === "reversed" && (
            <>
              Worst case for both algorithms. Selection Sort still does fewer total operations
              because it only swaps once per pass instead of at every comparison.
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
