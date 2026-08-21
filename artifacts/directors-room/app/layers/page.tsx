"use client";
import { LayerStudio } from "@/components/layers/aurora/LayerStudio";

export default function LayersPage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Directors Room · Layers</span>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              One frame. Infinite layers.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Upload a source frame, name the change, and build a render sequence while the rest of the image stays locked.
            </p>
          </div>
        </div>
        <LayerStudio />
      </div>
    </main>
  );
}
