import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface Chapter {
  id: string;
  title: string;
  subsections?: string[];
}

interface LessonLayoutProps {
  chapters: Chapter[];
  activeChapterId?: string;
  lessonPath: string;
  children: ReactNode;
}

export function LessonLayout({
  chapters,
  activeChapterId,
  lessonPath,
  children,
}: LessonLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden lg:block">
          <Sidebar
            chapters={chapters}
            activeChapterId={activeChapterId}
            lessonPath={lessonPath}
          />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
