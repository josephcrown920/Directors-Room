"use client";

import { useMemo, useRef, useState } from "react";
import {
  SEED_PRESETS,
  TARGET_MODELS,
  formatPrompt,
  type Preset,
  type TargetModel,
} from "@/lib/presets";
import CreativeAgents from "@/components/agents/CreativeAgents";

const MAX_BYTES = 18 * 1024 * 1024;
const fallbackThumbs = [
  "/aurora/hero-street.jpg",
  "/aurora/layer-braids.jpg",
  "/aurora/layer-chains.jpg",
  "/aurora/layer-bandana.jpg",
];

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

function PresetCard({
  preset,
  model,
  subject,
}: {
  preset: Preset;
  model: TargetModel;
  subject: string;
}) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const prompt = formatPrompt(preset, model, subject);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  async function generateStill() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: model.id }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || "Generation is not configured yet.");
      setResult(payload.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-panel/70">
      <div className="relative aspect-video overflow-hidden bg-black/30">
        {preset.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preset.thumb} alt={`${preset.name} reference`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted">Extracted reference</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2 py-1 text-[10px] uppercase tracking-widest text-white">
          {preset.source}
        </span>
        <span className="absolute bottom-3 left-3 font-display text-xl text-white">{preset.name}</span>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex flex-wrap gap-1.5">
          {preset.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-2 py-1 text-[10px] uppercase tracking-wider text-muted">
              {tag}
            </span>
          ))}
        </div>

        <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-ink/70 p-3 font-mono text-[11px] leading-relaxed text-white/80">
          {prompt}
        </pre>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void copyPrompt()} className="rounded-full border border-gold px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-gold hover:bg-gold hover:text-ink">
            {copied ? "Copied" : "Copy prompt"}
          </button>
          {model.kind === "image" ? (
            <button type="button" onClick={() => void generateStill()} disabled={busy} className="rounded-full border border-accent px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-accent hover:bg-accent hover:text-white disabled:opacity-50">
              {busy ? "Rendering…" : "Generate still"}
            </button>
          ) : null}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-line px-3 py-2 text-[10px] uppercase tracking-wider text-muted hover:border-white hover:text-white">
            {open ? "Hide DNA" : "Style DNA"}
          </button>
        </div>

        {error ? <p className="text-xs text-gold">{error}</p> : null}
        {result ? (
          <div className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result} alt={`${preset.name} generated result`} className="w-full rounded-xl" />
            <a href={result} download={`${preset.id}.png`} className="text-[10px] uppercase tracking-wider text-gold hover:text-white">Download still</a>
          </div>
        ) : null}

        {open ? (
          <dl className="grid gap-3 border-t border-line pt-4 text-xs">
            {Object.entries(preset.dna).map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] uppercase tracking-widest text-gold">{label}</dt>
                <dd className="mt-1 leading-relaxed text-muted">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </article>
  );
}

export default function PresetStudio() {
  const [modelId, setModelId] = useState(TARGET_MODELS[0]?.id ?? "wan");
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const [extracted, setExtracted] = useState<Preset[]>([]);
  const [extractError, setExtractError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const model = useMemo(
    () => TARGET_MODELS.find((candidate) => candidate.id === modelId) ?? TARGET_MODELS[0]!,
    [modelId],
  );
  const presets = useMemo(
    () => [...extracted, ...SEED_PRESETS].filter((preset) => {
      const haystack = `${preset.name} ${preset.tags.join(" ")} ${preset.dna.mood}`.toLowerCase();
      return haystack.includes(query.toLowerCase().trim());
    }),
    [extracted, query],
  );

  async function extractReference(file: File | undefined) {
    if (!file) return;
    setExtractError(null);
    if (file.size > MAX_BYTES) {
      setExtractError("Keep references under 18MB.");
      return;
    }
    try {
      const thumb = file.type.startsWith("image") ? URL.createObjectURL(file) : "";
      const filename = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
      const dataUrl = await readFile(file);
      setExtracted((current) => [
        {
          id: `extracted-${Date.now()}`,
          name: filename || "Untitled reference",
          source: file.type.startsWith("video") ? "video" : "image",
          thumb,
          tags: ["local reference", "style draft"],
          dna: {
            subject: "Swap in your own subject",
            camera: "Preserve the reference framing and composition",
            lens: "Match the apparent focal length and depth of field",
            lighting: "Match the reference lighting direction and softness",
            grade: "Match the reference color grade",
            texture: "Preserve the reference texture and film response",
            motion: file.type.startsWith("video") ? "Follow the reference movement and timing" : "Locked frame",
            mood: "Match the emotional tone of the reference",
            negative: "Do not change the framing, subject placement, or palette",
          },
        },
        ...current,
      ]);
      void dataUrl;
    } catch (cause) {
      setExtractError(cause instanceof Error ? cause.message : "Could not extract this reference.");
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-line bg-panel/70 p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Aurora Preset Engine · v1</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Turn any reference into a reusable look.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Choose a target engine, swap the subject, and copy the same camera, lighting, grade, texture, and motion DNA into a new scene.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden" onChange={(event) => void extractReference(event.target.files?.[0])} />
          <button type="button" onClick={() => inputRef.current?.click()} className="rounded-full border border-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold hover:text-ink">
            Add image / video reference
          </button>
          <span className="text-xs text-muted">Local draft extraction · max 18MB</span>
        </div>
        {extractError ? <p className="mt-3 text-xs text-gold">{extractError}</p> : null}
      </section>

      <CreativeAgents initialPrompt={subject} onUsePrompt={setSubject} />

      <section className="sticky top-14 z-10 rounded-2xl border border-line bg-ink/95 p-4 backdrop-blur">
        <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">Target engine</p>
        <div className="flex flex-wrap gap-2">
          {TARGET_MODELS.map((candidate) => (
            <button key={candidate.id} type="button" onClick={() => setModelId(candidate.id)} className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-wider transition-colors ${candidate.id === modelId ? "border-accent bg-accent text-white" : "border-line text-muted hover:border-white hover:text-white"}`}>
              {candidate.label} · {candidate.kind}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
          <label className="text-[10px] uppercase tracking-[0.2em] text-muted">
            Swap subject
            <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="e.g. a woman in a white fur coat" className="mt-2 w-full rounded-xl border border-line bg-panel px-3 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-accent" />
          </label>
          <label className="text-[10px] uppercase tracking-[0.2em] text-muted">
            Search presets
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="mood, lens, lighting…" className="mt-2 w-full rounded-xl border border-line bg-panel px-3 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-accent" />
          </label>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">{presets.length} presets · formatted for <span className="text-white">{model.label}</span></p>
          <span className="text-xs text-muted">{model.style} prompt format</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {presets.map((preset) => <PresetCard key={preset.id} preset={preset} model={model} subject={subject} />)}
        </div>
        {presets.length === 0 ? <div className="rounded-2xl border border-dashed border-line p-12 text-center text-sm text-muted">No presets match that search.</div> : null}
      </section>
    </div>
  );
}