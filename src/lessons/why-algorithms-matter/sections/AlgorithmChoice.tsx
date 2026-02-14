import { motion } from "framer-motion";
import { QuickCheck } from "../../../components/shared/QuickCheck";

export function AlgorithmChoice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Algorithm Choice Matters
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        The same data structure with a different algorithm can have completely
        different performance. When searching an <strong className="text-slate-900 dark:text-white">ordered array</strong>:
      </p>
      <ul className="mb-6 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
        <li>With <strong>linear search</strong>: N steps (slow).</li>
        <li>With <strong>binary search</strong>: log₂N steps (fast!).</li>
      </ul>
      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Key insight:</strong> Choosing
        the right algorithm matters as much as choosing the right data structure.
      </p>

      <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        Trade-offs
      </h3>
      <div className="mb-6 overflow-x-auto">
        <table className="min-w-full border border-slate-200 dark:border-slate-700">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <th className="border-r border-slate-200 px-4 py-2 text-left text-slate-900 dark:border-slate-700 dark:text-white">
                Aspect
              </th>
              <th className="border-r border-slate-200 px-4 py-2 text-left text-slate-900 dark:border-slate-700 dark:text-white">
                Regular array
              </th>
              <th className="px-4 py-2 text-left text-slate-900 dark:text-white">
                Ordered array
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="border-r border-slate-200 px-4 py-2 font-medium dark:border-slate-700">
                Insertion
              </td>
              <td className="border-r border-slate-200 px-4 py-2 dark:border-slate-700">
                Faster (1 step at end; N+1 at start)
              </td>
              <td className="px-4 py-2">
                Slower (2N+1 worst case — find position + shift)
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="border-r border-slate-200 px-4 py-2 font-medium dark:border-slate-700">
                Search
              </td>
              <td className="border-r border-slate-200 px-4 py-2 dark:border-slate-700">
                Linear only — up to N steps
              </td>
              <td className="px-4 py-2">
                Binary search — log₂N steps (much faster)
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="border-r border-slate-200 px-4 py-2 font-medium dark:border-slate-700">
                When to use
              </td>
              <td className="border-r border-slate-200 px-4 py-2 dark:border-slate-700">
                Insert often, search rarely
              </td>
              <td className="px-4 py-2">
                Search often, insert rarely; search speed is critical
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        Binary search shows the power of algorithms: by leveraging sorted data,
        we turn a slow operation (linear search) into an extremely fast one.
      </p>

      <QuickCheck
        question="When would you choose an ordered array over a regular array?"
        answer="When you need to search often and insertion order doesn't matter—e.g. a sorted list of IDs you look up repeatedly. The cost of keeping the array sorted (slower inserts) pays off when search speed is critical."
      />
    </motion.div>
  );
}
