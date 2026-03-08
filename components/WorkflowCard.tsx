import Link from "next/link";
import type { Workflow } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";

export default function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Link href={`/demo/workflows/${workflow.id}`}>
      <div className="panel rounded-lg p-4 flex flex-col gap-3 hover:border-forgeGold/60 transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <div className="font-heading text-forgeGold text-lg">{workflow.name}</div>
          <StatusBadge status={workflow.status === "running" ? "working" : workflow.status === "completed" ? "completed" : "idle"} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-stone-500">Stage</span>
          <span className="text-stone-200 font-mono text-xs px-2 py-0.5 bg-stone/20 rounded border border-stone/30">
            {workflow.currentStage}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-stone-500">Overall Progress</span>
            <span className="text-forgeGold font-mono">{workflow.progress}%</span>
          </div>
          <ProgressBar value={workflow.progress} />
        </div>
        <div className="text-xs text-stone-500 font-mono">ID: {workflow.id}</div>
      </div>
    </Link>
  );
}
