"use client";

import { useEffect, useState } from "react";
import type { Workflow } from "@/lib/types";
import WorkflowCard from "@/components/WorkflowCard";

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    const poll = async () => {
      try {
        const data = await fetch("/api/workflows").then((r) => r.json());
        setWorkflows(data);
      } catch {}
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-4xl">
      <div>
        <div className="font-heading text-forgeGold text-3xl">Workflows</div>
        <div className="text-stone-500 font-mono text-sm mt-1">{workflows.length} active</div>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>
    </div>
  );
}
