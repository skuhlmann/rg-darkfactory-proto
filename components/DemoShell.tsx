"use client";

import { useState, useEffect, useCallback } from "react";
import Nav from "./Nav";
import Topbar from "./Topbar";

export default function DemoShell({ children }: { children: React.ReactNode }) {
  // Start closed; open state resolved after mount based on viewport
  const [navOpen, setNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setNavOpen(window.innerWidth >= 768);
    setMounted(true);
  }, []);

  const toggleNav = useCallback(() => setNavOpen((v) => !v), []);

  // Close nav on mobile after a link click
  const closeOnMobile = useCallback(() => {
    if (window.innerWidth < 768) setNavOpen(false);
  }, []);

  // Close nav on mobile when pressing Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.innerWidth < 768) setNavOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Mobile backdrop — shown when nav is open on small screens */}
      {mounted && navOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-obsidian/70 backdrop-blur-sm"
          onClick={() => setNavOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar nav — fixed on mobile so it overlays content */}
      <div className={`
        md:relative md:z-auto
        fixed inset-y-0 left-0 z-30
        transition-transform duration-200 ease-in-out
        ${mounted && navOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <Nav open={navOpen} onToggle={toggleNav} onNavLinkClick={closeOnMobile} />
      </div>

      {/* Main content column */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile-only sticky topbar */}
        <Topbar onMenuToggle={toggleNav} />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
