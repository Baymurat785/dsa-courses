import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { Lightbulb } from "lucide-react";

interface QuickCheckProps {
  question: string;
  answer: string;
}

export function QuickCheck({ question, answer }: QuickCheckProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20"
    >
      <div className="flex items-start gap-2">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{question}</p>
          {revealed ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-slate-600 dark:text-slate-300"
            >
              {answer}
            </motion.p>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setRevealed(true)}
              className="mt-2"
            >
              Reveal answer
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
