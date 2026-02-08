import { motion } from "framer-motion";

export function AlgorithmVsDataStructure() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Algorithm vs. Data Structure
      </h2>

      <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                Aspect
              </th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                Data Structure
              </th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                Algorithm
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            <tr>
              <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">
                Definition
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                A way to <strong>organize and store</strong> data in memory
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                A set of <strong>step-by-step instructions</strong> to solve a
                problem
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">
                Focus
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                <em>What</em> — the organization and layout of data
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                <em>How</em> — the process and logic to achieve a result
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">
                Examples
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                Arrays, Linked Lists, Trees, Hash Tables, Graphs, Stacks, Queues
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                Binary Search, Merge Sort, BFS, DFS, Dijkstra&apos;s
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">
                Analogy
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                A container or filing system (e.g., a bookshelf, folders)
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                A recipe or procedure (e.g., how to find a book, sort items)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        They work together: data structures provide the <em>storage</em>, and
        algorithms define the <em>operations</em> performed on that data. A good
        data structure can make an algorithm faster; a good algorithm can make
        better use of a data structure&apos;s strengths.
      </p>
    </motion.div>
  );
}
