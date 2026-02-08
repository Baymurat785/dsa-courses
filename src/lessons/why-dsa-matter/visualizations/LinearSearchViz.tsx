import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Check, X } from "lucide-react";

const ARRAY = ["banana", "cherry", "apple", "date"];

export function LinearSearchViz() {
  const [searchValue, setSearchValue] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [found, setFound] = useState<boolean | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runSearch = () => {
    if (!searchValue.trim()) return;
    setCurrentStep(-1);
    setFound(null);
    setIsRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step >= ARRAY.length) {
        clearInterval(interval);
        setFound(false);
        setIsRunning(false);
        return;
      }
      setCurrentStep(step);
      if (ARRAY[step] === searchValue.trim()) {
        setFound(true);
        setIsRunning(false);
        clearInterval(interval);
        return;
      }
      step++;
    }, 600);
  };

  const nextStep = () => {
    if (found !== null) return;
    if (currentStep >= ARRAY.length - 1) {
      setFound(false);
      return;
    }
    const next = currentStep + 1;
    setCurrentStep(next);
    if (ARRAY[next] === searchValue.trim()) {
      setFound(true);
    }
  };

  const reset = () => {
    setCurrentStep(-1);
    setFound(null);
    setIsRunning(false);
  };

  const foundAtIndex =
    found === true
      ? ARRAY.findIndex((v) => v === searchValue.trim())
      : currentStep;
  const steps = found === true ? currentStep + 1 : currentStep + 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for..."
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          disabled={isRunning}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={runSearch}
          disabled={!searchValue.trim() || isRunning}
        >
          Search
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={nextStep}
          disabled={
            !searchValue.trim() ||
            isRunning ||
            found !== null ||
            currentStep >= ARRAY.length - 1
          }
        >
          Next Step
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ARRAY.map((item, index) => {
          const isChecked = index < currentStep || (found && index <= currentStep);
          const isCurrent = index === currentStep || (found && index === currentStep);
          const isMatch = found === true && index === foundAtIndex;

          return (
            <motion.div
              key={`${item}-${index}`}
              layout
              initial={false}
              animate={{
                scale: isCurrent ? 1.05 : 1,
                opacity: isChecked && !isMatch ? 0.7 : 1,
              }}
              className="flex flex-col items-center"
            >
              <div
                className={`flex min-w-[90px] flex-col items-center rounded-lg border-2 px-4 py-3 transition-colors ${
                  isMatch
                    ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20"
                    : isCurrent
                      ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                      : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                }`}
              >
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  [{index}]
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {item}
                </span>
                {index <= currentStep && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-1"
                  >
                    {isMatch ? (
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
                    )}
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {(found !== null || currentStep >= 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800"
        >
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {found === true
              ? `Found "${searchValue}" at index ${foundAtIndex} in ${steps} steps.`
              : found === false
                ? `Not found after ${ARRAY.length} steps.`
                : `Checking index ${currentStep}... ${steps} steps so far.`}
          </p>
        </motion.div>
      )}
    </div>
  );
}
