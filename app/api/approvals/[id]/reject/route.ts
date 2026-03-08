import { NextResponse } from "next/server";
import { approvals } from "@/lib/mock/approvals";
import { tasks } from "@/lib/mock/tasks";
import { events } from "@/lib/mock/events";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const approval = approvals.find((a) => a.id === id);
  if (!approval) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  approval.status = "rejected";

  const task = tasks.find((t) => t.id === approval.taskId);
  if (task) task.status = "blocked";

  events.unshift({
    id: `evt_${Date.now()}`,
    timestamp: new Date().toISOString(),
    message: "Approval rejected — content returned for revision",
    actor: "Human Operator",
  });

  return NextResponse.json({ ok: true, approval });
}
