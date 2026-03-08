"use client";

import HeroArtwork from "./HeroArtwork";

interface Props {
  onRuneClick: (rune: string) => void;
}

export default function HeroSection({ onRuneClick }: Props) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <HeroArtwork />

      {/* Rune: Gear — top-left decorative position */}
      <button
        onClick={() => onRuneClick("gear")}
        title="⚙"
        aria-label="Rune symbol"
        className="absolute top-8 left-10 text-forgeGold/20 hover:text-forgeGold/50 text-2xl transition-all duration-500 hover:scale-125 cursor-default select-none z-20"
      >
        ⚙
      </button>

      {/* Rune: Flame — bottom-right corner */}
      <button
        onClick={() => onRuneClick("flame")}
        title="🜂"
        aria-label="Rune symbol"
        className="absolute bottom-16 right-12 text-ember/20 hover:text-ember/50 text-xl transition-all duration-500 hover:scale-125 cursor-default select-none z-20"
      >
        🜂
      </button>

      {/* Hero copy */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-3xl">
        <div className="text-forgeGold/40 font-mono text-xs tracking-[0.4em] uppercase mb-2">
          Raid Guild · Experimental Systems Division
        </div>

        <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-forgeGold leading-none tracking-wide"
          style={{ textShadow: "0 0 40px #C7A23A44, 0 0 80px #C7A23A22" }}>
          The Dark Factory
        </h1>

        <p className="font-heading text-stone-300 text-xl sm:text-2xl italic"
          style={{ textShadow: "0 2px 12px #0B0B0D" }}>
          Venture below the castle… discover the alchemy within.
        </p>

        <div className="mt-4 text-stone-500 text-sm leading-relaxed max-w-xl space-y-3 font-sans">
          <p>
            Deep below the stone halls, past the forgotten dungeons and sealed vaults,
            a factory of arcane design hums in the darkness.
          </p>
          <p>
            Agents move unseen.
            Scrolls are written by unseen hands.
            Ideas are forged into artifacts.
          </p>
          <p className="text-stone-600">
            Few know what truly happens there.
            Fewer still have seen it.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 text-stone-700 font-mono text-xs">
          <span className="w-8 h-px bg-forgeGold/20" />
          scroll to descend
          <span className="w-8 h-px bg-forgeGold/20" />
        </div>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-obsidian pointer-events-none z-10" />
    </section>
  );
}
