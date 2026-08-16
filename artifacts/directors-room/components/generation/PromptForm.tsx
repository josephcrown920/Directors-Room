"use client";
import { useId, useState } from "react";

export default function PromptForm({
  mode,
}: {
  mode: "image" | "video";
}) {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const promptId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Submitting…");
    setResultUrl(null);

    try {
      if (mode === "image") {
        const res = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setResultUrl(data.url);
        setStatus("Image generated.");
      } else {
        const res = await fetch("/api/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        setStatus(`Job created: ${data.jobId}`);
      }
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-panel/70 p-5 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor={promptId} className="sr-only">
          {mode === "image" ? "Image prompt" : "Video prompt"}
        </label>
        <textarea
          id={promptId}
          className="w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm text-white outline-none focus:border-accent min-h-[80px]"
          placeholder={
            mode === "image"
              ? "Describe a cinematic frame…"
              : "Describe a cinematic motion shot…"
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          aria-label={mode === "image" ? "Image prompt" : "Video prompt"}
        />
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-white text-ink text-sm font-medium hover:bg-gold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Generate {mode}
        </button>
      </form>
      <div role="status" aria-live="polite" className="text-xs text-muted min-h-[1em]">
        {status}
      </div>
      {mode === "image" && resultUrl && (
        <div className="mt-3 rounded-xl overflow-hidden border border-line bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resultUrl} alt="Generated result" className="w-full h-auto object-cover" />
        </div>
      )}
    </div>
  );
}
