import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { Plus, Minus, RotateCcw } from "lucide-react";

const COLORS = [
  "bg-indigo-400 dark:bg-indigo-500",
  "bg-sky-400 dark:bg-sky-500",
  "bg-emerald-400 dark:bg-emerald-500",
  "bg-amber-400 dark:bg-amber-500",
  "bg-rose-400 dark:bg-rose-500",
  "bg-violet-400 dark:bg-violet-500",
  "bg-teal-400 dark:bg-teal-500",
  "bg-orange-400 dark:bg-orange-500",
];

const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace", "Hank"];

function handshakeCount(n: number) {
  return (n * (n - 1)) / 2;
}

export function QuadraticViz() {
  const [count, setCount] = useState(3);

  const people = NAMES.slice(0, count);
  const handshakes = handshakeCount(count);

  const pairs: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      pairs.push([i, j]);
    }
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setCount((c) => Math.min(c + 1, 8))}
          disabled={count >= 8}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Person
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCount((c) => Math.max(c - 1, 2))}
          disabled={count <= 2}
        >
          <Minus className="mr-1 h-4 w-4" />
          Remove
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setCount(3)}>
          <RotateCcw className="mr-1 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* People row */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {people.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${COLORS[i]}`}
              >
                {name[0]}
              </div>
              <span className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Handshake grid */}
      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Header row */}
          <div className="flex">
            <div className="h-8 w-16 shrink-0" />
            {people.map((name, i) => (
              <div
                key={`h-${name}`}
                className="flex h-8 w-10 items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${COLORS[i]}`}
                >
                  {name[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {people.map((rowName, i) => (
            <div key={`r-${rowName}`} className="flex">
              <div className="flex h-10 w-16 shrink-0 items-center gap-1 pr-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${COLORS[i]}`}
                >
                  {rowName[0]}
                </span>
                <span className="truncate">{rowName}</span>
              </div>
              {people.map((_, j) => {
                const isHandshake = i < j;
                const isSelf = i === j;
                return (
                  <div
                    key={`c-${i}-${j}`}
                    className="flex h-10 w-10 items-center justify-center"
                  >
                    <AnimatePresence>
                      {isHandshake && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="flex h-7 w-7 items-center justify-center rounded bg-indigo-100 text-sm dark:bg-indigo-900/30"
                        >
                          🤝
                        </motion.div>
                      )}
                      {isSelf && (
                        <div className="h-7 w-7 rounded bg-slate-100 dark:bg-slate-800" />
                      )}
                      {!isHandshake && !isSelf && (
                        <div className="h-7 w-7 rounded border border-dashed border-slate-200 dark:border-slate-700" />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <motion.div
        key={count}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800"
      >
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">People (n)</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{count}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Handshakes</p>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {handshakes}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Formula</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              n(n-1)/2 = {count}({count - 1})/2 = {handshakes}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Growth</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              ≈ O(n²)
            </p>
          </div>
        </div>
        {count >= 5 && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            With just {count} people, there are already {handshakes} handshakes.
            At 100 people it would be {handshakeCount(100).toLocaleString()}!
          </p>
        )}
      </motion.div>
    </div>
  );
}
