import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";

const APPROACH_1_CODE = `for (let i = 1; i < 100; i++) {
  if (i % 2 === 0) {
    // process even
  }
}`;

const APPROACH_2_CODE = `for (let i = 2; i < 100; i += 2) {
  // process even
}`;

export function LoopComparisonViz() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

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
              Total operations: <strong>~{operations1}</strong>
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
              Total operations: <strong>~{operations2}</strong>
            </p>
          </div>
        </div>
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
      </motion.div>
    </div>
  );
}
