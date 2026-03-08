import type { Agent } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";

const AGENT_ICONS: Record<string, string> = {
  agent_scout: "◈",
  agent_scribe: "✦",
  agent_editor: "⬡",
  agent_artificer: "⚙",
  agent_publisher: "▲",
};

export default function AgentCard({ agent }: { agent: Agent }) {
  const icon = AGENT_ICONS[agent.id] ?? "◆";
  const isActive = agent.status === "working";

  return (
    <div className={`panel rounded-lg p-4 flex flex-col gap-3 ${isActive ? "panel-glow" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-forgeGold text-lg leading-none">{icon}</span>
          <div>
            <div className="font-heading text-forgeGold text-base leading-tight">{agent.name}</div>
            <div className="text-xs text-stone-500 font-mono">{agent.station}</div>
          </div>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <div className="text-xs text-stone-400 font-mono min-h-[1.25rem]">
        {agent.statusMessage}
      </div>

      {agent.currentTaskId && (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-stone-500">Progress</span>
            <span className="text-forgeGold font-mono">{agent.progress}%</span>
          </div>
          <ProgressBar value={agent.progress} color={isActive ? "forgeGold" : "verdigris"} />
        </div>
      )}
    </div>
  );
}
