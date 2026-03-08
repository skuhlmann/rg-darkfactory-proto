import { NextResponse } from "next/server";
import { tasks } from "@/lib/mock/tasks";
import { ensureSimulation } from "@/lib/simulation";

export function GET() {
  ensureSimulation();
  return NextResponse.json(tasks);
}
