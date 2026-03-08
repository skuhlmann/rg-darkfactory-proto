import type { Task } from "../types";

export const tasks: Task[] = [
  {
    id: "task_research",
    title: "Research Topic",
    status: "working",
    agentId: "agent_scout",
    stage: "Research",
    description:
      "Scout Agent surveys the topic landscape, compiles source references, and produces a structured research brief for the writing team.",
    artifactIds: [],
  },
  {
    id: "task_draft",
    title: "Draft Article",
    status: "queued",
    agentId: "agent_scribe",
    stage: "Draft",
    description:
      "Scribe Agent transforms the research brief into a full article draft, following brand voice and editorial guidelines.",
    artifactIds: [],
  },
  {
    id: "task_edit",
    title: "Edit Draft",
    status: "queued",
    agentId: "agent_editor",
    stage: "Edit",
    description:
      "Editor Agent refines the draft for clarity, grammar, tone, and structure, producing a polished manuscript.",
    artifactIds: [],
  },
  {
    id: "task_artwork",
    title: "Generate Artwork",
    status: "queued",
    agentId: "agent_artificer",
    stage: "Artwork",
    description:
      "Artificer Agent generates accompanying imagery aligned with article themes and brand aesthetic.",
    artifactIds: [],
  },
  {
    id: "task_approval",
    title: "Approval Gate",
    status: "queued",
    agentId: "agent_publisher",
    stage: "Approval",
    description:
      "Human operator reviews the completed article and artwork before final publication is authorized.",
    artifactIds: [],
  },
  {
    id: "task_publish",
    title: "Publish Content",
    status: "queued",
    agentId: "agent_publisher",
    stage: "Publish",
    description:
      "Publisher Agent dispatches the approved content package to distribution channels.",
    artifactIds: [],
  },
];
