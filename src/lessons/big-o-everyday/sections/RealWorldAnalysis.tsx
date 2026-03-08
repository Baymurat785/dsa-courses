import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { CodeBlock } from "../../../components/shared/CodeBlock";
import { QuickCheck } from "../../../components/shared/QuickCheck";

const EXAMPLE_1_SLOW = `# Finding duplicate emails in a signup list
def has_duplicates(emails):
    for i in range(len(emails)):           # O(n)
        for j in range(i + 1, len(emails)):  # O(n)
            if emails[i] == emails[j]:
                return True
    return False
# Total: O(n^2) -- 1 million emails = up to 500 billion comparisons`;

const EXAMPLE_1_FAST = `# Same task, using a set
def has_duplicates(emails):
    seen = set()
    for email in emails:          # O(n)
        if email in seen:         # O(1) set lookup
            return True
        seen.add(email)           # O(1) set add
    return False
# Total: O(n) -- 1 million emails = ~1 million operations`;

const EXAMPLE_2_SLOW = `# Autocomplete: filter suggestions as user types
def get_suggestions(query, all_words):
    results = []
    for word in all_words:                  # O(n)
        if word.startswith(query):
            results.append(word)
    results.sort()                          # O(k log k) where k = matches
    return results[:10]
# Called on every keystroke -- could lag with 100k+ words`;

const EXAMPLE_2_FAST = `# Preprocess once, search fast
# Build a dict mapping each prefix to sorted words
from collections import defaultdict

def build_index(all_words):
    index = defaultdict(list)
    for word in sorted(all_words):          # O(n log n) -- once
        for i in range(1, len(word) + 1):
            index[word[:i]].append(word)
    return index

def get_suggestions(query, index):
    return index.get(query, [])[:10]        # O(1) dict lookup
# Build index once at startup, then every keystroke is O(1)`;

const EXAMPLE_3 = `# What's the Big O of this function?
def process_orders(orders, vip_customers):
    vip_set = set(vip_customers)        # O(m) -- one-time conversion

    total = 0
    for order in orders:                # O(n)
        if order.customer in vip_set:   # O(1) set lookup
            total += order.amount * 1.1
        else:
            total += order.amount

    sorted_orders = sorted(orders, key=lambda o: o.amount)  # O(n log n)

    return total, sorted_orders[:10]

# Line by line:
# set() conversion:  O(m)
# Loop:              O(n) x O(1) = O(n)
# Sort:              O(n log n)
# Total: O(m + n log n)
# If m < n: O(n log n) dominates`;

interface AnalysisStep {
  line: string;
  cost: string;
  note: string;
}

const WALKTHROUGH_STEPS: AnalysisStep[] = [
  { line: "vip_set = set(vip_customers)", cost: "O(m)", note: "Convert list to set -- one-time cost" },
  { line: "for order in orders:", cost: "O(n)", note: "Single loop over all orders" },
  { line: "order.customer in vip_set", cost: "O(1)", note: "Set lookup inside the loop" },
  { line: "sorted(orders, ...)", cost: "O(n log n)", note: "Timsort on n items" },
  { line: "Total", cost: "O(n log n)", note: "Dominant term wins" },
];

export function RealWorldAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Real-World Code Analysis
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Let's apply everything we've learned to real scenarios you'll encounter
        in production code. We'll analyze each example line by line, identify the
        bottleneck, and fix it.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔬</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Code review as a health check-up
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              A doctor doesn't just ask "do you feel okay?" -- they check blood
              pressure, heart rate, and bloodwork. Analyzing Big O is the same:
              you check each part of the code systematically to find hidden
              problems before they cause symptoms (slowness) in production.
            </p>
          </div>
        </div>
      </Card>

      {/* Example 1: Duplicate detection */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Example 1: Duplicate email detection
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        A signup system needs to check if an email is already registered. The
        naive approach compares every pair:
      </p>

      <div className="mb-4">
        <CodeBlock code={EXAMPLE_1_SLOW} language="python" />
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        The fix? Use a set to track what we've already seen:
      </p>

      <div className="mb-6">
        <CodeBlock code={EXAMPLE_1_FAST} language="python" />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/10">
          <p className="text-xs font-bold uppercase text-red-500">Before</p>
          <p className="mt-1 font-mono text-lg font-bold text-red-700 dark:text-red-400">
            O(n^2)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            1M emails = ~500B ops
          </p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 text-center dark:bg-emerald-900/10">
          <p className="text-xs font-bold uppercase text-emerald-500">After</p>
          <p className="mt-1 font-mono text-lg font-bold text-emerald-700 dark:text-emerald-400">
            O(n)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            1M emails = ~1M ops
          </p>
        </div>
      </div>

      {/* Example 2: Autocomplete */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Example 2: Autocomplete suggestions
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        An autocomplete feature filters and sorts a word list on every
        keystroke. Scanning the full list each time is wasteful:
      </p>

      <div className="mb-4">
        <CodeBlock code={EXAMPLE_2_SLOW} language="python" />
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        The key insight: <strong className="text-slate-900 dark:text-white">precompute once, query many times</strong>.
        Build an index at startup so every keystroke is instant:
      </p>

      <div className="mb-6">
        <CodeBlock code={EXAMPLE_2_FAST} language="python" />
      </div>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Pattern: Precomputation
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              When code runs repeatedly with the same data, do the expensive
              work once upfront. Trade one-time O(n log n) setup for O(1)
              per query. This is the idea behind indexes in databases too.
            </p>
          </div>
        </div>
      </Card>

      {/* Example 3: Line-by-line walkthrough */}
      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Example 3: Full walkthrough
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Let's analyze a more realistic function step by step:
      </p>

      <div className="mb-4">
        <CodeBlock code={EXAMPLE_3} language="python" />
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-300">
                Line
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-300">
                Cost
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-300">
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {WALKTHROUGH_STEPS.map((step, i) => (
              <tr
                key={step.line}
                className={
                  i === WALKTHROUGH_STEPS.length - 1
                    ? "bg-indigo-50 font-medium dark:bg-indigo-900/20"
                    : i % 2 === 0
                      ? "bg-white dark:bg-slate-900"
                      : "bg-slate-50/50 dark:bg-slate-800/50"
                }
              >
                <td className="px-4 py-2">
                  <code className="text-xs text-slate-700 dark:text-slate-300">
                    {step.line}
                  </code>
                </td>
                <td className="px-4 py-2">
                  <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                    {step.cost}
                  </code>
                </td>
                <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                  {step.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickCheck
        question="A function reads all rows from a database (n rows), converts them to a set (O(n)), loops through a second list (m items) checking set membership, then sorts the results. What's the total Big O?"
        answer="O(n + m + k log k) where k is the number of matches. The set conversion is O(n), the loop is O(m) with O(1) lookups, and sorting the results is O(k log k). If k could be as large as m, and m ~ n, this simplifies to O(n log n)."
      />
    </motion.div>
  );
}
