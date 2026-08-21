"use client";

import { useState } from "react";

const starter = ["/aurora/hero-street.jpg", "/aurora/layer-braids-locked.jpg", "/aurora/layer-chains-locked.jpg", "/aurora/demo-motion.jpg"];

export default function MoodboardPage() {
  const [images, setImages] = useState(starter);
  function addImage(file: File | undefined) {
    if (!file || !file.type.startsWith("image")) return;
    const reader = new FileReader();
    reader.onload = () => setImages((current) => [...current, String(reader.result)]);
    reader.readAsDataURL(file);
  }
  return (
    <main className="min-h-screen bg-ink px-5 py-12 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs uppercase tracking-[0.25em] text-gold">Directors Room · Moodboard</span>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Collect the feeling before the frame.</h1>
        <div className="mt-8 flex flex-wrap items-center gap-3"><label className="cursor-pointer rounded-full border border-gold px-4 py-2 text-xs uppercase tracking-wider text-gold hover:bg-gold hover:text-ink">+ Add reference<input type="file" accept="image/*" className="hidden" onChange={(event) => addImage(event.target.files?.[0])} /></label><span className="text-xs text-muted">{images.length} references · drag-ready visual direction</span></div>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, index) => (
            <figure key={`${image.slice(0, 24)}-${index}`} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-panel/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={`Moodboard reference ${index + 1}`} className="w-full object-cover" />
              <figcaption className="p-3 text-xs uppercase tracking-wider text-muted">Reference {String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}