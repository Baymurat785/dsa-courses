import { motion } from "framer-motion";
import { ArticleLayout } from "../../components/layout/ArticleLayout";
import { Card } from "../../components/shared/Card";
import {
  Cpu,
  ListOrdered,
  Route,
  Lightbulb,
  Search,
  ArrowDownUp,
  BookOpen,
} from "lucide-react";

export function WhatIsAnAlgorithmArticle() {
  return (
    <ArticleLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hero */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            What Is an Algorithm?
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            A step-by-step recipe for solving a problem—and why it’s at the heart of every program.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50">
            <div className="relative w-full" style={{ paddingBottom: "84.94%" }}>
              <iframe
                src="https://tenor.com/embed/23000430"
                title="Algorithm GIF — man with a beard looking at a screen with math equations"
                className="absolute left-0 top-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </header>

        {/* Definition callout */}
        <section className="mb-14">
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 p-6 dark:border-indigo-800/50 dark:bg-indigo-950/30">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              An <strong className="text-slate-900 dark:text-white">algorithm</strong> is
              a clear, finite set of steps that take some input and produce a desired
              output. It’s a recipe: follow the steps in order, and you get a correct
              result every time.
            </p>
          </div>
        </section>

        {/* Real-life analogies */}
        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            You use algorithms every day
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            An algorithm doesn’t have to be code. Any precise procedure that solves a
            problem is an algorithm.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="border-indigo-100 dark:border-indigo-900/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                A recipe
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Ingredients = input. Follow the steps in order. The dish = output.
                Same steps every time give the same result.
              </p>
            </Card>
            <Card className="border-amber-100 dark:border-amber-900/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                <Route className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Directions to a place
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Start and destination are the input. Each turn and street is a step.
                The route is the algorithm; arriving is the output.
              </p>
            </Card>
            <Card className="border-emerald-100 dark:border-emerald-900/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                <ListOrdered className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Washing hands
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Wet hands → soap → scrub → rinse → dry. A fixed sequence that
                anyone can follow and get the same outcome.
              </p>
            </Card>
          </div>
        </section>

        {/* What makes an algorithm */}
        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            What makes something an algorithm?
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            For a procedure to count as an algorithm, it usually has these properties.
          </p>

          <ul className="space-y-4">
            <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                1
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">Clear steps</strong>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Each step is unambiguous. There’s no “maybe do this” without a rule for when.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                2
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">Finite</strong>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  It eventually stops. It doesn’t run forever with no answer.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                3
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">Correct</strong>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  For valid input, it produces the right output (or a defined “no solution”).
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Examples in computing */}
        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            Classic algorithms in computing
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            In programming, the same idea becomes code: input (e.g. a list), steps (compare, move, repeat), output (e.g. sorted list or “found at index 5”).
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="flex flex-row items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Search algorithms
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Linear search: check each item in order. Binary search: repeatedly check the middle and cut the list in half. Same goal—find an item—different number of steps.
                </p>
              </div>
            </Card>
            <Card className="flex flex-row items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                <ArrowDownUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Sorting algorithms
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Bubble sort, merge sort, quicksort—each is a different set of steps to turn an unsorted list into a sorted one. Same input and output, different efficiency.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Why algorithms matter */}
        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            Why algorithms matter
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Two algorithms can solve the same problem but behave very differently in speed and resource use.
          </p>

          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-6 dark:border-emerald-800/50 dark:bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Choosing the right algorithm
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Searching a sorted list with linear search can take millions of steps for a huge list; binary search can find the same item in about 20 steps. The problem is the same—the <em>algorithm</em> makes the difference. That’s why computer scientists study and compare algorithms: to use the one that fits the problem and scales well.
            </p>
          </div>
        </section>

        {/* Algorithm vs code */}
        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            Algorithm vs code
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            An algorithm is the <strong className="text-slate-900 dark:text-white">idea</strong>—the steps. Code is one <strong className="text-slate-900 dark:text-white">implementation</strong> of that idea in a specific language. The same algorithm can be written in Python, JavaScript, or Swift; the logic stays the same.
          </p>
          <Card className="border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Example: “Binary search” is the algorithm (check middle, eliminate half, repeat). The Python or Swift function you write is one way to express that algorithm in code.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Closing */}
        <section className="rounded-2xl border border-slate-200 bg-slate-100/80 p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-center text-lg font-medium text-slate-700 dark:text-slate-300">
            In short, an algorithm is a precise, step-by-step procedure that turns input into output. It’s the “how” behind every program—and learning to design and compare algorithms is what makes software fast and reliable.
          </p>
        </section>
      </motion.div>
    </ArticleLayout>
  );
}
