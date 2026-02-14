import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Check } from "lucide-react";

const ARRAY = [3, 17, 25, 37, 52, 75, 80, 90, 99];

type SearchState = "idle" | "running" | "found" | "not-found";

export function BinarySearchViz() {
  const [targetInput, setTargetInput] = useState("");
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(ARRAY.length - 1);
  const [stepCount, setStepCount] = useState(0);
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mid = left <= right ? left + Math.floor((right - left) / 2) : -1;
  const midValue = mid >= 0 ? ARRAY[mid] : null;
  const targetNum = targetInput.trim() === "" ? null : Number(targetInput.trim());
  const isTargetValid = targetNum !== null && !Number.isNaN(targetNum);

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  leftRef.current = left;
  rightRef.current = right;

  const runAll = () => {
    if (!isTargetValid) return;
    setLeft(0);
    setRight(ARRAY.length - 1);
    setStepCount(0);
    setSearchState("running");
    setIsRunning(true);
    leftRef.current = 0;
    rightRef.current = ARRAY.length - 1;

    const target = targetNum!;
    const tick = () => {
      const l = leftRef.current;
      const r = rightRef.current;
      if (l > r) {
        setSearchState("not-found");
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        return;
      }

      const m = l + Math.floor((r - l) / 2);
      setStepCount((c) => c + 1);

      if (ARRAY[m] === target) {
        setSearchState("found");
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        return;
      }

      if (target < ARRAY[m]) {
        rightRef.current = m - 1;
        setRight(m - 1);
      } else {
        leftRef.current = m + 1;
        setLeft(m + 1);
      }
    };

    intervalRef.current = setInterval(tick, 700);
  };

  const nextStep = () => {
    if (searchState === "found" || searchState === "not-found") return;
    if (!isTargetValid) return;
    if (left > right) {
      setSearchState("not-found");
      return;
    }

    const m = left + Math.floor((right - left) / 2);
    setStepCount((c) => c + 1);

    if (ARRAY[m] === targetNum!) {
      setSearchState("found");
      return;
    }

    if (targetNum! < ARRAY[m]) {
      const newRight = m - 1;
      setRight(newRight);
      if (left > newRight) setSearchState("not-found");
    } else {
      const newLeft = m + 1;
      setLeft(newLeft);
      if (newLeft > right) setSearchState("not-found");
    }
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLeft(0);
    setRight(ARRAY.length - 1);
    setStepCount(0);
    setSearchState("idle");
    setIsRunning(false);
  };

  const isDone = searchState === "found" || searchState === "not-found";
  const canStep = isTargetValid && !isDone && !isRunning && left <= right;

  const statusMessage = (() => {
    if (searchState === "found" && mid >= 0) {
      return `Found ${targetNum} at index ${mid} in ${stepCount} steps.`;
    }
    if (searchState === "not-found") {
      return `Not in array (left > right) after ${stepCount} steps.`;
    }
    if (stepCount > 0 && mid >= 0 && midValue !== null && isTargetValid) {
      const comparison =
        targetNum! < midValue
          ? "target < mid → search left"
          : targetNum! > midValue
            ? "target > mid → search right"
            : "";
      return `Step ${stepCount}: Comparing mid = ${midValue} with target ${targetNum}. ${comparison}`;
    }
    if (stepCount === 0 && mid >= 0 && midValue !== null && isTargetValid) {
      return `mid = left + (right - left) / 2 = ${mid}. Comparing ${midValue} with target ${targetNum}.`;
    }
    return "Enter a number and press Next Step or Run.";
  })();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          placeholder="Target number"
          className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          disabled={isRunning}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={runAll}
          disabled={!isTargetValid || isDone || isRunning}
        >
          Run
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={nextStep}
          disabled={!canStep}
        >
          Next Step
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ARRAY.map((value, index) => {
          const inRange = index >= left && index <= right;
          const isMid = index === mid;
          const isFound = searchState === "found" && index === mid;

          let cellStyle =
            "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800";
          if (isFound) {
            cellStyle =
              "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20";
          } else if (isMid && !isDone) {
            cellStyle =
              "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20";
          } else if (!inRange) {
            cellStyle =
              "border-slate-200 bg-slate-100 opacity-60 dark:border-slate-700 dark:bg-slate-800/50 dark:opacity-60";
          }

          return (
            <motion.div
              key={`${value}-${index}`}
              layout
              initial={false}
              animate={{ scale: isMid && !isDone ? 1.05 : 1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`flex min-w-[56px] flex-col items-center rounded-lg border-2 px-3 py-2 transition-colors ${cellStyle}`}
              >
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  [{index}]
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {value}
                </span>
                {isFound && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-1"
                  >
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </motion.span>
                )}
              </div>
              <div className="mt-1 flex gap-0.5 text-xs text-slate-500 dark:text-slate-400">
                {index === left && <span>L</span>}
                {index === mid && <span>M</span>}
                {index === right && <span>R</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800"
      >
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {statusMessage}
        </p>
        {stepCount > 0 && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Steps: {stepCount}
          </p>
        )}
      </motion.div>
    </div>
  );
}
