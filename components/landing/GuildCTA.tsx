export default function GuildCTA() {
  return (
    <section className="px-8 py-24 max-w-3xl mx-auto flex flex-col items-center gap-8 text-center">
      {/* Decorative divider */}
      <div className="flex items-center gap-4 w-full max-w-xs">
        <span className="flex-1 h-px bg-forgeGold/20" />
        <span className="text-forgeGold/40 font-mono text-lg">⚜</span>
        <span className="flex-1 h-px bg-forgeGold/20" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-forgeGold/40 font-mono text-xs tracking-[0.3em] uppercase">
          The Guild Halls Are Open
        </div>
        <h2 className="font-heading text-forgeGold text-4xl">
          The Guild Halls Are Open
        </h2>
      </div>

      <div className="text-stone-400 text-base leading-relaxed space-y-4 max-w-lg font-sans">
        <p>Those who seek answers rarely find them alone.</p>
        <p className="text-stone-500">
          The Raid Guild gathers explorers, builders, and machinists
          who are not afraid to descend into strange places.
        </p>
        <p className="text-stone-500 italic">
          If you wish to learn more,
          join the guild halls and listen for whispers of the factory.
        </p>
      </div>

      <a
        href="https://discord.gg/raidguild"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 px-8 py-4 rounded bg-forgeGold text-obsidian font-heading text-xl tracking-wide
          transition-all duration-300
          hover:shadow-[0_0_30px_#C7A23A66,0_0_60px_#C7A23A33]
          hover:scale-105 active:scale-100"
      >
        Enter the Raid Guild Discord
      </a>
    </section>
  );
}
