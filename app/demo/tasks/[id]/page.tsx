"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Task, Agent, Artifact, Event } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";
import ArtifactCard from "@/components/ArtifactCard";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [taskArtifacts, setTaskArtifacts] = useState<Artifact[]>([]);
  const [taskEvents, setTaskEvents] = useState<Event[]>([]);

  useEffect(() => {
    const poll = async () => {
      try {
        const [tasks, agents, artifacts, events] = await Promise.all([
          fetch("/api/tasks").then((r) => r.json()),
          fetch("/api/agents").then((r) => r.json()),
          fetch("/api/artifacts").then((r) => r.json()),
          fetch("/api/events").then((r) => r.json()),
        ]);
        const t: Task = tasks.find((x: Task) => x.id === id);
        if (!t) return;
        setTask(t);
        setAgent(agents.find((a: Agent) => a.id === t.agentId) ?? null);
        setTaskArtifacts(artifacts.filter((a: Artifact) => t.artifactIds.includes(a.id)));
        setTaskEvents(
          events.filter((e: Event) =>
            e.message.toLowerCase().includes(t.title.toLowerCase()) ||
            e.message.toLowerCase().includes(t.stage.toLowerCase())
          )
        );
      } catch {}
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!task) {
    return <div className="p-8 text-stone-500 font-mono">Loading task...</div>;
  }

  return (
    <div className="p-8 flex flex-col gap-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-heading text-forgeGold text-3xl">{task.title}</div>
          <div className="text-stone-500 font-mono text-sm mt-1">Stage: {task.stage}</div>
        </div>
        <StatusBadge status={task.status} />
      </div>

      {agent && (
        <div className="panel rounded-lg p-4">
          <div className="text-xs text-stone-500 font-mono mb-2">ASSIGNED AGENT</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-stone-200 font-heading">{agent.name}</div>
              <div className="text-xs text-stone-500 font-mono">{agent.station}</div>
            </div>
            <StatusBadge status={agent.status} />
          </div>
          {agent.currentTaskId === task.id && (
            <div className="mt-2 text-xs text-stone-400 font-mono">{agent.statusMessage}</div>
          )}
        </div>
      )}

      <div className="panel rounded-lg p-4">
        <div className="text-xs text-stone-500 font-mono mb-2">DESCRIPTION</div>
        <p className="text-stone-300 text-sm leading-relaxed">{task.description}</p>
      </div>

      {taskArtifacts.length > 0 && (
        <section>
          <h2 className="font-heading text-stone-300 text-lg mb-3">Artifacts</h2>
          <div className="flex flex-col gap-2">
            {taskArtifacts.map((a) => (
              <ArtifactCard key={a.id} artifact={a} />
            ))}
          </div>
        </section>
      )}

      {taskEvents.length > 0 && (
        <section>
          <h2 className="font-heading text-stone-300 text-lg mb-3">Event History</h2>
          <div className="panel rounded-lg p-3 flex flex-col gap-1">
            {taskEvents.map((evt) => (
              <div key={evt.id} className="flex gap-2 text-xs font-mono">
                <span className="text-stone-600 shrink-0">
                  {new Date(evt.timestamp).toLocaleTimeString("en-US", { hour12: false })}
                </span>
                <span className="text-forgeGold/80">[{evt.actor}]</span>
                <span className="text-stone-300">{evt.message}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
