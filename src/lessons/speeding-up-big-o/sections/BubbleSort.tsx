import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { BubbleSortViz } from "../visualizations/BubbleSortViz";

const BUBBLE_SORT_CODE = `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):          # n-1 passes
        for j in range(n - 1 - i):   # shrinking window
            if arr[j] > arr[j + 1]:  # compare neighbors
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # swap
    return arr`;

export function BubbleSort() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Bubble Sort
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Now that we understand Big O, let's see it in action with real sorting
        algorithms. <strong className="text-slate-900 dark:text-white">Bubble Sort</strong>{" "}
        is one of the simplest sorting algorithms — and a classic example of O(n²).
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🫧</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Bubbles rising in a glass
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Imagine a glass of sparkling water. Lighter bubbles rise to the top
              while heavier ones sink. In Bubble Sort, smaller values "bubble up"
              toward the beginning while larger values sink to the end — one
              neighbor-swap at a time.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        How it works
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Bubble Sort makes multiple <strong className="text-slate-900 dark:text-white">passes</strong>{" "}
        through the array. On each pass, it compares adjacent elements and swaps
        them if they're in the wrong order.
      </p>

      <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-600 dark:text-slate-300">
        <li>
          Start at the beginning. Compare the first two elements.
        </li>
        <li>
          If the left one is larger, <strong className="text-slate-900 dark:text-white">swap</strong> them.
          Otherwise, leave them alone.
        </li>
        <li>
          Move one position right and repeat the comparison.
        </li>
        <li>
          After one full pass, the <strong className="text-slate-900 dark:text-white">largest element</strong>{" "}
          is guaranteed to be at the end (it "bubbled" all the way right).
        </li>
        <li>
          Repeat the process, but now you can ignore the last element (it's
          already sorted). Each pass sorts one more element.
        </li>
      </ol>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">👫</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Students lining up by height
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Students stand in a line. Each student only compares with the person
              next to them. If someone is taller than their right neighbor, they swap.
              After one pass, the tallest student has shuffled all the way to the end.
              Repeat until everyone is sorted.
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif"
            alt="Bubble sort animation showing bars being compared and swapped"
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Try it: Bubble Sort step-by-step
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Click "Step" to advance one comparison at a time, or "Run" to watch the
        entire sort play out. Notice how the largest unsorted value always bubbles
        to its correct position after each pass.
      </p>

      <Card className="mb-6">
        <BubbleSortViz />
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The code
      </h3>

      <div className="mb-6">
        <CodeBlock code={BUBBLE_SORT_CODE} language="python" />
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Big O analysis
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        For an array of n elements:
      </p>

      <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
        <li>
          <strong>Pass 1:</strong> n - 1 comparisons
        </li>
        <li>
          <strong>Pass 2:</strong> n - 2 comparisons
        </li>
        <li>
          <strong>Pass 3:</strong> n - 3 comparisons
        </li>
        <li>...</li>
        <li>
          <strong>Last pass:</strong> 1 comparison
        </li>
      </ul>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Total: (n-1) + (n-2) + ... + 1 ={" "}
        <strong className="text-slate-900 dark:text-white">n(n-1)/2</strong> comparisons.
        For n = 10, that's 45 comparisons. For n = 100, it's 4,950. This is{" "}
        <strong className="text-slate-900 dark:text-white">O(n²)</strong>.
      </p>

      <div className="mb-6 grid grid-cols-3 gap-3 text-center">
        {[
          { n: "10", steps: "45" },
          { n: "100", steps: "4,950" },
          { n: "1,000", steps: "499,500" },
        ].map((row) => (
          <div
            key={row.n}
            className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              n = {row.n}
            </p>
            <p className="text-lg font-bold text-red-700 dark:text-red-400">
              {row.steps}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">comparisons</p>
          </div>
        ))}
      </div>

      <QuickCheck
        question="After one complete pass of Bubble Sort on [5, 3, 8, 1, 4], which element is guaranteed to be in its final position?"
        answer="8 — the largest element. After one full pass, the biggest value always bubbles to the rightmost unsorted position. The array after pass 1 would be [3, 5, 1, 4, 8]."
      />
    </motion.div>
  );
}
