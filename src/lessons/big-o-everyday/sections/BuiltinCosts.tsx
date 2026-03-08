import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { BuiltinCostViz } from "../visualizations/BuiltinCostViz";
import { AlertTriangle } from "lucide-react";

export function BuiltinCosts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Hidden Costs of Built-ins
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        When you write <code className="rounded bg-slate-200 px-1.5 py-0.5 dark:bg-slate-700">arr.sort()</code>{" "}
        or <code className="rounded bg-slate-200 px-1.5 py-0.5 dark:bg-slate-700">x in list</code>,
        it looks like a single operation. But each built-in has its own Big O
        cost — and ignoring these costs is one of the most common
        performance mistakes.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏷️</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Food labels
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              A granola bar looks like one "thing," but the nutrition label reveals
              it contains 250 calories, 12g of sugar, and 8g of fat. Built-in
              methods are the same — they look like one step, but the "nutrition
              label" reveals their true cost.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Know your costs
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Hover over or tap each operation to see why it has that cost:
      </p>

      <Card className="mb-6">
        <BuiltinCostViz />
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The danger zone: O(n) operations inside loops
      </h3>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              These combinations create hidden O(n²)
            </p>
            <div className="mt-3 space-y-2">
              {[
                { code: "for x in arr: if x in list", result: "O(n) × O(n) = O(n²)" },
                { code: "for x in arr: list.remove(x)", result: "O(n) × O(n) = O(n²)" },
                { code: "for x in arr: list.insert(0, x)", result: "O(n) × O(n) = O(n²)" },
                { code: "for x in arr: str += x", result: "O(n) × O(n) = O(n²)*" },
              ].map((item) => (
                <div
                  key={item.code}
                  className="flex flex-wrap items-center gap-2 rounded bg-amber-50 px-3 py-2 dark:bg-amber-900/10"
                >
                  <code className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {item.code}
                  </code>
                  <span className="ml-auto text-xs font-bold text-red-600 dark:text-red-400">
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              * String concatenation in a loop creates a new string each time,
              copying all previous characters. Use{" "}
              <code className="rounded bg-slate-200 px-1 py-0.5 dark:bg-slate-700">
                "".join()
              </code>{" "}
              instead.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Safe alternatives
      </h3>

      <div className="mb-6 space-y-2">
        {[
          { bad: "x in list → O(n)", good: "x in set → O(1)", tip: "Convert list to set first" },
          { bad: "list.insert(0, x) → O(n)", good: "deque.appendleft(x) → O(1)", tip: "Use collections.deque" },
          { bad: "str += x in loop → O(n²)", good: "''.join(parts) → O(n)", tip: "Collect in list, join once" },
          { bad: "list.index(x) → O(n)", good: "dict[x] → O(1)", tip: "Build a lookup dictionary" },
        ].map((item) => (
          <div
            key={item.bad}
            className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 p-3 sm:grid-cols-3 dark:border-slate-700"
          >
            <div>
              <p className="text-xs font-bold uppercase text-red-500">Slow</p>
              <code className="text-xs text-slate-600 dark:text-slate-400">{item.bad}</code>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-emerald-500">Fast</p>
              <code className="text-xs text-slate-600 dark:text-slate-400">{item.good}</code>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">How</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.tip}</p>
            </div>
          </div>
        ))}
      </div>

      <QuickCheck
        question="You write: for word in words: if word in seen_list: count += 1. The 'seen_list' has 10,000 items and 'words' has 10,000 items. How many operations is this?"
        answer="Up to 100,000,000 (100 million). The loop runs 10,000 times, and each 'in' check scans up to 10,000 items. That's 10,000 × 10,000 = 10⁸. Switching seen_list to a set makes it 10,000 × 1 = 10,000 operations — a 10,000x speedup."
      />
    </motion.div>
  );
}
