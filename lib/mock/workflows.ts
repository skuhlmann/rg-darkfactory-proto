import type { Workflow } from "../types";

export const workflows: Workflow[] = [
  {
    id: "wf_content_042",
    name: "Content Factory",
    status: "running",
    currentStage: "Research",
    progress: 0,
    tasks: [
      "task_research",
      "task_draft",
      "task_edit",
      "task_artwork",
      "task_approval",
      "task_publish",
    ],
  },
];
