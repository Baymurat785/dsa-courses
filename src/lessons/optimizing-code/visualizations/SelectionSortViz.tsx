import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Play, SkipForward, RotateCcw } from "lucide-react";

const INITIAL = [6, 3, 8, 2, 5, 1, 7, 4];

type Phase = "idle" | "scanning" | "swapping" | "done";

interface SortState {
  arr: number[];
  i: number; // current position to fill
  j: number; // scanning index
  minIdx: number; // index of current minimum
  comparisons: number;
  swaps: number;
  phase: Phase;
  sorted: number;
}

function initState(): SortState {
  return {
    arr: [...INITIAL],
    i: 0,
    j: 1,
    minIdx: 0,
    comparisons: 0,
    swaps: 0,
    phase: "idle",
    sorted: 0,
  };
}

function step(s: SortState): SortState {
  if (s.phase === "done") return s;

  const arr = [...s.arr];
  const n = arr.length;
  let { i, j, minIdx, comparisons, swaps, sorted } = s;

  if (s.phase === "swapping") {
    // Perform the swap if needed
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
    }
    sorted = i + 1;
    i++;

    if (i >= n - 1) {
      return { arr, i, j: i + 1, minIdx: i, comparisons, swaps, phase: "done", sorted: n };
    }
    return { arr, i, j: i + 1, minIdx: i, comparisons, swaps, phase: "scanning", sorted };
  }

  // Scanning: compare
  comparisons++;
  if (arr[j] < arr[minIdx]) {
    minIdx = j;
  }

  j++;
  if (j >= n) {
    // End of scan — next step will be a swap
    return { arr, i, j, minIdx, comparisons, swaps, phase: "swapping", sorted };
  }

  return { arr, i, j, minIdx, comparisons, swaps, phase: "scanning", sorted };
}

export function SelectionSortViz() {
  const [state, setState] = useState<SortState>(initState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStep = () => {
    if (state.phase === "done") return;
    setState((prev) => {
      const next = step(prev.phase === "idle" ? { ...prev, phase: "scanning" } : prev);
      return next;
    });
  };

  const handleRun = useCallback(() => {
    if (state.phase === "done") return;
    setState((prev) => (prev.phase === "idle" ? { ...prev, phase: "scanning" } : prev));
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        const next = step(prev.phase === "idle" ? { ...prev, phase: "scanning" } : prev);
        if (next.phase === "done") {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return next;
      });
    }, 200);
  }, [state.phase]);

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState(initState());
  };

  const n = state.arr.length;
  const isRunning = intervalRef.current !== null;
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
          const isSorted = idx < state.sorted;
          const isCurrentPos = !isDone && idx === state.i;
          const isScanning = !isDone && state.phase === "scanning" && idx === state.j;
          const isMin = !isDone && idx === state.minIdx && state.phase !== "idle";
          const isSwapping = state.phase === "swapping" && (idx === state.i || idx === state.minIdx);

          let barColor = "bg-slate-300 dark:bg-slate-600";
          if (isDone || isSorted) {
            barColor = "bg-emerald-400 dark:bg-emerald-500";
          } else if (isSwapping) {
            barColor = "bg-amber-400 dark:bg-amber-500";
          } else if (isMin) {
            barColor = "bg-orange-400 dark:bg-orange-500";
          } else if (isScanning) {
            barColor = "bg-indigo-400 dark:bg-indigo-500";
          } else if (isCurrentPos) {
            barColor = "bg-violet-300 dark:bg-violet-600";
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
                    : isMin
                      ? "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                      : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {value}
              </div>
              <div className="mt-1 flex gap-0.5">
                {isCurrentPos && !isDone && (
                  <span className="text-[10px] font-bold text-violet-500 dark:text-violet-400">
                    pos
                  </span>
                )}
                {isMin && !isSorted && !isDone && (
                  <span className="text-[10px] font-bold text-orange-500 dark:text-orange-400">
                    min
                  </span>
                )}
              </div>
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
              {Math.min(state.i + 1, n - 1)}
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
            Sorted in {state.comparisons} comparisons and only {state.swaps} swaps!
          </p>
        )}
        {state.phase === "swapping" && !isDone && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            Swapping minimum value ({state.arr[state.minIdx]}) into position {state.i}
          </p>
        )}
      </motion.div>
    </div>
  );
}
