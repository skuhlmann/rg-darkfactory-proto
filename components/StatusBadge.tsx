import type { TaskStatus, AgentStatus, ApprovalStatus } from "@/lib/types";

type Status = TaskStatus | AgentStatus | ApprovalStatus;

const CONFIG: Record<string, { label: string; classes: string }> = {
  idle: { label: "Idle", classes: "bg-stone/40 text-stone-400 border-stone/60" },
  working: { label: "Working", classes: "bg-verdigris/20 text-verdigris border-verdigris/50" },
  blocked: { label: "Blocked", classes: "bg-ember/20 text-ember border-ember/50" },
  completed: { label: "Completed", classes: "bg-forgeGold/20 text-forgeGold border-forgeGold/50" },
  queued: { label: "Queued", classes: "bg-stone/30 text-stone-400 border-stone/50" },
  waiting_approval: { label: "Waiting Approval", classes: "bg-arcane/20 text-arcane border-arcane/50" },
  pending: { label: "Pending", classes: "bg-arcane/20 text-arcane border-arcane/50" },
  approved: { label: "Approved", classes: "bg-verdigris/20 text-verdigris border-verdigris/50" },
  rejected: { label: "Rejected", classes: "bg-ember/20 text-ember border-ember/50" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = CONFIG[status] ?? { label: status, classes: "bg-stone/30 text-stone-400 border-stone/50" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono tracking-wide ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}
