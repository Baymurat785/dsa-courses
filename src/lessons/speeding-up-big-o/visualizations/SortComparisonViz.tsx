import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Shuffle } from "lucide-react";

function generateArray(size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) => i + 1);
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function runBubbleSort(input: number[]): { comparisons: number; swaps: number } {
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
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

function runSelectionSort(input: number[]): {
  comparisons: number;
  swaps: number;
} {
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
    }
  }

  return { comparisons, swaps };
}

const SIZES = [8, 16, 32, 64];

export function SortComparisonViz() {
  const [size, setSize] = useState(16);
  const [seed, setSeed] = useState(0);

  const data = useMemo(() => generateArray(size), [size, seed]);

  const bubble = useMemo(() => runBubbleSort(data), [data]);
  const selection = useMemo(() => runSelectionSort(data), [data]);

  const maxComparisons = Math.max(bubble.comparisons, selection.comparisons);
  const maxSwaps = Math.max(bubble.swaps, selection.swaps);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Array size:
          </label>
          <div className="flex gap-1">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  size === s
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSeed((s) => s + 1)}
        >
          <Shuffle className="mr-1 h-4 w-4" />
          New array
        </Button>
      </div>

      {/* Input preview */}
      <div className="flex flex-wrap gap-1">
        {data.slice(0, 20).map((v, i) => (
          <span
            key={i}
            className="inline-flex h-7 w-7 items-center justify-center rounded bg-slate-100 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
          >
            {v}
          </span>
        ))}
        {data.length > 20 && (
          <span className="inline-flex h-7 items-center px-1 text-xs text-slate-400">
            +{data.length - 20} more
          </span>
        )}
      </div>

      {/* Comparison bars */}
      <div className="space-y-4">
        {/* Comparisons */}
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Comparisons
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                Bubble Sort
              </span>
              <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-md bg-red-400/80 dark:bg-red-500/80"
                  initial={false}
                  animate={{
                    width: `${maxComparisons > 0 ? (bubble.comparisons / maxComparisons) * 100 : 0}%`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                <span className="relative z-10 flex h-full items-center px-2 text-xs font-bold text-white">
                  {bubble.comparisons}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                Selection Sort
              </span>
              <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-md bg-sky-400/80 dark:bg-sky-500/80"
                  initial={false}
                  animate={{
                    width: `${maxComparisons > 0 ? (selection.comparisons / maxComparisons) * 100 : 0}%`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                <span className="relative z-10 flex h-full items-center px-2 text-xs font-bold text-white">
                  {selection.comparisons}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Swaps */}
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Swaps
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                Bubble Sort
              </span>
              <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-md bg-red-400/80 dark:bg-red-500/80"
                  initial={false}
                  animate={{
                    width: `${maxSwaps > 0 ? (bubble.swaps / maxSwaps) * 100 : 0}%`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                <span className="relative z-10 flex h-full items-center px-2 text-xs font-bold text-white">
                  {bubble.swaps}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                Selection Sort
              </span>
              <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-md bg-sky-400/80 dark:bg-sky-500/80"
                  initial={false}
                  animate={{
                    width: `${maxSwaps > 0 ? (selection.swaps / maxSwaps) * 100 : 0}%`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                <span className="relative z-10 flex h-full items-center px-2 text-xs font-bold text-white">
                  {selection.swaps}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {bubble.swaps > selection.swaps ? (
            <>
              Bubble Sort used{" "}
              <strong className="text-slate-900 dark:text-white">
                {(bubble.swaps / Math.max(selection.swaps, 1)).toFixed(1)}x
              </strong>{" "}
              more swaps than Selection Sort, despite similar comparison counts.
              {size >= 32 &&
                " At larger sizes, this difference becomes even more significant."}
            </>
          ) : (
            <>
              Both algorithms performed similarly on this particular arrangement.
              Try a different array to see how they diverge.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
