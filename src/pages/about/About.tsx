import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

type InlineNodeKind = "text" | "bold" | "code";

interface InlineNode {
  kind: InlineNodeKind;
  text: string;
}

interface BaseToken {
  type: string;
}

interface HeadingToken extends BaseToken {
  type: "h1" | "h2" | "h3" | "h4";
  text: string;
  id: string;
}

interface ParagraphToken extends BaseToken {
  type: "p";
  nodes: InlineNode[];
}

interface HorizontalRuleToken extends BaseToken {
  type: "hr";
}

interface MermaidToken extends BaseToken {
  type: "mermaid";
  code: string;
}

interface CodeToken extends BaseToken {
  type: "code";
  lang: string;
  code: string;
}

interface ListToken extends BaseToken {
  type: "ul" | "ol";
  items: InlineNode[][];
}

type Token =
  | HeadingToken
  | ParagraphToken
  | HorizontalRuleToken
  | MermaidToken
  | CodeToken
  | ListToken;

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT CONTENT
// ─────────────────────────────────────────────────────────────────────────────
const MARKDOWN = `# Strukt Documentation

## Introduction

Strukt is a structured information management system based on Zettelkasten principles. This documentation provides comprehensive guidance on implementing and utilizing the system for organizing knowledge, planning, and information retrieval.

---

## Part 1: Core Concepts

### 1.1 Atomicity

Information in Strukt is organized as independent units called "atoms." Unlike traditional linear text where sentences form continuous sequences, each atom represents a discrete, self-contained unit of information that can be stored and referenced independently.

**Key Principle:** Each atom should convey a single, complete concept that remains meaningful without contextual dependency on surrounding atoms.

### 1.2 Network Structure

While linear text creates implicit relationships between sentences, Strukt employs explicit, directional connections between atoms. This allows for precise definition of how information relates to other information throughout the system.

**Example Structure:**
\`\`\`mermaid
graph TD
    A1["Apple"]
    A1 --> B1["Belongs to fruits"]
    A1 --> B2["Has color"]
    B2 --> C2["Red"]
    B2 --> C3["Immutable property"]
\`\`\`

**Advantages:**
- **Visual clarity:** Complex relationships become immediately apparent
- **Efficient discovery:** Related information is directly accessible without sequential reading
- **Reduced cognitive load:** Information structure is externalized rather than maintained mentally

### 1.3 Principle of Non-Duplication (DRY)

Each discrete piece of information should be stored in a single location. Relationships to that information are maintained through directional links rather than repetition.

**Incorrect Implementation:**
\`\`\`mermaid
graph LR
    A["Goal: Read Books"]
    A --> B["Book: Atomic Habits"]
    A --> C["Book: Influence"]
    X["Book: Atomic Habits (duplicate)"]
    X --> D["Insight: Small habits yield large results"]
    X --> E["Insight: Systems matter more than motivation"]
\`\`\`

**Correct Implementation:**
\`\`\`mermaid
graph TD
    A["Goal: Read Books"]
    A --> B["Book: Atomic Habits"]
    A --> C["Book: Influence"]
    B --> D["Insight: Small habits yield large results"]
    B --> E["Insight: Systems matter more than motivation"]
\`\`\`

**Benefits:**
- **Maintenance efficiency:** Updates require modification in a single location
- **Data consistency:** All references reflect current information
- **Reduced redundancy:** Storage requirements are minimized

### 1.4 Sequential Ordering

Atoms within a collection can be arranged in a specific sequence that reflects intended progression or hierarchy. Sequences can be modified independently without affecting the underlying information.

**Use Case Example - Daily Goals:**
\`\`\`mermaid
graph LR
    A["Goals for Today"]
    A --> B["1. Complete LeetCode Problem"]
    A --> C["2. Physical Training (30 min)"]
    A --> D["3. Complete Practical Assignment"]
\`\`\`

**Following Reorganization:**
\`\`\`mermaid
graph LR
    A["Goals for Today"]
    A --> B["1. Physical Training (30 min)"]
    A --> C["2. Complete Practical Assignment"]
    A --> D["3. Complete LeetCode Problem"]
\`\`\`

---

## Part 2: Navigation and User Experience

### 2.1 Minimalist View

The interface presents only the selected atom and its direct connections, preventing cognitive overload from displaying the entire information network simultaneously.

**Full Network View (Complex):**
\`\`\`mermaid
flowchart TD
    B[Frontend Development]
    B --> B1[HTML]
    B --> B2[CSS]
    B --> B3[JavaScript]
    B3 --> C[Development Tools]
    C --> C1[Git and GitHub]
    C --> C2[Package Managers]
    C2 --> D[Responsive UI]
    D --> D1[Flexbox and Grid]
    D --> D2[Responsive Design]
\`\`\`

**Minimalist View (Focused):**
\`\`\`mermaid
flowchart TD
    B[Frontend Development]
    B --> B1[HTML]
    B --> B2[CSS]
    B --> B3[JavaScript]
\`\`\`

### 2.2 Selective Navigation

Navigation through the system operates similarly to file system navigation. Selecting a connected atom updates the display to show only that atom and its direct connections.

**Navigation Sequence Example:**

1. **Initial Selection - "Frontend Development":**
\`\`\`mermaid
flowchart TD
    B[Frontend Development]
    B --> B1[HTML]
    B --> B2[CSS]
    B --> B3[JavaScript]
\`\`\`

2. **Navigate to - "JavaScript":**
\`\`\`mermaid
flowchart TD
    C[JavaScript]
    C --> C1[Git and GitHub]
    C --> C2[Package Managers]
\`\`\`

3. **Navigate to - "Package Managers":**
\`\`\`mermaid
flowchart TD
    D[Package Managers]
    D --> D1[NPM]
    D --> D2[Yarn]
\`\`\`

**Benefit:** Users maintain focus on relevant information while maintaining access to related atoms.

### 2.3 Navigation History

The system maintains a history of navigational actions, enabling users to understand the path taken through the information network and retrace steps if necessary.

### 2.4 Text Search

A text search function allows retrieval of atoms by keyword or phrase. This is particularly useful in large networks where the exact location of information may be unknown.

**Application:** In complex instruction sets, users can search for relevant guide titles rather than manually navigating the entire structure.

### 2.5 Keyboard Navigation

The system supports full keyboard-based navigation, eliminating the requirement for mouse interaction. An optional learning mode displays available keyboard shortcuts.

**Benefit:** Users can achieve full operational efficiency using keyboard controls, enabling rapid information access and reduced context switching.

---

## Part 3: Practical Implementation

### 3.1 Entry Points

Entry points are atoms that aggregate all information necessary for completing a specific activity. They function as starting points for common workflows and eliminate the need to manually locate dispersed information.

**Naming Convention:** Prefix entry point titles with "$" to facilitate rapid search and identification. Examples: "$pet-project", "$study-english", "$exercise-routine"

**Example Structure:**
\`\`\`mermaid
flowchart LR
    A["$Learn English"]
    A --> B["Podcast Resources"]
    A --> D["Vocabulary"]
    D --> E["Word: Ability"]
    D --> F["Word: Influence"]
    A --> G["Learning Strategy"]
    G --> H["Spaced Repetition Method"]
    G --> I["Active Recall Practice"]
\`\`\`

### 3.2 Planning System

#### 3.2.1 Master Planning Atom

Establish a central "Planning" atom containing all planning-related information. This atom should reference sub-plans organized by category.

#### 3.2.2 Goals Section

The Goals section documents long-term objectives and their decomposition into intermediate targets.

**Implementation:**
1. Create atom titled "Goals" within the Planning structure
2. Create individual atoms for each major objective
3. Establish sub-goal atoms to define intermediate milestones

**Example:**
\`\`\`mermaid
flowchart LR
    A[Goals]
    A --> B[Secure First Employment]
    B --> C[Complete Portfolio Project]
    C --> D[Write Technical Documentation]
    B --> E[Develop Professional Portfolio]
    A --> F[Develop Emotional Resilience]
    F --> G[Establish Breathing Meditation Habit]
\`\`\`

#### 3.2.3 Current Goals Section

The Current Goals atom contains specific, achievable objectives planned for the near-term future. These should be selected from broader goals to maintain balanced progress across multiple domains.

#### 3.2.4 Deadline Management

Deadlines are organized by date with associated tasks. This structure provides temporal organization of planned activities.

**Example:**
\`\`\`mermaid
flowchart LR
    A[Deadlines]
    A --> B[Monday - 12th]
    B --> C[Finalize Project Deliverables]
    B --> D[Begin Reading Influence]
    A --> E[Wednesday - 14th]
    E --> F[Complete Mathematics Assignment]
    A --> G[Thursday - 15th]
    G --> H[Team Meeting Preparation]
\`\`\`

### 3.3 Progress Documentation

Progress atoms maintain a chronological record of accomplishments, insights, and challenges. Organization by year and month facilitates temporal review.

**Structure:**
\`\`\`mermaid
flowchart LR
    A[Progress] --> B[2026]
    B --> C[January]
    C --> D["29th"]
    D --> D1["Understood application of devil's advocate technique"]
    D --> D2["Identified tendency toward task avoidance"]
    C --> E["30th"]
    E --> E1["Established early sleep habit"]
    B --> F[February]
\`\`\`

### 3.4 Terminology Database

A terminology section maintains definitions of key concepts used throughout the system. This ensures consistent understanding and provides rapid reference capability.

**Naming Convention:** Prefix terminology atoms with "@" for efficient searching. Examples: "@visibility", "@energy", "@algorithm"

**Example:**
\`\`\`mermaid
flowchart LR
    A["@Algorithm"] --> B["Definition: Sequence of computational steps"]
    A --> C["Purpose: Goal achievement"]
    A --> D["Components: Input, process, output"]
\`\`\`

### 3.5 Instructions and Guides

Procedural documentation should be prefixed with "How to" to facilitate identification and retrieval.

**Naming Convention Examples:**
- "How to Read Books Effectively"
- "How to Manage Rest Cycles"
- "How to Implement Spaced Repetition"

**Example Structure:**
\`\`\`mermaid
flowchart LR
    A["How to Read Books"] --> A1["Define Learning Objective"]
    A --> A2["Identify Relevant Content"]
    A --> A3["Execute Progressive Reading"]
    A --> A4["Apply Active Recall"]
\`\`\`

### 3.6 Reflection and Thought Documentation

Reflection atoms serve as repositories for unstructured thinking that may be organized later. Entries are organized chronologically by date.

**Example:**
\`\`\`mermaid
flowchart LR
    A["Reflections"] --> B["August 26th"]
    A --> C["August 27th"]
    A --> D["August 28th"]
    B --> B1["Avoid overloading daily task list"]
    B --> B2["Written documentation aids memory retention"]
    C --> C1["Sleep quality significantly impacts focus"]
    C --> C2["Consistent small efforts compound over time"]
    D --> D1["Sustained progress derives from consistency"]
\`\`\`

### 3.7 Code Templates

Code snippets and templates can be stored as atoms. Whitespace formatting is preserved upon copying, maintaining code structure integrity.

### 3.8 Routines and Habits

Routine documentation captures standard procedures and habit sequences organized by context and time.

**Example:**
\`\`\`mermaid
flowchart LR
    A["Routines"]
    A --> B["Home Arrival Procedure"]
    B --> B1["Change clothes"]
    B --> B2["Wash hands"]
    B --> B3["Consume meal"]
    B --> B4["Initiate work session"]
    A --> C["Evening Routine - 22:00"]
    C --> C1["Open window for ventilation"]
    C --> C2["Take shower"]
    C --> C3["Prepare for sleep"]
\`\`\`

---

## Part 4: Best Practices and Guidelines

### 4.1 Atom Design

- **Completeness:** Each atom should represent a complete, meaningful concept
- **Specificity:** Avoid overly broad atoms that could be decomposed further
- **Clarity:** Titles should be immediately understandable without additional context
- **Reusability:** Design atoms for potential reuse in multiple contexts

### 4.2 Connection Strategy

- **Precision:** Create connections only where genuine semantic relationships exist
- **Directionality:** Maintain awareness of connection direction and logical flow
- **Density:** Avoid excessive connections that obscure meaningful relationships
- **Documentation:** Label or clarify complex relationship types when necessary

### 4.3 System Maintenance

- **Regular review:** Periodically assess atom organization and connection accuracy
- **Consolidation:** Merge redundant atoms to maintain non-duplication principle
- **Pruning:** Remove obsolete atoms and outdated connections
- **Versioning:** Consider maintaining historical versions of frequently-modified atoms

### 4.4 Customization

The guidelines provided in this documentation represent recommended practices. Users are encouraged to adapt the system structure to accommodate specific use cases, organizational preferences, and workflow requirements.

---

## Appendix: Keyboard Shortcuts

A comprehensive keyboard shortcut reference is available within the application's help menu. Users may enable learning mode to display available shortcuts during navigation.`;

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let pos = 0;
  while (pos < text.length) {
    if (text[pos] === "*" && text[pos + 1] === "*") {
      const end = text.indexOf("**", pos + 2);
      if (end !== -1) {
        nodes.push({ kind: "bold", text: text.slice(pos + 2, end) });
        pos = end + 2;
        continue;
      }
    }
    if (text[pos] === "`") {
      const end = text.indexOf("`", pos + 1);
      if (end !== -1) {
        nodes.push({ kind: "code", text: text.slice(pos + 1, end) });
        pos = end + 1;
        continue;
      }
    }
    let end = pos + 1;
    while (end < text.length) {
      if (text[end] === "*" && text[end + 1] === "*") break;
      if (text[end] === "`") break;
      end++;
    }
    const chunk = text.slice(pos, end);
    const last = nodes[nodes.length - 1];
    if (last && last.kind === "text") last.text += chunk;
    else nodes.push({ kind: "text", text: chunk });
    pos = end;
  }
  return nodes;
}

