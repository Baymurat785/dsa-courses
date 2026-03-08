import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { GrowthComparisonViz } from "../visualizations/GrowthComparisonViz";

export function SignificanceOfBigO() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        The Significance of Big O
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        If Big O ignores constants, why do we even use it? Because the{" "}
        <strong className="text-slate-900 dark:text-white">
          difference between categories
        </strong>{" "}
        is far more impactful than the difference within a category.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        O(N) vs O(N²): different stories
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">O(N)</strong> tells a story
        of <strong className="text-slate-900 dark:text-white">straight-line growth</strong>{" "}
        — the steps increase in a straight line according to some proportion of the
        data. This is true even when the steps are 100N.
      </p>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">O(N²)</strong> tells a
        completely different story — one of{" "}
        <strong className="text-slate-900 dark:text-white">exponential-like growth</strong>.
        The steps grow faster and faster as data increases. The curve bends upward
        relentlessly.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              The critical insight
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              O(N²) will, at some point in data growth, become slower than O(N)
              multiplied by <em>any</em> factor. Even 100N (which is O(N)) will
              eventually beat N² — because the quadratic curve always overtakes
              every straight line, no matter how steep.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        See it visually
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Adjust the data size and watch how N² (the curve) pulls away from even
        4N (the steepest line). No matter how large the constant on O(N), the
        quadratic always wins... in the worst way.
      </p>

      <Card className="mb-6">
        <GrowthComparisonViz />
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Real numbers tell the story
      </h3>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300 dark:border-slate-600">
              <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">
                N
              </th>
              <th className="px-3 py-2 text-center font-semibold text-blue-600 dark:text-blue-400">
                N
              </th>
              <th className="px-3 py-2 text-center font-semibold text-teal-600 dark:text-teal-400">
                2N
              </th>
              <th className="px-3 py-2 text-center font-semibold text-amber-600 dark:text-amber-400">
                4N
              </th>
              <th className="px-3 py-2 text-center font-semibold text-red-600 dark:text-red-400">
                N²
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            {[
              { n: 2, n1: 2, n2: 4, n4: 8, nsq: 4 },
              { n: 5, n1: 5, n2: 10, n4: 20, nsq: 25 },
              { n: 10, n1: 10, n2: 20, n4: 40, nsq: 100 },
              { n: 50, n1: 50, n2: 100, n4: 200, nsq: "2,500" },
              { n: 100, n1: 100, n2: 200, n4: 400, nsq: "10,000" },
              { n: 1000, n1: "1,000", n2: "2,000", n4: "4,000", nsq: "1,000,000" },
            ].map((row) => (
              <tr
                key={String(row.n)}
                className="border-b border-slate-200 dark:border-slate-700"
              >
                <td className="px-3 py-2 font-bold">{row.n}</td>
                <td className="px-3 py-2 text-center font-mono">{row.n1}</td>
                <td className="px-3 py-2 text-center font-mono">{row.n2}</td>
                <td className="px-3 py-2 text-center font-mono">{row.n4}</td>
                <td className="px-3 py-2 text-center font-mono font-bold text-red-600 dark:text-red-400">
                  {row.nsq}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        At N = 5, N² (25) is close to 4N (20). But at N = 1,000, N² (1,000,000)
        is <strong className="text-slate-900 dark:text-white">250 times larger</strong>{" "}
        than 4N (4,000). The gap only gets worse. This is why Big O categories
        matter more than constants.
      </p>

      <Card className="mb-6">
        <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
          Key takeaways from this chapter
        </h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">1.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Selection Sort is ~2x faster than Bubble Sort
              </strong>{" "}
              — same comparisons, far fewer swaps (N vs N²/2).
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">2.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Big O drops constants
              </strong>{" "}
              — N²/2 becomes O(N²), 100N becomes O(N). It describes the growth
              category, not exact step count.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">3.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Category jumps trump constant improvements
              </strong>{" "}
              — going from O(N²) to O(N) is far more impactful than making an
              O(N²) algorithm 2x faster.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-lg">4.</span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                O(N²) always overtakes O(N)
              </strong>{" "}
              — no matter how large the constant on O(N), the quadratic will
              eventually be slower. That's why Big O focuses on the category.
            </p>
          </div>
        </div>
      </Card>

      <QuickCheck
        question="Algorithm A takes N² / 2 steps. Algorithm B takes 100N steps. For small N (like 10), which is faster? For large N (like 10,000)?"
        answer="For N = 10: A takes 50 steps, B takes 1,000 — A is faster. For N = 10,000: A takes 50,000,000 steps, B takes 1,000,000 — B is 50x faster. This is exactly why Big O focuses on categories: O(N) (even with a large constant like 100) eventually crushes O(N²)."
      />
    </motion.div>
  );
}
