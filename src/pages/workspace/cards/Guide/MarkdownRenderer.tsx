import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
  isDarkMode: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isDarkMode,
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
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="my-4 rounded-lg overflow-hidden">
              <SyntaxHighlighter
                style={isDarkMode ? oneDark : oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-pink-500"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};