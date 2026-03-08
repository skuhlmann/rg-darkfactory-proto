export default function LandingFooter() {
  return (
    <footer className="border-t border-stone/20 px-8 py-10 flex flex-col items-center gap-2 text-center">
      <div className="text-stone-600 font-mono text-sm tracking-wide">
        Raid Guild Experimental Systems Division
      </div>
      <div className="text-stone-700 font-mono text-xs italic">
        Some machines should remain hidden.
      </div>
      <div className="mt-3 flex items-center gap-2 text-stone-800 font-mono text-xs">
        <span>⚙</span>
        <span>◯</span>
        <span>🜂</span>
      </div>
    </footer>
  );
}
