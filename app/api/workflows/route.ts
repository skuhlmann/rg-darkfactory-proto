import { NextResponse } from "next/server";
import { workflows } from "@/lib/mock/workflows";
import { ensureSimulation } from "@/lib/simulation";

export function GET() {
  ensureSimulation();
  return NextResponse.json(workflows);
}
