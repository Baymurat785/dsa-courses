import { useEffect, useMemo, useState } from "react";
import { LessonLayout } from "../../components/layout/LessonLayout";
import { lessonsData } from "../../data/lessons";
import { BubbleSort } from "./sections/BubbleSort";
import { OptimizingBubble } from "./sections/OptimizingBubble";
import { SelectionSort } from "./sections/SelectionSort";
import { ComparingSorts } from "./sections/ComparingSorts";

const LESSON_PATH = "/lessons/speeding-up-big-o";

export function SpeedingUpBigOLesson() {
  const lesson = useMemo(
    () => lessonsData.find((l) => l.id === "speeding-up-big-o")!,
    []
  );
  const [activeChapterId, setActiveChapterId] = useState<string>("bubble-sort");

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
        <section id="bubble-sort">
          <BubbleSort />
        </section>
        <section id="optimizing-bubble">
          <OptimizingBubble />
        </section>
        <section id="selection-sort">
          <SelectionSort />
        </section>
        <section id="comparing-sorts">
          <ComparingSorts />
        </section>
      </article>
    </LessonLayout>
  );
}
