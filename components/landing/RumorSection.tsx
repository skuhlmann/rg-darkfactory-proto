import FactoryRumorArtwork from "./FactoryRumorArtwork";

export default function RumorSection() {
  return (
    <section className="px-8 py-24 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Text */}
      <div className="flex flex-col gap-6">
        <div className="text-forgeGold/40 font-mono text-xs tracking-[0.3em] uppercase">
          Rumors from Below
        </div>
        <h2 className="font-heading text-forgeGold text-4xl leading-tight">
          Rumors from Below
        </h2>
        <div className="text-stone-400 text-base leading-relaxed space-y-4 font-sans">
          <p>The guild scribes speak quietly of it.</p>
          <p>
            A hidden workshop buried beneath the castle foundations.
          </p>
          <p className="text-stone-500">
            They say dwarven machines grind endlessly there.
            That strange agents take tasks from unseen ledgers.
            That scrolls emerge written before the ink has dried.
          </p>
          <p className="text-stone-600 italic">
            No guildmaster claims ownership of the place.
          </p>
          <p className="text-stone-600 italic">
            And yet the machinery never stops.
          </p>
        </div>

        {/* Decorative rune bar */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-forgeGold/30 font-mono text-lg">ᚱ</span>
          <span className="flex-1 h-px bg-forgeGold/10" />
          <span className="text-forgeGold/30 font-mono text-lg">ᚠ</span>
          <span className="flex-1 h-px bg-forgeGold/10" />
          <span className="text-forgeGold/30 font-mono text-lg">᛫</span>
        </div>
      </div>

      {/* Artwork */}
      <FactoryRumorArtwork />
    </section>
  );
}
