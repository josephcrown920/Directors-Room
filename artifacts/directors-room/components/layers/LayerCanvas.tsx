"use client";

import { useState } from "react";
import { SceneLayer } from "@/lib/types";

function LayerImage({ layer }: { layer: SceneLayer }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!layer.visible) return null;

  const { x, y, scale, rotation } = layer.transform;

  if (imageFailed || layer.url.startsWith("/demo/")) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted">
        {layer.name}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={layer.url}
      alt={layer.name}
      onError={() => setImageFailed(true)}
      className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${rotation}deg)`,
      }}
    />
  );
}

export default function LayerCanvas({ layers }: { layers: SceneLayer[] }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-[radial-gradient(circle_at_top,_#1a1d24,_#050609)]">
      <div className="relative h-[340px] w-[600px] overflow-hidden rounded-2xl border border-line bg-ink/80 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
        {layers.map((layer) => (
          <LayerImage key={layer.id} layer={layer} />
        ))}
      </div>
    </div>
  );
}