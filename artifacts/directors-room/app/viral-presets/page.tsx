"use client";

import { useState } from "react";
import { VIRAL_PRESETS } from "@/lib/viralPresets";

export default function ViralPresetsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const visible = VIRAL_PRESETS.filter((preset) => `${preset.name} ${preset.hook} ${preset.format}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-screen bg-ink px-5 py-12 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs uppercase tracking-[0.25em] text-gold">Directors Room · Viral Presets</span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-7xl">Remix the formats people stop for.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">These are not style presets. They are repeatable viral video structures: hook, motion, edit rhythm, and a ready-to-remix prompt.</p>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search formats…" className="mt-8 w-full max-w-xl rounded-xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-accent" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visible.map((preset) => (
            <article key={preset.id} className="overflow-hidden rounded-2xl border border-line bg-panel/70">
              <div className="relative aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preset.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <h2 className="absolute bottom-4 left-4 font-display text-3xl">{preset.name}</h2>
              </div>
              <div className="space-y-3 p-5">
                <p className="text-sm text-white/80">{preset.hook}</p>
                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-gold"><span>{preset.format}</span><span>·</span><span>Remix ready</span></div>
                <p className="text-xs leading-relaxed text-muted"><strong className="text-white">Motion:</strong> {preset.motion}</p>
                <p className="text-xs leading-relaxed text-muted"><strong className="text-white">Edit:</strong> {preset.edit}</p>
                <button type="button" onClick={() => setActive(active === preset.id ? null : preset.id)} className="rounded-full border border-accent px-4 py-2 text-xs uppercase tracking-wider text-accent hover:bg-accent hover:text-white">{active === preset.id ? "Hide remix prompt" : "Open remix prompt"}</button>
                {active === preset.id ? (
                  <div className="space-y-3">
                    <textarea defaultValue={preset.prompt} className="min-h-32 w-full rounded-xl border border-line bg-ink p-3 text-xs leading-relaxed text-white/80 outline-none focus:border-accent" />
                    <a href={`/generate/video?prompt=${encodeURIComponent(preset.prompt)}`} className="inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-gold">Open in video agent</a>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}