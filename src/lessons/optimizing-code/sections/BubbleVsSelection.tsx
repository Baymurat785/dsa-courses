import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";

export function BubbleVsSelection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Bubble Sort vs Selection Sort
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Both algorithms are O(N²), but let's look at the{" "}
        <strong className="text-slate-900 dark:text-white">actual step counts</strong>{" "}
        to understand why Selection Sort is roughly{" "}
        <strong className="text-slate-900 dark:text-white">twice as fast</strong>{" "}
        in practice.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Counting the steps
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        For an array of N = 5 elements, each algorithm makes the same number of{" "}
        <strong className="text-slate-900 dark:text-white">comparisons</strong>:
        4 + 3 + 2 + 1 = <strong className="text-slate-900 dark:text-white">10 comparisons</strong>.
        But the number of <strong className="text-slate-900 dark:text-white">swaps</strong>{" "}
        is very different.
      </p>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🫧</span>
            <p className="font-bold text-red-600 dark:text-red-400">
              Bubble Sort
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Comparisons</span>
              <span className="font-mono font-bold">~N²/2</span>
            </div>
            <div className="flex justify-between">
              <span>Swaps (worst case)</span>
              <span className="font-mono font-bold text-red-600 dark:text-red-400">
                ~N²/2
              </span>
            </div>
            <hr className="border-slate-200 dark:border-slate-700" />
            <div className="flex justify-between font-bold">
              <span>Total steps</span>
              <span className="font-mono text-red-600 dark:text-red-400">~N²</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">👆</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">
              Selection Sort
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Comparisons</span>
              <span className="font-mono font-bold">~N²/2</span>
            </div>
            <div className="flex justify-between">
              <span>Swaps (worst case)</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ~N
              </span>
            </div>
            <hr className="border-slate-200 dark:border-slate-700" />
            <div className="flex justify-between font-bold">
              <span>Total steps</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                ~N²/2
              </span>
            </div>
          </div>
        </Card>
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        The key insight:{" "}
        <strong className="text-slate-900 dark:text-white">
          Bubble Sort makes up to N²/2 swaps
        </strong>{" "}
        (a swap at every comparison in the worst case), while{" "}
        <strong className="text-slate-900 dark:text-white">
          Selection Sort makes at most N swaps
        </strong>{" "}
        (just one per pass). Since a swap involves 3 assignments vs a comparison's
        1 check, this matters.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Concrete numbers
      </h3>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300 dark:border-slate-600">
              <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">
                N
              </th>
              <th className="px-4 py-2 text-center font-semibold text-red-600 dark:text-red-400">
                Bubble Sort steps
              </th>
              <th className="px-4 py-2 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                Selection Sort steps
              </th>
              <th className="px-4 py-2 text-center font-semibold text-indigo-600 dark:text-indigo-400">
                Speedup
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            {[
              { n: 10, bubble: 90, selection: 55 },
              { n: 20, bubble: 380, selection: 210 },
              { n: 40, bubble: 1560, selection: 820 },
              { n: 80, bubble: 6320, selection: 3240 },
            ].map((row) => (
              <tr
                key={row.n}
                className="border-b border-slate-200 dark:border-slate-700"
              >
                <td className="px-4 py-2 font-bold">{row.n}</td>
                <td className="px-4 py-2 text-center font-mono">
                  {row.bubble.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center font-mono">
                  {row.selection.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center font-bold text-indigo-600 dark:text-indigo-400">
                  ~{(row.bubble / row.selection).toFixed(1)}x
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        Selection Sort is consistently about{" "}
        <strong className="text-slate-900 dark:text-white">twice as fast</strong>{" "}
        as Bubble Sort. But here's the thing — they're{" "}
        <em>both</em> O(N²) in Big O terms. How can they be "the same" if one is
        twice as fast? That brings us to our next key concept...
      </p>

      <QuickCheck
        question="If Bubble Sort takes ~100,000 steps on an array of 320 elements, approximately how many steps would Selection Sort take?"
        answer="~50,000 steps. Selection Sort consistently takes about half the steps of Bubble Sort because it eliminates most of the swaps. Its total is ~N²/2 vs Bubble Sort's ~N²."
      />
    </motion.div>
  );
}
