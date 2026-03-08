"use client";

import { useEffect, useState } from "react";
import type { Approval, Artifact } from "@/lib/types";
import ApprovalPanel from "@/components/ApprovalPanel";
import StatusBadge from "@/components/StatusBadge";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const poll = async () => {
    try {
      const [ap, ar] = await Promise.all([
        fetch("/api/approvals").then((r) => r.json()),
        fetch("/api/artifacts").then((r) => r.json()),
      ]);
      setApprovals(ap);
      setArtifacts(ar);
    } catch {}
  };

  useEffect(() => {
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, []);

  const selectedApproval = approvals.find((a) => a.id === selected);
  const selectedArtifact = selectedApproval
    ? artifacts.find((a) => a.id === selectedApproval.artifactId)
    : undefined;

  const pending = approvals.filter((a) => a.status === "pending");
  const resolved = approvals.filter((a) => a.status !== "pending");

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-5xl">
      <div>
        <div className="font-heading text-forgeGold text-3xl">Approval Gate</div>
        <div className="text-stone-500 font-mono text-sm mt-1">
          {pending.length} pending · {resolved.length} resolved
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="flex flex-col gap-3">
          {pending.length === 0 && resolved.length === 0 && (
            <div className="panel rounded-lg p-8 text-center text-stone-600 font-mono text-sm">
              No approvals yet — workflow hasn&apos;t reached the gate
            </div>
          )}

          {pending.length > 0 && (
            <div>
              <div className="text-xs text-stone-500 font-mono mb-2 uppercase tracking-wider">Pending</div>
              <div className="flex flex-col gap-2">
                {pending.map((ap) => (
                  <button
                    key={ap.id}
                    onClick={() => setSelected(ap.id)}
                    className={`panel rounded-lg p-4 flex items-center justify-between gap-4 text-left hover:border-forgeGold/60 transition-colors w-full
                      ${selected === ap.id ? "border-forgeGold/60 bg-forgeGold/5" : ""}`}
                  >
                    <div>
                      <div className="text-sm text-stone-200 font-mono">{ap.id}</div>
                      <div className="text-xs text-stone-500">by {ap.requestedBy}</div>
                    </div>
                    <StatusBadge status={ap.status} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {resolved.length > 0 && (
            <div>
              <div className="text-xs text-stone-500 font-mono mb-2 mt-4 uppercase tracking-wider">Resolved</div>
              <div className="flex flex-col gap-2">
                {resolved.map((ap) => (
                  <button
                    key={ap.id}
                    onClick={() => setSelected(ap.id)}
                    className={`panel rounded-lg p-4 flex items-center justify-between gap-4 text-left hover:border-stone/50 transition-colors w-full opacity-60
                      ${selected === ap.id ? "opacity-100 border-stone/50" : ""}`}
                  >
                    <div>
                      <div className="text-sm text-stone-400 font-mono">{ap.id}</div>
                      <div className="text-xs text-stone-600">by {ap.requestedBy}</div>
                    </div>
                    <StatusBadge status={ap.status} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedApproval ? (
            <ApprovalPanel
              key={selectedApproval.id}
              approval={selectedApproval}
              artifact={selectedArtifact}
              onDecision={poll}
            />
          ) : (
            <div className="panel rounded-lg p-8 text-center text-stone-600 font-mono text-sm h-full flex items-center justify-center">
              Select an approval to review
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
