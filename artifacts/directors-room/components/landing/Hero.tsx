"use client";
import Link from "next/link";
import MediaFrame from "./MediaFrame";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-1/3 left-1/4 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center py-32">
        <div className="animate-fadeUp">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold mb-6">
            Cinematic AI Studio
          </span>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-white mb-6">
            Direct entire films
            <br />
            with a single room.
          </h1>
          <p className="text-lg text-muted max-w-md mb-9 leading-relaxed">
            Storyboard shots, control camera motion, generate footage, and
            composite cinematic layers — all in one director's workspace.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/studio"
              className="px-7 py-3.5 rounded-full bg-white text-ink font-medium hover:bg-gold transition-colors"
            >
              Enter the Studio
            </Link>
            <Link
              href="/preview/demo"
              className="px-7 py-3.5 rounded-full border border-line text-white hover:border-white/40 transition-colors"
            >
              Watch demo
            </Link>
          </div>
        </div>

        <div className="relative animate-fadeUp" style={{ animationDelay: "150ms" }}>
          <MediaFrame
            videoSrc="/demo/hero-generation.mp4"
            poster="/demo/hero-poster.jpg"
            alt="Image transforming into a cinematic motion shot"
            aspect="portrait"
            className="mx-auto max-w-sm shadow-2xl"
          />
          <div className="absolute -bottom-8 -left-10 w-40 hidden md:block">
            <MediaFrame
              imageSrc="/demo/hero-layers.jpg"
              alt="Layer decomposition preview"
              aspect="square"
              className="shadow-xl border-2 border-ink"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
