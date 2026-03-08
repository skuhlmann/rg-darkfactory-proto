import type { Workflow, Task } from "@/lib/types";
import type { Stage } from "@/lib/types";
import { STAGES } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface Props {
  workflow: Workflow;
  tasks: Task[];
}

const STAGE_AGENTS: Record<Stage, string> = {
  Research: "Scout Agent",
  Draft: "Scribe Agent",
  Edit: "Editor Agent",
  Artwork: "Artificer Agent",
  Approval: "Publisher Agent",
  Publish: "Publisher Agent",
};

export default function PipelineView({ workflow, tasks }: Props) {
  const currentIdx = STAGES.indexOf(workflow.currentStage);

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {STAGES.map((stage, i) => {
        const task = tasks.find((t) => t.stage === stage);
        const isCurrent = i === currentIdx;
        const isDone = i < currentIdx || workflow.status === "completed";
        const isPending = i > currentIdx;

        return (
          <div
            key={stage}
            className={`flex-1 min-w-[140px] rounded-lg p-3 flex flex-col gap-2 border transition-all
              ${isCurrent ? "border-forgeGold bg-deepIron panel-glow" : ""}
              ${isDone ? "border-verdigris/40 bg-deepIron/60" : ""}
              ${isPending ? "border-stone/30 bg-deepIron/30" : ""}
            `}
          >
            {/* Stage connector */}
            <div className="flex items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full shrink-0
                  ${isCurrent ? "bg-forgeGold animate-pulse" : ""}
                  ${isDone ? "bg-verdigris" : ""}
                  ${isPending ? "bg-stone/40" : ""}
                `}
              />
              {i < STAGES.length - 1 && (
                <div className={`flex-1 h-px ${isDone || isCurrent ? "bg-forgeGold/30" : "bg-stone/20"}`} />
              )}
            </div>

            <div className={`font-heading text-sm ${isCurrent ? "text-forgeGold" : isDone ? "text-verdigris" : "text-stone-500"}`}>
              {stage}
            </div>

            <div className="text-xs text-stone-500 font-mono">{STAGE_AGENTS[stage]}</div>

            {task && (
              <StatusBadge status={task.status} />
            )}
          </div>
        );
      })}
    </div>
  );
}
