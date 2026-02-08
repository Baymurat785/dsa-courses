import { motion } from "framer-motion";

export function Intro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Why Data Structures Matter
      </h2>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        All data structures support four basic operations:
      </p>
      <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-300">
        <li>
          <strong className="text-slate-900 dark:text-white">Read:</strong>{" "}
          Access a value at a specific location
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">Search:</strong>{" "}
          Find a value within the structure
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">Insert:</strong>{" "}
          Add a new value
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">Delete:</strong>{" "}
          Remove a value
        </li>
      </ul>
      <p className="leading-relaxed text-slate-600 dark:text-slate-300">
        Understanding how many steps each operation takes for different
        structures is critical for choosing appropriate data structures.
      </p>
    </motion.div>
  );
}
