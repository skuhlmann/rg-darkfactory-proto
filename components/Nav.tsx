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

interface Props {
  open: boolean;
  onToggle: () => void;
  onNavLinkClick?: () => void;
}

export default function Nav({ open, onToggle, onNavLinkClick }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={`
        shrink-0 bg-deepIron border-r border-forgeGold/20 flex flex-col py-4 gap-1
        transition-[width] duration-200 ease-in-out overflow-hidden
        ${open ? "w-56" : "w-0 md:w-12"}
      `}
    >
      {/* Header / wordmark */}
      <div className={`px-3 mb-4 flex items-center gap-2 min-w-0 ${open ? "" : "md:justify-center"}`}>
        {open ? (
          <div className="min-w-0">
            <div className="font-heading text-forgeGold text-xl leading-tight whitespace-nowrap">Dark Factory</div>
            <div className="text-xs text-stone-600 font-mono mt-0.5 whitespace-nowrap">Content Engine v0.1</div>
          </div>
        ) : (
          <span className="hidden md:block text-forgeGold/50 text-lg leading-none">◈</span>
        )}
      </div>

      {/* Nav links */}
      {LINKS.map(({ href, label, icon }) => {
        const active = href === "/demo" ? pathname === "/demo" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            title={open ? undefined : label}
            onClick={onNavLinkClick}
            className={`
              mx-1.5 rounded flex items-center gap-3 text-sm transition-colors whitespace-nowrap
              ${open ? "px-3 py-2.5" : "md:px-0 md:py-2.5 md:justify-center px-3 py-2.5"}
              ${active
                ? "bg-forgeGold/10 border border-forgeGold/30 text-forgeGold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone/20 border border-transparent"
              }
            `}
          >
            <span className={`text-base shrink-0 ${active ? "text-forgeGold" : "text-stone-600"}`}>
              {icon}
            </span>
            {open && <span className="font-sans">{label}</span>}
          </Link>
        );
      })}

      {/* Bottom: status + desktop collapse toggle */}
      <div className="mt-auto flex flex-col gap-3 px-3">
        {open && (
          <div className="flex items-center gap-2 text-xs text-stone-600 font-mono whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-verdigris animate-pulse shrink-0" />
            Simulation active
          </div>
        )}

        {/* Desktop-only collapse/expand toggle */}
        <button
          onClick={onToggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className={`
            hidden md:flex items-center justify-center w-7 h-7 rounded
            border border-stone/30 text-stone-500 hover:text-forgeGold hover:border-forgeGold/40
            transition-colors text-xs font-mono
            ${open ? "self-end" : "self-center"}
          `}
        >
          {open ? "‹" : "›"}
        </button>
      </div>
    </nav>
  );
}
