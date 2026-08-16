"use client";
import { useMemo, useState } from "react";
import { Shot } from "@/lib/types";

export default function PreviewPlayer({ shots }: { shots: Shot[] }) {
  const [index, setIndex] = useState(0);
  const shot = shots[index];

  const readyShots = useMemo(
    () => shots.filter((s) => s.outputUrl),
    [shots]
  );

  if (!shot) {
    return (
      <div className="rounded-2xl border border-line bg-panel/70 p-8 text-sm text-muted">
        No shots in this project yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-panel/70 p-4 lg:p-6">
      <div className="aspect-video rounded-xl overflow-hidden bg-[radial-gradient(circle_at_top,_#1a1d24,_#050609)] mb-4">
        {shot.outputUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.outputUrl}
            alt={shot.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-muted">
            Shot has no render yet.
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted mb-1">
            Shot {shot.order}
          </div>
          <div className="font-display text-white">{shot.title}</div>
          <div className="text-xs text-muted mt-1">
            {shot.duration}s · {shot.resolution} · {shot.aspectRatio}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="px-3 py-1.5 rounded-full border border-line text-xs text-white hover:border-white/40 transition-colors"
          >
            ◀ Prev
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(shots.length - 1, i + 1))}
            className="px-3 py-1.5 rounded-full border border-line text-xs text-white hover:border-white/40 transition-colors"
          >
            Next ▶
          </button>
        </div>
      </div>
      <div className="mt-4 text-xs text-muted">
        Ready shots: {readyShots.length}/{shots.length}
      </div>
    </div>
  );
}
