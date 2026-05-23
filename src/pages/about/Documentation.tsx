/**
 * Documentation Component
 *
 * Dependencies (install before use):
 *   npm install react-markdown remark-gfm rehype-raw
 *
 * Optional (code syntax highlighting):
 *   npm install react-syntax-highlighter @types/react-syntax-highlighter
 *
 * Usage:
 *   <Documentation sections={docSections} title="My Docs" />
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { rehypeMermaid } from 'react-markdown-mermaid';
//import 'react-markdown-mermaid/style.css';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DocSection {
  label: string;
  icon?: string;
  children?: DocSection[];
  content?: string;
}

export interface DocumentationProps {
  title?: string;
  sections: DocSection[];
  defaultSectionId?: string;
  accentColor?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function flattenSections(sections: DocSection[]): DocSection[] {
  return sections.flatMap((s) => [s, ...flattenSections(s.children ?? [])]);
}

function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,4})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      items.push({ id, text, level });
    }
  }
  return items;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative mx-3 mb-3">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs pointer-events-none">
        ⌕
      </span>
      <input
        type="text"
        placeholder="Search docs…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-md pl-8 pr-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-amber-500/60 focus:bg-zinc-800 transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}

function NavItem({
  section,
  depth,
  activeId,
  onSelect,
  searchQuery,
}: {
  section: DocSection;
  depth: number;
  activeId: string;
  onSelect: (id: string) => void;
  searchQuery: string;
}) {
  const hasChildren = (section.children?.length ?? 0) > 0;
  const flat = flattenSections(section.children ?? []);
  const anyChildActive =
    activeId === section.label || flat.some((s) => s.label === activeId);

  const [open, setOpen] = useState(anyChildActive || depth === 0);

  useEffect(() => {
    if (anyChildActive) setOpen(true);
  }, [anyChildActive]);

  const isActive = activeId === section.label;
  const isGroup = hasChildren && !section.content;

  const matchesSearch =
    !searchQuery ||
    section.label.toLowerCase().includes(searchQuery.toLowerCase());

  if (searchQuery && !matchesSearch && !hasChildren) return null;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) setOpen((o) => !o);
          if (section.content || !hasChildren) onSelect(section.label);
        }}
        className={`
          w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-left transition-all duration-150 group
          ${depth === 0 ? "text-xs font-semibold tracking-widest uppercase" : "text-sm font-normal"}
          ${isActive
            ? "bg-amber-500/15 text-amber-300 border-l-2 border-amber-400 pl-[10px]"
            : isGroup
              ? "text-zinc-400 hover:text-zinc-200"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }
        `}
        style={{ paddingLeft: depth > 0 ? `${depth * 12 + 12}px` : undefined }}
      >
        {section.icon && (
          <span className="text-sm leading-none shrink-0">{section.icon}</span>
        )}
        <span className="flex-1 truncate">{section.label}</span>
        {hasChildren && (
          <span
            className={`text-zinc-600 text-xs transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          >
            ›
          </span>
        )}
      </button>

      {hasChildren && open && (
        <div className="mt-0.5">
          {section.children!.map((child) => (
            <NavItem
              key={child.label}
              section={child}
              depth={depth + 1}
              activeId={activeId}
              onSelect={onSelect}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TableOfContents({
  items,
  activeHeading,
}: {
  items: TocItem[];
  activeHeading: string;
}) {
  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-6">
        <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-3 px-1">
          On this page
        </p>
        <nav className="space-y-0.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`
                block text-xs py-1 transition-colors duration-150 truncate
                ${item.level === 1 ? "font-semibold" : ""}
                ${item.level >= 3 ? "pl-4" : item.level === 2 ? "pl-2" : ""}
                ${activeHeading === item.id
                  ? "text-amber-400"
                  : "text-zinc-500 hover:text-zinc-300"
                }
              `}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// ─── Markdown Renderer ────────────────────────────────────────────────────────

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeMermaid]}
      components={{
        h1: ({ children }) => {
          const text = String(children);
          return (
            <h1
              id={slugify(text)}
              className="text-3xl font-bold text-zinc-50 mt-0 mb-6 pb-4 border-b border-zinc-800 tracking-tight leading-tight scroll-mt-20"
            >
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          const text = String(children);
          return (
            <h2
              id={slugify(text)}
              className="text-xl font-semibold text-zinc-100 mt-10 mb-4 scroll-mt-20"
            >
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const text = String(children);
          return (
            <h3
              id={slugify(text)}
              className="text-base font-semibold text-zinc-200 mt-8 mb-3 scroll-mt-20"
            >
              {children}
            </h3>
          );
        },
        h4: ({ children }) => {
          const text = String(children);
          return (
            <h4
              id={slugify(text)}
              className="text-sm font-semibold text-zinc-300 mt-6 mb-2 uppercase tracking-wide scroll-mt-20"
            >
              {children}
            </h4>
          );
        },
        p: ({ children }) => (
          <p className="text-zinc-400 leading-7 mb-4 text-[15px]">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 decoration-amber-500/40 hover:decoration-amber-400 transition-colors"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="text-zinc-400 mb-4 space-y-1.5 pl-5 list-none">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="text-zinc-400 mb-4 space-y-1.5 pl-5 list-decimal marker:text-zinc-600">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-[15px] leading-7 relative pl-4 before:content-['–'] before:absolute before:left-0 before:text-zinc-600">
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-amber-500/50 bg-amber-500/5 rounded-r-md pl-4 pr-4 py-3 my-4 text-zinc-400 italic text-[15px]">
            {children}
          </blockquote>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="bg-zinc-800 text-amber-300 text-[13px] font-mono px-1.5 py-0.5 rounded border border-zinc-700/50"
                {...props}
              >
                {children}
              </code>
            );
          }
          const lang = className?.replace("language-", "") ?? "";
          return (
            <div className="relative group my-5">
              {lang && (
                <span className="absolute top-3 right-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {lang}
                </span>
              )}
              <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-zinc-300 text-[13px] font-mono leading-6">
                  {children}
                </code>
              </pre>
            </div>
          );
        },
        pre: ({ children }) => <>{children}</>,
        table: ({ children }) => (
          <div className="my-5 overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-800/80 text-zinc-300 text-xs uppercase tracking-wider">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-zinc-800/60">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-zinc-800/30 transition-colors">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold text-zinc-300">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-zinc-400">{children}</td>
        ),
        hr: () => <hr className="my-8 border-zinc-800" />,
        strong: ({ children }) => (
          <strong className="text-zinc-200 font-semibold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-zinc-300 italic">{children}</em>
        ),
        del: ({ children }) => (
          <del className="text-zinc-600 line-through">{children}</del>
        ),
        input: ({ type, checked }) => {
          if (type === "checkbox") {
            return (
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="mr-2 accent-amber-500 rounded"
              />
            );
          }
          return <input type={type} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Documentation({
  title = "Documentation",
  sections,
  defaultSectionId,
}: DocumentationProps) {
  const allSections = useMemo(() => flattenSections(sections), [sections]);

  const firstWithContent = allSections.find((s) => s.content);
  const [activeId, setActiveId] = useState(
    defaultSectionId ?? firstWithContent?.label ?? ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHeading, setActiveHeading] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeSection = allSections.find((s) => s.label === activeId);
  const toc = useMemo(
    () => (activeSection?.content ? extractToc(activeSection.content) : []),
    [activeSection]
  );

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allSections.filter(
      (s) =>
        s.content &&
        (s.label.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q))
    );
  }, [searchQuery, allSections]);

  // Active heading tracking via IntersectionObserver
  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4"
    );
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [activeId]);

  const handleSelect = useCallback(
    (id: string) => {
      const sec = allSections.find((s) => s.label === id);
      if (sec?.content) {
        setActiveId(id);
        setSearchQuery("");
        contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [allSections]
  );

  return (
    <div
      className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className={`
          shrink-0 flex flex-col bg-zinc-900/50 border-r border-zinc-800/60
          transition-all duration-300 ease-in-out overflow-hidden
          ${sidebarOpen ? "w-64" : "w-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-zinc-800/60 shrink-0">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <span
            className="font-bold text-zinc-100 text-sm tracking-wide truncate"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {title}
          </span>
        </div>

        {/* Search */}
        <div className="pt-3 shrink-0">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 scrollbar-thin">
          {searchQuery && searchResults.length === 0 ? (
            <p className="text-zinc-600 text-xs px-3 py-4 text-center">
              No results for "{searchQuery}"
            </p>
          ) : searchQuery ? (
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-3 mb-2"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {searchResults.length} result
                {searchResults.length !== 1 ? "s" : ""}
              </p>
              {searchResults.map((sec) => (
                <button
                  key={sec.label}
                  onClick={() => handleSelect(sec.label)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors truncate ${
                    activeId === sec.label ? "text-amber-300 bg-amber-500/10" : ""
                  }`}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          ) : (
            sections.map((sec) => (
              <NavItem
                key={sec.label}
                section={sec}
                depth={0}
                activeId={activeId}
                onSelect={handleSelect}
                searchQuery=""
              />
            ))
          )}
        </nav>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header
          className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm shrink-0"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <span className="text-sm">{sidebarOpen ? "◂" : "▸"}</span>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 truncate">
            {sections.map((top) => {
              const flat = flattenSections(top.children ?? [top]);
              const inGroup = flat.some((s) => s.label === activeId);
              if (!inGroup) return null;
              return (
                <span key={top.label} className="flex items-center gap-1.5">
                  {top.icon && <span>{top.icon}</span>}
                  <span className="text-zinc-500">{top.label}</span>
                  {activeSection && top.label !== activeSection.label && (
                    <>
                      <span className="text-zinc-700">/</span>
                      <span className="text-zinc-300 font-medium">
                        {activeSection.label}
                      </span>
                    </>
                  )}
                </span>
              );
            })}
          </div>
        </header>

        {/* Content + TOC */}
        <div className="flex flex-1 min-h-0">
          <main
            ref={contentRef}
            className="flex-1 overflow-y-auto px-8 py-8 lg:px-12 lg:py-10"
          >
            <div className="max-w-3xl mx-auto">
              {activeSection?.content ? (
                <MarkdownRenderer content={activeSection.content} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                  <span className="text-4xl mb-4">📄</span>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Select a section to view its content
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* TOC */}
          {toc.length > 0 && (
            <div className="shrink-0 w-56 px-4 py-10 hidden xl:block border-l border-zinc-800/40">
              <TableOfContents items={toc} activeHeading={activeHeading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}