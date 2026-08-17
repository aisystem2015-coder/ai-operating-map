"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SectionReveal from "../learning/SectionReveal";

const diagram = `
graph TD
  %% STYLES
  classDef brain fill:#fff7ed,stroke:#f97316,stroke-width:3px,color:#9a3412
  classDef memory fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e40af
  classDef tool fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#166534
  classDef trigger fill:#f3e8ff,stroke:#a855f7,stroke-width:2px,color:#6b21a8

  %% NODES
  User(["User / Trigger"]):::trigger
  Agent_Core{{"The Agent / Brain"}}:::brain

  subgraph Memory_System ["Memory System"]
      ShortTerm["Context Window<br/>(Current Chat)"]:::memory
      LongTerm[("Vector DB<br/>Long Term Memory")]:::memory
  end

  subgraph Knowledge_System ["The Library"]
      Docs["PDFs / Text Files"]:::memory
      Embeddings["Embeddings Model"]:::memory
  end

  subgraph Tool_System ["The Hands"]
      Schema["Schema<br/>(Instruction Manual)"]:::tool
      API_Layer["API Interface<br/>(The Waiter)"]:::tool
      External_App["External App<br/>(CRM, Jira, Excel)"]:::tool
  end

  %% CONNECTIONS
  User -->|"1. Input (Text/Webhook)"| Agent_Core

  Agent_Core <-->|"2. Read/Write"| ShortTerm
  Agent_Core <-->|"3. Semantic Search"| LongTerm

  Docs -.->|"Chunk & Embed"| Embeddings
  Embeddings -.->|"Store Vectors"| LongTerm

  Agent_Core --"4. Select Tool via Schema"--> Schema
  Schema -.-> API_Layer
  Agent_Core --"5. API Call (JSON)"--> API_Layer
  API_Layer --"6. POST Request"--> External_App
  External_App --"7. Return Response"--> API_Layer
  API_Layer --"8. Parse Data"--> Agent_Core

  Agent_Core -->|"9. Final Output"| User
`;

type Overlay = {
  id: string;
  top: string;
  left: string;
  width?: string;
  height?: string;
  title: string;
  what: string;
  not: string;
  matters: string;
};

