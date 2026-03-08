import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { StepCounterViz } from "../visualizations/StepCounterViz";

const LINEAR_EXAMPLE = `def find_max(arr):
    maximum = arr[0]       # 1 step
    for item in arr:       # n steps (one per element)
        if item > maximum: # 1 comparison each
            maximum = item # at most 1 assignment each
    return maximum         # 1 step
# Total: roughly n steps → O(n)`;

const QUADRATIC_EXAMPLE = `def has_duplicates(arr):
    for i in range(len(arr)):         # n iterations
        for j in range(i+1, len(arr)):  # up to n iterations each
            if arr[i] == arr[j]:      # 1 comparison
                return True
    return False
# Total: roughly n × n = n² steps → O(n²)`;

export function CountingSteps() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Counting Steps
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        To figure out an algorithm's Big O, we count{" "}
        <strong className="text-slate-900 dark:text-white">
          how many operations
        </strong>{" "}
        it performs as a function of the input size{" "}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 dark:bg-slate-700">
          n
        </code>
        . Let's practice.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Example 1: Finding the maximum — O(n)
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        To find the largest number in an array, you must look at every element
        at least once. There's no shortcut — what if the last element is the biggest?
      </p>

      <div className="mb-6">
        <CodeBlock code={LINEAR_EXAMPLE} language="python" />
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Analogy — Roll call:</strong>{" "}
        A teacher calling every student's name for attendance. 20 students = 20 names called.
        40 students = 40 names. You must touch every element exactly once. Double the class size,
        double the time.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Example 2: Checking for duplicates — O(n²)
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Comparing every element with every other element creates a nested loop.
        The outer loop runs n times, and for each iteration, the inner loop
        runs up to n times.
      </p>

      <div className="mb-6">
        <CodeBlock code={QUADRATIC_EXAMPLE} language="python" />
      </div>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Analogy — The handshake problem:</strong>{" "}
        At a party of n people, everyone shakes hands with everyone else. 5 people = 10 handshakes.
        10 people = 45 handshakes. 100 people = 4,950 handshakes. The growth is dramatic because
        each new person must shake hands with all existing people.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Try it: Step counter
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Use the slider below to change the input size and watch how the number
        of steps changes for different algorithms. Notice how O(n²) explodes
        while O(1) stays flat.
      </p>

      <Card className="mb-6">
        <StepCounterViz />
      </Card>

      <QuickCheck
        question="A function has one loop that runs n times, followed by (not inside) another loop that also runs n times. What is its Big O?"
        answer="O(n) — not O(n²). The loops are sequential (one after another), not nested. Total steps: n + n = 2n, which simplifies to O(n). It would only be O(n²) if one loop were inside the other."
      />
    </motion.div>
  );
}
