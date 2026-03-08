import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { SelectionSortViz } from "../visualizations/SelectionSortViz";

const SELECTION_SORT_CODE = `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i                    # Assume current is smallest
        for j in range(i + 1, n):      # Scan the rest
            if arr[j] < arr[min_idx]:
                min_idx = j            # Found a smaller one
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]  # One swap per pass
    return arr`;

export function SelectionSort() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Selection Sort
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Selection Sort</strong>{" "}
        takes a different approach. Instead of swapping neighbors like Bubble Sort,
        it <strong className="text-slate-900 dark:text-white">selects</strong> the
        smallest element and moves it directly to its final position.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏀</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Coach picking players for a lineup
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              A coach needs to line up players shortest-to-tallest. The coach scans
              the entire group, finds the shortest player, and pulls them to position 1.
              Then scans the remaining players, finds the next shortest, and pulls them
              to position 2. Scan everything, make one move. Repeat.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        How it works
      </h3>

      <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-600 dark:text-slate-300">
        <li>
          Start at position 0. Scan the <strong className="text-slate-900 dark:text-white">entire</strong>{" "}
          remaining array to find the minimum value.
        </li>
        <li>
          Swap the minimum with the element at position 0.
        </li>
        <li>
          Move to position 1. Scan from position 1 onward for the new minimum.
        </li>
        <li>
          Swap it into position 1.
        </li>
        <li>
          Continue until the array is fully sorted.
        </li>
      </ol>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Key difference from Bubble Sort:</strong>{" "}
        Selection Sort does at most <strong className="text-slate-900 dark:text-white">one swap per pass</strong>{" "}
        (compared to Bubble Sort which may swap at every comparison). It scans
        more but moves less.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Try it: Selection Sort step-by-step
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Watch how Selection Sort scans for the minimum (highlighted in orange),
        then swaps it into place. Compare the swap count with Bubble Sort!
      </p>

      <Card className="mb-6">
        <SelectionSortViz />
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The code
      </h3>

      <div className="mb-6">
        <CodeBlock code={SELECTION_SORT_CODE} language="python" />
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Big O analysis
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Same comparison count as Bubble Sort — still O(n²):
      </p>

      <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
        <li>
          <strong>Comparisons:</strong> n(n-1)/2 — always, even if already sorted
        </li>
        <li>
          <strong>Swaps:</strong> at most n-1 — much fewer than Bubble Sort!
        </li>
      </ul>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Important:</strong> Unlike
        optimized Bubble Sort, Selection Sort has{" "}
        <strong className="text-slate-900 dark:text-white">no best case improvement</strong>.
        Even on a fully sorted array, it still does all n(n-1)/2 comparisons because
        it always scans the full remaining array to find the minimum.
      </p>

      <QuickCheck
        question="Selection Sort and Bubble Sort are both O(n²). If they take the same number of comparisons, why is Selection Sort typically faster in practice?"
        answer="Swaps are more expensive than comparisons — each swap involves 3 memory writes (using a temp variable), while a comparison only reads memory. Selection Sort does at most n-1 swaps total, while Bubble Sort can do up to n(n-1)/2 swaps. For 100 elements, that's 99 swaps vs potentially 4,950 — a massive difference in write operations."
      />
    </motion.div>
  );
}