const overlays: Overlay[] = [
  {
    id: "user",
    title: "User / Trigger",
    top: "14%",
    left: "50%",
    width: "12%",
    height: "7%",
    what: "Starts the workflow with a prompt or event (text, form, webhook).",
    not: "Not the agent. Not an automatic decision maker.",
    matters: "Defines intent and provides the initial input the system can act on.",
  },
  {
    id: "agent",
    title: "The Agent / Brain (LLM)",
    top: "30%",
    left: "48%",
    width: "18%",
    height: "10%",
    what: "Interprets instructions, plans steps, and translates results into human language.",
    not: "Not a database. Not a source of truth. Does not execute actions by itself.",
    matters: "Provides reasoning that selects what to do next inside constraints.",
  },
  {
    id: "context",
    title: "Context Window (Current Chat)",
    top: "60%",
    left: "60%",
    width: "18%",
    height: "10%",
    what: "Holds short-term conversation context for coherence in this session.",
    not: "Not long-term memory. Not guaranteed to persist.",
    matters: "Prevents the agent from resetting on every message.",
  },
  {
    id: "vector",
    title: "Vector DB (Long Term Memory)",
    top: "56%",
    left: "82%",
    width: "18%",
    height: "10%",
    what: "Stores embeddings for semantic retrieval of past knowledge and context.",
    not: "Not a factual system of record. Not perfect recall.",
    matters: "Enables recall across time and improves relevance during multi-step work.",
  },
  {
    id: "library",
    title: "The Library (PDFs / Text Files)",
    top: "18%",
    left: "84%",
    width: "14%",
    height: "9%",
    what: "Source documents for business knowledge the agent can retrieve from.",
    not: "Not model training. Not automatically understood unless processed.",
    matters: "Keeps answers grounded in company-specific material.",
  },
  {
    id: "chunk-embed",
    title: "Chunk & Embed",
    top: "26%",
    left: "84%",
    width: "12%",
    height: "3%",
    what: "Splits documents and converts them into embeddings for retrieval.",
    not: "Not summarization. Not upload-and-done.",
    matters: "Makes large document sets searchable by meaning.",
  },
  {
    id: "embeddings-model",
    title: "Embeddings Model",
    top: "34%",
    left: "84%",
    width: "12%",
    height: "3%",
    what: "Converts text chunks into vector representations (numbers).",
    not: "Not the LLM brain. Not a reasoning engine.",
    matters: "Powers semantic search that feeds relevant context into the agent.",
  },
  {
    id: "schema",
    title: "Schema (Instruction Manual)",
    top: "50%",
    left: "24%",
    width: "16%",
    height: "9%",
    what: "Defines tool purpose, required inputs, allowed values, and outputs.",
    not: "Not the tool itself. Not optional for reliable execution.",
    matters: "Constrains the agent so tool calls are valid and predictable.",
  },
  {
    id: "api",
    title: "API Interface (The Waiter)",
    top: "70%",
    left: "36%",
    width: "18%",
    height: "10%",
    what: "Sends requests (GET/POST) to external systems and returns responses, usually JSON.",
    not: "Not the external system. Not human language by default.",
    matters: "Bridges reasoning with real system execution.",
  },
  {
    id: "external",
    title: "External App (CRM, Jira, Excel)",
    top: "86%",
    left: "32%",
    width: "18%",
    height: "10%",
    what: "The real system where actions happen and state changes.",
    not: "Not controlled by the LLM directly. Not always reversible.",
    matters: "This is where operational work is completed and recorded.",
  },
  {
    id: "select-tool",
    title: "Select Tool via Schema",
    top: "44%",
    left: "22%",
    width: "12%",
    height: "3%",
    what: "Chooses the correct tool by reading schemas and matching intent.",
    not: "Not guessing. Not free-form execution.",
    matters: "Prevents the agent from calling the wrong tool.",
  },
  {
    id: "api-call",
    title: "API Call (JSON)",
    top: "58%",
    left: "38%",
    width: "12%",
    height: "3%",
    what: "Sends structured, typed data to a tool.",
    not: "Not natural language. Not a chat action.",
    matters: "Reliable execution requires structured inputs.",
  },
  {
    id: "post-request",
    title: "POST Request",
    top: "82%",
    left: "30%",
    width: "12%",
    height: "3%",
    what: "Creates or updates something (send email, create ticket, write row).",
    not: "Not read-only.",
    matters: "This is how the agent changes system state.",
  },
  {
    id: "return-response",
    title: "Return Response",
    top: "82%",
    left: "44%",
    width: "12%",
    height: "3%",
    what: "Returns machine output such as status codes, IDs, or payloads.",
    not: "Not user-ready explanation.",
    matters: "Confirms what actually happened.",
  },
  {
    id: "parse-data",
    title: "Parse Data",
    top: "56%",
    left: "50%",
    width: "12%",
    height: "3%",
    what: "Extracts key fields from responses such as IDs, statuses, or values.",
    not: "Not understanding by itself.",
    matters: "Turns raw outputs into traceable results.",
  },
  {
    id: "final-output",
    title: "Final Output",
    top: "12%",
    left: "72%",
    width: "12%",
    height: "3%",
    what: "Presents the final answer and summarizes actions taken.",
    not: "Not the execution itself.",
    matters: "Makes outcomes clear, visible, and verifiable.",
  },
];

