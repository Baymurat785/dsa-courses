import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/layout/Header";
import { BookOpen } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Learn Data Structures & Algorithms
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Interactive lessons with animations for better understanding.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12"
        >
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Lessons
          </h2>
          <Link
            to="/lessons/why-dsa-matter"
            className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Why DSA Matter?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Arrays, Sets, and Loop Efficiency
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
