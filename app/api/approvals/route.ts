import { NextResponse } from "next/server";
import { approvals } from "@/lib/mock/approvals";
import { ensureSimulation } from "@/lib/simulation";

export function GET() {
  ensureSimulation();
  return NextResponse.json(approvals);
}
