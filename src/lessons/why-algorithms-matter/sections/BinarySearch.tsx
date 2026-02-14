import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { BinarySearchViz } from "../visualizations/BinarySearchViz";
import { SearchPerformanceGraph } from "../visualizations/SearchPerformanceGraph";

const BINARY_SEARCH_PYTHON = `def binary_search(array: list, target) -> int | None:
    left = 0
    right = len(array) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if array[mid] == target:
            return mid  # Found

        if array[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half

    return None  # Not found`;

export function BinarySearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Binary Search Algorithm
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Binary search</strong> is
        a search algorithm that only works on ordered (sorted) data. The idea:
        check the middle element, eliminate half the data, and repeat.
      </p>

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          Video: Binary search explained
        </p>
        <div className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src="https://www.youtube.com/embed/YzT8zDPihmc"
            title="Binary search explained (YouTube)"
            className="absolute left-0 top-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        How it works
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Example: search for 37 in{" "}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 dark:bg-slate-700">[3, 17, 25, 37, 52, 75, 80, 90, 99]</code>.
      </p>
      <ul className="mb-6 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
        <li>Step 1: Check middle (52). 37 &lt; 52, so search left half.</li>
        <li>Step 2: In [3, 17, 25, 37], check middle (17). 37 &gt; 17, search right.</li>
        <li>Step 3: In [25, 37], check middle (25). 37 &gt; 25, search right.</li>
        <li>Step 4: Check 37. Found! — 4 steps for 9 elements.</li>
      </ul>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Performance (log₂N pattern)
      </h3>
      <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
        <li>100 elements → 7 steps maximum</li>
        <li>200 elements (double) → 8 steps (only 1 more!)</li>
        <li>400 elements (double) → 9 steps (only 1 more!)</li>
        <li>1,000 elements → 10 steps</li>
        <li>10,000 elements → 14 steps</li>
        <li>1,000,000 elements → 20 steps</li>
      </ul>
      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Key insight:</strong> Doubling
        the data size adds only <strong>one</strong> step. Each step eliminates
        half the remaining data—this is <strong>logarithmic time</strong>: log₂N steps.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Linear search vs binary search
      </h3>
      <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
        <li>
          <strong>100 elements:</strong> Linear up to 100 steps, binary up to 7
          steps — binary is about 14× faster.
        </li>
        <li>
          <strong>1,000,000 elements:</strong> Linear up to 1,000,000 steps,
          binary up to 20 steps — binary is about 50,000× faster.
        </li>
      </ul>

      <Card className="mb-6">
        <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          Steps (worst case) as array size grows — both axes use a log scale so you can see how quickly linear search grows compared to binary search.
        </p>
        <SearchPerformanceGraph />
      </Card>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Critical requirement:</strong> Binary
        search only works on sorted data. Unsorted data gives wrong results; use
        linear search on unsorted arrays.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Implementation
      </h3>
      <div className="mb-6">
        <CodeBlock code={BINARY_SEARCH_PYTHON} language="python" />
      </div>

      <div className="mb-6">
        <Card>
          <BinarySearchViz />
        </Card>
      </div>

      <QuickCheck
        question="Why doesn't binary search work on an unsorted array?"
        answer="Binary search assumes that when you compare with the middle element, you can safely eliminate one half. That only works if the array is sorted—otherwise the target could be in the 'eliminated' half and you'd miss it."
      />
    </motion.div>
  );
}
