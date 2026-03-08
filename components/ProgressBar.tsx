export default function ProgressBar({
  value,
  color = "forgeGold",
}: {
  value: number;
  color?: "forgeGold" | "verdigris" | "arcane" | "ember";
}) {
  const colorMap = {
    forgeGold: "bg-forgeGold",
    verdigris: "bg-verdigris",
    arcane: "bg-arcane",
    ember: "bg-ember",
  };

  return (
    <div className="w-full h-1.5 bg-stone/30 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${colorMap[color]}`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
