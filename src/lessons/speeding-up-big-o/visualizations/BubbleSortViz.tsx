import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Play, SkipForward, RotateCcw } from "lucide-react";

const INITIAL = [6, 3, 8, 2, 5, 1, 7, 4];

type Phase = "idle" | "running" | "stepping" | "done";

interface SortState {
  arr: number[];
  i: number; // outer pass
  j: number; // inner comparison index
  comparisons: number;
  swaps: number;
  phase: Phase;
  sorted: number; // count of sorted elements at the end
  justSwapped: boolean;
}

function initState(): SortState {
  return {
    arr: [...INITIAL],
    i: 0,
    j: 0,
    comparisons: 0,
    swaps: 0,
    phase: "idle",
    sorted: 0,
    justSwapped: false,
  };
}

function step(s: SortState): SortState {
  if (s.phase === "done") return s;

  const arr = [...s.arr];
  const n = arr.length;
  let { i, j, comparisons, swaps, sorted } = s;
  let justSwapped = false;

  // Perform one comparison
  comparisons++;
  if (arr[j] > arr[j + 1]) {
    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    swaps++;
    justSwapped = true;
  }

  // Advance
  j++;
  if (j >= n - 1 - i) {
    // End of pass
    i++;
    j = 0;
    sorted = i;
    if (i >= n - 1) {
      return { arr, i, j, comparisons, swaps, phase: "done", sorted: n, justSwapped };
    }
  }

  return { arr, i, j, comparisons, swaps, phase: s.phase, sorted, justSwapped };
}

export function BubbleSortViz() {
  const [state, setState] = useState<SortState>(initState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const doStep = useCallback(() => {
    setState((prev) => {
      const next = step(prev);
      if (next.phase === "done" && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return next;
    });
  }, []);

  const handleStep = () => {
    if (state.phase === "done") return;
    setState((prev) => ({ ...step(prev), phase: "stepping" }));
  };

  const handleRun = () => {
    if (state.phase === "done") return;
    setState((prev) => ({ ...prev, phase: "running" }));
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        const next = step(prev);
        if (next.phase === "done") {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return { ...next, phase: next.phase === "done" ? "done" : "running" };
      });
    }, 300);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState(initState());
  };

  const n = state.arr.length;
  const isRunning = state.phase === "running";
  const isDone = state.phase === "done";

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={handleRun}
          disabled={isRunning || isDone}
        >
          <Play className="mr-1 h-4 w-4" />
          Run
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleStep}
          disabled={isRunning || isDone}
        >
          <SkipForward className="mr-1 h-4 w-4" />
          Step
        </Button>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="mr-1 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Array visualization */}
      <div className="flex flex-wrap items-end gap-1.5">
        {state.arr.map((value, idx) => {
          const isSorted = idx >= n - state.sorted;
          const isCompareLeft = !isDone && idx === state.j;
          const isCompareRight = !isDone && idx === state.j + 1;
          const isActive = isCompareLeft || isCompareRight;

          let barColor =
            "bg-slate-300 dark:bg-slate-600";
          if (isDone || isSorted) {
            barColor = "bg-emerald-400 dark:bg-emerald-500";
          } else if (isActive && state.justSwapped) {
            barColor = "bg-amber-400 dark:bg-amber-500";
          } else if (isActive) {
            barColor = "bg-indigo-400 dark:bg-indigo-500";
          }

          return (
            <motion.div
              key={`${idx}-${value}`}
              layout
              className="flex flex-col items-center"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <motion.div
                className={`w-9 rounded-t-md ${barColor} transition-colors`}
                style={{ height: `${value * 20 + 16}px` }}
                layout
              />
              <div
                className={`w-9 rounded-b-md border-t py-1 text-center text-xs font-bold ${
                  isSorted || isDone
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : isActive
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400"
                      : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {value}
              </div>
              {isCompareLeft && !isDone && (
                <span className="mt-1 text-[10px] font-bold text-indigo-500 dark:text-indigo-400">
                  L
                </span>
              )}
              {isCompareRight && !isDone && (
                <span className="mt-1 text-[10px] font-bold text-indigo-500 dark:text-indigo-400">
                  R
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800"
      >
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-slate-500 dark:text-slate-400">Pass: </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {state.i + 1}
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">Comparisons: </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {state.comparisons}
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">Swaps: </span>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {state.swaps}
            </span>
          </div>
        </div>
        {isDone && (
          <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Sorted in {state.comparisons} comparisons and {state.swaps} swaps!
          </p>
        )}
      </motion.div>
    </div>
  );
}
