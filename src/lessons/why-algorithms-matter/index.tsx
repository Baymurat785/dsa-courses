import { useEffect, useMemo, useState } from "react";
import { LessonLayout } from "../../components/layout/LessonLayout";
import { lessonsData } from "../../data/lessons";
import { WorstCasePrinciple } from "./sections/WorstCasePrinciple";
import { OrderedArrays } from "./sections/OrderedArrays";
import { BinarySearch } from "./sections/BinarySearch";
import { AlgorithmChoice } from "./sections/AlgorithmChoice";

const LESSON_PATH = "/lessons/why-algorithms-matter";

export function WhyAlgorithmsMatterLesson() {
  const lesson = useMemo(
    () => lessonsData.find((l) => l.id === "why-algorithms-matter")!,
    []
  );
  const [activeChapterId, setActiveChapterId] = useState<string>("worst-case");

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
        <section id="worst-case">
          <WorstCasePrinciple />
        </section>
        <section id="ordered-arrays">
          <OrderedArrays />
        </section>
        <section id="binary-search">
          <BinarySearch />
        </section>
        <section id="algorithm-choice">
          <AlgorithmChoice />
        </section>
      </article>
    </LessonLayout>
  );
}
