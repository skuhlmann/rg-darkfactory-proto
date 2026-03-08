import Link from "next/link";
import type { Task } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Link href={`/demo/tasks/${task.id}`}>
      <div className="panel rounded-lg p-4 flex items-center justify-between gap-4 hover:border-forgeGold/60 transition-colors cursor-pointer">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="font-heading text-stone-200 truncate">{task.title}</div>
          <div className="text-xs text-stone-500 font-mono">
            Stage: <span className="text-stone-400">{task.stage}</span>
            {" · "}
            Agent: <span className="text-stone-400">{task.agentId.replace("agent_", "")}</span>
          </div>
        </div>
        <div className="shrink-0">
          <StatusBadge status={task.status} />
        </div>
      </div>
    </Link>
  );
}