function parseMarkdown(md: string): Token[] {
  const lines = md.split("\n");
  const tokens: Token[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      const code = codeLines.join("\n").trim();
      tokens.push(lang === "mermaid" ? { type: "mermaid", code } : { type: "code", lang, code });
      continue;
    }

    if (trimmed.startsWith("#### ")) { const t = trimmed.slice(5); tokens.push({ type: "h4", text: t, id: slugify(t) }); i++; continue; }
    if (trimmed.startsWith("### "))  { const t = trimmed.slice(4); tokens.push({ type: "h3", text: t, id: slugify(t) }); i++; continue; }
    if (trimmed.startsWith("## "))   { const t = trimmed.slice(3); tokens.push({ type: "h2", text: t, id: slugify(t) }); i++; continue; }
    if (trimmed.startsWith("# "))    { const t = trimmed.slice(2); tokens.push({ type: "h1", text: t, id: slugify(t) }); i++; continue; }

    if (/^-{3,}$/.test(trimmed)) { tokens.push({ type: "hr" }); i++; continue; }

    if (trimmed.startsWith("- ")) {
      const items: InlineNode[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(parseInline(lines[i].trim().slice(2)));
        i++;
      }
      tokens.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\. /.test(trimmed)) {
      const items: InlineNode[][] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(parseInline(lines[i].trim().replace(/^\d+\. /, "")));
        i++;
      }
      tokens.push({ type: "ol", items });
      continue;
    }

    if (trimmed === "") { i++; continue; }

    tokens.push({ type: "p", nodes: parseInline(trimmed) });
    i++;
  }
  return tokens;
}

