import { NextResponse } from "next/server";
import { events } from "@/lib/mock/events";
import { ensureSimulation } from "@/lib/simulation";

export function GET() {
  ensureSimulation();
  return NextResponse.json(events);
}
