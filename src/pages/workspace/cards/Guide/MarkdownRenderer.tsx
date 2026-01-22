import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {
//   oneDark,
//   oneLight,
// } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-4 whitespace-pre-wrap">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc ml-6 mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-6 mb-4">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};