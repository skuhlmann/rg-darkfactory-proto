import { NextResponse } from "next/server";
import { agents } from "@/lib/mock/agents";
import { ensureSimulation } from "@/lib/simulation";

export function GET() {
  ensureSimulation();
  return NextResponse.json(agents);
}