function getToc(tokens: Token[]): TocItem[] {
  return tokens
    .filter((t): t is HeadingToken => ["h1", "h2", "h3", "h4"].includes(t.type))
    .map((t) => ({ id: t.id, text: t.text, level: Number(t.type[1]) }));
}

// ─────────────────────────────────────────────────────────────────────────────
// MERMAID LOADER
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    mermaid?: {
      initialize: (config: any) => void;
      render: (id: string, code: string) => Promise<{ svg: string }>;
    };
  }
}

let _mermaidReady = false;
let _mermaidCallbacks: (() => void)[] = [];

function ensureMermaid(): void {
  if (_mermaidReady) return;
  if (document.querySelector('script[data-mermaid]')) return;
  const script = document.createElement("script");
  script.setAttribute("data-mermaid", "1");
  script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
  script.onload = () => {
    window.mermaid?.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        background: "#07101E",
        primaryColor: "#112035",
        primaryBorderColor: "#1E3557",
        primaryTextColor: "#C8D8F0",
        lineColor: "#C8820A",
        edgeLabelBackground: "#07101E",
        secondaryColor: "#0C1A2E",
        tertiaryColor: "#060E1A",
        fontFamily: "Lora, Georgia, serif",
      },
      flowchart: { curve: "basis", htmlLabels: true },
    });
    _mermaidReady = true;
    _mermaidCallbacks.forEach((cb) => cb());
    _mermaidCallbacks = [];
  };
  document.head.appendChild(script);
}

