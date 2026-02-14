import { motion } from "framer-motion";
import { QuickCheck } from "../../../components/shared/QuickCheck";

export function OrderedArrays() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Ordered Arrays
      </h2>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        An <strong className="text-slate-900 dark:text-white">ordered array</strong> is
        an array where elements are always kept in sorted order. For example:{" "}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 dark:bg-slate-700">[3, 17, 80, 202]</code>.
        Inserting 75 gives <code className="rounded bg-slate-200 px-1.5 py-0.5 dark:bg-slate-700">[3, 17, 75, 80, 202]</code>.
      </p>

      <div id="ordered-arrays-read" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Reading
        </h3>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>1 step</strong>—same as regular arrays. Direct access by index
          is unchanged.
        </p>
      </div>

      <div id="ordered-arrays-insert" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Insertion (slower than regular arrays)
        </h3>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Best case — Insert at end:</strong> 1 step.
          </li>
          <li>
            <strong>Worst case:</strong> 2N + 1 steps. Search for the correct
            position: N steps. Shift elements: N steps. Insert value: 1 step.
          </li>
        </ul>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          For 100 elements, a regular array insert at the beginning needs 101
          steps; an ordered array insert in the middle needs 201 steps.
        </p>
      </div>

      <div id="ordered-arrays-delete" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Deletion
        </h3>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>N steps</strong>—same as regular arrays.
        </p>
      </div>

      <div id="ordered-arrays-search" className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Searching
        </h3>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
          Ordered arrays enable <strong className="text-slate-900 dark:text-white">binary search</strong>,
          which we cover next—much faster than linear search.
        </p>
      </div>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Trade-off:</strong> Slower
        insertion, but enables much faster searching.
      </p>

      <QuickCheck
        question="How many steps does it take to insert in the middle of an ordered array of 100 elements (worst case)?"
        answer="201 steps: 100 to find the position (linear scan to find where it fits), 100 to shift elements right, and 1 to write the new value. So 2N + 1 = 201."
      />
    </motion.div>
  );
}
