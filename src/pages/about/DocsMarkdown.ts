import type { DocSection } from "./Documentation";

export const DocsMarkdown: DocSection[] = [
  {
    label: "Getting Started",
    icon: "🚀",
    children: [
      {
        label: "Introduction",
        content: `Strukt is a structured information management system based on Zettelkasten principles. This documentation provides comprehensive guidance on implementing and utilizing the system for organizing knowledge, planning, and information retrieval.`
      },
      {
        label: "Core Concepts",
        content: `### 1.1 Atomicity
 
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
`
      }
    ]
  },
  {
    label: "Usage",
    icon: "🚀",
    children: [
      {
        label: "Introduction2",
        content: `# Introduction`
      }
    ]
  }
];