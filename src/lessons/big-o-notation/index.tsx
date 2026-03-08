import { useEffect, useMemo, useState } from "react";
import { LessonLayout } from "../../components/layout/LessonLayout";
import { lessonsData } from "../../data/lessons";
import { WhatIsBigO } from "./sections/WhatIsBigO";
import { CountingSteps } from "./sections/CountingSteps";
import { CommonComplexities } from "./sections/CommonComplexities";
import { SimplifyingBigO } from "./sections/SimplifyingBigO";

const LESSON_PATH = "/lessons/big-o-notation";

export function BigONotationLesson() {
  const lesson = useMemo(
    () => lessonsData.find((l) => l.id === "big-o-notation")!,
    []
  );
  const [activeChapterId, setActiveChapterId] = useState<string>("what-is-big-o");

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
        <section id="what-is-big-o">
          <WhatIsBigO />
        </section>
        <section id="counting-steps">
          <CountingSteps />
        </section>
        <section id="common-complexities">
          <CommonComplexities />
        </section>
        <section id="simplifying">
          <SimplifyingBigO />
        </section>
      </article>
    </LessonLayout>
  );
}
