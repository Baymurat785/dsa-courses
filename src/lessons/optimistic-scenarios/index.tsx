import { useEffect, useMemo, useState } from "react";
import { LessonLayout } from "../../components/layout/LessonLayout";
import { lessonsData } from "../../data/lessons";
import { BestAverageWorst } from "./sections/BestAverageWorst";
import { AverageCase } from "./sections/AverageCase";
import { ChoosingAlgorithms } from "./sections/ChoosingAlgorithms";

const LESSON_PATH = "/lessons/optimistic-scenarios";

export function OptimisticScenariosLesson() {
  const lesson = useMemo(
    () => lessonsData.find((l) => l.id === "optimistic-scenarios")!,
    []
  );
  const [activeChapterId, setActiveChapterId] = useState<string>("best-average-worst");

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
        <section id="best-average-worst">
          <BestAverageWorst />
        </section>
<section id="average-case">
          <AverageCase />
        </section>
        <section id="choosing-algorithms">
          <ChoosingAlgorithms />
        </section>
      </article>
    </LessonLayout>
  );
}
