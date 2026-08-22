import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import WorkflowShowcase from "@/components/landing/WorkflowShowcase";
import FeatureGrid from "@/components/landing/FeatureGrid";
import BeforeAfter from "@/components/landing/BeforeAfter";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-ink">
      <Hero />
      <Marquee />
      <WorkflowShowcase />
      <FeatureGrid />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">See it change</span>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">The result is the explanation.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">Drag through the frame to see how a director can reshape a scene without starting over.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <BeforeAfter beforeSrc="/aurora/hero-street.jpg" afterSrc="/aurora/demo-motion.jpg" title="Direct motion from one frame" desc="Compare a still reference with the cinematic motion treatment it becomes." />
          <BeforeAfter beforeSrc="/aurora/hero-cone.jpg" afterSrc="/aurora/demo-layerstack.jpg" title="Build the shot in layers" desc="See the visual source separate into editable subject, light, and environment decisions." />
        </div>
      </section>
      <Footer />
    </main>
  );
}