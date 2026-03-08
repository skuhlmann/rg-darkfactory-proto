import type { Agent } from "../types";

export const agents: Agent[] = [
  {
    id: "agent_scout",
    name: "Scout Agent",
    station: "Archive Desk",
    status: "working",
    currentTaskId: "task_research",
    progress: 0,
    statusMessage: "Surveying topic landscape",
  },
  {
    id: "agent_scribe",
    name: "Scribe Agent",
    station: "Writing Chamber",
    status: "idle",
    currentTaskId: null,
    progress: 0,
    statusMessage: "Awaiting research",
  },
  {
    id: "agent_editor",
    name: "Editor Agent",
    station: "Review Alcove",
    status: "idle",
    currentTaskId: null,
    progress: 0,
    statusMessage: "Awaiting draft",
  },
  {
    id: "agent_artificer",
    name: "Artificer Agent",
    station: "Forge Floor",
    status: "idle",
    currentTaskId: null,
    progress: 0,
    statusMessage: "Awaiting content",
  },
  {
    id: "agent_publisher",
    name: "Publisher Agent",
    station: "Dispatch Tower",
    status: "idle",
    currentTaskId: null,
    progress: 0,
    statusMessage: "Standing by",
  },
];
