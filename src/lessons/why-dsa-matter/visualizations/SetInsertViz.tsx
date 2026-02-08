import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Check, X } from "lucide-react";

const INITIAL_SET = ["apple", "banana", "cherry"];
const NEW_ITEM = "aaa";

export function SetInsertViz() {
  const [scenario, setScenario] = useState<"duplicate" | "worst">("duplicate");
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "searching" | "rejected" | "inserting" | "done">("idle");

  const reset = () => {
    setStep(0);
    setStatus("idle");
  };

  const runDuplicateScenario = () => {
    setStatus("searching");
    setStep(0);
    let s = 0;
    const interval = setInterval(() => {
      setStep(s);
      if (INITIAL_SET[s] === "banana") {
        clearInterval(interval);
        setStatus("rejected");
        return;
      }
      s++;
      if (s >= INITIAL_SET.length) {
        clearInterval(interval);
        setStatus("rejected");
      }
    }, 500);
  };

  const runWorstCaseScenario = () => {
    setStatus("searching");
    setStep(0);
    let s = 0;
    const searchInterval = setInterval(() => {
      s++;
      setStep(s);
      if (s >= INITIAL_SET.length) {
        clearInterval(searchInterval);
        setStatus("inserting");
        setStep(0);
        let shiftStep = 0;
        const shiftInterval = setInterval(() => {
          shiftStep++;
          setStep(shiftStep);
          if (shiftStep >= INITIAL_SET.length) {
            clearInterval(shiftInterval);
            setStatus("done");
          }
        }, 400);
      }
    }, 400);
  };

  const runScenario = () => {
    if (scenario === "duplicate") {
      runDuplicateScenario();
    } else {
      runWorstCaseScenario();
    }
  };

  const displaySet =
    scenario === "duplicate"
      ? INITIAL_SET
      : status === "done"
        ? [NEW_ITEM, ...INITIAL_SET]
        : INITIAL_SET;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={scenario === "duplicate" ? "primary" : "secondary"}
          size="sm"
          onClick={() => {
            setScenario("duplicate");
            reset();
          }}
        >
          Add &quot;banana&quot; (duplicate)
        </Button>
        <Button
          variant={scenario === "worst" ? "primary" : "secondary"}
          size="sm"
          onClick={() => {
            setScenario("worst");
            reset();
          }}
        >
          Add &quot;aaa&quot; at beginning
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={runScenario}
          disabled={status === "searching" || status === "inserting"}
        >
          Run
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
          Set: {`{${displaySet.join(", ")}}`}
        </p>
        <div className="flex flex-wrap gap-2">
          {displaySet.map((item, index) => {
            const isCurrent = index === step;

            return (
              <motion.div
                key={`${item}-${index}`}
                layout
                animate={{
                  scale: isCurrent ? 1.05 : 1,
                  borderColor:
                    status === "rejected" && scenario === "duplicate"
                      ? "rgb(239 68 68)"
                      : isCurrent
                        ? "rgb(99 102 241)"
                        : undefined,
                }}
                className={`flex min-w-[80px] flex-col items-center rounded-lg border-2 px-3 py-2 ${
                  status === "rejected" && scenario === "duplicate"
                    ? "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-900/20"
                    : isCurrent
                      ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                      : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                }`}
              >
                <span className="font-medium text-slate-900 dark:text-white">
                  {item}
                </span>
                {status === "rejected" && scenario === "duplicate" && (
                  <X className="mt-1 h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                {status === "done" && index === 0 && (
                  <Check className="mt-1 h-5 w-5 text-green-600 dark:text-green-400" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {(status !== "idle" || step > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800"
        >
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {scenario === "duplicate" && status === "rejected" && (
              <>REJECTED — &quot;banana&quot; already exists</>
            )}
            {scenario === "worst" && status === "done" && (
              <>Formula: 2n + 1 = {2 * INITIAL_SET.length + 1} steps (search + shift + insert)</>
            )}
            {status === "searching" && (
              <>Searching for duplicate: Step {step} of {INITIAL_SET.length}</>
            )}
            {status === "inserting" && (
              <>Shifting elements: Step {step} of {INITIAL_SET.length}</>
            )}
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            Array worst case (n=100)
          </p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            101 steps
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            Set worst case (n=100)
          </p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            201 steps
          </p>
        </div>
      </div>
    </div>
  );
}
