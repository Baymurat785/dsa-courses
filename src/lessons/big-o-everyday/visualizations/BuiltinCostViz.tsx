import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BuiltinOp {
  category: string;
  ops: {
    name: string;
    bigO: string;
    color: string;
    why: string;
  }[];
}

const DATA: BuiltinOp[] = [
  {
    category: "List / Array",
    ops: [
      { name: "arr[i]", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Direct memory access by index — jump straight to the address." },
      { name: "arr.append(x)", bigO: "O(1)*", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Adds to the end. Amortized O(1) — occasionally resizes (O(n)), but averaged over many appends it's constant." },
      { name: "arr.pop()", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Removes from the end — no shifting needed." },
      { name: "arr.pop(0)", bigO: "O(n)", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", why: "Removes from the beginning — every element must shift left by one position." },
      { name: "arr.insert(0, x)", bigO: "O(n)", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", why: "Inserts at the beginning — every element must shift right." },
      { name: "x in arr", bigO: "O(n)", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", why: "Must scan the entire list to check if x exists. No shortcut." },
      { name: "arr.sort()", bigO: "O(n log n)", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", why: "Uses Timsort — an optimized merge sort / insertion sort hybrid." },
      { name: "arr.copy()", bigO: "O(n)", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", why: "Must copy every element to a new list." },
    ],
  },
  {
    category: "Set",
    ops: [
      { name: "x in set", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Hash lookup — computes hash of x and jumps to the bucket. Average O(1)." },
      { name: "set.add(x)", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Hash and insert into bucket — constant time on average." },
      { name: "set.remove(x)", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Hash lookup + remove from bucket — constant time on average." },
    ],
  },
  {
    category: "Dictionary / Hash Map",
    ops: [
      { name: "dict[key]", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Hash lookup — same as set, but retrieves a value." },
      { name: "dict[key] = val", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Hash and store — constant time on average." },
      { name: "key in dict", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Hash lookup on keys — same O(1) as set membership." },
    ],
  },
  {
    category: "String",
    ops: [
      { name: "str[i]", bigO: "O(1)", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", why: "Direct character access by index." },
      { name: "str + str", bigO: "O(n)", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", why: "Creates a brand new string, copying all characters from both strings." },
      { name: "str.find(sub)", bigO: "O(n×m)", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", why: "Scans string (n) checking for substring match (m) at each position." },
      { name: "''.join(list)", bigO: "O(n)", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", why: "One pass through all characters — much better than repeated concatenation." },
    ],
  },
];

export function BuiltinCostViz() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedOp = DATA.flatMap((c) => c.ops).find((o) => o.name === selected);

  return (
    <div className="space-y-5">
      {DATA.map((category) => (
        <div key={category.category}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {category.category}
          </p>
          <div className="flex flex-wrap gap-2">
            {category.ops.map((op) => (
              <button
                key={op.name}
                onClick={() => setSelected(selected === op.name ? null : op.name)}
                className={`rounded-lg px-3 py-2 text-left transition-all ${op.color} ${
                  selected === op.name
                    ? "ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-slate-900"
                    : "hover:scale-105"
                }`}
              >
                <code className="text-xs font-bold">{op.name}</code>
                <span className="ml-2 text-xs font-medium opacity-75">{op.bigO}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {selectedOp && (
          <motion.div
            key={selectedOp.name}
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="overflow-hidden rounded-lg bg-slate-100 p-4 dark:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <code className="rounded bg-white px-2 py-1 text-sm font-bold text-slate-900 dark:bg-slate-700 dark:text-white">
                {selectedOp.name}
              </code>
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {selectedOp.bigO}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {selectedOp.why}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Click any operation to see why it has that cost.
        </p>
      )}
    </div>
  );
}
