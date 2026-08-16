"use client";
import { useId, useState } from "react";
import { Shot } from "@/lib/types";
import CameraRigSelector from "./CameraRigSelector";

const statusMeta: Record<Shot["status"], { label: string; dot: string }> = {
  draft: { label: "Draft", dot: "bg-muted/50" },
  queued: { label: "Queued", dot: "bg-muted" },
  processing: { label: "Rendering…", dot: "bg-gold animate-pulse" },
  ready: { label: "Ready", dot: "bg-emerald-400" },
  failed: { label: "Failed", dot: "bg-red-400" },
};

export default function ShotCard({ shot, onUpdate }: { shot: Shot; onUpdate: (shot: Shot) => void }) {
  const [expanded, setExpanded] = useState(false);
  const meta = statusMeta[shot.status];
  const panelId = useId();
  const titleId = useId();

  return (
    <div className="rounded-2xl border border-line bg-panel overflow-hidden transition-all">
      <div className="grid md:grid-cols-[220px_1fr] gap-0">
        {/* Preview */}
        <div className="relative aspect-video md:aspect-auto bg-gradient-to-br from-[#181b22] to-ink">
          {shot.outputUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shot.outputUrl} alt={shot.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-xs text-muted">No render yet</span>
            </div>
          )}
          <div className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
            Shot {shot.order}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <label htmlFor={titleId} className="sr-only">
                Shot title
              </label>
              <input
                id={titleId}
                className="bg-transparent font-display text-lg text-white outline-none border-b border-transparent focus:border-line"
                value={shot.title}
                onChange={(e) => onUpdate({ ...shot, title: e.target.value })}
              />
              <div className="flex items-center gap-2 mt-1" role="status" aria-live="polite">
                <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
                <span className="text-xs text-muted">{meta.label}</span>
                <span className="text-xs text-muted">· {shot.duration}s · {shot.resolution}</span>
              </div>
            </div>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setExpanded((v) => !v)}
              className="text-xs text-muted hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {expanded ? "Collapse" : "Edit"}
            </button>
          </div>

          <p className="text-sm text-muted leading-relaxed line-clamp-2">{shot.prompt}</p>

          {expanded && (
            <div id={panelId} className="mt-5 pt-5 border-t border-line space-y-5">
              <div>
                <label htmlFor={`prompt-${shot.id}`} className="text-xs uppercase tracking-wider text-muted mb-2 block">
                  Prompt
                </label>
                <textarea
                  id={`prompt-${shot.id}`}
                  className="w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm text-white outline-none focus:border-accent min-h-[80px]"
                  value={shot.prompt}
                  onChange={(e) => onUpdate({ ...shot, prompt: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                  Camera motion
                </label>
                <CameraRigSelector
                  value={shot.cameraRig}
                  onChange={(rig) => onUpdate({ ...shot, cameraRig: rig })}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor={`duration-${shot.id}`} className="text-xs uppercase tracking-wider text-muted mb-2 block">
                    Duration
                  </label>
                  <select
                    id={`duration-${shot.id}`}
                    className="w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm text-white outline-none"
                    value={shot.duration}
                    onChange={(e) => onUpdate({ ...shot, duration: Number(e.target.value) })}
                  >
                    {[3, 4, 5, 6, 8, 10].map((d) => (
                      <option key={d} value={d}>{d}s</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`resolution-${shot.id}`} className="text-xs uppercase tracking-wider text-muted mb-2 block">
                    Resolution
                  </label>
                  <select
                    id={`resolution-${shot.id}`}
                    className="w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm text-white outline-none"
                    value={shot.resolution}
                    onChange={(e) => onUpdate({ ...shot, resolution: e.target.value as Shot["resolution"] })}
                  >
                    {["480p", "720p", "1080p"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`aspect-${shot.id}`} className="text-xs uppercase tracking-wider text-muted mb-2 block">
                    Aspect
                  </label>
                  <select
                    id={`aspect-${shot.id}`}
                    className="w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm text-white outline-none"
                    value={shot.aspectRatio}
                    onChange={(e) => onUpdate({ ...shot, aspectRatio: e.target.value as Shot["aspectRatio"] })}
                  >
                    {["16:9", "9:16", "1:1"].map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={`notes-${shot.id}`} className="text-xs uppercase tracking-wider text-muted mb-2 block">
                  Continuity notes
                </label>
                <textarea
                  id={`notes-${shot.id}`}
                  className="w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm text-white outline-none focus:border-accent min-h-[60px]"
                  placeholder="Wardrobe, lighting, color palette to keep consistent…"
                  value={shot.continuityNotes}
                  onChange={(e) => onUpdate({ ...shot, continuityNotes: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full bg-white text-ink text-sm font-medium hover:bg-gold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Generate shot
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full border border-line text-white text-sm hover:border-white/40 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Upload reference
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
