import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";

export function BestAverageWorst() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Best, Average, and Worst Case
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        So far, we've mostly focused on <strong className="text-slate-900 dark:text-white">worst-case</strong>{" "}
        analysis — the maximum number of steps an algorithm could take. But
        algorithms behave very differently depending on the input they receive.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎰</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Commuting to work
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Your commute has three scenarios:{" "}
              <strong>Best case</strong> — green lights all the way, 15 minutes.{" "}
              <strong>Worst case</strong> — accident on the highway, 90 minutes.{" "}
              <strong>Average case</strong> — normal traffic, 35 minutes. You'd
              plan your morning around the average, not the best or worst.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The three scenarios
      </h3>

      <div className="mb-6 space-y-3">
        <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
          <div className="rounded bg-emerald-200 px-2 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
            Best
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Best Case — Omega (Ω)
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              The input that makes the algorithm run the <em>fastest</em>. For
              linear search, the target is at index 0 — found in 1 step. This is
              the lower bound.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <div className="rounded bg-amber-200 px-2 py-1 text-xs font-bold text-amber-800 dark:bg-amber-800 dark:text-amber-200">
            Average
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Average Case — Theta (Θ)
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              The <em>expected</em> performance over all possible inputs. For
              linear search on n elements, on average you'll check n/2 elements
              before finding the target.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="rounded bg-red-200 px-2 py-1 text-xs font-bold text-red-800 dark:bg-red-800 dark:text-red-200">
            Worst
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Worst Case — Big O (O)
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              The input that makes the algorithm run the <em>slowest</em>. For
              linear search, the target is the last element or not present — n
              steps. This is the upper bound.
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Why does this matter?
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Two algorithms with the <strong className="text-slate-900 dark:text-white">same worst-case Big O</strong>{" "}
        can have very different average and best-case behavior. This means one
        might be dramatically faster in practice, even though they look identical
        on paper.
      </p>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Algorithm</th>
              <th className="py-2 pr-4 font-semibold text-emerald-700 dark:text-emerald-400">Best</th>
              <th className="py-2 pr-4 font-semibold text-amber-700 dark:text-amber-400">Average</th>
              <th className="py-2 font-semibold text-red-700 dark:text-red-400">Worst</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Linear Search</td>
              <td className="py-2 pr-4 font-mono">O(1)</td>
              <td className="py-2 pr-4 font-mono">O(n)</td>
              <td className="py-2 font-mono">O(n)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Binary Search</td>
              <td className="py-2 pr-4 font-mono">O(1)</td>
              <td className="py-2 pr-4 font-mono">O(log n)</td>
              <td className="py-2 font-mono">O(log n)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Bubble Sort</td>
              <td className="py-2 pr-4 font-mono">O(n)*</td>
              <td className="py-2 pr-4 font-mono">O(n²)</td>
              <td className="py-2 font-mono">O(n²)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium">Selection Sort</td>
              <td className="py-2 pr-4 font-mono">O(n²)</td>
              <td className="py-2 pr-4 font-mono">O(n²)</td>
              <td className="py-2 font-mono">O(n²)</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          * With early termination optimization
        </p>
      </div>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        Notice how <strong className="text-slate-900 dark:text-white">Bubble Sort</strong>{" "}
        with early termination has an O(n) best case — on already-sorted data it
        does just one pass and stops. Selection Sort always does O(n²) regardless.
        This shows why best-case analysis matters.
      </p>

      <QuickCheck
        question="If you know your data is usually nearly sorted, which scenario matters most: best, average, or worst case?"
        answer="The best case matters most! Nearly-sorted data is close to the best-case input, so an algorithm with an excellent best case (like optimized Bubble Sort's O(n)) will perform far better than one without (like Selection Sort's O(n²) across all cases)."
      />
    </motion.div>
  );
}
