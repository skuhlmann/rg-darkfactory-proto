import type { Artifact } from "@/lib/types";

const TYPE_ICONS: Record<string, string> = {
  markdown: "📄",
  image: "🖼",
  document: "📦",
};

export default function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const icon = TYPE_ICONS[artifact.type] ?? "📎";

  return (
    <div className="panel rounded-lg p-3 flex items-center gap-3">
      <span className="text-xl leading-none">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-mono text-stone-200 truncate">{artifact.title}</div>
        <div className="text-xs text-stone-500">
          by <span className="text-stone-400">{artifact.producerAgent}</span>
          {" · "}
          <span className={artifact.status === "final" ? "text-verdigris" : "text-forgeGold"}>
            {artifact.status}
          </span>
        </div>
      </div>
      <div className="text-xs text-stone-600 font-mono shrink-0">
        {new Date(artifact.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
