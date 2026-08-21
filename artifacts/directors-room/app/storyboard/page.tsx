"use client";

import { useState } from "react";

type BoardShot = { id: string; title: string; prompt: string; motion: string; image: string };
const seedShots: BoardShot[] = [
  { id: "01", title: "Establish", prompt: "Wide plate, artist enters the location and owns the frame.", motion: "Slow dolly in", image: "/aurora/hero-street.jpg" },
  { id: "02", title: "Performance", prompt: "Medium performance with locked identity and wardrobe continuity.", motion: "Handheld lateral move", image: "/aurora/layer-braids-locked.jpg" },
  { id: "03", title: "Payoff", prompt: "Close detail on the transformed layer at the beat drop.", motion: "Freeze then orbit", image: "/aurora/layer-chains-locked.jpg" },
];

export default function StoryboardPage() {
  const [shots, setShots] = useState(seedShots);
  function addShot() {
    setShots((current) => [...current, { id: String(current.length + 1).padStart(2, "0"), title: "New shot", prompt: "Describe the frame and continuity handoff…", motion: "Choose camera motion", image: "/aurora/demo-motion.jpg" }]);
  }
  return (
    <main className="min-h-screen bg-ink px-5 py-12 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs uppercase tracking-[0.25em] text-gold">Directors Room · Storyboard</span>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Build the sequence before the render.</h1>
        <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={addShot} className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-gold">+ Add shot</button><button type="button" onClick={() => navigator.clipboard.writeText(shots.map((shot) => `${shot.id} ${shot.title}: ${shot.prompt} Motion: ${shot.motion}`).join("\n"))} className="rounded-full border border-line px-4 py-2 text-xs uppercase tracking-wider text-muted hover:border-white hover:text-white">Copy shot list</button></div>
        <div className="mt-10 space-y-4">
          {shots.map((shot, index) => (
            <article key={shot.id} className="grid gap-0 overflow-hidden rounded-2xl border border-line bg-panel/70 md:grid-cols-[240px_1fr]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.image} alt="" className="h-full min-h-40 w-full object-cover" />
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-3"><span className="font-mono text-xs text-gold">SH{shot.id}</span><input value={shot.title} onChange={(event) => setShots((current) => current.map((item) => item.id === shot.id ? { ...item, title: event.target.value } : item))} className="flex-1 border-b border-transparent bg-transparent font-display text-2xl outline-none focus:border-accent" /></div>
                <textarea value={shot.prompt} onChange={(event) => setShots((current) => current.map((item) => item.id === shot.id ? { ...item, prompt: event.target.value } : item))} className="min-h-20 w-full rounded-xl border border-line bg-ink p-3 text-sm text-white/80 outline-none focus:border-accent" />
                <input value={shot.motion} onChange={(event) => setShots((current) => current.map((item) => item.id === shot.id ? { ...item, motion: event.target.value } : item))} className="w-full rounded-xl border border-line bg-ink px-3 py-2 text-xs text-muted outline-none focus:border-accent" />
                <span className="text-[10px] uppercase tracking-widest text-muted">Continuity pass · shot {index + 1} of {shots.length}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}