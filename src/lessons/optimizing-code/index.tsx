import { useEffect, useMemo, useState } from "react";
import { LessonLayout } from "../../components/layout/LessonLayout";
import { lessonsData } from "../../data/lessons";
import { SelectionSort } from "./sections/SelectionSort";
import { BubbleVsSelection } from "./sections/BubbleVsSelection";
import { BigOIgnoresConstants } from "./sections/BigOIgnoresConstants";
import { SignificanceOfBigO } from "./sections/SignificanceOfBigO";

const LESSON_PATH = "/lessons/optimizing-code";

export function OptimizingCodeLesson() {
  const lesson = useMemo(
    () => lessonsData.find((l) => l.id === "optimizing-code")!,
    []
  );
  const [activeChapterId, setActiveChapterId] = useState<string>("selection-sort");

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
        <section id="selection-sort">
          <SelectionSort />
        </section>
        <section id="bubble-vs-selection">
          <BubbleVsSelection />
        </section>
        <section id="big-o-ignores-constants">
          <BigOIgnoresConstants />
        </section>
        <section id="significance-of-big-o">
          <SignificanceOfBigO />
        </section>
      </article>
    </LessonLayout>
  );
}
