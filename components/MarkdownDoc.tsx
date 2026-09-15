"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownDoc({
  content,
  interactive = false,
  onToggle,
}: {
  content: string;
  interactive?: boolean;
  onToggle?: (lineNumber: number) => void;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 text-[19px] font-extrabold tracking-tight text-[#191F28]">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-2 mt-5 text-[14px] font-bold text-[#3182F6]">{children}</h2>
        ),
        p: ({ children }) => (
          <p className="mb-2 text-[14px] leading-relaxed text-[#191F28]">{children}</p>
        ),
        ul: ({ children }) => <ul className="mb-2 flex flex-col gap-1.5">{children}</ul>,
        li: ({ children }) => (
          <li className="flex items-start gap-2 text-[14px] leading-relaxed text-[#191F28]">
            {children}
          </li>
        ),
        input: ({ node, checked }) => (
          <input
            type="checkbox"
            checked={!!checked}
            readOnly={!interactive}
            onChange={() => {
              if (interactive && onToggle && node?.position) {
                onToggle(node.position.start.line);
              }
            }}
            className={`mt-1 h-4 w-4 accent-[#3182F6] ${interactive ? "cursor-pointer" : ""}`}
          />
        ),
        strong: ({ children }) => <strong className="font-bold text-[#191F28]">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}