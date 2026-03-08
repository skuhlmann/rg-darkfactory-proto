"use client";

import { useEffect, useRef, useState } from "react";
import type { Event } from "@/lib/types";

export default function EventLog({ initialEvents }: { initialEvents?: Event[] }) {
  const [events, setEvents] = useState<Event[]>(initialEvents ?? []);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch {}
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  return (
    <div className="panel rounded-lg overflow-hidden flex flex-col">
      <div className="px-4 py-2 border-b border-forgeGold/20 flex items-center gap-2">
        <span className="text-forgeGold text-xs font-mono">◈ EVENT LOG</span>
        <span className="ml-auto text-xs text-stone-600 font-mono">{events.length} entries</span>
      </div>
      <div className="overflow-y-auto max-h-64 p-3 flex flex-col-reverse gap-0.5">
        <div ref={bottomRef} />
        {events.map((evt, i) => (
          <div
            key={evt.id}
            className="text-xs font-mono py-0.5 animate-fade-in flex gap-2"
            style={{ animationDelay: `${i * 20}ms` }}
          >
            <span className="text-stone-600 shrink-0">
              {new Date(evt.timestamp).toLocaleTimeString("en-US", { hour12: false })}
            </span>
            <span className="text-forgeGold/80 shrink-0">[{evt.actor}]</span>
            <span className="text-stone-300">{evt.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
