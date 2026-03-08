"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  unlocked: boolean;
}

export default function HiddenEntrance({ unlocked }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (unlocked) {
      // Small delay for drama
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  if (!unlocked) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div
        className="bg-deepIron border border-forgeGold rounded-lg p-6 flex flex-col gap-4 text-center shadow-[0_0_60px_#C7A23A33,0_0_120px_#C7A23A11]"
        style={{ animation: "runeGlow 2s ease-in-out infinite" }}
      >
        {/* Glyph row */}
        <div className="flex justify-center gap-4 text-forgeGold text-xl">
          <span>⚙</span>
          <span>◯</span>
          <span>🜂</span>
        </div>

        <div className="text-stone-300 text-sm leading-relaxed font-sans space-y-2">
          <p className="font-heading text-forgeGold text-lg">
            The machinery recognizes your curiosity.
          </p>
          <p className="text-stone-400">
            A narrow stairwell opens beneath the stone floor.
          </p>
          <p className="text-stone-500 italic">Do you dare descend?</p>
        </div>

        <Link
          href="/demo"
          className="px-6 py-3 rounded bg-forgeGold/10 border border-forgeGold/60 text-forgeGold font-heading text-lg
            hover:bg-forgeGold/20 hover:shadow-[0_0_20px_#C7A23A44] transition-all duration-300"
        >
          Descend into the Factory
        </Link>

        <div className="text-stone-700 font-mono text-xs">
          ⚙ → ◯ → 🜂 — sequence recognized
        </div>
      </div>
    </div>
  );
}
