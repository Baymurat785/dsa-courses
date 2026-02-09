import { useEffect, useMemo, useState } from "react";
import { LessonLayout } from "../../components/layout/LessonLayout";
import { lessonsData } from "../../data/lessons";
import { Intro } from "./sections/Intro";
import { Arrays } from "./sections/Arrays";
import { MusicPlaylist } from "./sections/MusicPlaylist";
import { LoopEfficiency } from "./sections/LoopEfficiency";

const LESSON_PATH = "/lessons/why-dsa-matter";

export function WhyDsaMatterLesson() {
  const lesson = useMemo(
    () => lessonsData.find((l) => l.id === "why-dsa-matter")!,
    []
  );
  const [activeChapterId, setActiveChapterId] = useState<string>("intro");

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
        <section id="intro">
          <Intro />
        </section>
        <section id="arrays">
          <Arrays />
        </section>
        <section id="real-world">
          <MusicPlaylist />
        </section>
        <section id="loop">
          <LoopEfficiency />
        </section>
      </article>
    </LessonLayout>
  );
}
