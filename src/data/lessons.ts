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
  /** True if lesson has content; false = coming soon */
  available?: boolean;
}

export const lessonsData: Lesson[] = [
  {
    id: "why-dsa-matter",
    title: "Why DSA Matter?",
    available: true,
    chapters: [
      { id: "intro", title: "Why Data Structures Matter", viz: null },
      {
        id: "arrays",
        title: "Arrays",
        subsections: ["Read", "Search", "Insert", "Delete"],
        viz: "Arrays",
      },
      { id: "real-world", title: "Real-World Example (Music Playlist)", viz: null },
      { id: "loop", title: "Loop Efficiency", viz: "LoopComparison" },
    ],
  },
  { id: "why-algorithms-matter", title: "Why Algorithms Matter", available: false, chapters: [] },
  { id: "big-o-notation", title: "O Yes! Big O Notation", available: false, chapters: [] },
  { id: "speeding-up-big-o", title: "Speeding Up Your Code with Big O", available: false, chapters: [] },
  { id: "optimizing-code", title: "Optimizing Code with and Without Big O", available: false, chapters: [] },
  { id: "optimistic-scenarios", title: "Optimizing for Optimistic Scenarios", available: false, chapters: [] },
  { id: "big-o-everyday", title: "Big O in Everyday Code", available: false, chapters: [] },
  { id: "hash-tables", title: "Blazing Fast Lookups with Hash Tables/Dictionaries", available: false, chapters: [] },
  { id: "stacks-queues", title: "Crafting Elegant Code with Stacks and Queues", available: false, chapters: [] },
  { id: "recursion", title: "Recursively Recurse with Recursion", available: false, chapters: [] },
  { id: "learning-recursive", title: "Learning to Write in Recursive", available: false, chapters: [] },
  { id: "dynamic-programming", title: "Dynamic Programming", available: false, chapters: [] },
  { id: "recursive-algorithms", title: "Recursive Algorithms for Speed", available: false, chapters: [] },
  { id: "node-based", title: "Node-Based Data Structures", available: false, chapters: [] },
  { id: "binary-search-trees", title: "Speeding up all the things with Binary Search Trees", available: false, chapters: [] },
  { id: "heaps", title: "Keeping your priorities straight with heaps", available: false, chapters: [] },
  { id: "trie", title: "It does not hurt to Trie", available: false, chapters: [] },
  { id: "graphs", title: "Connecting Everything with Graphs", available: false, chapters: [] },
  { id: "space-constraints", title: "Dealing with Space Constraints", available: false, chapters: [] },
  { id: "code-optimization", title: "Techniques for Code Optimization", available: false, chapters: [] },
];
