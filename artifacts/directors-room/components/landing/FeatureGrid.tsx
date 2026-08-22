import FeatureCard from "./FeatureCard";

const features = [
  {
    videoSrc: "/demo/feature-storyboard.mp4",
    poster: "/demo/feature-storyboard-poster.jpg",
    title: "Storyboard Engine",
    description: "Sequence shots with reference frames, continuity notes, and per-shot prompts.",
    cta: "Build a storyboard",
  },
  {
    videoSrc: "/demo/feature-motion.mp4",
    poster: "/demo/feature-motion-poster.jpg",
    title: "Motion Control",
    description: "Direct camera behavior — orbit, dolly, handheld, roboarm — powered by Kling.",
    cta: "Explore motion presets",
  },
  {
    imageSrc: "/demo/feature-layers.jpg",
    title: "Cinematic Layers",
    description: "Split a frame into background, subject cutouts, depth, and shadow layers you can edit.",
    cta: "Open layer editor",
  },
  {
    videoSrc: "/demo/feature-i2v.mp4",
    poster: "/demo/feature-i2v-poster.jpg",
    title: "Image → Video",
    description: "Turn a single still into a moving cinematic clip with controllable motion strength.",
    cta: "Generate a clip",
  },
  {
    imageSrc: "/demo/feature-relight.jpg",
    title: "Relight & Compositing",
    description: "Adjust lighting direction and color per-layer without regenerating the whole scene.",
    cta: "Try relighting",
  },
  {
    videoSrc: "/demo/feature-preview.mp4",
    poster: "/demo/feature-preview-poster.jpg",
    title: "Sequence Preview",
    description: "Play your shots back to back in a real timeline before final export.",
    cta: "Preview a project",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
      <div className="mb-16 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.25em] text-gold">Toolkit</span>
        <h2 className="font-display text-4xl md:text-5xl text-white mt-3">
          Everything a director needs, visually.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
