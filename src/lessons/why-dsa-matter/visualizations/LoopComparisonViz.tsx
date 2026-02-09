import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Check, X } from "lucide-react";

const APPROACH_1_CODE = `for (let i = 1; i < 100; i++) {
  if (i % 2 === 0) {
    // process even
  }
}`;

const APPROACH_2_CODE = `for (let i = 2; i < 100; i += 2) {
  // process even
}`;

const MAX = 20; // Smaller range for step-through demo

export function LoopComparisonViz() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [stepMode, setStepMode] = useState<"approach1" | "approach2" | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const runComparison = () => {
    setIsRunning(true);
    setProgress1(0);
    setProgress2(0);
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress1(Math.min((step / steps) * 99, 99));
      setProgress2(Math.min((step / steps) * 50, 50));
      if (step >= steps) {
        clearInterval(interval);
        setProgress1(99);
        setProgress2(50);
        setIsRunning(false);
      }
    }, duration / steps);
  };

  const iterations1 = 99;
  const iterations2 = 50;
  const operations1 = 495;
  const operations2 = 100;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
            Approach 1
          </h4>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-sm text-slate-100">
            <code>{APPROACH_1_CODE}</code>
          </pre>
          <div className="mt-3 space-y-2 text-sm">
            <p className="text-slate-600 dark:text-slate-400">
              Loop iterations: <strong>{iterations1}</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Modulo operations: <strong>{iterations1}</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Total operations: <strong>~{operations1}</strong> (5 steps × {iterations1})
            </p>
          </div>
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-600 dark:bg-slate-800/50">
            <h5 className="mb-2 text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">
              The 5 hidden steps in every iteration
            </h5>
            <ol className="list-inside list-decimal space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li><strong>Comparison (i &lt; 100)</strong> — "Is i still less than 100?" (True/False)</li>
              <li><strong>Modulo (i % 2)</strong> — Find the remainder. (0 or 1)</li>
              <li><strong>Equality check (=== 0)</strong> — Compare remainder to zero. (True/False)</li>
              <li><strong>Increment (i++)</strong> — Add 1 to i. (i becomes i+1)</li>
              <li><strong>Assignment (=)</strong> — Save the new value back into i.</li>
            </ol>
            <p className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              5 steps × {iterations1} iterations = <strong className="text-indigo-600 dark:text-indigo-400">~{operations1} operations</strong>
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
            Approach 2
          </h4>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-sm text-slate-100">
            <code>{APPROACH_2_CODE}</code>
          </pre>
          <div className="mt-3 space-y-2 text-sm">
            <p className="text-slate-600 dark:text-slate-400">
              Loop iterations: <strong>{iterations2}</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Modulo operations: <strong>0</strong>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Total operations: <strong>~{operations2}</strong> (~2 steps × {iterations2})
            </p>
          </div>
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50/80 p-3 dark:border-green-800 dark:bg-green-900/20">
            <p className="text-xs font-medium text-green-800 dark:text-green-300">
              Skips the if check completely. Only Comparison and Increment (by 2).
            </p>
            <p className="mt-1 text-xs text-green-700 dark:text-green-400">
              ~2 steps × {iterations2} iterations = <strong>~{operations2} operations</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Visual loop execution */}
      <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
        <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
          Visual execution: How the loop runs
        </h4>
        <div className="mb-3 flex flex-wrap gap-2">
          <Button
            variant={stepMode === "approach1" ? "primary" : "secondary"}
            size="sm"
            onClick={() => { setStepMode("approach1"); setStepIndex(0); }}
          >
            Approach 1
          </Button>
          <Button
            variant={stepMode === "approach2" ? "primary" : "secondary"}
            size="sm"
            onClick={() => { setStepMode("approach2"); setStepIndex(0); }}
          >
            Approach 2
          </Button>
          <Button variant="ghost" size="sm" onClick={() => { setStepMode(null); setStepIndex(0); }}>
            Reset
          </Button>
        </div>

        {stepMode === "approach1" && (
          <div className="grid gap-6 lg:grid-cols-[1fr,1.5fr]">
            {/* Code with current line highlight */}
            <div className="rounded-lg border border-slate-200 bg-slate-900 p-3 font-mono text-sm dark:border-slate-600">
              <div className={`rounded px-2 py-1 ${stepIndex >= 0 ? "bg-amber-900/50 text-amber-100" : "text-slate-400"}`}>
                1  for (let i = 1; i &lt; 100; i++) {"{"}
              </div>
              <div className={`rounded px-2 py-1 ${stepIndex >= 0 ? "bg-amber-900/50 text-amber-100" : "text-slate-400"}`}>
                2    if (i % 2 === 0) {"{"}
              </div>
              <div className="ml-4 rounded px-2 py-1 text-slate-400">3      // process even</div>
              <div className="rounded px-2 py-1 text-slate-400">4    {"}"}</div>
              <div className="rounded px-2 py-1 text-slate-400">5  {"}"}</div>
            </div>
            {/* Execution state + number strip */}
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="mb-1 text-xs font-medium uppercase text-slate-500 dark:text-slate-400">Current state</p>
                <p className="font-mono text-sm text-slate-900 dark:text-white">
                  i = <strong>{stepIndex + 1}</strong> → {stepIndex + 1} % 2 = {(stepIndex + 1) % 2} →{" "}
                  {(stepIndex + 1) % 2 === 0 ? (
                    <span className="text-green-600 dark:text-green-400">✓ process</span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">✗ skip</span>
                  )}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Operations: ~{(stepIndex + 1) * 5} of ~{(MAX - 1) * 5}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                  Loop visits each number 1→20. Green = processed, Gray = skipped.
                </p>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: MAX }, (_, i) => i + 1).map((n) => {
                    const visited = n <= stepIndex + 1;
                    const isEven = n % 2 === 0;
                    const isCurrent = n === stepIndex + 1;
                    const processed = visited && isEven;
                    return (
                      <motion.div
                        key={n}
                        animate={{ scale: isCurrent ? 1.15 : 1 }}
                        className={`flex h-9 min-w-[2.25rem] flex-col items-center justify-center rounded border-2 px-1 ${
                          isCurrent ? "border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-900/30" : "border-transparent"
                        } ${
                          processed
                            ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                            : visited
                              ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                              : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                        }`}
                      >
                        <span className="text-[10px] font-medium">[{n}]</span>
                        {processed ? <Check className="h-3.5 w-3.5" /> : visited ? <X className="h-3.5 w-3.5" /> : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setStepIndex((s) => Math.max(0, s - 1))} disabled={stepIndex === 0}>
                  ← Prev
                </Button>
                <Button variant="primary" size="sm" onClick={() => setStepIndex((s) => Math.min(MAX - 1, s + 1))} disabled={stepIndex >= MAX - 1}>
                  Next →
                </Button>
                <span className="text-sm text-slate-500">iteration {stepIndex + 1} of {MAX - 1}</span>
              </div>
            </div>
          </div>
        )}

        {stepMode === "approach2" && (
          <div className="grid gap-6 lg:grid-cols-[1fr,1.5fr]">
            {/* Code */}
            <div className="rounded-lg border border-slate-200 bg-slate-900 p-3 font-mono text-sm dark:border-slate-600">
              <div className={`rounded px-2 py-1 ${stepIndex >= 0 ? "bg-emerald-900/50 text-emerald-100" : "text-slate-400"}`}>
                1  for (let i = 2; i &lt; 100; i += 2) {"{"}
              </div>
              <div className={`ml-4 rounded px-2 py-1 ${stepIndex >= 0 ? "bg-emerald-900/50 text-emerald-100" : "text-slate-400"}`}>
                2    // process even
              </div>
              <div className="rounded px-2 py-1 text-slate-400">3  {"}"}</div>
            </div>
            {/* Execution state + number strip */}
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="mb-1 text-xs font-medium uppercase text-slate-500 dark:text-slate-400">Current state</p>
                <p className="font-mono text-sm text-slate-900 dark:text-white">
                  i = <strong>{stepIndex * 2 + 2}</strong> → process (no modulo)
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Operations: ~{(stepIndex + 1) * 2} of ~{Math.floor(MAX / 2) * 2}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                  Loop jumps 2, 4, 6… Only visits evens.
                </p>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: MAX }, (_, i) => i + 1).map((n) => {
                    const isEven = n % 2 === 0;
                    const evenIndex = n / 2 - 1;
                    const visited = isEven && evenIndex <= stepIndex;
                    const isCurrent = isEven && evenIndex === stepIndex;
                    return (
                      <motion.div
                        key={n}
                        animate={{ scale: isCurrent ? 1.15 : 1 }}
                        className={`flex h-9 min-w-[2.25rem] flex-col items-center justify-center rounded border-2 px-1 ${
                          isCurrent ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/30" : "border-transparent"
                        } ${visited ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200" : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"}`}
                      >
                        <span className="text-[10px] font-medium">[{n}]</span>
                        {visited ? <Check className="h-3.5 w-3.5" /> : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setStepIndex((s) => Math.max(0, s - 1))} disabled={stepIndex === 0}>
                  ← Prev
                </Button>
                <Button variant="primary" size="sm" onClick={() => setStepIndex((s) => Math.min(MAX / 2 - 1, s + 1))} disabled={stepIndex >= MAX / 2 - 1}>
                  Next →
                </Button>
                <span className="text-sm text-slate-500">iteration {stepIndex + 1} of {Math.floor(MAX / 2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={runComparison}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Run Comparison"}
        </Button>
      </div>

      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div>
            <p className="mb-1 text-sm text-slate-600 dark:text-slate-400">
              Approach 1 progress: {Math.round(progress1)} iterations
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <motion.div
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress1}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm text-slate-600 dark:text-slate-400">
              Approach 2 progress: {Math.round(progress2)} iterations
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <motion.div
                className="h-full bg-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${(progress2 / 50) * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20"
      >
        <p className="text-center font-semibold text-green-800 dark:text-green-300">
          Approach 2 is approximately 5× faster in practice
        </p>
        <p className="mt-1 text-center text-sm text-green-700 dark:text-green-400">
          Both scale the same way as input grows, but fewer operations = better performance
        </p>
        <p className="mt-2 text-center text-sm text-green-800 dark:text-green-300">
          By simply changing how you wrote the loop, you eliminated ~{operations1 - operations2} tiny operations the CPU
          didn&apos;t need to do. That is the essence of efficiency — and why DSA matters!
        </p>
      </motion.div>
    </div>
  );
}
