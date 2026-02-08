import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/shared/Button";

const INITIAL = ["apple", "banana", "cherry", "date"];

function getDeleteFromEndSteps(): string[][] {
  return [[...INITIAL], INITIAL.slice(0, -1)];
}

function getDeleteFromBeginningSteps(): string[][] {
  const steps: string[][] = [[...INITIAL]];
  const n = INITIAL.length;
  for (let i = 0; i < n - 1; i++) {
    const arr = [...INITIAL];
    for (let j = i; j < n - 1; j++) arr[j] = arr[j + 1];
    arr[n - 1] = "___";
    steps.push([...arr]);
  }
  steps.push(INITIAL.slice(1));
  return steps;
}

const DELETE_END_STEPS = getDeleteFromEndSteps();
const DELETE_BEGINNING_STEPS = getDeleteFromBeginningSteps();

export function ArrayDeleteViz() {
  const [mode, setMode] = useState<"end" | "beginning">("end");
  const [step, setStep] = useState(0);

  const reset = () => setStep(0);

  const steps =
    mode === "end" ? DELETE_END_STEPS : DELETE_BEGINNING_STEPS;
  const display = steps[Math.min(step, steps.length - 1)];
  const hasCompleted = step >= steps.length - 1;

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const stepLabel =
    mode === "beginning" &&
    step > 0 &&
    step < steps.length - 1
      ? `Step ${step}: Shift ${INITIAL[step]} left`
      : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={mode === "end" ? "primary" : "secondary"}
          size="sm"
          onClick={() => {
            setMode("end");
            reset();
          }}
        >
          Delete at end
        </Button>
        <Button
          variant={mode === "beginning" ? "primary" : "secondary"}
          size="sm"
          onClick={() => {
            setMode("beginning");
            reset();
          }}
        >
          Delete at beginning
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={nextStep}
          disabled={hasCompleted}
        >
          {hasCompleted ? "Done" : "Next Step"}
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {display
            .filter((x) => x !== "___")
            .map((item, index) => (
              <motion.div
                key={`${item}-${index}-${step}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex min-w-[70px] flex-col items-center rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              >
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  [{index}]
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {item}
                </span>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {stepLabel && (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {stepLabel}
        </p>
      )}

      <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {mode === "end"
            ? "1 step — Just remove last element, no shifts"
            : `Worst case: ${INITIAL.length} steps (shift all remaining left)`}
        </p>
      </div>
    </div>
  );
}
