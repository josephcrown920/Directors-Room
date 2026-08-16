"use client";
import { SceneLayer } from "@/lib/types";

export default function LayerSidebar({
  layers,
  activeId,
  onSelect,
  onToggleVisible,
}: {
  layers: SceneLayer[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
}) {
  return (
    <aside className="w-64 border-r border-line bg-panel/70 backdrop-blur-sm p-4 space-y-3">
      <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
        Layers
      </h2>
      {layers.map((layer) => {
        const isActive = activeId === layer.id;
        return (
          <div
            key={layer.id}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`Select layer ${layer.name}`}
            onClick={() => onSelect(layer.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(layer.id);
              }
            }}
            className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isActive
                ? "bg-accent/10 border border-accent text-white"
                : "border border-transparent hover:border-line text-muted"
            }`}
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span>{layer.name}</span>
            </div>
            <button
              type="button"
              aria-label={
                layer.visible ? `Hide layer ${layer.name}` : `Show layer ${layer.name}`
              }
              aria-pressed={layer.visible}
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisible(layer.id);
              }}
              className="text-xs text-muted hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {layer.visible ? "👁" : "👁‍🗨"}
            </button>
          </div>
        );
      })}
    </aside>
  );
}
