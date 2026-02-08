import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";

const ARRAY = ["banana", "cherry", "apple", "date"];

export function ArrayReadViz() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleAccess = (index: number) => {
    setSelectedIndex(index);
  };

  const reset = () => setSelectedIndex(null);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-400">
          Click an index to access directly. Computer jumps straight to that
          location — always the same amount of time, regardless of array size.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {ARRAY.map((_, i) => (
            <Button
              key={i}
              variant={selectedIndex === i ? "primary" : "secondary"}
              size="sm"
              onClick={() => handleAccess(i)}
            >
              Access index {i}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {ARRAY.map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            layout
            initial={false}
            animate={{
              scale: selectedIndex === index ? 1.05 : 1,
              boxShadow:
                selectedIndex === index
                  ? "0 0 0 3px rgba(99, 102, 241, 0.5)"
                  : "none",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex flex-col items-center"
          >
            <div
              className={`flex min-w-[80px] flex-col items-center rounded-lg border-2 px-4 py-3 transition-colors ${
                selectedIndex === index
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
            </div>
          </motion.div>
        ))}
      </div>

      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20"
        >
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Same time every time — Like raising your right hand. Automatic, no search needed.
          </p>
        </motion.div>
      )}
    </div>
  );
}
