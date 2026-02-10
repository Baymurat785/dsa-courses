import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { ArrowLeft } from "lucide-react";

interface ArticleLayoutProps {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function ArticleLayout({
  children,
  backHref = "/articles",
  backLabel = "All articles",
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
        <article className="pb-16">{children}</article>
      </div>
    </div>
  );
}
