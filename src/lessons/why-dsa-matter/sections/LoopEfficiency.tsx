import { motion } from "framer-motion";
import { LoopComparisonViz } from "../visualizations/LoopComparisonViz";
import { Card } from "../../../components/shared/Card";

export function LoopEfficiency() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Loop Efficiency & Optimization
      </h2>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Both approaches scale the same way as input grows, but Approach 2 has
        significantly fewer actual operations. Approach 2 is approximately 5×
        faster in practice. This is why optimization matters even when both
        approaches scale the same way.
      </p>
      <Card className="mb-6">
        <LoopComparisonViz />
      </Card>
    </motion.div>
  );
}
