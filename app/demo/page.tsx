"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Agent, Workflow, Approval } from "@/lib/types";
import AgentCard from "@/components/AgentCard";
import WorkflowCard from "@/components/WorkflowCard";
import EventLog from "@/components/EventLog";
import StatusBadge from "@/components/StatusBadge";

function GearSVG() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="animate-spin-slow opacity-5 absolute top-4 right-8 pointer-events-none"
    >
      <path
        fill="#C7A23A"
        d="M60 20a4 4 0 0 1 4 4v6.3a30 30 0 0 1 10.4 4.3l5.4-3.1a4 4 0 0 1 5.5 1.5l4 6.9a4 4 0 0 1-1.5 5.5l-5.4 3.1A30 30 0 0 1 84 60a30 30 0 0 1-1.6 8.5l5.4 3.1a4 4 0 0 1 1.5 5.5l-4 6.9a4 4 0 0 1-5.5 1.5l-5.4-3.1A30 30 0 0 1 64 89.7V96a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4v-6.3a30 30 0 0 1-10.4-4.3l-5.4 3.1a4 4 0 0 1-5.5-1.5l-4-6.9a4 4 0 0 1 1.5-5.5l5.4-3.1A30 30 0 0 1 36 60a30 30 0 0 1 1.6-8.5l-5.4-3.1a4 4 0 0 1-1.5-5.5l4-6.9a4 4 0 0 1 5.5-1.5l5.4 3.1A30 30 0 0 1 56 30.3V24a4 4 0 0 1 4-4h0zm0 26a14 14 0 1 0 0 28 14 14 0 0 0 0-28z"
      />
    </svg>
  );
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [approvals, setApprovals] = useState<Approval[]>([]);

  useEffect(() => {
    const poll = async () => {
      try {
        const [a, w, ap] = await Promise.all([
          fetch("/api/agents").then((r) => r.json()),
          fetch("/api/workflows").then((r) => r.json()),
          fetch("/api/approvals").then((r) => r.json()),
        ]);
        setAgents(a);
        setWorkflows(w);
        setApprovals(ap);
      } catch {}
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, []);

  const pendingApprovals = approvals.filter((a) => a.status === "pending");

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl">
      {/* Header */}
      <div className="relative">
        <GearSVG />
        <div className="font-heading text-forgeGold text-4xl">Command Chamber</div>
        <div className="text-stone-500 font-mono text-sm mt-1">Dark Factory · Content Engine</div>
      </div>

      {/* Active Workflows */}
      <section>
        <h2 className="font-heading text-stone-300 text-xl mb-3">Active Workflows</h2>
        {workflows.length === 0 ? (
          <div className="text-stone-600 font-mono text-sm">No active workflows</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((wf) => (
              <WorkflowCard key={wf.id} workflow={wf} />
            ))}
          </div>
        )}
      </section>

      {/* Agent Presence */}
      <section>
        <h2 className="font-heading text-stone-300 text-xl mb-3">Agent Presence</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Log */}
        <section>
          <h2 className="font-heading text-stone-300 text-xl mb-3">Recent Events</h2>
          <EventLog />
        </section>

        {/* Approval Queue */}
        <section>
          <h2 className="font-heading text-stone-300 text-xl mb-3">Approval Queue</h2>
          {pendingApprovals.length === 0 ? (
            <div className="panel rounded-lg p-6 text-center text-stone-600 font-mono text-sm">
              No pending approvals
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {pendingApprovals.map((ap) => (
                <div key={ap.id} className="panel rounded-lg p-4 flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-stone-200 font-mono">{ap.id}</div>
                    <div className="text-xs text-stone-500">Requested by {ap.requestedBy}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={ap.status} />
                    <Link
                      href="/demo/approvals"
                      className="px-3 py-1.5 text-xs rounded border border-forgeGold/50 text-forgeGold font-mono hover:bg-forgeGold/10 transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
