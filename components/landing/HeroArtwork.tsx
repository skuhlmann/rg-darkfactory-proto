import Image from "next/image";

export default function HeroArtwork() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Base dark fallback */}
      <div className="absolute inset-0 bg-obsidian" />

      {/* Hero image */}
      <Image
        src="/hero.png"
        alt="Dark medieval castle hall with torchlit stone floors, glowing runes, cinematic atmosphere."
        fill
        priority
        className="object-cover object-center"
        style={{ opacity: 0.55 }}
      />

      {/* Edge-blending: left/right fade into obsidian */}
      <div className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #0B0B0D 0%, transparent 18%, transparent 82%, #0B0B0D 100%)",
        }}
      />

      {/* Top fade */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #0B0B0D 0%, transparent 20%)" }}
      />

      {/* Bottom fade into page */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #0B0B0D 0%, transparent 35%)" }}
      />

      {/* Center vignette — darkens edges for text legibility */}
      <div className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #0B0B0D99 100%)",
        }}
      />

      {/* Torch flicker atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 300px 400px at 8% 55%, #E0662A0A, transparent), radial-gradient(ellipse 300px 400px at 92% 55%, #E0662A0A, transparent)",
          animation: "emberFlicker 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
