import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { ArrowRight } from "lucide-react";

const PATTERN_SINGLE = `# Pattern: Single loop → O(n)
def print_all(arr):
    for item in arr:
        print(item)`;

const PATTERN_CONSECUTIVE = `# Pattern: Consecutive loops → O(n)
def process(arr):
    for item in arr:       # O(n)
        print(item)

    for item in arr:       # O(n)
        print(item * 2)

# O(n) + O(n) = O(2n) = O(n)
# Consecutive loops ADD — they don't multiply`;

const PATTERN_NESTED = `# Pattern: Nested loops → O(n²)
def print_pairs(arr):
    for i in arr:          # O(n)
        for j in arr:      # O(n) for EACH i
            print(i, j)

# n × n = O(n²)
# Nested loops MULTIPLY`;

const PATTERN_HALF = `# Pattern: Loop that halves → O(log n)
def mystery(n):
    i = n
    while i > 1:
        print(i)
        i = i // 2       # Halving each time

# n=16: 16→8→4→2→1 = 4 steps
# n=32: 32→16→8→4→2→1 = 5 steps
# Doubling n adds just 1 step → O(log n)`;

const PATTERN_LOOP_IN_FUNC = `# Pattern: Loop calling a function with a loop → O(n²)
def contains(arr, target):
    for item in arr:       # O(n)
        if item == target:
            return True
    return False

def has_common(arr1, arr2):
    for item in arr1:              # O(n)
        if contains(arr2, item):   # O(n) hidden inside!
            return True
    return False
# Total: O(n) × O(n) = O(n²)`;

interface PatternCardProps {
  label: string;
  bigO: string;
  color: string;
  rule: string;
}

function PatternBadge({ label, bigO, color, rule }: PatternCardProps) {
  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <p className="font-medium text-slate-900 dark:text-white">{label}</p>
        <code className="rounded bg-white/60 px-2 py-0.5 text-sm font-bold dark:bg-black/20">
          {bigO}
        </code>
      </div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{rule}</p>
    </div>
  );
}

export function CommonPatterns() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Common Code Patterns
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        You don't need to re-derive Big O every time. Most code falls into a
        handful of recognizable patterns. Learn these and you can analyze
        almost any function at a glance.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🧩</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Reading sheet music
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Musicians don't analyze every single note — they recognize patterns
              like scales, chords, and arpeggios. Programmers do the same with Big O:
              you learn to spot common patterns and instantly know the complexity.
            </p>
          </div>
        </div>
      </Card>

      {/* Pattern overview */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        <PatternBadge
          label="Single loop"
          bigO="O(n)"
          color="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20"
          rule="Touch each element once"
        />
        <PatternBadge
          label="Consecutive loops"
          bigO="O(n)"
          color="border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-900/20"
          rule="Add complexities → keep the largest"
        />
        <PatternBadge
          label="Nested loops"
          bigO="O(n²)"
          color="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
          rule="Multiply complexities"
        />
        <PatternBadge
          label="Halving loop"
          bigO="O(log n)"
          color="border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-900/20"
          rule="Each step eliminates half"
        />
      </div>

      {/* Pattern 1 */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Pattern 1: Single loop
      </h3>
      <div className="mb-6">
        <CodeBlock code={PATTERN_SINGLE} language="python" />
      </div>

      {/* Pattern 2 */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Pattern 2: Consecutive loops (the addition rule)
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Loops that run <strong className="text-slate-900 dark:text-white">one after another</strong>{" "}
        (not inside each other) are <em>added</em>. O(n) + O(n) = O(2n) = O(n).
      </p>
      <div className="mb-6">
        <CodeBlock code={PATTERN_CONSECUTIVE} language="python" />
      </div>

      {/* Pattern 3 */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Pattern 3: Nested loops (the multiplication rule)
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        A loop <strong className="text-slate-900 dark:text-white">inside</strong> another loop{" "}
        <em>multiplies</em>. Each iteration of the outer loop triggers a full
        run of the inner loop.
      </p>
      <div className="mb-6">
        <CodeBlock code={PATTERN_NESTED} language="python" />
      </div>

      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="rounded-lg bg-emerald-100 px-4 py-2 text-center dark:bg-emerald-900/20">
          <p className="text-xs text-slate-500 dark:text-slate-400">Consecutive</p>
          <p className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
            O(a) + O(b)
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-slate-400" />
        <div className="rounded-lg bg-red-100 px-4 py-2 text-center dark:bg-red-900/20">
          <p className="text-xs text-slate-500 dark:text-slate-400">Nested</p>
          <p className="font-mono font-bold text-red-700 dark:text-red-400">
            O(a) × O(b)
          </p>
        </div>
      </div>

      {/* Pattern 4 */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Pattern 4: Halving loop
      </h3>
      <div className="mb-6">
        <CodeBlock code={PATTERN_HALF} language="python" />
      </div>

      {/* Pattern 5 */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Pattern 5: Loop calling a function (hidden nesting)
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        This is the sneakiest pattern. The nested loop is hidden inside a
        function call, making it look like a single loop.
      </p>
      <div className="mb-6">
        <CodeBlock code={PATTERN_LOOP_IN_FUNC} language="python" />
      </div>

      <QuickCheck
        question="A function has 3 consecutive loops (not nested): one runs n times, one runs n² times, and one runs n times. What's the total Big O?"
        answer="O(n²). Add them up: O(n) + O(n²) + O(n) = O(n² + 2n). Drop the non-dominant term: O(n²). The n² loop dominates."
      />
    </motion.div>
  );
}
