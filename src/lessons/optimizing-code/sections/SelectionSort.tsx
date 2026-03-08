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
        In the previous chapter we saw Bubble Sort — a simple but slow O(N²)
        algorithm. Now let's look at{" "}
        <strong className="text-slate-900 dark:text-white">Selection Sort</strong>,
        another O(N²) algorithm that takes a fundamentally different approach and
        is actually about <strong className="text-slate-900 dark:text-white">twice as fast</strong>{" "}
        as Bubble Sort in practice.
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
          Start at index 0. Assume it holds the{" "}
          <strong className="text-slate-900 dark:text-white">lowest value</strong>.
        </li>
        <li>
          Compare it with each remaining element. If you find something smaller,
          remember that new index as the lowest.
        </li>
        <li>
          After scanning the entire remaining array, swap the lowest value into
          position 0.
        </li>
        <li>
          Move to index 1 and repeat — scan the rest, find the minimum, swap it
          into place.
        </li>
        <li>
          Continue until the array is fully sorted. Each pass places one element
          in its correct final position.
        </li>
      </ol>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Walkthrough: sorting [4, 2, 7, 1, 3]
      </h3>

      <div className="mb-6 space-y-4">
        {[
          {
            pass: "Pass 1",
            desc: "Scan all 5 elements. Lowest is 1 (index 3). Swap with index 0.",
            before: [4, 2, 7, 1, 3],
            after: [1, 2, 7, 4, 3],
            sorted: 1,
          },
          {
            pass: "Pass 2",
            desc: "Scan from index 1. Lowest is 2 (already at index 1). No swap needed.",
            before: [1, 2, 7, 4, 3],
            after: [1, 2, 7, 4, 3],
            sorted: 2,
          },
          {
            pass: "Pass 3",
            desc: "Scan from index 2. Lowest is 3 (index 4). Swap with index 2.",
            before: [1, 2, 7, 4, 3],
            after: [1, 2, 3, 4, 7],
            sorted: 3,
          },
          {
            pass: "Pass 4",
            desc: "Scan from index 3. Lowest is 4 (already at index 3). No swap needed. Done!",
            before: [1, 2, 3, 4, 7],
            after: [1, 2, 3, 4, 7],
            sorted: 4,
          },
        ].map((step) => (
          <div
            key={step.pass}
            className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
          >
            <p className="mb-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {step.pass}
            </p>
            <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
              {step.desc}
            </p>
            <div className="flex items-center gap-2">
              {step.after.map((val, i) => (
                <div
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                    i < step.sorted
                      ? "border-2 border-emerald-400 bg-emerald-100 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "border border-slate-300 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {val}
                </div>
              ))}
              <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">
                {step.sorted} element{step.sorted > 1 ? "s" : ""} sorted
              </span>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Try it: Selection Sort step-by-step
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Watch how Selection Sort scans for the minimum value (highlighted in
        orange), then swaps it into its final position with a single swap per pass.
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

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Why the inner loop starts at i + 1
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Everything before index <code className="rounded bg-slate-200 px-1 py-0.5 text-xs dark:bg-slate-700">i</code>{" "}
              is already sorted and in its final position. We only need to scan the
              unsorted portion — from <code className="rounded bg-slate-200 px-1 py-0.5 text-xs dark:bg-slate-700">i + 1</code>{" "}
              to the end.
            </p>
          </div>
        </div>
      </Card>

      <QuickCheck
        question="In Selection Sort, after 3 passes on a 10-element array, how many elements are guaranteed to be in their correct position?"
        answer="3 elements — the first 3 positions. Each pass of Selection Sort finds the minimum of the unsorted portion and places it at the next position. So after 3 passes, positions 0, 1, and 2 hold their final values."
      />
    </motion.div>
  );
}
