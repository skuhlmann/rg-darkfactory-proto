export type AgentStatus = "idle" | "working" | "blocked" | "completed";

export type TaskStatus =
  | "queued"
  | "working"
  | "blocked"
  | "waiting_approval"
  | "completed";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type Stage =
  | "Research"
  | "Draft"
  | "Edit"
  | "Artwork"
  | "Approval"
  | "Publish";

export const STAGES: Stage[] = [
  "Research",
  "Draft",
  "Edit",
  "Artwork",
  "Approval",
  "Publish",
];

export interface Agent {
  id: string;
  name: string;
  station: string;
  status: AgentStatus;
  currentTaskId: string | null;
  progress: number;
  statusMessage: string;
}

export interface Workflow {
  id: string;
  name: string;
  status: "running" | "paused" | "completed";
  currentStage: Stage;
  progress: number;
  tasks: string[];
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  agentId: string;
  stage: Stage;
  description: string;
  artifactIds: string[];
}

export interface Artifact {
  id: string;
  title: string;
  type: "document" | "image" | "markdown";
  producerAgent: string;
  uri: string;
  status: "draft" | "final";
  createdAt: string;
}

export interface Event {
  id: string;
  timestamp: string;
  message: string;
  actor: string;
}

export interface Approval {
  id: string;
  artifactId: string;
  taskId: string;
  status: ApprovalStatus;
  requestedBy: string;
}
