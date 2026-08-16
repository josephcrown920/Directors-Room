"use client";
import { SceneLayer } from "@/lib/types";

export default function LayerControls({
  layer,
  onChange,
}: {
  layer: SceneLayer | null;
  onChange: (layer: SceneLayer) => void;
}) {
  if (!layer) {
    return (
      <aside className="w-72 border-l border-line bg-panel/70 backdrop-blur-sm p-4 text-sm text-muted">
        Select a layer to adjust transforms and light.
      </aside>
    );
  }

  const currentLayer = layer;
  const { transform } = currentLayer;

  function updateTransform<K extends keyof typeof transform>(
    key: K,
    value: number
  ) {
    onChange({
      id: currentLayer.id,
      name: currentLayer.name,
      type: currentLayer.type,
      url: currentLayer.url,
      ...(currentLayer.maskUrl ? { maskUrl: currentLayer.maskUrl } : {}),
      visible: currentLayer.visible,
      transform: {
        x: key === "x" ? value : transform.x,
        y: key === "y" ? value : transform.y,
        scale: key === "scale" ? value : transform.scale,
        rotation: key === "rotation" ? value : transform.rotation,
      },
    });
  }

  return (
    <aside className="w-72 border-l border-line bg-panel/70 backdrop-blur-sm p-4 space-y-4 text-sm">
      <h2 className="text-xs uppercase tracking-widest text-muted">
        {layer.name}
      </h2>
      <div>
        <h3 className="text-xs uppercase tracking-wider text-muted mb-2">
          Transform
        </h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between gap-3">
            <span className="w-14 text-muted" id={`label-x-${layer.id}`}>X</span>
            <input
              type="range"
              min={-200}
              max={200}
              value={transform.x}
              aria-label={`${layer.name} horizontal position`}
              aria-labelledby={`label-x-${layer.id}`}
              onChange={(e) => updateTransform("x", Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-10 text-right text-xs text-muted" aria-hidden="true">
              {transform.x}
            </span>
          </label>
          <label className="flex items-center justify-between gap-3">
            <span className="w-14 text-muted" id={`label-y-${layer.id}`}>Y</span>
            <input
              type="range"
              min={-200}
              max={200}
              value={transform.y}
              aria-label={`${layer.name} vertical position`}
              aria-labelledby={`label-y-${layer.id}`}
              onChange={(e) => updateTransform("y", Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-10 text-right text-xs text-muted" aria-hidden="true">
              {transform.y}
            </span>
          </label>
          <label className="flex items-center justify-between gap-3">
            <span className="w-14 text-muted" id={`label-scale-${layer.id}`}>Scale</span>
            <input
              type="range"
              min={50}
              max={200}
              value={transform.scale * 100}
              aria-label={`${layer.name} scale percentage`}
              aria-labelledby={`label-scale-${layer.id}`}
              onChange={(e) =>
                updateTransform("scale", Number(e.target.value) / 100)
              }
              className="flex-1"
            />
            <span className="w-10 text-right text-xs text-muted" aria-hidden="true">
              {Math.round(transform.scale * 100)}%
            </span>
          </label>
          <label className="flex items-center justify-between gap-3">
            <span className="w-14 text-muted" id={`label-rot-${layer.id}`}>Rotate</span>
            <input
              type="range"
              min={-45}
              max={45}
              value={transform.rotation}
              aria-label={`${layer.name} rotation in degrees`}
              aria-labelledby={`label-rot-${layer.id}`}
              onChange={(e) =>
                updateTransform("rotation", Number(e.target.value))
              }
              className="flex-1"
            />
            <span className="w-10 text-right text-xs text-muted" aria-hidden="true">
              {transform.rotation}°
            </span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-wider text-muted mb-2">
          Light (visual only)
        </h3>
        <p className="text-xs text-muted">
          In a later batch we&apos;ll wire this to real relighting models. For
          now, it&apos;s a conceptual preview.
        </p>
      </div>
    </aside>
  );
}
