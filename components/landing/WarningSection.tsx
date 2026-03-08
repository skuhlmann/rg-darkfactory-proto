"use client";

interface Props {
  onRuneClick: (rune: string) => void;
}

export default function WarningSection({ onRuneClick }: Props) {
  return (
    <section className="px-8 py-24 max-w-2xl mx-auto flex flex-col items-center gap-6 text-center relative">
      {/* Top border */}
      <div className="w-full flex items-center gap-4">
        <span className="flex-1 h-px bg-stone/30" />
        <span className="text-stone/50 font-mono text-sm">· · ·</span>
        <span className="flex-1 h-px bg-stone/30" />
      </div>

      {/* Rune: Circle — placed here, in the warning section */}
      <button
        onClick={() => onRuneClick("circle")}
        title="◯"
        aria-label="Rune symbol"
        className="text-stone/20 hover:text-forgeGold/40 text-3xl transition-all duration-500 hover:scale-125 cursor-default select-none mt-2"
      >
        ◯
      </button>

      <div className="text-stone-500 text-base leading-relaxed space-y-4 font-sans italic">
        <p>Not all doors in the castle are meant to be opened.</p>
        <p className="text-stone-600">
          If you hear the machinery beneath your feet,
          best keep walking.
        </p>
        <p className="text-stone-500 not-italic font-heading text-xl text-forgeGold/60">
          Or…
        </p>
        <p className="text-stone-500">follow the sound.</p>
      </div>

      {/* Bottom border */}
      <div className="w-full flex items-center gap-4 mt-2">
        <span className="flex-1 h-px bg-stone/30" />
        <span className="text-stone/50 font-mono text-sm">· · ·</span>
        <span className="flex-1 h-px bg-stone/30" />
      </div>
    </section>
  );
}
