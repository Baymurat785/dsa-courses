import { motion } from "framer-motion";
import { ArticleLayout } from "../../components/layout/ArticleLayout";
import { Card } from "../../components/shared/Card";
import {
  BookMarked,
  ListTodo,
  GitBranch,
  Smartphone,
  History,
  Music,
  MapPin,
  Rss,
  Zap,
  AlertTriangle,
} from "lucide-react";

const HERO_GIF =
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6a2hyMWV0ZGV3eTVqdnNkeWQxemtrZ2xtdTlqcjI3YWk0MnIyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kVjLD8HO7ubIfSZwFV/giphy.gif";

export function WhatAreDataStructuresArticle() {
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
            What Are Data Structures?
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            The invisible framework behind every app you use—and why it matters.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50">
            <img
              src={HERO_GIF}
              alt="Data and code visualization"
              className="h-auto w-full object-cover"
            />
          </div>
        </header>

        {/* Definition callout */}
        <section className="mb-14">
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 p-6 dark:border-indigo-800/50 dark:bg-indigo-950/30">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              A <strong className="text-slate-900 dark:text-white">data structure</strong> is
              a way of organizing, storing, and managing data so that it can be used
              efficiently. It's the framework behind any software, helping computers
              handle information quickly and logically.
            </p>
          </div>
        </section>

        {/* Analogy section */}
        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            Think of it like real-life storage
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            We choose the right storage for the task—folders for files, drawers for
            utensils. Programmers do the same: they pick the right data structure for
            their program's needs.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="border-indigo-100 dark:border-indigo-900/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                <BookMarked className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Bookshelf → Array
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Each shelf is like an array: every book has a fixed position. You can
                grab the 3rd book without moving the others.
              </p>
            </Card>
            <Card className="border-amber-100 dark:border-amber-900/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                <ListTodo className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                To-do list → Queue
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                You add tasks at the end and complete them from the front. First in,
                first out—classic queue behavior.
              </p>
            </Card>
            <Card className="border-emerald-100 dark:border-emerald-900/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                <GitBranch className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Family tree → Tree
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Each person connects to parents and children. Same idea as a tree:
                one root, many branches and leaves.
              </p>
            </Card>
          </div>
        </section>

        {/* With vs Without */}
        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            Life with and without data structures
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            The difference between a smooth experience and chaos often comes down to
            how data is organized.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  With data structures
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Searching, sorting, and retrieving data are fast and efficient.
                Finding a contact on your phone takes seconds because it uses
                optimized structures like hash tables or trees.
              </p>
            </Card>
            <Card className="border-red-200 bg-red-50/50 dark:border-red-900/30 dark:bg-red-950/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Without data structures
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Everything gets chaotic. If your phone stored every contact in random
                order, you'd scroll endlessly to find one number. Computers would take
                much longer for even simple tasks.
              </p>
            </Card>
          </div>
        </section>

        {/* Everyday applications */}
        <section className="mb-10">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
            You use them every day
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Data structures power the apps and features you use without you noticing.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="flex flex-row items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Contacts list
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Stored and searched using trees or hash tables so lookup is instant.
                </p>
              </div>
            </Card>
            <Card className="flex flex-row items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <History className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Web browsing history
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Managed as a stack—last visited is the first to go back to.
                </p>
              </div>
            </Card>
            <Card className="flex flex-row items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <Music className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Music playlists
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Queues or linked lists play songs in sequence and support skip/next.
                </p>
              </div>
            </Card>
            <Card className="flex flex-row items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Maps & GPS
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Graphs find the shortest path between locations.
                </p>
              </div>
            </Card>
            <Card className="flex flex-row items-start gap-4 sm:col-span-2">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <Rss className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Social media feeds
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Built on heaps or queues to prioritize and sort posts efficiently.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Closing */}
        <section className="rounded-2xl border border-slate-200 bg-slate-100/80 p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-center text-lg font-medium text-slate-700 dark:text-slate-300">
            In short, data structures are the backbone of all digital systems—making
            sure data doesn't just exist, but is useful, fast, and easy to retrieve.
          </p>
        </section>
      </motion.div>
    </ArticleLayout>
  );
}
