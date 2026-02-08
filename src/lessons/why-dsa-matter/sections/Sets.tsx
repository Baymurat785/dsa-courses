import { motion } from "framer-motion";
import { SetInsertViz } from "../visualizations/SetInsertViz";
import { Card } from "../../../components/shared/Card";

export function Sets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Set
      </h2>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        A set does not allow duplicate values. If you try to add a value that
        already exists, the computer rejects it.
      </p>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong>Reading, Searching, Deletion:</strong> Same as arrays (no
        change).
      </p>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong>Insertion:</strong> Before actually inserting, the set must
        verify the value doesn&apos;t already exist. Formula: Insertion in set
        = 2n + 1 (search for duplicates + shift elements + insert). For n = 100:
        Array worst case = 101 steps, Set worst case = 201 steps. Set is 2×
        slower for insertion.
      </p>
      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong>When to use sets:</strong> Data must be unique (no duplicates
        allowed), e.g., list of unique usernames.
      </p>
      <Card className="mb-6">
        <SetInsertViz />
      </Card>
    </motion.div>
  );
}
