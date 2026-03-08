"use client";

import { useEffect, useState } from "react";
import type { Agent } from "@/lib/types";
import AgentCard from "@/components/AgentCard";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const poll = async () => {
      try {
        const data = await fetch("/api/agents").then((r) => r.json());
        setAgents(data);
      } catch {}
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, []);

  const working = agents.filter((a) => a.status === "working").length;

  return (
    <div className="p-8 flex flex-col gap-6 max-w-5xl">
      <div>
        <div className="font-heading text-forgeGold text-3xl">Agent Console</div>
        <div className="text-stone-500 font-mono text-sm mt-1">
          {working} active · {agents.length} total
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
