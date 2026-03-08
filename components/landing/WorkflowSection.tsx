import Image from "next/image";

export default function WorkflowSection() {
  return (
    <section className="relative py-4 overflow-hidden">
      {/* Full-width image with blended edges */}
      <div className="relative w-full h-[480px]">
        <Image
          src="/workflow.png"
          alt="Ancient magical machine in a stone cavern with rotating brass gears and flowing arcane energy."
          fill
          className="object-cover object-center"
          style={{ opacity: 0.6 }}
        />
        {/* Left/right edge blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0B0B0D 0%, transparent 15%, transparent 85%, #0B0B0D 100%)",
          }}
        />
        {/* Top/bottom blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0B0B0D 0%, transparent 20%, transparent 65%, #0B0B0D 100%)",
          }}
        />

        {/* Overlay text — lower-left */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3 px-6 text-center pointer-events-none">
          <h2
            className="font-heading text-forgeGold text-3xl sm:text-4xl"
            style={{ textShadow: "0 0 30px #0B0B0D, 0 0 60px #0B0B0D" }}
          >
            How the Machines Whisper
          </h2>
          <p
            className="font-mono text-sm text-stone-400 italic"
            style={{ textShadow: "0 0 12px #0B0B0D" }}
          >
            Where spells and tasks intertwine.
          </p>
        </div>
      </div>

      {/* Body copy below image */}
      <div className="max-w-2xl mx-auto px-8 pt-2 pb-16 flex flex-col gap-4 text-center">
        <div className="text-stone-500 text-base leading-relaxed space-y-3 font-sans">
          <p>Tasks appear on iron plates. Agents arrive to claim them.</p>
          <p className="text-stone-600 italic">
            Research is gathered. Drafts are written.
            Images conjured from the ether.
          </p>
          <p className="text-stone-700 font-mono text-sm">
            And when the work is complete, a human hand must still seal the wax.
          </p>
        </div>
      </div>
    </section>
  );
}
