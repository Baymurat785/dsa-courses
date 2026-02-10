export interface ArticleMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Optional hero image/GIF URL */
  heroUrl?: string;
}

export const articlesData: ArticleMeta[] = [
  {
    id: "what-are-data-structures",
    slug: "what-are-data-structures",
    title: "What Are Data Structures?",
    description:
      "A friendly intro to how we organize and store data—with real-life analogies and everyday examples.",
    heroUrl:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6a2hyMWV0ZGV3eTVqdnNkeWQxemtrZ2xtdTlqcjI3YWk0MnIyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kVjLD8HO7ubIfSZwFV/giphy.gif",
  },
];
