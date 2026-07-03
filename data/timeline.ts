export interface TimelineNode {
  period: string;
  title: string;
  whatChanged: string;
  whatCompaniesShouldDo: string;
  whatNotToChase: string;
}

export const MATURITY_TIMELINE: TimelineNode[] = [
  {
    period: "2017–2019",
    title: "The Architecture That Changed Everything",
    whatChanged:
      "Google's 'Attention Is All You Need' (2017) introduced Transformers — the engine behind every modern LLM. BERT showed bidirectional understanding; GPT-1/2 showed generative scale. AI shifted from narrow task-specific models to general-purpose language systems. Training costs were still prohibitive for most companies.",
    whatCompaniesShouldDo:
      "Watch and understand. Start auditing your data assets. Begin tagging and structuring internal knowledge. The companies that won later started data hygiene work here.",
    whatNotToChase:
      "Don't build your own Transformer from scratch. Don't confuse NLP tools of this era (BERT classifiers) with what was coming. This was a research moment, not a deployment moment.",
  },
  {
    period: "2020–2022",
    title: "Foundation Models: Scale Changes Everything",
    whatChanged:
      "GPT-3 (2020) proved scale unlocked emergent capabilities. 175 billion parameters gave the world a model that could reason, write, and code — all from natural language. OpenAI, Google, Meta, and Anthropic entered an acceleration race. The interface between humans and machines changed permanently: no more forms, no more commands.",
    whatCompaniesShouldDo:
      "Start experimenting with LLMs for internal use: documentation, summarization, code generation. Build data foundations and governance frameworks. Pilot the concept of prompt engineering. Form an AI working group.",
    whatNotToChase:
      "Don't build your own LLM — the economics make no sense. Don't replace existing systems prematurely. Don't ignore data quality — it becomes the critical blocker at every future stage.",
  },
  {
    period: "2023",
    title: "ChatGPT Effect + Copilots at Work",
    whatChanged:
      "ChatGPT crossed 100 million users in 60 days — the fastest consumer product adoption ever. Microsoft embedded GPT-4 into Office, GitHub Copilot hit 1M+ developers. Vector databases (Pinecone, Weaviate, Chroma) made company-specific knowledge accessible to LLMs without fine-tuning. Claude 1 and 2 introduced constitutional AI and longer context windows (100K tokens).",
    whatCompaniesShouldDo:
      "Deploy GitHub Copilot for developers. Build your first RAG (Retrieval-Augmented Generation) pipeline on internal documentation. Start vertical AI pilots in one department. Establish AI governance and risk frameworks before scaling.",
    whatNotToChase:
      "Don't build generic 'AI assistants' that try to do everything for everyone. Don't skip vector databases and rely only on model fine-tuning. Don't automate everything — start with high-value, low-risk tasks.",
  },
  {
    period: "2024",
    title: "Agents and the Multi-Model Ecosystem",
    whatChanged:
      "LLMs became agents: models calling tools, executing code, browsing the web, managing files. GPT-4o, Claude 3 Opus/Sonnet/Haiku, Gemini 1.5, and open-source Llama 3 created a multi-model world. Anthropic introduced Claude.ai Projects and long-context (200K tokens). LangChain, LangGraph, and CrewAI popularized multi-agent orchestration. The cost of inference dropped 90%+ year-over-year.",
    whatCompaniesShouldDo:
      "Scale successful RAG pilots to full production. Deploy agents for routine operations with human oversight. Start building multi-agent systems for complex workflows. Measure operational impact — not AI metrics.",
    whatNotToChase:
      "Don't over-automate — some decisions need human judgment. Don't skip monitoring and observability. Don't chase the latest model releases — focus on system reliability and integration quality.",
  },
  {
    period: "2025",
    title: "Agentic AI + The Open-Source Surge",
    whatChanged:
      "Anthropic launched Claude 3.5/3.7 with extended thinking and computer-use. DeepSeek R1 (open-source) matched frontier models at a fraction of the cost, sparking an open-source acceleration. Google Gemini 2.0 Flash and Ultra pushed multimodal limits. Cursor and Claude Code changed how software is built — 'vibe coding' became a real workflow. MCP (Model Context Protocol) emerged as the open standard for connecting AI to tools. SWE-bench scores passed 50% for coding agents. Multi-agent orchestration frameworks (n8n, LangGraph, CrewAI) matured into production-ready systems.",
    whatCompaniesShouldDo:
      "Adopt MCP to standardize how your AI connects to tools. Evaluate where agentic systems (not just chat) can run routine operations end-to-end. Build internal agents for knowledge management, content ops, and data workflows. Use open-source models where cost or privacy matters.",
    whatNotToChase:
      "Don't deploy agents without observability and kill switches. Don't mistake vibe coding for a replacement for engineering discipline. Don't adopt every new model — the gap between frontier and second-tier has narrowed enough that stability > novelty.",
  },
  {
    period: "2026 — Now",
    title: "The Agentic Workforce Era",
    whatChanged:
      "AI is no longer a tool — it is a workforce layer. Claude 4 family (Sonnet 4.6, Opus 4.8, Fable 5) delivers reasoning at enterprise scale. GPT-5 and o3-level reasoning models handle complex multi-step analysis. Physical AI (Figure, Apptronik, Tesla Optimus) brings reasoning to robots. On-device models (Apple Intelligence, Qualcomm NPUs) make AI private and instant. The Model Context Protocol ecosystem now includes 300+ connectors — from Slack to SAP to proprietary databases. Companies that treat AI as infrastructure compound faster than those that treat it as a feature. The ops professional who can orchestrate AI agents is the most valuable person in the room.",
    whatCompaniesShouldDo:
      "Implement an 'agentic workforce' layer alongside your human one. Use MCP to wire AI into every internal system. Build AI agents that own end-to-end workflows — not just assist with tasks. Measure AI contributions in operational terms: time saved, errors eliminated, revenue unlocked.",
    whatNotToChase:
      "Don't build without constraints — autonomy without guardrails creates liability. Don't skip human-in-the-loop checkpoints for high-stakes decisions. Don't let AI ops become a shadow IT problem — govern it like infrastructure.",
  },
  {
    period: "Next",
    title: "Physical AI + Constrained Autonomy at Scale",
    whatChanged:
      "AI systems operate with increasing autonomy within well-defined constraints. Physical AI (robots, autonomous vehicles, industrial IoT) integrates digital reasoning with physical action. AI becomes infrastructure — invisible, reliable, essential. The companies that built deep vertical systems in 2024–2026 will compound exponentially. Those that chased features will restart.",
    whatCompaniesShouldDo:
      "Plan for AI as core infrastructure, not a separate initiative. Build AI-native processes and products from the ground up. Invest in AI safety, explainability, and governance. Prepare for regulatory requirements — the EU AI Act is already live, US frameworks are coming.",
    whatNotToChase:
      "Don't chase full autonomy — constrained autonomy is safer and more valuable. Don't ignore the physical layer if you're in manufacturing, logistics, or operations. Don't build AI in isolation — it must integrate with everything.",
  },
];
