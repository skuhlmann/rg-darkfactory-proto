import Image from "next/image";

export default function FactoryRumorArtwork() {
  return (
    <div className="relative w-full h-80 lg:h-96 rounded-lg overflow-hidden">
      <Image
        src="/underground.png"
        alt="Vast underground cavern beneath a castle with dwarven machinery, glowing runes, and flickering forge lights."
        fill
        className="object-cover object-center"
        style={{ opacity: 0.75 }}
      />
      {/* Fade left/right edges into the page background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #0B0B0D 0%, transparent 20%, transparent 80%, #0B0B0D 100%)",
        }}
      />
      {/* Fade bottom into page */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #0B0B0D 0%, transparent 35%)" }}
      />
      {/* Caption */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <span
          className="font-mono text-xs text-forgeGold/60 tracking-widest italic"
          style={{ textShadow: "0 0 12px #0B0B0D, 0 0 24px #0B0B0D" }}
        >
          The gears of the Dark Factory churn endlessly.
        </span>
      </div>
    </div>
  );
}
