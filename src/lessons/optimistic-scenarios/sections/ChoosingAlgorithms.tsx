import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { ScenarioComparisonViz } from "../visualizations/ScenarioComparisonViz";

export function ChoosingAlgorithms() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Choosing the Right Algorithm
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Now that we know Bubble Sort and Selection Sort, how do we choose between
        them? The answer depends on what you know about your data.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🧰</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Choosing the right tool
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              A hammer and screwdriver are both "hand tools." But you wouldn't use a
              hammer on a screw. Similarly, Bubble Sort and Selection Sort are both
              O(n²), but each has a sweet spot depending on the job.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Compare both algorithms
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Select different data scenarios and see how each algorithm performs.
        Pay attention to both comparisons and swaps.
      </p>

      <Card className="mb-6">
        <ScenarioComparisonViz />
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Decision guide
      </h3>

      <div className="mb-6 space-y-3">
        <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 dark:border-sky-800 dark:bg-sky-900/20">
          <p className="font-medium text-sky-800 dark:text-sky-300">
            Use Selection Sort when...
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>Data is random or you don't know the order</li>
            <li>Swaps are expensive (e.g., large objects)</li>
            <li>You need to minimize write operations</li>
            <li>You want consistent, predictable performance</li>
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="font-medium text-amber-800 dark:text-amber-300">
            Use Bubble Sort when...
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>Data is mostly or already sorted (early termination helps)</li>
            <li>You need to detect if the array is already sorted</li>
            <li>Educational purposes — it's the easiest to understand</li>
          </ul>
        </div>

        <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
          <p className="font-medium text-violet-800 dark:text-violet-300">
            Use neither when...
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>The dataset is large (more than ~1,000 elements)</li>
            <li>Performance is critical</li>
            <li>Use O(n log n) algorithms instead: Merge Sort, Quick Sort, or your language's built-in sort</li>
          </ul>
        </div>
      </div>

      <Card className="mb-6">
        <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
          Key takeaways from this lesson
        </h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">1.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Big O is not the whole story
              </strong>{" "}
              — best, average, and worst case all matter for real-world performance.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">2.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Selection Sort wins on random data
              </strong>{" "}
              — fewer swaps means roughly half the total operations of Bubble Sort.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">3.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Bubble Sort wins on nearly-sorted data
              </strong>{" "}
              — early termination gives it an O(n) best case that Selection Sort can't match.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">4.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                For large data, neither is sufficient
              </strong>{" "}
              — O(n log n) algorithms like Merge Sort are needed (coming in future lessons!).
            </p>
          </div>
        </div>
      </Card>

      <QuickCheck
        question="You're building a system that frequently re-sorts a list after inserting one new element. The list is usually 99% sorted. Would you pick Bubble Sort or Selection Sort?"
        answer="Bubble Sort! On nearly-sorted data, optimized Bubble Sort with early termination approaches O(n) — just one or two passes. Selection Sort would still do all n²/2 comparisons regardless. When you know your data is nearly sorted, an algorithm with a good best case wins."
      />
    </motion.div>
  );
}
