"use client";

import { usePathname } from "next/navigation";

const PAGE_LABELS: Record<string, string> = {
  "/demo": "Command Chamber",
  "/demo/workflows": "Workflows",
  "/demo/agents": "Agent Console",
  "/demo/tasks": "Tasks",
  "/demo/approvals": "Approval Gate",
};

interface Props {
  onMenuToggle: () => void;
}

export default function Topbar({ onMenuToggle }: Props) {
  const pathname = usePathname();

  // Match exact then prefix
  const label =
    PAGE_LABELS[pathname] ??
    Object.entries(PAGE_LABELS).find(([key]) => pathname.startsWith(key + "/"))?.[1] ??
    "Dark Factory";

  return (
    <header className="md:hidden sticky top-0 z-30 h-12 bg-deepIron border-b border-forgeGold/20 flex items-center px-3 gap-3 shrink-0">
      <button
        onClick={onMenuToggle}
        aria-label="Toggle navigation"
        className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded hover:bg-forgeGold/10 transition-colors"
      >
        <span className="w-4 h-px bg-forgeGold/70 block" />
        <span className="w-4 h-px bg-forgeGold/70 block" />
        <span className="w-4 h-px bg-forgeGold/70 block" />
      </button>

      <div className="flex items-center gap-2 min-w-0">
        <span className="text-forgeGold/60 font-mono text-xs shrink-0">◈</span>
        <span className="font-heading text-forgeGold text-base truncate">{label}</span>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-verdigris animate-pulse shrink-0" />
        <span className="text-stone-600 font-mono text-xs hidden sm:block">live</span>
      </div>
    </header>
  );
}
