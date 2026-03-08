import Image from "next/image";

export default function AgentsSection() {
  return (
    <section className="relative py-4 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          <div className="text-forgeGold/40 font-mono text-xs tracking-[0.3em] uppercase">
            The Workers Below
          </div>
          <h2 className="font-heading text-forgeGold text-4xl leading-tight">
            The Unseen Hands
          </h2>
          <div className="text-stone-400 text-base leading-relaxed space-y-3 font-sans">
            <p>They labor in chambers you will never visit.</p>
            <p className="text-stone-500">
              Each one assigned a task from the iron ledger.
              Each one working through the night watch.
            </p>
            <p className="text-stone-600 italic font-mono text-sm">
              The unseen hands that run the factory.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-forgeGold/30 font-mono text-lg">✦</span>
            <span className="flex-1 h-px bg-forgeGold/10" />
            <span className="text-forgeGold/30 font-mono text-lg">✦</span>
          </div>
        </div>

        {/* Image side */}
        <div className="relative h-72 lg:h-96 rounded-lg overflow-hidden order-1 lg:order-2">
          <Image
            src="/agents.png"
            alt="Alchemical workshop with dwarves and gnomes at glowing devices and scrolls, candlelight and forge lighting."
            fill
            className="object-cover object-center"
            style={{ opacity: 0.7 }}
          />
          {/* Fade left edge into page on large screens */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0B0B0D 0%, transparent 25%, transparent 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #0B0B0D 0%, transparent 30%)" }}
          />
        </div>
      </div>
    </section>
  );
}
