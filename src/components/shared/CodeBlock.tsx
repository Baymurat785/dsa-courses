interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "text", className = "" }: CodeBlockProps) {
  return (
    <pre
      className={`overflow-x-auto rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-100 dark:bg-slate-950 ${className}`}
    >
      <code data-language={language}>{code}</code>
    </pre>
  );
}