let _diagCount = 0;

interface MermaidDiagramProps {
  code: string;
}

function MermaidDiagram({ code }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const id = useRef<string>(`mdiag-${++_diagCount}`).current;

  useEffect(() => {
    const render = () => {
      window.mermaid
        ?.render(id, code)
        .then(({ svg: s }) => setSvg(s))
        .catch((e: Error) => setErr(String(e)));
    };
    if (_mermaidReady) render();
    else { _mermaidCallbacks.push(render); ensureMermaid(); }
    return () => { _mermaidCallbacks = _mermaidCallbacks.filter((cb) => cb !== render); };
  }, [code, id]);

  return (
    <div style={{
      background: "linear-gradient(135deg, #07101E 0%, #0A1628 100%)",
      border: "1px solid #1A3050",
      borderRadius: "10px",
      padding: "28px 20px",
      margin: "20px 0 28px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80px",
      overflow: "auto",
      boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(200,130,10,0.08)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: "10px", right: "14px",
        fontSize: "9px", letterSpacing: "0.12em",
        color: "#2A4060", fontFamily: "'JetBrains Mono', monospace",
        textTransform: "uppercase",
      }}>diagram</div>
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} style={{ maxWidth: "100%" }} />
      ) : err ? (
        <div style={{ color: "#F87171", fontSize: "12px", fontFamily: "monospace" }}>
          ⚠ {err}
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#2A4060" }}>
          <div style={{
            width: "16px", height: "16px",
            border: "2px solid #1A3050", borderTopColor: "#C8820A",
            borderRadius: "50%", animation: "strukt-spin 0.9s linear infinite",
          }} />
          <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
            rendering…
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE TEXT RENDERER
// ─────────────────────────────────────────────────────────────────────────────
interface InlineTextProps {
  nodes: InlineNode[];
}

function InlineText({ nodes }: InlineTextProps) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.kind === "bold") {
          return (
            <strong key={i} style={{ color: "#E0EDFF", fontWeight: 600, fontFamily: "'Fraunces', Georgia, serif" }}>
              {n.text}
            </strong>
          );
        }
        if (n.kind === "code") {
          return (
            <code key={i} style={{
              background: "#0C1828", color: "#7EC8E3",
              border: "1px solid #1A3050", padding: "1px 7px",
              borderRadius: "4px", fontSize: "0.83em",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              letterSpacing: "-0.01em",
            }}>
              {n.text}
            </code>
          );
        }
        return <span key={i}>{n.text}</span>;
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN RENDERER
// ─────────────────────────────────────────────────────────────────────────────
const S = {
  h1: {
    fontFamily: "'Fraunces', 'Times New Roman', serif",
    fontSize: "clamp(1.9rem, 4vw, 2.5rem)", fontWeight: 700,
    color: "#EEF4FF", lineHeight: 1.15, margin: "0 0 6px",
    letterSpacing: "-0.035em",
  },
  h2: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", fontWeight: 600,
    color: "#D8E8FF", lineHeight: 1.3,
    margin: "0 0 18px", padding: "40px 0 18px",
    borderBottom: "1px solid #122035",
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: "'Fraunces', Georgia, serif",
    fontSize: "clamp(1rem, 1.8vw, 1.2rem)", fontWeight: 600,
    color: "#B8CCE8", lineHeight: 1.35,
    margin: "36px 0 14px", letterSpacing: "-0.01em",
  },
  h4: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.72rem", fontWeight: 500,
    color: "#5A7A9A", lineHeight: 1.4,
    margin: "28px 0 10px", textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
  },
  p: {
    color: "#8CA0BC", lineHeight: 1.85,
    margin: "0 0 18px", fontSize: "0.975rem",
    fontFamily: "'Lora', Georgia, serif",
  },
};

