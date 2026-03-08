/**
 * Simulation Engine
 *
 * Runs a server-side tick loop that advances workflow state.
 * Mutates the shared mock data arrays directly.
 * Started lazily on first API call via ensureSimulation().
 */

import { agents } from "./mock/agents";
import { tasks } from "./mock/tasks";
import { workflows } from "./mock/workflows";
import { artifacts } from "./mock/artifacts";
import { events } from "./mock/events";
import { approvals } from "./mock/approvals";
import type { Stage } from "./types";

const TICK_MS = 2500;
const PROGRESS_PER_TICK = 8;

const STAGE_SEQUENCE: Stage[] = [
  "Research",
  "Draft",
  "Edit",
  "Artwork",
  "Approval",
  "Publish",
];

const STAGE_TASK_MAP: Record<Stage, string> = {
  Research: "task_research",
  Draft: "task_draft",
  Edit: "task_edit",
  Artwork: "task_artwork",
  Approval: "task_approval",
  Publish: "task_publish",
};

const STAGE_AGENT_MAP: Record<Stage, string> = {
  Research: "agent_scout",
  Draft: "agent_scribe",
  Edit: "agent_editor",
  Artwork: "agent_artificer",
  Approval: "agent_publisher",
  Publish: "agent_publisher",
};

const STAGE_STATUS_MESSAGES: Record<Stage, string[]> = {
  Research: [
    "Surveying topic landscape",
    "Compiling source references",
    "Indexing archive records",
    "Cross-referencing data nodes",
    "Assembling research brief",
  ],
  Draft: [
    "Structuring narrative arc",
    "Drafting opening passage",
    "Expanding key arguments",
    "Weaving editorial voice",
    "Finalizing draft manuscript",
  ],
  Edit: [
    "Parsing syntax and grammar",
    "Refining paragraph flow",
    "Tightening prose cadence",
    "Checking brand alignment",
    "Sealing final revisions",
  ],
  Artwork: [
    "Generating visual prompts",
    "Rendering composition layer",
    "Applying aesthetic filters",
    "Calibrating color palette",
    "Encoding final image",
  ],
  Approval: [
    "Packaging content bundle",
    "Awaiting human review",
    "Standing by at gate",
    "Gate open for inspection",
    "Decision pending",
  ],
  Publish: [
    "Preparing dispatch payload",
    "Encoding distribution manifest",
    "Routing to channels",
    "Broadcasting content",
    "Confirming delivery",
  ],
};

let counter = 0;

function emitEvent(message: string, actor: string) {
  counter++;
  events.unshift({
    id: `evt_${Date.now()}_${counter}`,
    timestamp: new Date().toISOString(),
    message,
    actor,
  });
  if (events.length > 50) events.splice(50);
}

function addArtifact(stage: Stage, agentId: string, taskId: string) {
  const agent = agents.find((a) => a.id === agentId);
  const task = tasks.find((t) => t.id === taskId);
  if (!agent || !task) return;

  const artifactDefs: Record<Stage, { title: string; type: "document" | "image" | "markdown"; uri: string }> = {
    Research: { title: "research_brief.md", type: "markdown", uri: "/artifacts/research_brief.md" },
    Draft: { title: "draft_article.md", type: "markdown", uri: "/artifacts/draft_article.md" },
    Edit: { title: "edited_article.md", type: "markdown", uri: "/artifacts/edited_article.md" },
    Artwork: { title: "article_artwork.png", type: "image", uri: "/artifacts/article_artwork.png" },
    Approval: { title: "content_bundle.zip", type: "document", uri: "/artifacts/content_bundle.zip" },
    Publish: { title: "final_article.md", type: "markdown", uri: "/artifacts/final_article.md" },
  };

  const def = artifactDefs[stage];
  const artifactId = `artifact_${stage.toLowerCase()}_${Date.now()}`;
  artifacts.push({
    id: artifactId,
    title: def.title,
    type: def.type,
    producerAgent: agent.name,
    uri: def.uri,
    status: stage === "Publish" ? "final" : "draft",
    createdAt: new Date().toISOString(),
  });

  task.artifactIds.push(artifactId);
}

