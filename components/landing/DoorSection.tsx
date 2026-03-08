"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  onUnlock: () => void;
}

export default function DoorSection({ onUnlock }: Props) {
  const [clickCount, setClickCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  const handleClick = () => {
    const next = clickCount + 1;
    setClickCount(next);

    // Visual pulse on each click
    setPulse(true);
    setTimeout(() => setPulse(false), 600);

    // Unlock after 3 clicks — mirrors the rune-sequence feel
    if (next >= 3) {
      onUnlock();
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-2xl mx-auto px-8 flex flex-col items-center gap-8 text-center">
        <div className="text-stone-600 font-mono text-xs tracking-[0.3em] uppercase">
          The Entrance
        </div>
        <h2 className="font-heading text-stone-500 text-3xl">
          Find the door…
        </h2>

        {/* Clickable door image */}
        <div
          className={`relative w-72 h-96 cursor-pointer group transition-all duration-500 select-none
            ${pulse ? "scale-[1.02]" : "scale-100"}`}
          onClick={handleClick}
          role="button"
          aria-label="A mysterious door"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        >
          <Image
            src="/door.png"
            alt="Heavy stone door embedded with glowing runes, faint mechanical gears behind, mysterious and ominous."
            fill
            className="object-cover object-center rounded-lg"
            style={{
              opacity: 0.7 + clickCount * 0.08,
              filter: `brightness(${0.8 + clickCount * 0.07}) saturate(${1 + clickCount * 0.15})`,
              transition: "opacity 0.5s, filter 0.5s",
            }}
          />

          {/* Rune glow overlay — intensifies with clicks */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              boxShadow: `inset 0 0 ${20 + clickCount * 20}px #C7A23A${Math.min(clickCount * 20 + 10, 66).toString(16).padStart(2, "0")}`,
              border: `1px solid #C7A23A${Math.min(clickCount * 25 + 15, 80).toString(16).padStart(2, "0")}`,
              transition: "box-shadow 0.5s, border 0.5s",
            }}
          />

          {/* Top/bottom fade */}
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, #0B0B0D 0%, transparent 15%, transparent 80%, #0B0B0D 100%)",
            }}
          />

          {/* Hover instruction */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="font-mono text-xs text-forgeGold/70 tracking-widest"
              style={{ textShadow: "0 0 8px #0B0B0D" }}>
              {clickCount === 0 ? "…knock" : clickCount === 1 ? "…louder" : "…the machinery stirs"}
            </span>
          </div>
        </div>

        {/* Click progress dots */}
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i < clickCount ? "#C7A23A" : "#3A3A3F",
                boxShadow: i < clickCount ? "0 0 6px #C7A23A88" : "none",
              }}
            />
          ))}
        </div>

        <p className="text-stone-700 font-sans text-sm italic">
          if you dare.
        </p>
      </div>
    </section>
  );
}