interface TokenListProps {
  tokens: Token[];
}

function TokenList({ tokens }: TokenListProps) {
  return (
    <>
      {tokens.map((tok, i) => {
        switch (tok.type) {
          case "h1": return <h1 key={i} id={tok.id} style={S.h1}>{tok.text}</h1>;
          case "h2": return <h2 key={i} id={tok.id} style={S.h2}>{tok.text}</h2>;
          case "h3": return <h3 key={i} id={tok.id} style={S.h3}>{tok.text}</h3>;
          case "h4": return <h4 key={i} id={tok.id} style={S.h4}>{tok.text}</h4>;

          case "p":
            return (
              <p key={i} style={S.p}>
                <InlineText nodes={tok.nodes} />
              </p>
            );

          case "hr":
            return (
              <div key={i} style={{ margin: "44px 0", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #1A3050)" }} />
                <div style={{ width: "5px", height: "5px", background: "#C8820A", borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #1A3050, transparent)" }} />
              </div>
            );

          case "mermaid":
            return <MermaidDiagram key={i} code={tok.code} />;

          case "code":
            return (
              <pre key={i} style={{
                background: "#07101E", border: "1px solid #122035",
                borderRadius: "8px", padding: "20px 22px",
                overflow: "auto", margin: "6px 0 24px",
                fontSize: "0.83rem", lineHeight: 1.75,
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
              }}>
                <code style={{ color: "#7EC8E3", fontFamily: "'JetBrains Mono', monospace" }}>
                  {tok.code}
                </code>
              </pre>
            );

          case "ul":
            return (
              <ul key={i} style={{ listStyle: "none", padding: 0, margin: "4px 0 20px" }}>
                {tok.items.map((item, j) => (
                  <li key={j} style={{
                    display: "flex", gap: "13px", marginBottom: "10px",
                    color: "#8CA0BC", lineHeight: 1.75, fontSize: "0.975rem",
                    fontFamily: "'Lora', Georgia, serif",
                  }}>
                    <span style={{
                      color: "#C8820A", flexShrink: 0, marginTop: "6px",
                      fontSize: "8px", letterSpacing: "0",
                    }}>◆</span>
                    <span><InlineText nodes={item} /></span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} style={{ listStyle: "none", padding: 0, margin: "4px 0 20px" }}>
                {tok.items.map((item, j) => (
                  <li key={j} style={{
                    display: "flex", gap: "14px", marginBottom: "10px",
                    color: "#8CA0BC", lineHeight: 1.75, fontSize: "0.975rem",
                    fontFamily: "'Lora', Georgia, serif", alignItems: "flex-start",
                  }}>
                    <span style={{
                      color: "#C8820A", flexShrink: 0, paddingTop: "1px",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
                      minWidth: "22px",
                    }}>
                      {String(j + 1).padStart(2, "0")}.
                    </span>
                    <span><InlineText nodes={item} /></span>
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR TOC
// ─────────────────────────────────────────────────────────────────────────────
interface SidebarTocProps {
  toc: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
  progress: number;
}

function SidebarToc({ toc, activeId, onSelect, progress }: SidebarTocProps) {
  const activeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <aside style={{
      width: "268px", flexShrink: 0,
      background: "linear-gradient(180deg, #050D19 0%, #06101C 100%)",
      borderRight: "1px solid #0E1E30",
      display: "flex", flexDirection: "column",
      height: "100%", overflow: "hidden",
      position: "relative",
    }}>
      {/* Ambient glow top */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "180px", height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(200,130,10,0.4), transparent)",
      }} />

      {/* Header */}
      <div style={{ padding: "28px 22px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "6px" }}>
          <div style={{
            width: "32px", height: "32px", flexShrink: 0,
            background: "linear-gradient(135deg, #C8820A 0%, #8A5500 100%)",
            borderRadius: "7px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 12px rgba(200,130,10,0.35)",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="9" y="2" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
              <rect x="2" y="9" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
              <rect x="9" y="9" width="5" height="5" rx="1" fill="white" fillOpacity="0.3" />
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "0.95rem", fontWeight: 600,
              color: "#D8E8FF", letterSpacing: "-0.015em", lineHeight: 1.2,
            }}>Strukt</div>
            <div style={{
              fontSize: "10px", color: "#2A4A66",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.06em",
            }}>Documentation</div>
          </div>
        </div>

        {/* Reading progress */}
        <div style={{ marginTop: "16px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontSize: "9px", color: "#2A4060",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.08em", marginBottom: "5px",
          }}>
            <span>PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{
            height: "2px", background: "#0E1E30",
            borderRadius: "2px", overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #C8820A, #E8A020)",
              borderRadius: "2px",
              transition: "width 0.3s ease",
              boxShadow: "0 0 6px rgba(200,130,10,0.5)",
            }} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #0E1E30, transparent)", margin: "0 22px" }} />

      {/* TOC label */}
      <div style={{
        padding: "14px 22px 8px",
        fontSize: "9px", color: "#1E3550",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.12em", textTransform: "uppercase",
      }}>Contents</div>

      {/* TOC items */}
      <nav style={{ flex: 1, overflowY: "auto", paddingBottom: "24px" }}>
        {toc.map((item) => {
          const isActive = item.id === activeId;
          const indent = (item.level - 1) * 11;
          const isH1 = item.level === 1;
          const isH2 = item.level === 2;
          const isH3 = item.level === 3;

          return (
            <button
              key={item.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(item.id)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: isActive ? "rgba(200,130,10,0.07)" : "transparent",
                border: "none",
                borderLeft: `2px solid ${isActive ? "#C8820A" : "transparent"}`,
                padding: `${isH1 ? 8 : isH2 ? 6 : 5}px 20px ${isH1 ? 8 : 6}px ${20 + indent}px`,
                cursor: "pointer",
                color: isActive ? "#C8820A" : isH1 ? "#A8C0DC" : isH2 ? "#607888" : isH3 ? "#425568" : "#303E4E",
                fontSize: isH1 ? "0.8rem" : isH2 ? "0.76rem" : "0.7rem",
                fontFamily: isH1 ? "'Fraunces', Georgia, serif" : "'Lora', Georgia, serif",
                fontWeight: isH1 ? 600 : isH2 ? 500 : 400,
                lineHeight: 1.45,
                transition: "color 0.15s, background 0.15s, border-color 0.15s",
              }}
            >
              {item.text}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: "14px 22px",
        borderTop: "1px solid #0E1E30",
        fontSize: "9px", color: "#1A2E40",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.06em",
        display: "flex", justifyContent: "space-between",
      }}>
        <span>v1.0</span>
        <span>May 2026</span>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Documentation() {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const tokens = useMemo(() => parseMarkdown(MARKDOWN), []);
  const toc = useMemo(() => getToc(tokens), [tokens]);

  // Inject styles + fonts
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700&family=Lora:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
      @keyframes strukt-spin { to { transform: rotate(360deg); } }
      .strukt-scroll::-webkit-scrollbar { width: 5px; }
      .strukt-scroll::-webkit-scrollbar-track { background: transparent; }
      .strukt-scroll::-webkit-scrollbar-thumb { background: #0E1E30; border-radius: 3px; }
      .strukt-scroll::-webkit-scrollbar-thumb:hover { background: #1A3050; }
      .strukt-content a { color: #C8820A; }
    `;
    document.head.appendChild(style);
    ensureMermaid();
  }, []);

  // Scroll tracking
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Active heading via IntersectionObserver
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { root, threshold: 0, rootMargin: "-8% 0px -75% 0px" }
    );
    const timer = setTimeout(() => {
      root.querySelectorAll("h1[id],h2[id],h3[id],h4[id]").forEach((el) => observer.observe(el));
    }, 200);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [tokens]);

  const scrollTo = useCallback((id: string) => {
    const el = contentRef.current?.querySelector(`#${id}`);
    const container = contentRef.current;
    if (el && container) {
      const offset = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 72;
      container.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: "#07101E", color: "#8CA0BC",
      fontFamily: "'Lora', Georgia, serif",
    }}>
      {/* Sidebar */}
      <SidebarToc toc={toc} activeId={activeId} onSelect={scrollTo} progress={progress} />

      {/* Content */}
      <main
        ref={contentRef}
        className="strukt-scroll"
        style={{ flex: 1, overflowY: "auto", height: "100%" }}
      >
        {/* Top accent bar */}
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, #C8820A 0%, rgba(200,130,10,0.3) 60%, transparent 100%)",
          position: "sticky", top: 0, zIndex: 10,
        }} />

        <div style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "60px clamp(24px, 5vw, 64px) 120px",
        }}>
          {/* Subtitle row under h1 */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginBottom: "40px",
          }}>
            <div style={{
              fontSize: "10px", color: "#2A4060",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Zettelkasten · Knowledge System
            </div>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #1A3050, transparent)" }} />
          </div>

          <TokenList tokens={tokens} />

          {/* Footer */}
          <div style={{
            marginTop: "80px", paddingTop: "28px",
            borderTop: "1px solid #0E1E30",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            color: "#1E3450", fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em",
          }}>
            <span>STRUKT DOCUMENTATION · v1.0</span>
            <span>© May 2026</span>
          </div>
        </div>
      </main>
    </div>
  );
}