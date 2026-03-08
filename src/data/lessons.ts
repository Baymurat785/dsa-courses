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
  {
    id: "why-algorithms-matter",
    title: "Why Algorithms Matter",
    available: true,
    chapters: [
      { id: "worst-case", title: "Why Algorithms Matter", viz: null },
      {
        id: "ordered-arrays",
        title: "Ordered Arrays",
        subsections: ["Read", "Insert", "Delete", "Search"],
        viz: null,
      },
      { id: "binary-search", title: "Binary Search Algorithm", viz: "BinarySearch" },
      { id: "algorithm-choice", title: "Algorithm Choice Matters", viz: null },
    ],
  },
  {
    id: "big-o-notation",
    title: "O Yes! Big O Notation",
    available: true,
    chapters: [
      { id: "what-is-big-o", title: "What is Big O?", viz: null },
      { id: "counting-steps", title: "Counting Steps", viz: "StepCounter" },
      {
        id: "common-complexities",
        title: "Common Complexities",
        subsections: ["Constant", "Logarithmic", "Linear", "Quadratic"],
        viz: "ComplexityGraph",
      },
      { id: "simplifying", title: "Simplifying Big O", viz: null },
    ],
  },
  {
    id: "speeding-up-big-o",
    title: "Speeding Up Your Code with Big O",
    available: true,
    chapters: [
      { id: "bubble-sort", title: "Bubble Sort", viz: "BubbleSort" },
      { id: "optimizing-bubble", title: "Optimizing Bubble Sort", viz: null },
      { id: "selection-sort", title: "Selection Sort", viz: "SelectionSort" },
      { id: "comparing-sorts", title: "Comparing Algorithms", viz: "SortComparison" },
    ],
  },
  {
    id: "optimizing-code",
    title: "Optimizing Code with and Without Big O",
    available: true,
    chapters: [
      { id: "selection-sort", title: "Selection Sort", viz: "SelectionSort" },
      { id: "bubble-vs-selection", title: "Bubble Sort vs Selection Sort", viz: null },
      { id: "big-o-ignores-constants", title: "Big O Ignores Constants", viz: null },
      { id: "significance-of-big-o", title: "The Significance of Big O", viz: "GrowthComparison" },
    ],
  },
  {
    id: "optimistic-scenarios",
    title: "Optimizing for Optimistic Scenarios",
    available: true,
    chapters: [
      { id: "best-average-worst", title: "Best, Average, and Worst Case", viz: null },
      { id: "average-case", title: "Average Case Analysis", viz: null },
      { id: "choosing-algorithms", title: "Choosing the Right Algorithm", viz: "ScenarioComparison" },
    ],
  },
  {
    id: "big-o-everyday",
    title: "Big O in Everyday Code",
    available: true,
    chapters: [
      { id: "common-patterns", title: "Common Code Patterns", viz: null },
      { id: "builtin-costs", title: "Hidden Costs of Built-ins", viz: "BuiltinCost" },
      { id: "real-world-analysis", title: "Real-World Code Analysis", viz: null },
      { id: "optimization-checklist", title: "Your Optimization Checklist", viz: null },
    ],
  },
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
