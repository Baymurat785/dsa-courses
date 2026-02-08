export interface Chapter {
  id: string;
  title: string;
  subsections?: string[];
  viz?: string | null;
}

export interface Lesson {
  id: string;
  title: string;
  chapters: Chapter[];
}

export const lessonsData: Lesson[] = [
  {
    id: "why-dsa-matter",
    title: "Why DSA Matter?",
    chapters: [
      { id: "intro", title: "Why Data Structures Matter", viz: null },
      { id: "algorithm-vs-ds", title: "Algorithm vs. Data Structure", viz: null },
      {
        id: "arrays",
        title: "Arrays",
        subsections: ["Read", "Search", "Insert", "Delete"],
        viz: "Arrays",
      },
      { id: "sets", title: "Set", viz: "Sets" },
      { id: "loop", title: "Loop Efficiency", viz: "LoopComparison" },
    ],
  },
];
