# Regen AI Workflows — A Field Guide

How to combine the Regen MCP servers to answer real questions. Each workflow walks through a sequence of natural-language queries that chain across multiple MCPs. You don't need to name the tools — Claude routes to the right MCP automatically.

**MCP key:**
- **KOI** — knowledge graph, documentation, entity search, SPARQL
- **Ledger** — on-chain credit classes, projects, batches, balances, governance
- **Registry Review** — document analysis, methodology compliance, evidence extraction
- **Regen Compute** — ecological footprint estimation, credit browsing, retirement

---

## 1. Discover and Verify a Soil Carbon Project

**Use case:** You heard about a soil carbon project on Regen Network and want to understand what it does, whether its credits are legitimate, and what's actually on-chain.

### Step 1 — Find it in the knowledge graph (KOI)

> "Search the knowledge graph for soil carbon projects in the United States"

This returns project names, metadata IRIs, and links to documentation. Pick the project that matches what you're looking for.

### Step 2 — Check the on-chain record (Ledger)

> "List all projects under the C02 credit class and show me the one in Washington state"

Now you have the project ID, jurisdiction, and credit batches issued. You can see how many credits exist and how many have been retired.

### Step 3 — Review the project documentation (Registry Review)

> "Review the project design document for this project and check it against the methodology requirements"

Registry Review pulls evidence from the PDD, maps it against the methodology, and flags any gaps or missing documentation.

### Step 4 — Verify on the block explorer (Ledger)

> "Show me the credit batches for this project — how many credits have been issued and retired?"

This gives you the exact on-chain numbers: tradeable credits, retired credits, batch dates, and issuance history.

**What you get:** A full picture — from the knowledge graph context, through on-chain verification, to methodology compliance — without leaving Claude Code.

---

## 2. Audit a Portfolio's Ecological Impact

**Use case:** You hold REGEN tokens or ecocredits across multiple accounts and want to understand what your portfolio actually represents in terms of real-world ecological impact.

### Step 1 — Check your balances (Ledger)

> "Get all token balances for regen1abc...xyz and show me which ecocredits I hold"

This returns your REGEN balance, any ecocredits (tradeable and retired), and basket tokens.

### Step 2 — Understand what you hold (KOI)

> "Search the knowledge graph for information about credit class C02 and the Wilmot methodology"

KOI provides context on the methodology, the science behind it, and the projects using it — the story behind the numbers.

### Step 3 — Analyze your portfolio impact (Ledger)

> "Analyze the ecological impact of my portfolio at regen1abc...xyz"

The ledger MCP calculates your portfolio's aggregate impact: tonnes of carbon, hectares under stewardship, biodiversity units.

### Step 4 — Offset your AI session too (Regen Compute)

> "Estimate the ecological footprint of this AI session and show me credits I could retire to compensate"

Regen Compute estimates the session's carbon cost, then shows available credits you could retire via credit card — closing the loop.

**What you get:** A complete audit trail from raw balances to real-world impact, plus an option to offset the compute you used to run the audit.

---

## 3. Prepare a New Project for Registration

**Use case:** You're a project developer preparing to register a new carbon or biodiversity project on Regen Network. You need to understand the requirements, check your documentation, and see what's already on-chain.

### Step 1 — Research existing methodologies (KOI)

> "What methodologies exist on Regen Network for grassland carbon projects? Show me their requirements and any related documentation"

KOI returns methodology documents, academic references, and entity relationships that help you understand what framework your project should follow.

### Step 2 — Check what's already registered (Ledger)

> "List all credit classes on Regen Network and show me which ones cover grassland or rangeland carbon"

The ledger shows you existing classes (C01 through C08, KSH01, BT01, etc.), their admin addresses, and how many projects are registered under each. This helps you find the right class for your project.

### Step 3 — Review your draft documentation (Registry Review)

> "Here is my project design document [attach PDF]. Review it against the Regen Registry requirements and flag any gaps"

Registry Review extracts evidence from your document, maps it against the methodology requirements, and generates a compliance report telling you exactly what's missing or incomplete.

### Step 4 — Check comparable projects (Ledger + KOI)

> "Show me the credit batches for all C02 projects — what's the typical issuance size and vintage period?"

This gives you a benchmark: how many credits similar projects have issued, over what time periods, so you can calibrate your own projections.

**What you get:** A clear path from "I have a project idea" to "my documentation is ready for review" — with methodology research, gap analysis, and benchmarking all in one session.

---

## 4. Monitor Governance and Its Impact on Credit Markets

**Use case:** You're tracking a Regen Network governance proposal that could change credit class parameters, marketplace fees, or basket criteria. You want to understand the proposal, its current status, and what it means for existing credits.

### Step 1 — Get the proposal details (Ledger)

> "List the most recent governance proposals on Regen Network and show me any that are currently in voting period"

This returns proposal IDs, titles, status (deposit/voting/passed/rejected), and voting deadlines.

### Step 2 — Understand the context (KOI)

> "Search the knowledge graph for discussions about governance proposal 42 — any forum posts, documentation, or related entities"

KOI surfaces community discussions, forum posts, and related documentation that explain the motivation behind the proposal.

### Step 3 — Assess the market impact (Ledger)

> "Show me all active sell orders on the Regen marketplace and the current credit supply for classes that would be affected by this proposal"

The ledger gives you current marketplace state: sell orders, prices, available supply. You can see how the proposal might shift market dynamics.

### Step 4 — Estimate the ecological stakes (Regen Compute)

> "Browse all available credits on Regen Network — what credit types exist and how many are available for retirement right now?"

Regen Compute pulls the current marketplace snapshot: available credits by type (carbon, biodiversity, marine, grazing), active sell orders, and recent retirements. This shows you the full ecological asset landscape that governance decisions affect.

**What you get:** A governance intelligence briefing — from raw proposal data, through community context, to concrete market implications — assembled from four data sources in minutes.

---

## Tips for Multi-MCP Queries

- **Be specific.** "Show me C02 projects in Washington" works better than "show me some projects."
- **Chain naturally.** Claude remembers context within a session, so each follow-up query builds on the previous answer.
- **KOI for context, Ledger for truth.** KOI is great for understanding what something means; Ledger is the source of truth for what's actually on-chain. When they disagree, trust the Ledger.
- **Registry Review needs documents.** It works best when you point it at a specific PDF or project design document. It doesn't query the chain directly.
- **Regen Compute is the action layer.** It's the only MCP that helps you actually do something (retire credits). The others are read-only.
- **Verify with the block explorer.** For critical decisions, cross-check on-chain data at [mintscan.io/regen](https://www.mintscan.io/regen).
