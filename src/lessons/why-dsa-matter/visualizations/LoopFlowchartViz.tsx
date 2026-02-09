import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { ChevronDown, ChevronRight } from "lucide-react";

type FlowStep =
  | "init"
  | "condition"
  | "condition-true"
  | "body"
  | "updation"
  | "condition-false"
  | "exit";

// Flow: init → condition → (true→body→updation→condition)* → false→exit
const FLOW: FlowStep[] = [
  "init",
  "condition",
  "condition-true",
  "body",
  "updation",
  "condition",
  "condition-true",
  "body",
  "updation",
  "condition",
  "condition-false",
  "exit",
];

export function LoopFlowchartViz() {
  const [currentStep, setCurrentStep] = useState(0);

  const flowStep = FLOW[currentStep] ?? "exit";
  const isComplete = currentStep >= FLOW.length;

  // Derive i and iteration from flow position (no state drift)
  const completedBodies = FLOW.slice(0, currentStep + 1).filter((s) => s === "body").length;
  const completedUpdations = FLOW.slice(0, currentStep + 1).filter((s) => s === "updation").length;
  const iValue = 1 + completedUpdations;
  const iteration = completedBodies;

  const next = () => {
    if (isComplete) return;
    setCurrentStep((s) => Math.min(s + 1, FLOW.length));
  };

  const reset = () => setCurrentStep(0);

  const active = (s: FlowStep) => flowStep === s;

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-slate-900 dark:text-white">
        For loop flowchart — animated
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Step through to see the execution flow. Each iteration: Condition → Body → Updation → back to Condition.
      </p>

      {/* Flowchart */}
      <div className="relative overflow-x-auto rounded-xl border-2 border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900/50">
        <div className="flex min-w-[320px] flex-col items-center gap-4">
          {/* 1. Init */}
          <motion.div
            animate={{
              scale: active("init") ? 1.02 : 1,
              boxShadow: active("init") ? "0 0 0 3px rgba(99, 102, 241, 0.5)" : "none",
            }}
            className={`rounded-lg border-2 px-4 py-2 font-mono text-sm ${
              active("init")
                ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/30"
                : "border-slate-200 dark:border-slate-600"
            }`}
          >
            <span className="text-indigo-600 dark:text-indigo-400">1.</span> for (i = 1; i &lt; 100; i++)
          </motion.div>
          <ChevronDown className={`h-6 w-6 ${active("init") ? "text-indigo-500" : "text-slate-300 dark:text-slate-600"}`} />

          {/* 2. Condition */}
          <motion.div
            animate={{
              scale: active("condition") || active("condition-true") || active("condition-false") ? 1.02 : 1,
              boxShadow: active("condition") || active("condition-true") || active("condition-false")
                ? "0 0 0 3px rgba(99, 102, 241, 0.5)"
                : "none",
            }}
            className={`rounded-lg border-2 px-4 py-2 font-mono text-sm ${
              active("condition") || active("condition-true") || active("condition-false")
                ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/30"
                : "border-slate-200 dark:border-slate-600"
            }`}
          >
            <span className="text-indigo-600 dark:text-indigo-400">2.</span> Condition: i &lt; 100?
          {(flowStep === "condition" || flowStep === "condition-true" || flowStep === "body" || flowStep === "updation") && (
            <span className="ml-2 text-xs text-slate-500">i = {iValue}</span>
          )}
          </motion.div>

          <div className="flex w-full max-w-xs items-center justify-around gap-4">
            {/* 3a. True → Body */}
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs font-medium text-green-600 dark:text-green-400">
                3a. true
              </span>
              <ChevronDown className={`h-6 w-6 ${active("condition-true") ? "text-green-500" : "text-slate-300 dark:text-slate-600"}`} />
            </div>
            {/* 3b. False → Exit */}
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs font-medium text-red-600 dark:text-red-400">
                3b. false
              </span>
              <ChevronRight className={`h-6 w-6 ${active("condition-false") ? "text-red-500" : "text-slate-300 dark:text-slate-600"}`} />
            </div>
          </div>

          <div className="flex w-full max-w-md gap-8">
            {/* Body */}
            <div className="flex flex-1 flex-col items-center">
              <motion.div
                animate={{
                  scale: active("body") ? 1.02 : 1,
                  boxShadow: active("body") ? "0 0 0 3px rgba(34, 197, 94, 0.5)" : "none",
                }}
                className={`w-full rounded-lg border-2 px-4 py-3 font-mono text-sm ${
                  active("body")
                    ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20"
                    : "border-slate-200 dark:border-slate-600"
                }`}
              >
                <span className="text-green-600 dark:text-green-400">4.</span> Body: if (i % 2 === 0) process
              </motion.div>
              <ChevronDown className={`mt-2 h-6 w-6 ${active("body") ? "text-green-500" : "text-slate-300 dark:text-slate-600"}`} />
            </div>

            {/* Exit */}
            <div className="flex flex-1 flex-col items-center">
              <motion.div
                animate={{
                  scale: active("exit") ? 1.02 : 1,
                  boxShadow: active("exit") ? "0 0 0 3px rgba(239, 68, 68, 0.5)" : "none",
                }}
                className={`w-full rounded-lg border-2 px-4 py-3 font-mono text-sm ${
                  active("exit")
                    ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20"
                    : "border-slate-200 dark:border-slate-600"
                }`}
              >
                <span className="text-red-600 dark:text-red-400">7.</span> statements outside loop
              </motion.div>
            </div>
          </div>

          {/* 5. Updation (loop back) */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: active("updation") ? 1.02 : 1,
                boxShadow: active("updation") ? "0 0 0 3px rgba(99, 102, 241, 0.5)" : "none",
              }}
              className={`rounded-lg border-2 px-4 py-2 font-mono text-sm ${
                active("updation")
                  ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/30"
                  : "border-slate-200 dark:border-slate-600"
              }`}
            >
              <span className="text-indigo-600 dark:text-indigo-400">5. 6.</span> Updation: i++ → back to Condition
            </motion.div>
          </div>
        </div>

        {/* Current step label */}
        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-center text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {flowStep === "init" && "→ Step 1: Initialization (runs once)"}
          {flowStep === "condition" && "→ Step 2: Check condition (i < 100)"}
          {flowStep === "condition-true" && "→ Step 3a: Condition true → enter body"}
          {flowStep === "body" && `→ Step 4: Execute body (i = ${iValue}, i%2=${iValue % 2})`}
          {flowStep === "updation" && "→ Step 5–6: i++ then loop back to condition"}
          {flowStep === "condition-false" && "→ Step 3b: Condition false → exit loop"}
          {flowStep === "exit" && "→ Step 7: Continue with code after loop"}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="primary" size="sm" onClick={next} disabled={isComplete}>
          Next step
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Step {currentStep + 1} of {FLOW.length} · i = {iValue} · iteration {iteration}
        </span>
      </div>
    </div>
  );
}
