# Dark Factory Prototype

## Project Goal

Build a **Dark Factory UI prototype** using **Next.js App Router** that demonstrates a simulated **Content Factory workflow**.

The prototype must:

- simulate agents performing tasks
- simulate workflow progression
- simulate approvals
- serve mock data via API routes
- periodically update the UI

This prototype will later connect to the real **Dark Factory backend**.

---

# Technology Stack

Use:

```
Next.js 14+
App Router
TypeScript
TailwindCSS
React Server + Client Components
API Routes (app/api/*)
```

No database.

Mock data should live in:

```
/lib/mock/
```

API routes return data from these mock modules.

---

# Fonts

Use exactly these fonts:

### Headings

```
IM Fell
```

### Body

```
Source Sans
```

### Monospace

```
Fira Code
```

Add them using **next/font/google**.

Example:

```ts
import { IM_Fell_English } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import { Fira_Code } from "next/font/google";
```

---

# Theme / Styling

Use Tailwind with custom theme variables.

### Colors

```
obsidian: #0B0B0D
deepIron: #1E1E22
forgeGold: #C7A23A
ember: #E0662A
arcane: #6F5BD6
verdigris: #3F7F73
stone: #3A3A3F
```

Panels:

```
bg-deepIron
border-forgeGold
```

Background:

```
bg-obsidian
```

---

# Directory Structure

```
/app
  /api
    /agents
    /workflows
    /tasks
    /artifacts
    /events
    /approvals
  /dashboard
  /workflows
  /agents
  /tasks
  /approvals
  layout.tsx
  page.tsx

/components
  AgentCard.tsx
  WorkflowCard.tsx
  TaskCard.tsx
  ArtifactCard.tsx
  EventLog.tsx
  ApprovalPanel.tsx
  StatusBadge.tsx
  ProgressBar.tsx
  PipelineView.tsx

/lib
  /mock
    agents.ts
    workflows.ts
    tasks.ts
    artifacts.ts
    events.ts
    approvals.ts
  simulation.ts

/styles
  globals.css
```

---

# Mock Data Model

The mock structure should resemble the real Dark Factory system.

## Agent

```
id
name
station
status
currentTaskId
progress
statusMessage
```

Example:

```
{
  id: "agent_scout",
  name: "Scout Agent",
  station: "Archive Desk",
  status: "working",
  currentTaskId: "task_research",
  progress: 72,
  statusMessage: "Compiling topic research"
}
```

---

## Workflow

```
id
name
status
currentStage
progress
tasks[]
```

Example:

```
{
 id: "wf_content_042",
 name: "Content Factory",
 status: "running",
 currentStage: "Edit Draft",
 progress: 60
}
```

---

## Task

```
id
title
status
agentId
stage
description
artifactIds[]
```

Statuses:

```
queued
working
blocked
waiting_approval
completed
```

---

## Artifact

```
id
title
type
producerAgent
uri
status
createdAt
```

Example:

```
draft_article.md
article_artwork.png
final_article.md
```

---

## Event

```
id
timestamp
message
actor
```

Example:

```
[Scribe Agent] began Draft Article
```

---

## Approval

```
id
artifactId
taskId
status
requestedBy
```

Statuses:

```
pending
approved
rejected
```

---

# API Routes

These should simulate a real backend.

All routes return JSON.

---

## GET /api/agents

Returns all agents.

```
/api/agents
```

---

## GET /api/workflows

Returns active workflows.

---

## GET /api/tasks

Returns task list.

---

## GET /api/events

Returns event log.

---

## GET /api/artifacts

Returns artifact vault.

---

## GET /api/approvals

Returns approval queue.

---

## POST /api/approvals/:id/approve

Updates approval status in mock state.

---

## POST /api/approvals/:id/reject

Reject approval.

---

# Simulation Engine

Create a simple **simulation loop** in:

```
/lib/simulation.ts
```

Purpose:

Simulate workflow progress.

Example behavior:

Every few seconds:

```
Scout Agent progress++
```

When progress reaches 100:

```
Task completes
Next task begins
Event emitted
```

Stages:

```
Research
Draft
Edit
Artwork
Approval
Publish
```

When approval stage begins:

```
create pending approval
```

---

# Pages

## / (Dashboard)

Command Chamber view.

Sections:

### Active Workflows

Cards showing:

```
workflow name
status
progress
current stage
```

---

### Agent Presence

Grid of AgentCard components.

Each card shows:

```
Agent name
Station
Current task
Progress
Status
```

---

### Recent Events

Scrolling EventLog component.

Use **Fira Code**.

---

### Approval Queue

List of pending approvals.

Button:

```
Review
```

---

# /workflows

Workflow list page.

Each workflow opens:

```
/workflows/[id]
```

---

# /workflows/[id]

Pipeline visualization.

Use PipelineView component.

Stages:

```
Research
Draft
Edit
Artwork
Approval
Publish
```

Each stage shows:

```
status
agent
task
```

---

# /agents

Agent Console page.

Shows all agents with live status.

---

# /tasks

Task list.

Each task opens:

```
/tasks/[id]
```

---

# /tasks/[id]

Task detail page.

Fields:

```
title
status
assigned agent
description
artifacts
event history
```

---

# /approvals

Approval Gate page.

Shows pending approvals.

Selecting approval opens:

```
ApprovalPanel
```

Buttons:

```
Approve
Reject
Request Revision
```

---

# Components

## AgentCard

Displays agent information.

Fields:

```
name
station
task
progress
status
```

---

## WorkflowCard

Displays workflow summary.

Fields:

```
name
stage
progress
status
```

---

## PipelineView

Visual pipeline showing stages horizontally.

Each stage has status indicator.

---

## EventLog

Scrolling terminal-like log.

Font:

```
Fira Code
```

---

## ArtifactCard

Shows artifact produced by tasks.

---

## ApprovalPanel

Displays artifact and decision buttons.

---

## StatusBadge

Reusable component.

Statuses:

```
Idle
Working
Blocked
Completed
Waiting Approval
```

---

# UI Animation

Simulate live system.

Examples:

Agent progress increases gradually.

New events appear in log.

Workflow stage highlights change.

Approval appears when stage reached.

---

# Demo Scenario

Simulated flow:

```
Scout Agent researching topic
↓
Scribe Agent drafting article
↓
Editor Agent editing
↓
Artificer Agent generating artwork
↓
Approval requested
↓
Publisher Agent publishes
```

---

# Optional Visual Enhancements

Add subtle atmosphere.

Examples:

- rune glow animations
- slow gear rotation SVG
- ember flicker background

---

# Success Criteria

The prototype must demonstrate:

1. Multiple **agents working**
2. A **workflow pipeline**
3. **Tasks progressing**
4. **Artifacts appearing**
5. **Approval gate interaction**

Even without backend, the system should **feel alive**.
