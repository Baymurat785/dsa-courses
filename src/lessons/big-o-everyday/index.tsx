import { useEffect, useMemo, useState } from "react";
import { LessonLayout } from "../../components/layout/LessonLayout";
import { lessonsData } from "../../data/lessons";
import { CommonPatterns } from "./sections/CommonPatterns";
import { BuiltinCosts } from "./sections/BuiltinCosts";
import { RealWorldAnalysis } from "./sections/RealWorldAnalysis";
import { OptimizationChecklist } from "./sections/OptimizationChecklist";

const LESSON_PATH = "/lessons/big-o-everyday";

export function BigOEverydayLesson() {
  const lesson = useMemo(
    () => lessonsData.find((l) => l.id === "big-o-everyday")!,
    []
  );
  const [activeChapterId, setActiveChapterId] = useState<string>("common-patterns");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveChapterId(id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    lesson.chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [lesson.chapters]);

  return (
    <LessonLayout
      chapters={lesson.chapters}
      activeChapterId={activeChapterId}
      lessonPath={LESSON_PATH}
    >
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <section id="common-patterns">
          <CommonPatterns />
        </section>
        <section id="builtin-costs">
          <BuiltinCosts />
        </section>
        <section id="real-world-analysis">
          <RealWorldAnalysis />
        </section>
        <section id="optimization-checklist">
          <OptimizationChecklist />
        </section>
      </article>
    </LessonLayout>
  );
}
