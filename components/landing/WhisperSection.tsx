const STEPS = [
  { icon: "📜", label: "Task", name: "Scroll" },
  { icon: "⚙", label: "Agent", name: "Gear" },
  { icon: "💎", label: "Artifact", name: "Crystal" },
  { icon: "🔏", label: "Approval", name: "Seal" },
];

export default function WhisperSection() {
  return (
    <section className="px-8 py-24 max-w-3xl mx-auto flex flex-col items-center gap-12 text-center">
      <div className="flex flex-col gap-4">
        <div className="text-forgeGold/40 font-mono text-xs tracking-[0.3em] uppercase">
          How the Machines Whisper
        </div>
        <h2 className="font-heading text-forgeGold text-4xl">
          How the Machines Whisper
        </h2>
      </div>

      <div className="text-stone-400 text-base leading-relaxed space-y-4 max-w-xl font-sans">
        <p>Some believe the factory listens.</p>
        <p className="text-stone-500">
          Tasks appear on iron plates.
          Agents arrive to claim them.
          Work begins without command.
        </p>
        <p className="text-stone-500">
          Research is gathered.
          Drafts are written.
          Images conjured from the ether.
        </p>
        <p className="text-stone-600 italic">
          And when the work is complete,
          a human hand must still seal the wax.
        </p>
        <p className="text-stone-700 italic">
          Only then does the machine fall silent.
        </p>
      </div>

      {/* Animated step icons */}
      <div className="flex items-center gap-0 w-full max-w-lg justify-center">
        {STEPS.map((step, i) => (
          <div key={step.name} className="flex items-center">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-14 h-14 rounded-full border border-forgeGold/25 bg-deepIron flex items-center justify-center text-2xl
                  transition-all duration-500 group-hover:border-forgeGold/60 group-hover:bg-forgeGold/5"
                style={{
                  animation: `runeGlow 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.6}s`,
                }}
              >
                {step.icon}
              </div>
              <div className="text-xs font-mono text-stone-600 group-hover:text-stone-400 transition-colors">
                {step.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex items-center mx-1 mb-5">
                <div
                  className="h-px bg-gradient-to-r from-forgeGold/20 to-forgeGold/10 w-8"
                  style={{ animation: "runeGlow 3s ease-in-out infinite", animationDelay: `${i * 0.6 + 0.3}s` }}
                />
                <span className="text-forgeGold/25 text-xs mx-0.5">→</span>
                <div
                  className="h-px bg-gradient-to-r from-forgeGold/10 to-forgeGold/20 w-8"
                  style={{ animation: "runeGlow 3s ease-in-out infinite", animationDelay: `${i * 0.6 + 0.4}s` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
