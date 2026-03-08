import type { Event } from "../types";

export const events: Event[] = [
  {
    id: "evt_001",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    message: "Content Factory workflow initiated",
    actor: "System",
  },
  {
    id: "evt_002",
    timestamp: new Date(Date.now() - 50000).toISOString(),
    message: "Scout Agent assigned to Research task",
    actor: "System",
  },
  {
    id: "evt_003",
    timestamp: new Date(Date.now() - 40000).toISOString(),
    message: "Scout Agent began Research Topic",
    actor: "Scout Agent",
  },
];
