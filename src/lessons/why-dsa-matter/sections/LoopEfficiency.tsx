import { motion } from "framer-motion";
import { LoopComparisonViz } from "../visualizations/LoopComparisonViz";
import { LoopFlowchartViz } from "../visualizations/LoopFlowchartViz";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";

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
        Before comparing approaches, step through how a for loop executes:
      </p>
      <Card className="mb-6">
        <LoopFlowchartViz />
      </Card>
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Compare the two approaches below:
      </p>
      <Card className="mb-6">
        <LoopComparisonViz />
      </Card>
      <QuickCheck
        question="Try it: Run both approaches in the visualization above. Notice Approach 2 does fewer operations even though both are O(n)."
        answer="Both scale linearly with input size, but Approach 2 avoids redundant work — a practical optimization that matters in real code."
      />
    </motion.div>
  );
}
