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

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Result</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-3">
            See the transformation.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-14">
          <BeforeAfter
            beforeSrc="/demo/before-still.jpg"
            afterSrc="/demo/after-relit.jpg"
            title="Relighting a scene"
            desc="Drag to compare the original still against the relit, graded output."
          />
          <BeforeAfter
            beforeSrc="/demo/before-flat.jpg"
            afterSrc="/demo/after-layers.jpg"
            title="Layer decomposition"
            desc="One photo separated into background, subject, and shadow layers."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
