"use client";
import { Shot } from "@/lib/types";
import { useState } from "react";

export default function TimelineStrip({ shots }: { shots: Shot[] }) {
  const [activeId, setActiveId] = useState(shots[0]?.id);

  const total = shots.reduce((acc, s) => acc + s.duration, 0);
  return (
    <div className="mt-6 rounded-2xl border border-line bg-panel/70 p-4">
      <div className="flex items-center justify-between mb-3 text-xs text-muted">
        <span>Timeline</span>
        <span>{total}s total</span>
      </div>
      <div className="flex gap-1 h-14">
        {shots.map((shot) => {
          const width = (shot.duration / total) * 100;
          return (
            <button
              key={shot.id}
              style={{ width: `${width}%` }}
              onClick={() => setActiveId(shot.id)}
              className={`h-full text-[10px] px-1 text-left border border-line/60 overflow-hidden ${
                activeId === shot.id ? "bg-accent/20 border-accent" : "bg-ink/80 hover:bg-ink"
              }`}
            >
              <div className="truncate text-muted">Shot {shot.order}</div>
              <div className="truncate text-white">{shot.title}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
