import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { ComplexityGraphViz } from "../visualizations/ComplexityGraphViz";
import { QuadraticViz } from "../visualizations/QuadraticViz";
import { Zap, BookOpen, Users, Layers } from "lucide-react";

const O1_CODE = `def get_first(arr):
    return arr[0]  # Always 1 step, no matter how big arr is

def get_by_index(arr, i):
    return arr[i]  # Still 1 step — direct memory access`;

const OLOGN_CODE = `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
# Each step eliminates HALF the remaining data`;

const ON_CODE = `def linear_search(arr, target):
    for i, item in enumerate(arr):
        if item == target:
            return i
    return -1
# Worst case: check every element once`;

const ON2_CODE = `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
# Nested loops: n × n = n² comparisons`;

export function CommonComplexities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Common Complexities
      </h2>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        Most algorithms fall into a handful of Big O categories. Let's explore
        the four most common ones, each with a real-world analogy, code example,
        and visualization.
      </p>

      {/* ───── O(1) ───── */}
      <div id="common-complexities-constant" className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
            <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            O(1) — Constant Time
          </h3>
        </div>

        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          The algorithm takes the <strong className="text-slate-900 dark:text-white">same number of steps</strong>{" "}
          regardless of input size. Whether the array has 10 elements or 10 million,
          it's always the same speed.
        </p>

        <Card className="mb-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👛</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Analogy: Grabbing your wallet
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Whether you have $1 or $1,000 in your wallet, the time to grab it
                from your pocket is the same. The amount inside doesn't affect the grab.
              </p>
            </div>
          </div>
        </Card>

        <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Examples: Array index access, hash table lookup, push/pop from a stack
        </p>
        <div className="mb-4">
          <CodeBlock code={O1_CODE} language="python" />
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          {[
            { n: "10", steps: "1" },
            { n: "10,000", steps: "1" },
            { n: "10,000,000", steps: "1" },
          ].map((row) => (
            <div
              key={row.n}
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-900/20"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                n = {row.n}
              </p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                {row.steps} step
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ───── O(log n) ───── */}
      <div id="common-complexities-logarithmic" className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-sky-100 p-2 dark:bg-sky-900/30">
            <BookOpen className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            O(log n) — Logarithmic Time
          </h3>
        </div>

        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          Each step <strong className="text-slate-900 dark:text-white">eliminates half</strong>{" "}
          the remaining data. Doubling the input adds only one extra step.
          This is the power of binary search, which we learned in the previous lesson.
        </p>

        <Card className="mb-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Analogy: The phone book lookup
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Looking up "Smith" in a physical phone book. You open to the middle — too far,
                it's "M". So you flip to the right half's middle — "R". Keep halving until
                you find "S". For 1,000 pages, it takes ~10 flips. For 1,000,000 pages, just ~20 flips!
              </p>
            </div>
          </div>
        </Card>

        <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Examples: Binary search, balanced BST operations
        </p>
        <div className="mb-4">
          <CodeBlock code={OLOGN_CODE} language="python" />
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          {[
            { n: "100", steps: "7" },
            { n: "10,000", steps: "14" },
            { n: "1,000,000", steps: "20" },
          ].map((row) => (
            <div
              key={row.n}
              className="rounded-lg border border-sky-200 bg-sky-50 p-3 dark:border-sky-800 dark:bg-sky-900/20"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                n = {row.n}
              </p>
              <p className="text-lg font-bold text-sky-700 dark:text-sky-400">
                {row.steps} steps
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ───── O(n) ───── */}
      <div id="common-complexities-linear" className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
            <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            O(n) — Linear Time
          </h3>
        </div>

        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          Steps grow <strong className="text-slate-900 dark:text-white">proportionally</strong>{" "}
          to the input. Double the data, double the steps. This is the most
          intuitive complexity — you touch each element once.
        </p>

        <Card className="mb-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Analogy: Roll call in a classroom
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                A teacher calling every student's name for attendance. 20 students = 20 names.
                40 students = 40 names. There's no shortcut — you must call each name once.
              </p>
            </div>
          </div>
        </Card>

        <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Examples: Linear search, finding max/min, printing all elements
        </p>
        <div className="mb-4">
          <CodeBlock code={ON_CODE} language="python" />
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          {[
            { n: "100", steps: "100" },
            { n: "10,000", steps: "10,000" },
            { n: "1,000,000", steps: "1,000,000" },
          ].map((row) => (
            <div
              key={row.n}
              className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                n = {row.n}
              </p>
              <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                {row.steps} steps
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ───── O(n²) ───── */}
      <div id="common-complexities-quadratic" className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
            <Layers className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            O(n²) — Quadratic Time
          </h3>
        </div>

        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          Nested loops where each element interacts with every other element.
          The steps grow as the <strong className="text-slate-900 dark:text-white">square</strong>{" "}
          of the input — double the data means <strong className="text-slate-900 dark:text-white">four times</strong>{" "}
          the steps.
        </p>

        <Card className="mb-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤝</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Analogy: The handshake problem
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                At a party, everyone shakes hands with everyone else. 5 people = 10 handshakes.
                10 people = 45 handshakes. 100 people = 4,950 handshakes. Each new person must
                greet everyone already there — the growth is explosive.
              </p>
            </div>
          </div>
        </Card>

        <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Examples: Bubble sort, selection sort, checking all pairs
        </p>
        <div className="mb-4">
          <CodeBlock code={ON2_CODE} language="python" />
        </div>

        <h4 className="mb-3 text-lg font-medium text-slate-900 dark:text-white">
          See it happen: Handshake visualization
        </h4>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Click "Add Person" to see how the number of handshakes grows. Watch
          the grid fill up — each new person adds an entire row and column of
          interactions.
        </p>

        <Card className="mb-6">
          <QuadraticViz />
        </Card>
      </div>

      {/* ───── Comparison Graph ───── */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        How they compare
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        This graph shows all four complexities on the same chart. Hover over
        the graph to see exact step counts at different input sizes. Notice how
        the lines diverge dramatically as n grows.
      </p>

      <Card className="mb-6">
        <ComplexityGraphViz />
      </Card>

      <QuickCheck
        question="An algorithm checks every pair in an array (nested loop). With 100 items it runs 10,000 steps. How many steps for 200 items?"
        answer="40,000 steps. Since it's O(n²), doubling the input quadruples the steps: 200² = 40,000. That's the danger of quadratic algorithms — they scale very poorly."
      />
    </motion.div>
  );
}
