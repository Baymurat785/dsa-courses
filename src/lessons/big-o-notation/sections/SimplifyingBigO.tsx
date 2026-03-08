import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { Scissors, ArrowRight } from "lucide-react";

const SIMPLIFICATION_EXAMPLES: {
  before: string;
  after: string;
  rule: string;
  why: string;
}[] = [
  {
    before: "O(2n)",
    after: "O(n)",
    rule: "Drop constants",
    why: "2× doesn't change the shape — it's still linear growth",
  },
  {
    before: "O(500)",
    after: "O(1)",
    rule: "Drop constants",
    why: "500 is still a fixed number — it doesn't grow with n",
  },
  {
    before: "O(n² + n)",
    after: "O(n²)",
    rule: "Drop non-dominant",
    why: "When n = 1000, n² = 1,000,000 while n = 1,000 — n is insignificant",
  },
  {
    before: "O(n + log n)",
    after: "O(n)",
    rule: "Drop non-dominant",
    why: "log n grows much slower than n, so n dominates",
  },
  {
    before: "O(n³ + n² + n)",
    after: "O(n³)",
    rule: "Drop non-dominant",
    why: "n³ dwarfs both n² and n at large inputs",
  },
  {
    before: "O(3n² + 7n + 42)",
    after: "O(n²)",
    rule: "Both rules",
    why: "Drop constant 3, drop lower terms 7n and 42",
  },
];

const MULTI_STEP_CODE = `def process(arr):
    # Step 1: Print all elements — O(n)
    for item in arr:
        print(item)

    # Step 2: Check all pairs — O(n²)
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] == arr[j]:
                print("Duplicate!", arr[i])

# Total: O(n) + O(n²) = O(n²)
# The n² dominates, so the whole function is O(n²)`;

export function SimplifyingBigO() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Simplifying Big O
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Big O isn't about precision — it's about{" "}
        <strong className="text-slate-900 dark:text-white">the shape of growth</strong>.
        Two simple rules let you simplify any expression down to its essence.
      </p>

      {/* Rule 1 */}
      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-violet-100 p-2 dark:bg-violet-900/30">
            <Scissors className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Rule 1: Drop the constants
            </h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              O(2n) becomes O(n). O(½n²) becomes O(n²). Constants are multipliers
              — they don't change <em>how fast</em> an algorithm grows, only the
              starting point. At massive scale, 2n and n look the same.
            </p>
          </div>
        </div>
      </Card>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Analogy:</strong>{" "}
        Imagine two runners. One runs at 10 mph, the other at 20 mph. They're
        both running in a straight line (linear). The 20 mph runner is faster,
        but they're both doing the same <em>type</em> of movement. Big O cares
        about the type, not the speed.
      </p>

      {/* Rule 2 */}
      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-violet-100 p-2 dark:bg-violet-900/30">
            <Scissors className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Rule 2: Drop the non-dominant terms
            </h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              O(n² + n) becomes O(n²). When n is large, n² is so much bigger
              than n that adding n is meaningless. Keep only the{" "}
              <em>fastest-growing</em> term.
            </p>
          </div>
        </div>
      </Card>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Analogy:</strong>{" "}
        If you're calculating the cost of buying a house ($500,000), you
        don't worry about the price of a coffee ($5) on the way to the bank.
        The coffee cost exists, but it's irrelevant compared to the dominant cost.
      </p>

      {/* Simplification table */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Simplification practice
      </h3>

      <div className="mb-6 overflow-x-auto">
        <div className="space-y-2">
          {SIMPLIFICATION_EXAMPLES.map((ex) => (
            <motion.div
              key={ex.before}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <code className="rounded bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {ex.before}
              </code>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              <code className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {ex.after}
              </code>
              <span className="ml-auto rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {ex.rule}
              </span>
              <p className="w-full text-xs text-slate-500 dark:text-slate-400">
                {ex.why}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Multi-step example */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Putting it together
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Real functions often have multiple parts. Add up the complexities, then
        simplify. The dominant term wins.
      </p>

      <div className="mb-6">
        <CodeBlock code={MULTI_STEP_CODE} language="python" />
      </div>

      {/* Common traps */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Common traps to avoid
      </h3>

      <div className="mb-6 space-y-3">
        <Card>
          <p className="font-medium text-red-600 dark:text-red-400">
            Trap: "Two nested loops always mean O(n²)"
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Only if both loops scale with n. If the inner loop runs a fixed
            number of times (say, 5), it's still O(n).
          </p>
        </Card>
        <Card>
          <p className="font-medium text-red-600 dark:text-red-400">
            Trap: "Lower Big O always means faster"
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Not for small inputs. An O(n²) algorithm with tiny constants can be
            faster than an O(n log n) algorithm for small arrays. Big O describes
            behavior <em>at scale</em>.
          </p>
        </Card>
        <Card>
          <p className="font-medium text-red-600 dark:text-red-400">
            Trap: "Big O tells you exact time"
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Big O describes <em>how time grows</em>, not the actual time. An O(1)
            operation could take 10 seconds if the constant is huge. It just
            means it takes the same 10 seconds regardless of input size.
          </p>
        </Card>
      </div>

      <QuickCheck
        question="Simplify this: O(5n³ + 100n² + 3n + 999). What's the Big O?"
        answer="O(n³). First, drop the constants: 5n³ becomes n³, 100n² becomes n², etc. Then keep only the dominant term: n³ grows fastest, so everything else is irrelevant. The 999 is just a constant — it doesn't grow at all."
      />
    </motion.div>
  );
}
