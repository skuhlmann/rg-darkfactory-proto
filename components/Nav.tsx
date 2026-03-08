"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/demo", label: "Command Chamber", icon: "◈" },
  { href: "/demo/workflows", label: "Workflows", icon: "⬡" },
  { href: "/demo/agents", label: "Agent Console", icon: "✦" },
  { href: "/demo/tasks", label: "Tasks", icon: "▣" },
  { href: "/demo/approvals", label: "Approval Gate", icon: "⚖" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 bg-deepIron border-r border-forgeGold/20 flex flex-col py-6 gap-1">
      <div className="px-5 mb-6">
        <div className="font-heading text-forgeGold text-xl leading-tight">Dark Factory</div>
        <div className="text-xs text-stone-600 font-mono mt-0.5">Content Engine v0.1</div>
      </div>

      {LINKS.map(({ href, label, icon }) => {
        const active = href === "/demo" ? pathname === "/demo" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`mx-2 px-3 py-2.5 rounded flex items-center gap-3 text-sm transition-colors
              ${active
                ? "bg-forgeGold/10 border border-forgeGold/30 text-forgeGold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone/20 border border-transparent"
              }`}
          >
            <span className={`text-base ${active ? "text-forgeGold" : "text-stone-600"}`}>{icon}</span>
            <span className="font-sans">{label}</span>
          </Link>
        );
      })}

      <div className="mt-auto px-5">
        <div className="flex items-center gap-2 text-xs text-stone-600 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-verdigris animate-pulse" />
          Simulation active
        </div>
      </div>
    </nav>
  );
}
