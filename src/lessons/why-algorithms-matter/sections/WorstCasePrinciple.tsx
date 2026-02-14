import { motion } from "framer-motion";
import { QuickCheck } from "../../../components/shared/QuickCheck";

export function WorstCasePrinciple() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Why Algorithms Matter
      </h2>

      <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        The Worst-Case Principle
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        When measuring algorithm speed, always consider the{" "}
        <strong className="text-slate-900 dark:text-white">worst-case scenario</strong>.
        It provides a reliable measure for comparing algorithms and ensures you
        won&apos;t be surprised when inputs are unlucky.
      </p>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        For example, linear search is described as <strong>N steps</strong> in
        the worst case (element at the end or not present), not 1 step (best
        case: element at the start) or N/2 (average). Using worst case keeps
        comparisons fair and predictable.
      </p>
      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        <strong className="text-slate-900 dark:text-white">Key insight:</strong>{" "}
        Choosing the right algorithm matters as much as choosing the right data
        structure—sometimes even more!
      </p>

      <QuickCheck
        question="Why do we use worst case instead of average case when comparing algorithms?"
        answer="Worst case gives a guaranteed upper bound: we know the algorithm will never do worse than that. Average case depends on assumptions about input and can hide bad behavior on real-world or adversarial inputs."
      />
    </motion.div>
  );
}
