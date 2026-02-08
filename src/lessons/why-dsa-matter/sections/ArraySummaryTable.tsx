import { motion } from "framer-motion";

const ROWS = [
  { op: "Read/Access", best: "Same time", avg: "Same time", worst: "Same time" },
  { op: "Search", best: "1 step", avg: "n/2 steps", worst: "n steps" },
  { op: "Insertion", best: "1 step", avg: "n/2 steps", worst: "n+1 steps" },
  { op: "Deletion", best: "1 step", avg: "n/2 steps", worst: "n steps" },
];

export function ArraySummaryTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
            <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
              Operation
            </th>
            <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
              Best Case
            </th>
            <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
              Average Case
            </th>
            <th className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
              Worst Case
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <motion.tr
              key={row.op}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                {row.op}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {row.best}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {row.avg}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {row.worst}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
