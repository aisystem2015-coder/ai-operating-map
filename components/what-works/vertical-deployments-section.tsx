"use client";

import SectionReveal from "../learning/SectionReveal";
import MatrixGrid from "../charts/MatrixGrid";

const stackColumns = [
  { id: "examples", label: "Examples (2026)" },
  { id: "role", label: "Role" },
];

const stackRows = [
  { label: "Reasoning", cells: { examples: { primary: "Claude Sonnet 4.6 / Opus 4.8 / Fable 5, GPT-5, Gemini 2.5 Ultra" }, role: { primary: "Turns intent into structured decisions" } } },
  { label: "Memory", cells: { examples: { primary: "Qdrant, Pinecone, Weaviate, pgvector" }, role: { primary: "Domain knowledge retrieval — long-term memory" } } },
  { label: "Connectivity (MCP)", cells: { examples: { primary: "Google Drive, Airtable, Slack, Notion, GitHub, SAP, Salesforce" }, role: { primary: "Tool access — 300+ connectors" } } },
  { label: "Orchestration", cells: { examples: { primary: "n8n, LangGraph, CrewAI, Relevance AI, Claude Code" }, role: { primary: "Sequences tasks, handles retries and handoffs" } } },
  { label: "Interfaces", cells: { examples: { primary: "Slack bot, dashboard, email, API response, Telegram" }, role: { primary: "Where humans and agents exchange approvals" } } },
];

export default function VerticalDeploymentsSection() {
  return (
    <div className="max-w-6xl mx-auto mt-16 space-y-10">
      <SectionReveal>
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            Where agentic systems specialize
          </p>
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            Vertical AI: agentic systems built for one domain
          </h3>
          <p className="text-secondary leading-relaxed">
            A generic agentic system knows how to coordinate. A <em>vertical</em> one also knows your
            products, your KPIs, and your workflows — that&apos;s what makes it compound instead of
            just assist. See the generic-vs-vertical distinction and real production deployments
            across Operations, Supply Chain, Support, Finance, Legal, and Marketing on{" "}
            <a href="/#vertical-ai-examples" className="text-accent underline underline-offset-4 font-medium">
              the home page
            </a>.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="space-y-4">
          <h4 className="text-xl font-heading font-semibold text-foreground text-center">
            The 2026 vertical AI stack
          </h4>
          <MatrixGrid columns={stackColumns} rows={stackRows} />
        </div>
      </SectionReveal>
    </div>
  );
}