export default function AgentsSection() {
  const [active, setActive] = useState<string | null>(null);
  const diagramRef = useRef<HTMLDivElement | null>(null);
  const content = useMemo(() => overlays.find((o) => o.id === active), [active]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const mermaid = (await import("mermaid")).default;
      if (cancelled) return;
      mermaid.initialize({ startOnLoad: false, theme: "base", securityLevel: "loose" });
      if (!diagramRef.current) return;
      try {
        const { svg } = await mermaid.render("unified-agent-diagram", diagram);
        if (cancelled) return;
        diagramRef.current.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid render failed", err);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="agents-section" className="py-32 px-6 lg:px-8 bg-white/30">
      <div className="max-w-6xl mx-auto space-y-16">
        <div id="agents" className="h-0" aria-hidden />

        <SectionReveal>
          <div className="space-y-6 text-center">
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
              Agents: Where Reasoning Meets Execution
            </h2>
            <p className="text-lg md:text-xl text-secondary max-w-4xl mx-auto">
              An agent is a digital worker: a governed system that uses an LLM to reason but exists to take action.
              Unlike a chatbot that only talks, and unlike brittle automation that breaks outside a script, an agent
              reasons, decides, and safely executes on your behalf.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                The Blueprint of an AI Agent
              </h3>
              <p className="text-lg text-secondary max-w-4xl mx-auto">
                An agent is not magic and not just a model. Intelligence emerges from the orchestration of memory,
                knowledge, tools, and execution. The model reasons, but capability comes from how those parts are wired
                together.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-white via-white to-slate-50 shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.08),transparent_30%)]" />
              <div className="relative px-6 pt-8 pb-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-foreground">Unified agent blueprint</div>
                  <p className="text-sm text-secondary">Input → reasoning → memory/knowledge → schema → API → system → output.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Hover a region to see what it does.
                </div>
              </div>

              <div className="relative">
                <div
                  ref={diagramRef}
                  className="pointer-events-none select-none [&_svg]:w-full [&_svg]:h-auto"
                  aria-label="Unified agent diagram"
                />

                <div className="pointer-events-none absolute inset-0">
                  {overlays.map((item) => (
                    <div
                      key={item.id}
                      className="absolute"
                      style={{
                        top: item.top,
                        left: item.left,
                        transform: "translate(-50%, -50%)",
                        width: item.width ?? "18%",
                        height: item.height ?? "10%",
                      }}
                    >
                      <div
                        className="w-full h-full rounded-lg border border-transparent transition shadow-[0_0_0_0_rgba(0,0,0,0)] pointer-events-auto cursor-pointer hover:shadow-[0_0_0_3px_rgba(99,102,241,0.3)]"
                        onMouseEnter={() => setActive(item.id)}
                        onMouseLeave={() => setActive((prev) => (prev === item.id ? null : prev))}
                        onFocus={() => setActive(item.id)}
                        onBlur={() => setActive((prev) => (prev === item.id ? null : prev))}
                      />
                    </div>
                  ))}
                </div>

                {content && (
                  <div className="absolute z-20 right-4 top-4 w-80 max-w-full rounded-2xl border border-black/10 bg-white shadow-xl p-4">
                    <div className="text-sm font-semibold text-foreground mb-3">{content.title}</div>
                    <div className="space-y-3 text-sm text-secondary leading-relaxed">
                      <div>
                        <div className="font-semibold text-foreground mb-1">What it does</div>
                        <p>{content.what}</p>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground mb-1">What it is not</div>
                        <p>{content.not}</p>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground mb-1">Why it matters</div>
                        <p>{content.matters}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center space-y-3">
              <p className="text-lg text-secondary">
                Flow the loop in plain language: input arrives from a user or system trigger, the agent reasons, pulls
                context and knowledge, selects tools through schemas, executes via APIs, interprets the structured
                results, and delivers a final output—then repeats until the job is done.
              </p>
              <p className="text-sm text-secondary">Each arrow is a governed handoff that keeps the agent coherent and safe.</p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                How Reasoning Becomes Real-World Action
              </h3>
              <p className="text-lg text-secondary max-w-4xl mx-auto">
                Reasoning happens in natural language, but the real world runs on structured data. Web calls, APIs, and
                tools (via schemas) are the bridge between the agent’s thoughts and your systems. Without them, the loop
                collapses back into a chatbot that can only talk.
              </p>
              <div className="max-w-3xl mx-auto rounded-2xl border border-black/5 bg-gradient-to-r from-amber-50 to-white p-4 text-lg font-semibold text-foreground shadow-sm">
                Web + APIs + schemas + tools are the bridge between reasoning and reality.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-foreground">
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm">Agents are not chatbots</span>
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm">Intelligence alone does nothing</span>
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm">Execution requires structure</span>
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm">Web + APIs + tools = action</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70 pointer-events-none" />
                <div className="relative space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                    Waiter analogy
                  </div>
                  <p className="text-lg font-semibold text-foreground">Agents don’t click buttons—they send structured requests.</p>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-foreground/60" />
                      <span>The user or agent is the customer placing an order.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-foreground/60" />
                      <span>The API is the waiter that carries the request and returns the response.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-foreground/60" />
                      <span>The server or system is the kitchen executing the order with deterministic steps.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-slate-900 text-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-300">Structured request/response</div>
                  <span className="rounded-full bg-blue-200/20 text-blue-200 px-3 py-1 text-xs font-semibold">No magic in between</span>
                </div>
                <div className="space-y-4 text-sm font-mono leading-6">
                  <div>
                    <div className="text-slate-300 text-xs mb-1">Request</div>
                    <pre className="bg-slate-800/80 rounded-xl p-3 overflow-x-auto text-blue-100">
{`{
  "action": "create_ticket",
  "inputs": {
    "title": "Customer cannot log in",
    "severity": "high",
    "assignee": "oncall-app-team"
  }
}`}
                    </pre>
                  </div>
                  <div>
                    <div className="text-slate-300 text-xs mb-1">Response</div>
                    <pre className="bg-slate-800/80 rounded-xl p-3 overflow-x-auto text-blue-100">
{`{
  "status": "success",
  "ticketId": "JIRA-4821",
  "next": "notify_channel"
}`}
                    </pre>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-300">
                  Inputs go in, outputs come back. The execution path is deterministic, not probabilistic.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-black/5 bg-white shadow-sm p-6 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">
                  Schemas as instruction manuals
                </div>
                <h4 className="text-xl font-semibold text-foreground">A one-page instruction manual that tells the agent how to use a tool.</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-foreground/60" />
                    <span>What the tool does</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-foreground/60" />
                    <span>What inputs it expects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-foreground/60" />
                    <span>What outputs it returns</span>
                  </li>
                </ul>
                <p className="text-sm text-foreground">
                  Without schemas, the agent cannot safely act. Most failures come from bad or missing schemas, not weak models.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-black/5 bg-white shadow-sm p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">API</span>
                    <span className="text-[10px] uppercase tracking-wide text-secondary">Hover / Expand</span>
                  </div>
                  <div className="space-y-2 text-xs text-secondary">
                    <div>
                      <div className="font-semibold text-foreground mb-1">What it does</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Transmits structured requests</li>
                        <li>Returns machine-readable responses</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">What it is not</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Not reasoning</li>
                        <li>Not decision-making</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Why it matters</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>APIs are how agents interact with real systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/5 bg-white shadow-sm p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Web</span>
                    <span className="text-[10px] uppercase tracking-wide text-secondary">Hover / Expand</span>
                  </div>
                  <div className="space-y-2 text-xs text-secondary">
                    <div>
                      <div className="font-semibold text-foreground mb-1">What it does</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Fetches data from public or internal endpoints</li>
                        <li>Handles auth, headers, and rate limits</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">What it is not</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Not scraping buttons</li>
                        <li>Not ungoverned browsing</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Why it matters</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Web access widens context and enables fresh data retrieval</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/5 bg-white shadow-sm p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Schema</span>
                    <span className="text-[10px] uppercase tracking-wide text-secondary">Hover / Expand</span>
                  </div>
                  <div className="space-y-2 text-xs text-secondary">
                    <div>
                      <div className="font-semibold text-foreground mb-1">What it does</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Defines tool inputs and outputs</li>
                        <li>Constrains how tools can be used</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">What it is not</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Not business logic</li>
                        <li>Not execution</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Why it matters</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Schemas prevent hallucinated actions and enforce safety</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.22}>
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">The Anatomy of a Tool</h3>
            <p className="text-lg text-secondary">
              A tool is a function plus an API wrapper: a deterministic action path the agent can call. The agent never
              clicks buttons—it selects a tool through its schema, hands off structured inputs, and receives structured
              outputs.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.32}>
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h3 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">Agent Examples</h3>
              <p className="text-lg text-secondary max-w-4xl mx-auto">
                Each example is a direct application of the blueprint above—reasoning plus memory, schemas, and APIs
                delivering real execution.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: "Placeholder example 1", description: "Swap in your own: map the blueprint to an internal copilot." },
                {
                  title: "Placeholder example 2",
                  description: "Swap in your own: background automation that listens to triggers and acts.",
                },
                { title: "Placeholder example 3", description: "Swap in your own: customer-facing agent with governed tool use." },
              ].map((example) => (
                <div
                  key={example.title}
                  className="rounded-2xl border border-black/5 bg-white/70 shadow-sm p-6 text-left space-y-2"
                >
                  <div className="text-lg font-semibold text-foreground">{example.title}</div>
                  <p className="text-sm text-secondary">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}