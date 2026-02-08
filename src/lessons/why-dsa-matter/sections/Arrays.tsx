import { motion } from "framer-motion";
import { ArrayReadViz } from "../visualizations/ArrayReadViz";
import { LinearSearchViz } from "../visualizations/LinearSearchViz";
import { ArrayInsertViz } from "../visualizations/ArrayInsertViz";
import { ArrayDeleteViz } from "../visualizations/ArrayDeleteViz";
import { ArraySummaryTable } from "./ArraySummaryTable";
import { Card } from "../../../components/shared/Card";

export function Arrays() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Arrays
      </h2>

      <div id="arrays-read" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Reading
        </h3>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>How it works:</strong> Computer jumps directly to memory
          address. If asked for array[i], the CPU immediately accesses that
          location.
        </p>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>Analogy:</strong> Like raising your right hand—automatic, no
          search needed.
        </p>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>Speed:</strong> Always takes the same amount of
          time, regardless of array size. Arrays allocate contiguous memory.
          Address calculation: base_address + (index × element_size)
        </p>
        <Card className="mb-6">
          <ArrayReadViz />
        </Card>
      </div>

      <div id="arrays-search" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Searching (Linear Search)
        </h3>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>Process:</strong> Check each cell one at a time until finding
          the target value.
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Best case:</strong> Element at index 0 — found immediately
          </li>
          <li>
            <strong>Average case:</strong> Element somewhere in middle — search
            half the array on average
          </li>
          <li>
            <strong>Worst case:</strong> Element at end or not present — must
            check every cell
          </li>
        </ul>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>Key insight:</strong> No way to &quot;jump&quot; to a value
          without checking cells.
        </p>
        <Card className="mb-6">
          <LinearSearchViz />
        </Card>
      </div>

      <div id="arrays-insert" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Insertion
        </h3>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>Location matters:</strong> The number of steps depends on WHERE you insert.
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Best case — Insert at end:</strong> Takes 1 step. Just add
            new element.
          </li>
          <li>
            <strong>Worst case — Insert at beginning:</strong> Takes n+1 steps.
            Must shift all elements right, then insert.
          </li>
        </ul>
        <Card className="mb-6">
          <ArrayInsertViz />
        </Card>
      </div>

      <div id="arrays-delete" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Deletion
        </h3>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>Process:</strong> Remove value at index, then shift remaining
          elements left.
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Best case — Delete at end:</strong> Takes 1 step. No shifts
            needed.
          </li>
          <li>
            <strong>Worst case — Delete at beginning:</strong> Takes n steps.
            Shift all remaining elements left.
          </li>
        </ul>
        <Card className="mb-6">
          <ArrayDeleteViz />
        </Card>
      </div>

      <div className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Summary
        </h3>
        <ArraySummaryTable />
      </div>
    </motion.div>
  );
}
