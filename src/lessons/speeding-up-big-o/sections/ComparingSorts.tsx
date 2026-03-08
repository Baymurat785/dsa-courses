import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { SortComparisonViz } from "../visualizations/SortComparisonViz";
import { ArrowRight } from "lucide-react";

export function ComparingSorts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Comparing Algorithms
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Both Bubble Sort and Selection Sort are O(n²). They have the{" "}
        <strong className="text-slate-900 dark:text-white">same Big O</strong> — but
        does that mean they perform identically? Not at all.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏠</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Rearranging furniture
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              <strong>Bubble Sort</strong> is like rearranging heavy furniture by only
              swapping adjacent pieces. Moving a couch from one end of the room to
              the other requires many individual swaps.{" "}
              <strong>Selection Sort</strong> is like scanning the room, deciding which
              piece goes in spot 1, and moving it directly there. More scanning, but
              far fewer heavy lifts.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Head-to-head comparison
      </h3>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">
                Metric
              </th>
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">
                Bubble Sort
              </th>
              <th className="py-2 font-semibold text-slate-900 dark:text-white">
                Selection Sort
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Worst-case Big O</td>
              <td className="py-2 pr-4 font-mono">O(n²)</td>
              <td className="py-2 font-mono">O(n²)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Best-case Big O</td>
              <td className="py-2 pr-4 font-mono text-emerald-600 dark:text-emerald-400">
                O(n)*
              </td>
              <td className="py-2 font-mono text-red-600 dark:text-red-400">O(n²)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Comparisons (worst)</td>
              <td className="py-2 pr-4 font-mono">n(n-1)/2</td>
              <td className="py-2 font-mono">n(n-1)/2</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Swaps (worst)</td>
              <td className="py-2 pr-4 font-mono text-red-600 dark:text-red-400">
                n(n-1)/2
              </td>
              <td className="py-2 font-mono text-emerald-600 dark:text-emerald-400">
                n-1
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Early termination?</td>
              <td className="py-2 pr-4 text-emerald-600 dark:text-emerald-400">
                Yes (optimized)
              </td>
              <td className="py-2 text-red-600 dark:text-red-400">No</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          * With the early termination optimization
        </p>
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Why swaps matter more than you think
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        A comparison only <strong className="text-slate-900 dark:text-white">reads</strong>{" "}
        memory (is A &gt; B?). A swap requires three{" "}
        <strong className="text-slate-900 dark:text-white">writes</strong>{" "}
        (temp = A, A = B, B = temp). Writing is significantly more expensive
        than reading — especially for large objects.
      </p>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center dark:border-red-800 dark:bg-red-900/20">
          <p className="text-xs text-slate-500 dark:text-slate-400">Bubble Sort (n=100)</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">4,950</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">worst-case swaps</p>
        </div>
        <ArrowRight className="h-5 w-5 text-slate-400" />
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-center dark:border-emerald-800 dark:bg-emerald-900/20">
          <p className="text-xs text-slate-500 dark:text-slate-400">Selection Sort (n=100)</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">99</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">worst-case swaps</p>
        </div>
      </div>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        That's a <strong className="text-slate-900 dark:text-white">50x difference</strong>{" "}
        in swap operations for just 100 elements! This is why two O(n²)
        algorithms can have very different real-world performance.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        See it yourself
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Run both algorithms on the same data and compare their comparison and
        swap counts.
      </p>

      <Card className="mb-6">
        <SortComparisonViz />
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The bigger lesson
      </h3>

      <Card className="mb-6">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">1.</span>
            <p className="text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Big O describes the shape, not the speed.
              </strong>{" "}
              Two O(n²) algorithms can differ dramatically in practice because
              of constant factors (like swap cost).
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">2.</span>
            <p className="text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Not all operations cost the same.
              </strong>{" "}
              Reads are cheap, writes are expensive. An algorithm with fewer
              writes can outperform one with fewer total operations.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">3.</span>
            <p className="text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Best case matters too.
              </strong>{" "}
              Bubble Sort's O(n) best case on nearly-sorted data is genuinely
              useful. Selection Sort always does full work.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">4.</span>
            <p className="text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Both are still O(n²) — we can do better.
              </strong>{" "}
              Algorithms like Merge Sort achieve O(n log n), which we'll
              explore in later lessons.
            </p>
          </div>
        </div>
      </Card>

      <QuickCheck
        question="You have a large array that's almost sorted (only a few elements are out of place). Would you choose Bubble Sort or Selection Sort?"
        answer="Optimized Bubble Sort — its early termination makes it close to O(n) on nearly-sorted data, since most passes will find zero swaps. Selection Sort would still do all n(n-1)/2 comparisons regardless, making it much slower in this scenario."
      />
    </motion.div>
  );
}
