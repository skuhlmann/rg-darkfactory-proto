import { NextResponse } from "next/server";
import { artifacts } from "@/lib/mock/artifacts";
import { ensureSimulation } from "@/lib/simulation";

export function GET() {
  ensureSimulation();
  return NextResponse.json(artifacts);
}
