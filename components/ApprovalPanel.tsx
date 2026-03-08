"use client";

import { useState } from "react";
import type { Approval, Artifact } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface Props {
  approval: Approval;
  artifact?: Artifact;
  onDecision?: () => void;
}

export default function ApprovalPanel({ approval, artifact, onDecision }: Props) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [done, setDone] = useState(approval.status !== "pending");

  const act = async (action: "approve" | "reject") => {
    setLoading(action);
    try {
      await fetch(`/api/approvals/${approval.id}/${action}`, { method: "POST" });
      setDone(true);
      onDecision?.();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="panel rounded-lg p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="font-heading text-forgeGold text-lg">Approval Gate</div>
        <StatusBadge status={approval.status} />
      </div>

      <div className="text-xs text-stone-500 font-mono space-y-1">
        <div>Requested by: <span className="text-stone-300">{approval.requestedBy}</span></div>
        <div>Task: <span className="text-stone-300">{approval.taskId}</span></div>
      </div>

      {artifact && (
        <div className="bg-obsidian/60 rounded border border-stone/20 p-3 flex flex-col gap-1">
          <div className="text-xs text-stone-500 font-mono">ARTIFACT</div>
          <div className="text-sm text-stone-200 font-mono">{artifact.title}</div>
          <div className="text-xs text-stone-500">
            Produced by {artifact.producerAgent} · {artifact.type} · {artifact.status}
          </div>
        </div>
      )}

      {!done ? (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => act("approve")}
            disabled={!!loading}
            className="px-4 py-2 rounded bg-verdigris/20 border border-verdigris/50 text-verdigris text-sm font-mono hover:bg-verdigris/30 transition-colors disabled:opacity-50"
          >
            {loading === "approve" ? "…" : "Approve"}
          </button>
          <button
            onClick={() => act("reject")}
            disabled={!!loading}
            className="px-4 py-2 rounded bg-ember/20 border border-ember/50 text-ember text-sm font-mono hover:bg-ember/30 transition-colors disabled:opacity-50"
          >
            {loading === "reject" ? "…" : "Reject"}
          </button>
          <button
            disabled
            className="px-4 py-2 rounded bg-stone/20 border border-stone/30 text-stone-500 text-sm font-mono cursor-not-allowed"
          >
            Request Revision
          </button>
        </div>
      ) : (
        <div className="text-sm font-mono text-stone-400">
          Decision recorded: <span className={approval.status === "approved" ? "text-verdigris" : "text-ember"}>{approval.status}</span>
        </div>
      )}
    </div>
  );
}
