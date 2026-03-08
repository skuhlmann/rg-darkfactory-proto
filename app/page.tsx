"use client";

import { useEffect, useState, useCallback } from "react";
import HeroSection from "@/components/landing/HeroSection";
import RumorSection from "@/components/landing/RumorSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import AgentsSection from "@/components/landing/AgentsSection";
import WhisperSection from "@/components/landing/WhisperSection";
import GuildCTA from "@/components/landing/GuildCTA";
import WarningSection from "@/components/landing/WarningSection";
import DoorSection from "@/components/landing/DoorSection";
import HiddenEntrance from "@/components/landing/HiddenEntrance";
import LandingFooter from "@/components/landing/LandingFooter";

// Correct rune click sequence to unlock the factory entrance
const CORRECT_SEQUENCE = ["gear", "circle", "flame"];
// Keyboard easter egg words
const KEYBOARD_TRIGGERS = ["factory", "/enter"];

export default function LandingPage() {
  const [runeSequence, setRuneSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState("");

  const unlock = useCallback(() => {
    setUnlocked(true);
  }, []);

  const handleRuneClick = useCallback(
    (rune: string) => {
      if (unlocked) return;

      setRuneSequence((prev) => {
        const next = [...prev, rune].slice(-CORRECT_SEQUENCE.length);
        if (next.join(",") === CORRECT_SEQUENCE.join(",")) {
          unlock();
        } else if (!CORRECT_SEQUENCE.slice(0, next.length).join(",").startsWith(next.join(",").slice(0, -rune.length - 1))) {
          // Wrong rune added — reset
          return [rune];
        }
        return next;
      });
    },
    [unlocked, unlock]
  );

  // Keyboard easter egg: type "factory" or "/enter"
  useEffect(() => {
    if (unlocked) return;

    const handleKey = (e: KeyboardEvent) => {
      // Only printable single chars
      if (e.key.length !== 1) return;
      setKeyBuffer((prev) => {
        const next = (prev + e.key).slice(-10);
        if (KEYBOARD_TRIGGERS.some((trigger) => next.endsWith(trigger))) {
          unlock();
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [unlocked, unlock]);

  // Ember particle effect - subtle floating sparks
  const emberCount = 12;

  return (
    <div className="min-h-screen bg-obsidian relative overflow-x-hidden">
      {/* Ember particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
        {Array.from({ length: emberCount }).map((_, i) => (
          <span
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-ember/60"
            style={{
              left: `${10 + (i * 7.3) % 80}%`,
              bottom: `${(i * 13.7) % 40}%`,
              animation: `floatEmber ${6 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 1.3) % 6}s`,
              opacity: 0.4 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Page sections */}
      <HeroSection onRuneClick={handleRuneClick} />
      <RumorSection />
      <WorkflowSection />
      <AgentsSection />
      <WhisperSection />
      <GuildCTA />
      <WarningSection onRuneClick={handleRuneClick} />
      <DoorSection onUnlock={unlock} />
      <LandingFooter />

      {/* Easter egg unlock panel */}
      <HiddenEntrance unlocked={unlocked} />

      {/* Dev hint: tiny rune counter (only in dev) — remove for prod */}
      {process.env.NODE_ENV === "development" && runeSequence.length > 0 && (
        <div className="fixed top-2 right-2 text-stone-800 font-mono text-xs z-50">
          [{runeSequence.join(" → ")}]
        </div>
      )}
    </div>
  );
}
