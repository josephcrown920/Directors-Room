"use client";

import { useMemo, useState } from "react";

type CreativeAgentsProps = {
  initialPrompt?: string;
  onUsePrompt?: (prompt: string) => void;
};

export default function CreativeAgents({ initialPrompt = "", onUsePrompt }: CreativeAgentsProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [brainOutput, setBrainOutput] = useState<string | null>(null);
  const [videoPrompt, setVideoPrompt] = useState(initialPrompt);
  const [videoStatus, setVideoStatus] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const breakdown = useMemo(() => {
    const subject = prompt.trim() || "the main subject";
    return [
      `SUBJECT LOCK · Keep ${subject} consistent across every shot.`,
      "COVERAGE · Wide establishing, medium performance, close detail, transition insert.",
      "CONTINUITY · Preserve wardrobe, screen direction, key light, and palette.",
      "EDIT RHYTHM · Build a 3-beat arc: establish → escalate → payoff.",
    ].join("\n");
  }, [prompt]);

  function runBrain() {
    setBrainOutput(breakdown);
  }

  async function queueVideo() {
    setVideoStatus("Preparing video job…");
    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: videoPrompt, imageUrl: reference || undefined }),
      });
      const payload = (await response.json()) as { jobId?: string; error?: string };
      if (!response.ok) throw new Error(payload.error || "Video provider is not configured.");
      setVideoStatus(`Queued · ${payload.jobId}`);
    } catch (cause) {
      setVideoStatus(cause instanceof Error ? cause.message : "Video job failed.");
    }
  }

  function onReference(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setReference(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-line bg-panel/70 p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Aurora Brain</p>
        <h2 className="mt-2 font-display text-2xl">Turn a look into a shoot plan.</h2>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Describe the scene, artist, or viral format you want to build…"
          className="mt-4 min-h-28 w-full rounded-xl border border-line bg-ink px-3 py-3 text-sm text-white outline-none focus:border-accent"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={runBrain} className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-gold">Analyze direction</button>
          {brainOutput ? <button type="button" onClick={() => onUsePrompt?.(brainOutput)} className="rounded-full border border-line px-4 py-2 text-xs uppercase tracking-wider text-muted hover:border-white hover:text-white">Use in workspace</button> : null}
        </div>
        {brainOutput ? <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-line bg-ink p-3 font-mono text-xs leading-relaxed text-white/75">{brainOutput}</pre> : null}
      </div>

      <div className="rounded-2xl border border-line bg-panel/70 p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Video Agent</p>
        <h2 className="mt-2 font-display text-2xl">Remix the direction into motion.</h2>
        <textarea
          value={videoPrompt}
          onChange={(event) => setVideoPrompt(event.target.value)}
          placeholder="Describe the movement, camera, and payoff…"
          className="mt-4 min-h-28 w-full rounded-xl border border-line bg-ink px-3 py-3 text-sm text-white outline-none focus:border-accent"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label className="cursor-pointer rounded-full border border-line px-4 py-2 text-xs uppercase tracking-wider text-muted hover:border-white hover:text-white">
            {reference ? "Reference loaded" : "Add reference"}
            <input type="file" accept="image/*" className="hidden" onChange={(event) => onReference(event.target.files?.[0])} />
          </label>
          <button type="button" onClick={() => void queueVideo()} className="rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent hover:bg-accent hover:text-white">Queue video</button>
        </div>
        {videoStatus ? <p className="mt-4 text-xs text-muted" role="status">{videoStatus}</p> : null}
      </div>
    </section>
  );
}