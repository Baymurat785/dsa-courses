import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/layout/Header";
import { articlesData } from "../data/articles";
import { FileText } from "lucide-react";

export function ArticlesPage() {
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
            DSA Articles
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Short reads on data structures and algorithms—concepts, analogies, and
            real-world examples.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12 space-y-4"
        >
          {articlesData.map((article) => (
            <li key={article.id}>
              <Link
                to={`/articles/${article.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800/50"
              >
                {article.heroUrl && (
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                    <img
                      src={article.heroUrl}
                      alt=""
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                )}
                {!article.heroUrl && (
                  <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {article.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {article.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </motion.ul>
      </main>
    </div>
  );
}
