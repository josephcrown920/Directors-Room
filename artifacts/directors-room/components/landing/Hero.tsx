"use client";
import Link from "next/link";
import MediaFrame from "./MediaFrame";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-50"><div className="absolute -top-1/3 left-1/4 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[160px]" /><div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[160px]" /></div>
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-14 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-32">
        <div className="animate-fadeUp">
          <span className="mb-6 inline-block text-xs uppercase tracking-[0.25em] text-gold">Cinematic AI Studio</span>
          <h1 className="mb-6 font-display text-5xl leading-[1.05] text-white md:text-6xl xl:text-7xl">Direct entire films<br />with a single room.</h1>
          <p className="mb-9 max-w-md text-lg leading-relaxed text-muted">Storyboard shots, control camera motion, generate footage, and composite cinematic layers in one visual director&apos;s workspace.</p>
          <div className="flex flex-wrap gap-4"><Link href="/studio" className="rounded-full bg-white px-7 py-3.5 font-medium text-ink transition-colors hover:bg-gold">Enter the Studio</Link><Link href="/preview/demo" className="rounded-full border border-line px-7 py-3.5 text-white transition-colors hover:border-white/40">Watch demo</Link></div>
        </div>
        <div className="relative animate-fadeUp" style={{animationDelay:"150ms"}}>
          <MediaFrame imageSrc="/aurora/hero-street.jpg" alt="Cinematic street scene reference frame" aspect="video" className="mx-auto max-w-2xl shadow-2xl" />
          <div className="absolute -bottom-8 -left-10 hidden w-44 md:block"><MediaFrame imageSrc="/aurora/demo-layerstack.jpg" alt="Editable cinematic layer stack" aspect="square" className="shadow-xl" /></div>
          <div className="absolute -right-4 -top-4 rounded-full border border-white/10 bg-ink/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur">Reference → final frame</div>
        </div>
      </div>
    </section>
  );
}