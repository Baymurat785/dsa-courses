import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/shared/Button";
import { BookOpen, Search } from "lucide-react";

const RANDOM_BOOKS = ["H", "C", "A", "G", "B", "F", "E", "D"];
const SORTED_BOOKS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function BookshelfViz() {
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const [target, setTarget] = useState<string>("");
  const [stepCount, setStepCount] = useState<{ random: number; sorted: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedRandom, setHighlightedRandom] = useState<number>(-1);
  const [highlightedSorted, setHighlightedSorted] = useState<number>(-1);
  const [foundRandom, setFoundRandom] = useState(false);
  const [foundSorted, setFoundSorted] = useState(false);

  const runDemo = () => {
    const book = target.toUpperCase().trim();
    if (!book || !/[A-H]/.test(book)) return;

    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];

    setIsAnimating(true);
    setFoundRandom(false);
    setFoundSorted(false);
    setStepCount(null);
    setHighlightedRandom(-1);
    setHighlightedSorted(-1);

    // Linear search on random shelf
    const randomIndex = RANDOM_BOOKS.indexOf(book);
    let randomSteps = 0;
    const randomInterval = setInterval(() => {
      randomSteps++;
      setHighlightedRandom(randomSteps - 1);
      if (randomSteps - 1 === randomIndex) {
        clearInterval(randomInterval);
        setFoundRandom(true);
      } else if (randomSteps >= RANDOM_BOOKS.length) {
        clearInterval(randomInterval);
      }
    }, 400);
    intervalsRef.current.push(randomInterval);

    // Binary search on sorted shelf
    let low = 0;
    let high = SORTED_BOOKS.length - 1;
    let sortedSteps = 0;
    const sortedChecks: number[] = [];

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      sortedChecks.push(mid);
      sortedSteps++;
      if (SORTED_BOOKS[mid] === book) break;
      if (SORTED_BOOKS[mid] < book) low = mid + 1;
      else high = mid - 1;
    }

    let sortedIdx = 0;
    const sortedInterval = setInterval(() => {
      setHighlightedSorted(sortedChecks[sortedIdx]);
      sortedIdx++;
      if (sortedIdx >= sortedChecks.length) {
        clearInterval(sortedInterval);
        setFoundSorted(true);
        setStepCount({ random: randomIndex + 1, sorted: sortedSteps });
        setTimeout(() => setIsAnimating(false), 300);
      }
    }, 600);
    intervalsRef.current.push(sortedInterval);
  };

  const reset = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    setTarget("");
    setStepCount(null);
    setHighlightedRandom(-1);
    setHighlightedSorted(-1);
    setFoundRandom(false);
    setFoundSorted(false);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        The <strong>shelf layout</strong> (data structure) determines which{" "}
        <strong>search strategy</strong> (algorithm) you can use. Find a book to
        see the difference.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value.toUpperCase().slice(0, 1))}
            placeholder="Find book (A–H)"
            maxLength={1}
            className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-center text-lg font-semibold uppercase dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            disabled={isAnimating}
          />
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={runDemo}
          disabled={!target || isAnimating}
        >
          <Search className="mr-1.5 h-4 w-4" />
          Find
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Random shelf */}
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Random order (poor structure)
            </span>
            {stepCount && (
              <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-800 dark:text-amber-100">
                {stepCount.random} steps
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {RANDOM_BOOKS.map((letter, i) => (
              <motion.div
                key={`r-${i}`}
                layout
                animate={{
                  scale: highlightedRandom === i ? 1.08 : 1,
                  opacity: highlightedRandom > i && !foundRandom ? 0.6 : 1,
                }}
                className={`flex h-10 w-9 items-center justify-center rounded border-2 text-sm font-bold shadow-sm transition-colors ${
                  foundRandom && highlightedRandom === i
                    ? "border-green-600 bg-green-100 text-green-800 dark:border-green-500 dark:bg-green-900/40 dark:text-green-200"
                    : highlightedRandom === i
                      ? "border-amber-600 bg-amber-200 text-amber-900 dark:border-amber-500 dark:bg-amber-800 dark:text-amber-100"
                      : "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                }`}
              >
                {letter}
              </motion.div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Must check one by one (linear search)
          </p>
        </div>

        {/* Sorted shelf */}
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              Sorted A–Z (good structure)
            </span>
            {stepCount && (
              <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs font-bold text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100">
                {stepCount.sorted} steps
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SORTED_BOOKS.map((letter, i) => (
              <motion.div
                key={`s-${i}`}
                layout
                animate={{
                  scale: highlightedSorted === i ? 1.08 : 1,
                  opacity:
                    highlightedSorted >= 0 &&
                    highlightedSorted !== i &&
                    !(foundSorted && highlightedSorted === i)
                      ? 0.7
                      : 1,
                }}
                className={`flex h-10 w-9 items-center justify-center rounded border-2 text-sm font-bold shadow-sm transition-colors ${
                  foundSorted && highlightedSorted === i
                    ? "border-green-600 bg-green-100 text-green-800 dark:border-green-500 dark:bg-green-900/40 dark:text-green-200"
                    : highlightedSorted === i
                      ? "border-emerald-600 bg-emerald-200 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-800 dark:text-emerald-100"
                      : "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200"
                }`}
              >
                {letter}
              </motion.div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Can use binary search — jump to middle, eliminate half
          </p>
        </div>
      </div>

      {stepCount && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-slate-200 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Same goal (find &quot;{target}&quot;), different effort. The sorted
            structure enables a smarter algorithm — fewer steps to reach the
            same result.
          </p>
        </motion.div>
      )}
    </div>
  );
}
