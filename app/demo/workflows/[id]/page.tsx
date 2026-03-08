"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Workflow, Task } from "@/lib/types";
import PipelineView from "@/components/PipelineView";
import TaskCard from "@/components/TaskCard";
import ProgressBar from "@/components/ProgressBar";
import StatusBadge from "@/components/StatusBadge";

export default function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const poll = async () => {
      try {
        const [wfs, ts] = await Promise.all([
          fetch("/api/workflows").then((r) => r.json()),
          fetch("/api/tasks").then((r) => r.json()),
        ]);
        const wf = wfs.find((w: Workflow) => w.id === id);
        setWorkflow(wf ?? null);
        setTasks(ts);
      } catch {}
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!workflow) {
    return (
      <div className="p-8 text-stone-500 font-mono">Loading workflow...</div>
    );
  }

  const wfTasks = tasks.filter((t) => workflow.tasks.includes(t.id));

  return (
    <div className="p-8 flex flex-col gap-8 max-w-5xl">
      <div>
        <div className="font-heading text-forgeGold text-3xl">{workflow.name}</div>
        <div className="flex items-center gap-3 mt-2">
          <StatusBadge status={workflow.status === "running" ? "working" : workflow.status === "completed" ? "completed" : "idle"} />
          <span className="text-stone-500 font-mono text-sm">ID: {workflow.id}</span>
        </div>
      </div>

      <div className="panel rounded-lg p-4 flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-stone-400">Overall Progress</span>
          <span className="text-forgeGold font-mono">{workflow.progress}%</span>
        </div>
        <ProgressBar value={workflow.progress} />
      </div>

      <section>
        <h2 className="font-heading text-stone-300 text-xl mb-4">Pipeline</h2>
        <PipelineView workflow={workflow} tasks={wfTasks} />
      </section>

      <section>
        <h2 className="font-heading text-stone-300 text-xl mb-4">Tasks</h2>
        <div className="flex flex-col gap-2">
          {wfTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
}
