import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/shared/Button";

const INITIAL = ["apple", "banana", "cherry"];
const NEW_ITEM = "aaa";

function getBeginningSteps(): string[][] {
  const steps: string[][] = [[...INITIAL]];
  const n = INITIAL.length;
  for (let k = n; k >= 0; k--) {
    const arr: string[] = [];
    for (let i = 0; i <= n; i++) {
      if (i < k) arr.push(INITIAL[i]);
      else if (i === k) arr.push("___");
      else arr.push(INITIAL[i - 1]);
    }
    if (k < n) steps.push(arr);
  }
  steps.push([NEW_ITEM, ...INITIAL]);
  return steps;
}

const BEGINNING_STEPS = getBeginningSteps();

export function ArrayInsertViz() {
  const [mode, setMode] = useState<"end" | "beginning">("end");
  const [items, setItems] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const reset = () => {
    setItems([]);
    setStep(0);
  };

  const display =
    mode === "end"
      ? items.length > 0
        ? items
        : INITIAL
      : BEGINNING_STEPS[Math.min(step, BEGINNING_STEPS.length - 1)];

  const hasInsertedAtEnd = mode === "end" && items.length > 0;
  const hasInsertedAtBeginning = mode === "beginning" && step >= BEGINNING_STEPS.length - 1;

  const insertAtEnd = () => {
    setItems([...INITIAL, NEW_ITEM]);
  };

  const nextBeginningStep = () => {
    if (step < BEGINNING_STEPS.length - 1) setStep(step + 1);
  };

  const stepLabel =
    mode === "beginning" && step > 0 && step <= INITIAL.length
      ? `Step ${step}: Shift ${INITIAL[INITIAL.length - step]} right`
      : mode === "beginning" && step === INITIAL.length + 1
        ? "Step 4: Insert aaa"
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
          Insert at end
        </Button>
        <Button
          variant={mode === "beginning" ? "primary" : "secondary"}
          size="sm"
          onClick={() => {
            setMode("beginning");
            reset();
          }}
        >
          Insert at beginning
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={mode === "end" ? insertAtEnd : nextBeginningStep}
          disabled={
            (mode === "end" && hasInsertedAtEnd) ||
            (mode === "beginning" && hasInsertedAtBeginning)
          }
        >
          {mode === "end"
            ? hasInsertedAtEnd
              ? "Done"
              : "Insert"
            : hasInsertedAtBeginning
              ? "Done"
              : "Next Step"}
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {display.map((item, index) => (
            <motion.div
              key={`${item}-${index}-${step}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex min-w-[70px] flex-col items-center rounded-lg border-2 px-3 py-2 ${
                item === "___"
                  ? "border-dashed border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-800"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              <span className="text-xs text-slate-500 dark:text-slate-400">
                [{index}]
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {item || "___"}
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
            ? "1 step — Just add at end"
            : `Worst case: ${INITIAL.length + 1} steps (shift all + insert)`}
        </p>
      </div>
    </div>
  );
}
