import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { Check, X } from "lucide-react";

interface ChecklistItem {
  question: string;
  action: string;
  example: string;
}

const CHECKLIST: ChecklistItem[] = [
  {
    question: "Are there nested loops over the same data?",
    action: "Try a set or dictionary to eliminate the inner loop.",
    example: "for x in arr: if x in arr2 -> convert arr2 to a set first",
  },
  {
    question: "Am I calling an O(n) operation inside a loop?",
    action: "Check the built-in cost table. Replace list lookups with set/dict lookups.",
    example: "list.remove(x) in a loop -> use a set, or filter with a list comprehension",
  },
  {
    question: "Am I sorting inside a loop?",
    action: "Sort once before the loop, or use a heap/priority queue.",
    example: "for item in data: sorted(data) -> sort once, iterate the sorted result",
  },
  {
    question: "Am I building a string with += in a loop?",
    action: "Collect parts in a list, then join once at the end.",
    example: "result += s -> parts.append(s); result = ''.join(parts)",
  },
  {
    question: "Am I recomputing the same thing repeatedly?",
    action: "Precompute once and store the result (caching / memoization).",
    example: "Recalculating totals every request -> compute once at startup or on data change",
  },
  {
    question: "Can I exit early?",
    action: "Add early returns for cases where you already have the answer.",
    example: "Searching for one item -> return as soon as found, don't scan the rest",
  },
];

interface MistakeItem {
  myth: string;
  reality: string;
}

const COMMON_MISTAKES: MistakeItem[] = [
  {
    myth: "Optimizing code that runs once at startup",
    reality: "Focus on hot paths -- code that runs per request, per user, or per frame.",
  },
  {
    myth: "Choosing O(1) when n is always small (< 100)",
    reality: "For tiny inputs, simplicity beats cleverness. A list scan of 50 items is instant.",
  },
  {
    myth: "Adding a cache before measuring",
    reality: "Profile first. The bottleneck might not be where you think.",
  },
  {
    myth: "Rewriting everything in a 'faster' language",
    reality: "An O(n^2) algorithm in C is still slower than O(n) in Python for large n.",
  },
];

export function OptimizationChecklist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Your Optimization Checklist
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Before shipping code that handles more than trivial amounts of data, run
        through this checklist. It catches the most common performance problems.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🧰</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Pre-flight checklist
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Pilots don't memorize every check -- they use a checklist every
              single time. Even experienced developers benefit from a systematic
              review. Most performance bugs come from forgetting the basics, not
              from exotic edge cases.
            </p>
          </div>
        </div>
      </Card>

      {/* The checklist */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The 6-point check
      </h3>

      <div className="mb-8 space-y-3">
        {CHECKLIST.map((item, i) => (
          <div
            key={item.question}
            className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {item.question}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {item.action}
                </p>
                <code className="mt-2 block rounded bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {item.example}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* When NOT to optimize */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        When NOT to optimize
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Optimization has a cost: complexity. Not every piece of code needs to be
        optimal. Here are common mistakes:
      </p>

      <div className="mb-8 space-y-2">
        {COMMON_MISTAKES.map((item) => (
          <div
            key={item.myth}
            className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50"
          >
            <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {item.myth}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {item.reality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Decision framework */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The optimization decision
      </h3>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-500" />
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              Optimize when...
            </p>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
            <li>Data will grow (users, records, files)</li>
            <li>Code runs in a hot loop (per request/frame)</li>
            <li>You've measured and confirmed the bottleneck</li>
            <li>The fix is simple (set instead of list)</li>
          </ul>
        </Card>
        <Card>
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 text-red-500" />
            <p className="font-medium text-red-700 dark:text-red-400">
              Don't optimize when...
            </p>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
            <li>Input size is always small (&lt; 100)</li>
            <li>Code runs once (startup, migration)</li>
            <li>You haven't profiled yet</li>
            <li>The optimization hurts readability for tiny gains</li>
          </ul>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📏</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              The golden rule
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">
                Make it work, make it right, make it fast
              </strong>{" "}
              -- in that order. Get correct code first, then clean it up, then
              optimize the parts that matter. Premature optimization is the root
              of all evil (Donald Knuth).
            </p>
          </div>
        </div>
      </Card>

      <QuickCheck
        question="Your teammate wants to replace a list with a hash map in a script that processes 20 CSV rows once a month. Should they?"
        answer="Probably not. With only 20 items running once a month, the performance difference is negligible (microseconds). The list version is likely simpler and more readable. Optimize only when data is large or code runs frequently."
      />
    </motion.div>
  );
}
