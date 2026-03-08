import { motion } from "framer-motion";
import { Card } from "../../../components/shared/Card";
import { QuickCheck } from "../../../components/shared/QuickCheck";
import { Gauge, MapPin, Clock } from "lucide-react";

export function WhatIsBigO() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        What is Big O?
      </h2>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        In the previous lessons, we saw that choosing the right algorithm matters.
        Binary search crushed linear search on large arrays. But how do we{" "}
        <strong className="text-slate-900 dark:text-white">formally describe</strong>{" "}
        how fast an algorithm is? That's where <strong className="text-slate-900 dark:text-white">Big O notation</strong> comes in.
      </p>

      <Card className="mb-8">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-indigo-100 p-3 dark:bg-indigo-900/30">
            <Gauge className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h4 className="mb-1 font-semibold text-slate-900 dark:text-white">
              Big O in one sentence
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              Big O notation tells you{" "}
              <strong className="text-slate-900 dark:text-white">
                how the number of steps grows
              </strong>{" "}
              as the input size increases. It's the language computer scientists
              use to compare algorithms.
            </p>
          </div>
        </div>
      </Card>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        The road trip analogy
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Imagine someone asks: "How long is the drive from New York to Boston?"
      </p>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Too specific
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                "3 hours, 47 minutes, and 12 seconds" — depends on traffic,
                speed, the car, weather...
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Just right
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                "About 4 hours" — captures the general scale without getting
                bogged down in details.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Big O is like saying "about 4 hours." It doesn't give you the exact
        number of steps — it gives you the{" "}
        <strong className="text-slate-900 dark:text-white">shape of growth</strong>.
        Does the time double when you double the input? Does it barely change?
        Does it explode? That's what Big O captures.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Why not just measure time?
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        You might think: "Just time the code with a stopwatch!" But that
        doesn't work because:
      </p>

      <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-300">
        <li>
          A fast computer finishes quicker than a slow one — same algorithm,
          different times.
        </li>
        <li>
          Background processes, memory, and CPU load all affect timing.
        </li>
        <li>
          We need a way to compare algorithms{" "}
          <strong className="text-slate-900 dark:text-white">
            regardless of hardware
          </strong>.
        </li>
      </ul>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Instead, we count the{" "}
        <strong className="text-slate-900 dark:text-white">
          number of operations
        </strong>{" "}
        an algorithm performs relative to the input size. This gives us a
        hardware-independent measure of efficiency.
      </p>

      <h3 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
        Reading Big O
      </h3>

      <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
        Big O is written as <code className="rounded bg-slate-200 px-1.5 py-0.5 dark:bg-slate-700">O(something)</code>,
        where "something" describes how the step count grows. Here are some
        examples you'll learn in this lesson:
      </p>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">
                Notation
              </th>
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">
                Name
              </th>
              <th className="py-2 font-semibold text-slate-900 dark:text-white">
                Plain English
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-mono">O(1)</td>
              <td className="py-2 pr-4">Constant</td>
              <td className="py-2">Same speed no matter the size</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-mono">O(log n)</td>
              <td className="py-2 pr-4">Logarithmic</td>
              <td className="py-2">Doubling input adds one step</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-mono">O(n)</td>
              <td className="py-2 pr-4">Linear</td>
              <td className="py-2">Double input = double steps</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono">O(n²)</td>
              <td className="py-2 pr-4">Quadratic</td>
              <td className="py-2">Double input = 4x the steps</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          Video: Big O Notation explained visually
        </p>
        <div
          className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            src="https://www.youtube.com/embed/D6xkbGLQesk"
            title="Introduction to Big O Notation (CS Dojo)"
            className="absolute left-0 top-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <QuickCheck
        question="If an algorithm takes 5 steps for 10 items and 5 steps for 1,000,000 items, what's its Big O?"
        answer="O(1) — constant time. The number of steps doesn't change regardless of input size. Think of it like grabbing your wallet from your pocket — whether you have $1 or $1,000 inside, the grab takes the same effort."
      />
    </motion.div>
  );
}
