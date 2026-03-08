import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { Zap, AlertTriangle } from "lucide-react";

const OPTIMIZED_CODE = `def bubble_sort_optimized(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False            # Track if any swaps happen
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:            # No swaps? Already sorted!
            break                  # Exit early
    return arr`;

export function OptimizingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Optimizing Bubble Sort
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Basic Bubble Sort always runs all n-1 passes, even if the array becomes
        sorted early. We can add a simple check: if a pass completes with{" "}
        <strong className="text-slate-900 dark:text-white">zero swaps</strong>,
        the array is already sorted and we can stop.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The optimization
      </h3>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
            <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Early termination
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Add a <code className="rounded bg-slate-200 px-1 py-0.5 text-xs dark:bg-slate-700">swapped</code>{" "}
              flag. Set it to <code className="rounded bg-slate-200 px-1 py-0.5 text-xs dark:bg-slate-700">False</code>{" "}
              at the start of each pass, flip to <code className="rounded bg-slate-200 px-1 py-0.5 text-xs dark:bg-slate-700">True</code>{" "}
              on any swap. If the flag is still <code className="rounded bg-slate-200 px-1 py-0.5 text-xs dark:bg-slate-700">False</code>{" "}
              after a full pass, break — the array is sorted.
            </p>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <CodeBlock code={OPTIMIZED_CODE} language="python" />
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        What this changes
      </h3>

      <div className="mb-6 space-y-3">
        <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
            Worst
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Reverse-sorted array: still O(n²)
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              [5, 4, 3, 2, 1] — every pass has swaps, so early termination never
              triggers. Same as unoptimized.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="rounded bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Best
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Already-sorted array: now O(n)!
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              [1, 2, 3, 4, 5] — first pass finds zero swaps, immediately breaks.
              Only n-1 comparisons total. Linear time!
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="rounded bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            Nearly
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Nearly-sorted array: much faster in practice
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              [1, 2, 4, 3, 5] — only needs a couple of passes before no more
              swaps occur. Real-world data is often nearly sorted.
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        A concrete example
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Sorting [1, 2, 3, 4, 5] (already sorted):
      </p>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Version</th>
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Comparisons</th>
              <th className="py-2 font-semibold text-slate-900 dark:text-white">Passes</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4">Unoptimized</td>
              <td className="py-2 pr-4 font-mono text-red-600 dark:text-red-400">10</td>
              <td className="py-2 font-mono">4</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Optimized</td>
              <td className="py-2 pr-4 font-mono text-emerald-600 dark:text-emerald-400">4</td>
              <td className="py-2 font-mono">1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Key takeaway
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              The optimization doesn't change the <em>worst-case</em> Big O — it's
              still O(n²). But it dramatically improves the <em>best case</em> from
              O(n²) to O(n). This matters because real-world data is often
              partially sorted.
            </p>
          </div>
        </div>
      </Card>

      <QuickCheck
        question="If you run optimized Bubble Sort on [2, 1, 3, 4, 5], how many passes will it take?"
        answer="2 passes. Pass 1: compares all adjacent pairs, swaps 2 and 1, resulting in [1, 2, 3, 4, 5]. Pass 2: compares all remaining pairs, finds zero swaps, and breaks. Total: 2 passes instead of 4."
      />
    </motion.div>
  );
}
