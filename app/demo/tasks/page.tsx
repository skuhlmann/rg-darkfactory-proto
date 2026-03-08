"use client";

import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "@/lib/types";
import TaskCard from "@/components/TaskCard";

const FILTERS: { label: string; value: TaskStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Working", value: "working" },
  { label: "Queued", value: "queued" },
  { label: "Completed", value: "completed" },
  { label: "Blocked", value: "blocked" },
  { label: "Awaiting Approval", value: "waiting_approval" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  useEffect(() => {
    const poll = async () => {
      try {
        const data = await fetch("/api/tasks").then((r) => r.json());
        setTasks(data);
      } catch {}
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, []);

  const visible = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="p-8 flex flex-col gap-6 max-w-3xl">
      <div>
        <div className="font-heading text-forgeGold text-3xl">Tasks</div>
        <div className="text-stone-500 font-mono text-sm mt-1">{tasks.length} total</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1 rounded text-xs font-mono border transition-colors
              ${filter === value
                ? "bg-forgeGold/20 border-forgeGold/60 text-forgeGold"
                : "border-stone/30 text-stone-500 hover:text-stone-300 hover:border-stone/50"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {visible.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
