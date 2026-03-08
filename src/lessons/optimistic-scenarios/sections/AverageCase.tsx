import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";

export function AverageCase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Average Case Analysis
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        We know the worst-case Big O for Bubble Sort and Selection Sort is the same:
        O(n²). But what about the <strong className="text-slate-900 dark:text-white">average case</strong>?
        This is what you'll encounter in practice most of the time.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Shuffled deck of cards
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              On a randomly shuffled hand, some cards will already be in order and
              some won't. On average, about half the comparisons will require a swap.
              That's why the average case typically falls between the best and worst.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Comparing averages
      </h3>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Algorithm</th>
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Comparisons (avg)</th>
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Swaps (avg)</th>
              <th className="py-2 font-semibold text-slate-900 dark:text-white">Total (avg)</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Bubble Sort</td>
              <td className="py-2 pr-4 font-mono">n²/2</td>
              <td className="py-2 pr-4 font-mono">n²/4</td>
              <td className="py-2 font-mono text-red-600 dark:text-red-400">≈ 3n²/4</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">Selection Sort</td>
              <td className="py-2 pr-4 font-mono">n²/2</td>
              <td className="py-2 pr-4 font-mono">n</td>
              <td className="py-2 font-mono text-emerald-600 dark:text-emerald-400">≈ n²/2 + n</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Key insight:</strong>{" "}
        Both algorithms make the same number of comparisons on average (n²/2). The
        difference is in swaps: Bubble Sort may swap up to n²/4 times, while Selection
        Sort swaps at most n times — making it roughly{" "}
        <strong className="text-slate-900 dark:text-white">twice as fast</strong>{" "}
        overall on random data.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        But best case tells a different story
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        On <strong className="text-slate-900 dark:text-white">already sorted</strong>{" "}
        data, optimized Bubble Sort (with early termination) does just one pass — O(n).
        Selection Sort still does all n²/2 comparisons regardless. So the "worse"
        algorithm can actually win when data is nearly sorted!
      </p>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="mb-2 font-bold text-emerald-600 dark:text-emerald-400">
            Nearly sorted data
          </p>
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>Bubble Sort: close to O(n) with early stop</li>
            <li>Selection Sort: still O(n²) — no shortcut</li>
          </ul>
        </Card>
        <Card>
          <p className="mb-2 font-bold text-red-600 dark:text-red-400">
            Random / reversed data
          </p>
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <li>Bubble Sort: ~3n²/4 total ops</li>
            <li>Selection Sort: ~n²/2 total ops (wins)</li>
          </ul>
        </Card>
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Real-world data is rarely random
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        In practice, data often has some existing order:
      </p>

      <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-300">
        <li>
          <strong className="text-slate-900 dark:text-white">Database records</strong>{" "}
          — often sorted by insertion timestamp
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">Log files</strong>{" "}
          — chronologically ordered with occasional out-of-order entries
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">User input</strong>{" "}
          — people tend to enter data in roughly sorted order
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">Re-sorting after small changes</strong>{" "}
          — adding one item to an already-sorted list
        </li>
      </ul>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        This is why knowing your data matters — the "best" algorithm depends on what
        kind of input you typically receive.
      </p>

      <QuickCheck
        question="For 1,000 elements on random data, Bubble Sort averages ~3n²/4 total operations and Selection Sort averages ~n²/2. How many total operations does each make?"
        answer="Bubble Sort: 3 × 1,000,000 / 4 = 750,000 operations. Selection Sort: 1,000,000 / 2 = 500,000 operations. Selection Sort does about 33% less work on random data — the fewer swaps add up!"
      />
    </motion.div>
  );
}