function advanceStage(currentStageIndex: number) {
  const workflow = workflows[0];
  const currentStage = STAGE_SEQUENCE[currentStageIndex];
  const taskId = STAGE_TASK_MAP[currentStage];
  const agentId = STAGE_AGENT_MAP[currentStage];
  const agent = agents.find((a) => a.id === agentId);
  const task = tasks.find((t) => t.id === taskId);

  if (!agent || !task) return;

  // Complete current stage
  agent.status = "completed";
  agent.progress = 100;
  agent.currentTaskId = null;
  task.status = "completed";

  addArtifact(currentStage, agentId, taskId);
  emitEvent(`${agent.name} completed ${task.title}`, agent.name);

  const nextStageIndex = currentStageIndex + 1;

  if (nextStageIndex >= STAGE_SEQUENCE.length) {
    // Workflow complete — restart demo
    workflow.status = "completed";
    workflow.progress = 100;
    emitEvent("Content Factory workflow completed. Reinitializing...", "System");
    setTimeout(() => resetSimulation(), 5000);
    return;
  }

  const nextStage = STAGE_SEQUENCE[nextStageIndex];
  const nextTaskId = STAGE_TASK_MAP[nextStage];
  const nextAgentId = STAGE_AGENT_MAP[nextStage];
  const nextAgent = agents.find((a) => a.id === nextAgentId);
  const nextTask = tasks.find((t) => t.id === nextTaskId);

  if (!nextAgent || !nextTask) return;

  // Advance workflow
  workflow.currentStage = nextStage;
  workflow.progress = Math.round((nextStageIndex / STAGE_SEQUENCE.length) * 100);

  // Activate next agent
  nextAgent.status = nextStage === "Approval" ? "blocked" : "working";
  nextAgent.progress = 0;
  nextAgent.currentTaskId = nextTaskId;
  nextAgent.statusMessage = STAGE_STATUS_MESSAGES[nextStage][0];
  nextTask.status = nextStage === "Approval" ? "waiting_approval" : "working";

  emitEvent(`${nextAgent.name} began ${nextTask.title}`, nextAgent.name);

  // Create approval record when hitting Approval stage
  if (nextStage === "Approval") {
    const editedArtifact = artifacts.find((a) => a.title === "edited_article.md");
    const artworkArtifact = artifacts.find((a) => a.title === "article_artwork.png");
    const artifactId = editedArtifact?.id ?? artworkArtifact?.id ?? "";
    approvals.push({
      id: `approval_${Date.now()}`,
      artifactId,
      taskId: nextTaskId,
      status: "pending",
      requestedBy: nextAgent.name,
    });
    emitEvent("Approval gate opened — human review required", "System");
  }
}

function tick() {
  const workflow = workflows[0];
  if (workflow.status !== "running") return;

  const currentStage = workflow.currentStage;
  const stageIndex = STAGE_SEQUENCE.indexOf(currentStage);
  const taskId = STAGE_TASK_MAP[currentStage];
  const agentId = STAGE_AGENT_MAP[currentStage];
  const agent = agents.find((a) => a.id === agentId);
  const task = tasks.find((t) => t.id === taskId);

  if (!agent || !task) return;

  // If waiting for approval, check if resolved
  if (currentStage === "Approval") {
    const approval = approvals.find((a) => a.taskId === taskId && a.status !== "pending");
    if (!approval) return; // still waiting
    if (approval.status === "rejected") {
      // Reset to Edit stage
      emitEvent("Approval rejected — returning to Edit stage", "System");
      resetToStage("Edit");
      return;
    }
    // Approved — advance
    advanceStage(stageIndex);
    return;
  }

  // Normal progress tick
  const msgList = STAGE_STATUS_MESSAGES[currentStage];
  const msgIndex = Math.min(
    Math.floor((agent.progress / 100) * msgList.length),
    msgList.length - 1
  );
  agent.statusMessage = msgList[msgIndex];
  agent.progress = Math.min(agent.progress + PROGRESS_PER_TICK, 100);

  // Update workflow progress to reflect stage + sub-progress
  workflow.progress = Math.round(
    ((stageIndex + agent.progress / 100) / STAGE_SEQUENCE.length) * 100
  );

  if (agent.progress >= 100) {
    advanceStage(stageIndex);
  }
}

function resetToStage(stage: Stage) {
  const workflow = workflows[0];
  workflow.currentStage = stage;
  workflow.status = "running";

  const stageIndex = STAGE_SEQUENCE.indexOf(stage);
  const taskId = STAGE_TASK_MAP[stage];
  const agentId = STAGE_AGENT_MAP[stage];
  const agent = agents.find((a) => a.id === agentId);
  const task = tasks.find((t) => t.id === taskId);
  if (!agent || !task) return;

  agent.status = "working";
  agent.progress = 0;
  agent.currentTaskId = taskId;
  agent.statusMessage = STAGE_STATUS_MESSAGES[stage][0];
  task.status = "working";

  workflow.progress = Math.round((stageIndex / STAGE_SEQUENCE.length) * 100);
}

function resetSimulation() {
  // Reset all agents
  const agentDefaults: Record<string, { station: string; msg: string }> = {
    agent_scout: { station: "Archive Desk", msg: "Surveying topic landscape" },
    agent_scribe: { station: "Writing Chamber", msg: "Awaiting research" },
    agent_editor: { station: "Review Alcove", msg: "Awaiting draft" },
    agent_artificer: { station: "Forge Floor", msg: "Awaiting content" },
    agent_publisher: { station: "Dispatch Tower", msg: "Standing by" },
  };
  for (const agent of agents) {
    const d = agentDefaults[agent.id];
    agent.status = agent.id === "agent_scout" ? "working" : "idle";
    agent.progress = 0;
    agent.currentTaskId = agent.id === "agent_scout" ? "task_research" : null;
    agent.statusMessage = d.msg;
    agent.station = d.station;
  }

  // Reset all tasks
  for (const task of tasks) {
    task.status = task.id === "task_research" ? "working" : "queued";
    task.artifactIds = [];
  }

  // Reset workflow
  const workflow = workflows[0];
  workflow.status = "running";
  workflow.currentStage = "Research";
  workflow.progress = 0;

  // Clear artifacts
  artifacts.splice(0, artifacts.length);

  // Clear approvals
  approvals.splice(0, approvals.length);

  emitEvent("Content Factory workflow restarted", "System");
}

let started = false;

export function ensureSimulation() {
  if (started) return;
  started = true;
  setInterval(tick, TICK_MS);
  emitEvent("Simulation engine online", "System");
}
