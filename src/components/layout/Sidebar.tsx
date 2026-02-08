import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Chapter {
  id: string;
  title: string;
  subsections?: string[];
}

interface SidebarProps {
  chapters: Chapter[];
  activeChapterId?: string;
  lessonPath: string;
}

export function Sidebar({
  chapters,
  activeChapterId,
  lessonPath,
}: SidebarProps) {
  return (
    <nav className="w-56 shrink-0 space-y-1 pr-4">
      {chapters.map((chapter) => {
        const isActive = activeChapterId === chapter.id;
        return (
          <div key={chapter.id}>
            <Link
              to={`${lessonPath}#${chapter.id}`}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {chapter.title}
            </Link>
            {chapter.subsections && isActive && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3 dark:border-slate-700"
              >
                {chapter.subsections.map((sub) => (
                  <li key={sub}>
                    <a
                      href={`${lessonPath}#${chapter.id}-${sub.toLowerCase()}`}
                      className="block py-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      {sub}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
