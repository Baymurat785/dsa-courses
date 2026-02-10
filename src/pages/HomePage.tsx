import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/layout/Header";
import { BookOpen, Lock, FileText } from "lucide-react";
import { lessonsData } from "../data/lessons";

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
          transition={{ delay: 0.05 }}
          className="mt-12"
        >
          <Link
            to="/articles"
            className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800/50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
              <FileText className="h-5 w-5" />
            </span>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                DSA Articles
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Short reads on data structures—concepts, analogies, and examples.
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
            Lesson Curriculum
          </h2>
          <ol className="space-y-2">
            {lessonsData.map((lesson, index) => {
              const isAvailable = lesson.available ?? false;
              const content = (
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      {lesson.title}
                    </h3>
                    {!isAvailable && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Coming soon
                      </p>
                    )}
                  </div>
                  {isAvailable ? (
                    <BookOpen className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <Lock className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                </div>
              );

              return (
                <li key={lesson.id}>
                  {isAvailable ? (
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="block transition-opacity hover:opacity-90"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="cursor-not-allowed opacity-75">{content}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.div>
      </main>
    </div>
  );
}
