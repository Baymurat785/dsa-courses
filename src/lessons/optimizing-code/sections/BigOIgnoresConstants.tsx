import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";

export function BigOIgnoresConstants() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        Big O Ignores Constants
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        We just saw that Selection Sort takes ~N²/2 steps while Bubble Sort takes
        ~N². So Selection Sort is <em>literally</em> twice as fast. Yet Big O says
        they're both O(N²). Why?
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              The soul of Big O
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Big O doesn't care about the exact number of steps an algorithm takes.
              It cares about the{" "}
              <strong className="text-slate-900 dark:text-white">
                long-term growth trajectory
              </strong>{" "}
              of an algorithm's steps as the data increases.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Big O only keeps the highest-order term
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        When we express Big O, we drop all constants and lower-order terms.
        Here's why:
      </p>

      <div className="mb-6 space-y-3">
        {[
          {
            expression: "N² + 10",
            drops: "+10",
            result: "O(N²)",
            reason: "The +10 becomes irrelevant as N grows",
          },
          {
            expression: "N² / 2",
            drops: "/2",
            result: "O(N²)",
            reason: "Half of quadratic is still quadratic growth",
          },
          {
            expression: "2N",
            drops: "2×",
            result: "O(N)",
            reason: "Double linear is still linear growth",
          },
          {
            expression: "N/2 + 5",
            drops: "/2 and +5",
            result: "O(N)",
            reason: "Still grows proportionally with N",
          },
          {
            expression: "100N",
            drops: "100×",
            result: "O(N)",
            reason: "Even 100× linear is still linear growth!",
          },
        ].map((item) => (
          <div
            key={item.expression}
            className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-700"
          >
            <div className="min-w-[80px] text-center">
              <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                {item.expression}
              </span>
            </div>
            <div className="text-2xl text-slate-400">→</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-sm font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                  {item.result}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  (dropped{" "}
                  <span className="line-through text-red-400">{item.drops}</span>)
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        So why does Selection Sort = O(N²)?
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Selection Sort takes approximately{" "}
        <strong className="text-slate-900 dark:text-white">N²/2</strong> steps. Big O
        drops the "/2" constant, leaving us with{" "}
        <strong className="text-slate-900 dark:text-white">O(N²)</strong>. Same as
        Bubble Sort.
      </p>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        This doesn't mean Selection Sort and Bubble Sort perform identically —
        Selection Sort <em>is</em> faster in practice. It means they{" "}
        <strong className="text-slate-900 dark:text-white">
          grow at the same rate
        </strong>
        . If you double the data, both algorithms roughly quadruple their step
        counts. The constant factor (2x) stays the same regardless of data size.
      </p>

      <Card className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚖️</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Analogy: Two cars on the same road
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Imagine two cars on a highway. One goes 60 mph, the other 120 mph.
              The faster car is always 2x quicker — but they're both on the{" "}
              <em>same highway</em> going in the <em>same direction</em>. Big O
              describes the road (quadratic growth), not the speed on it. What
              matters more is whether you're on a highway (O(N²)) or a rocket
              ship (O(N)).
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        When constants DO matter
      </h3>

      <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
        Big O ignores constants for the purposes of{" "}
        <strong className="text-slate-900 dark:text-white">classification</strong>.
        But when comparing two algorithms in the{" "}
        <em>same</em> Big O class, the constant factor determines which is faster
        in practice. Selection Sort's N²/2 beats Bubble Sort's N² every time —
        just not enough to change its classification.
      </p>

      <QuickCheck
        question="Algorithm A takes 5N steps. Algorithm B takes 300N steps. Do they have the same Big O? Which is faster in practice?"
        answer="Yes, both are O(N) — Big O drops the constants 5 and 300. But Algorithm A is 60x faster in practice (5N vs 300N). Big O tells you the growth category, not the exact speed. Within the same category, constants matter for real-world performance."
      />
    </motion.div>
  );
}
