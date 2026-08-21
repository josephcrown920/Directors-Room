"use client";
import { LayerStudio } from "@/components/layers/aurora/LayerStudio";

const photos = [
  { src: "/aurora/hero-street.jpg", label: "Plate" },
  { src: "/aurora/layer-braids-locked.jpg", label: "Talent" },
  { src: "/aurora/layer-chains-locked.jpg", label: "Jewelry" },
  { src: "/aurora/layer-bandana.jpg", label: "Wardrobe" },
  { src: "/aurora/demo-motion.jpg", label: "Motion" },
];

export default function LayersPage() {
  return (
    <main className="aurora-page min-h-screen">
      <section className="relative overflow-hidden border-b border-[var(--aurora-border)]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aurora/hero-street.jpg" alt="" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0614]/25 via-[#0b0614]/75 to-[#0b0614]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 md:pb-28 md:pt-28">
          <span className="label-chip">Directors Room · Aurora Layers</span>
          <h1 className="headline mt-6 max-w-4xl text-[clamp(3.6rem,10vw,8.5rem)]">
            One frame.
            <span className="gradient-text block">Infinite layers.</span>
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
            <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Turn a flat image into an editable performance. Change the wardrobe, jewelry, light,
              or motion while the identity, pose, and frame stay locked.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href="#studio" className="rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#0b0614] transition-transform hover:scale-105">
                Open studio
              </a>
              <a href="#decompose" className="rounded-full border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:border-white">
                See the layers
              </a>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {photos.map((photo, index) => (
              <figure key={photo.label} className="glow-frame relative aspect-[3/4] overflow-hidden bg-black/40 transition-transform hover:-translate-y-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.label} className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-2 bottom-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#f09ddd]">
                  <span>0{index + 1}</span><span>{photo.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="decompose" className="dotfield border-b border-[var(--aurora-border)]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <span className="label-chip">Step one · Decompose</span>
          <h2 className="headline mt-5 max-w-3xl text-[clamp(2.8rem,7vw,6rem)]">
            One upload.
            <span className="gradient-text block">20+ addressable elements.</span>
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="aurora-card rounded-3xl p-6">
              <p className="text-sm leading-relaxed text-white/70">
                Background, talent, wardrobe, jewelry, props, depth, and shadow become their own
                visual targets. The plate remains the source of truth.
              </p>
              <div className="mt-6 space-y-2">
                {["Plate / environment", "Talent / identity lock", "Wardrobe / styling", "Jewelry / props", "Light / motion pass"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-[var(--aurora-border)] bg-black/20 px-4 py-3 text-sm">
                    <span className="font-mono text-xs text-[#f09ddd]">0{index + 1}</span>
                    <span>{item}</span>
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#9a6bff]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="glow-frame overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/aurora/demo-layerstack.jpg" alt="Aurora exploded layer stack" className="w-full object-cover" />
              <p className="bg-[#171022] p-5 text-sm text-white/65">Every layer can be edited, reordered, rendered, and exported as part of the shot recipe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#120a1d]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <span className="label-chip">The layer edit</span>
          <h2 className="headline mt-5 max-w-3xl text-[clamp(2.8rem,7vw,6rem)]">
            Change one thing.
            <span className="gradient-text block">Nothing else moves.</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              ["/aurora/layer-chains-locked.jpg", "Iced out", "iced-out cuban links and diamond grillz"],
              ["/aurora/layer-braids-locked.jpg", "Swapped", "neon-green braids, oversized varsity jacket"],
            ].map(([src, label, prompt]) => (
              <article key={label} className="glow-frame overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={label} className="h-full w-full object-cover" />
                  <span className="label-chip absolute left-4 top-4 bg-[#0b0614]/70">{label}</span>
                </div>
                <p className="border-t border-[var(--aurora-border)] px-5 py-4 font-mono text-xs text-[#f09ddd]">{prompt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="studio" className="dotfield">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <span className="label-chip">Live · The studio</span>
          <h2 className="headline mt-5 max-w-3xl text-[clamp(2.8rem,7vw,6rem)]">
            Direct your <span className="gradient-text">shoot.</span>
          </h2>
          <div className="mt-12 rounded-[2rem] border border-[var(--aurora-border)] bg-[#0b0614]/80 p-3 md:p-6">
            <LayerStudio />
          </div>
        </div>
      </section>

      <section className="gradient-surface border-t border-[var(--aurora-border)]">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h2 className="headline text-[clamp(2.8rem,7vw,6rem)]">
            Generate once.
            <span className="gradient-text block">Edit forever.</span>
          </h2>
          <a href="#studio" className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0b0614] hover:scale-105">
            Open Aurora studio
          </a>
        </div>
      </section>
    </main>
  );
}
