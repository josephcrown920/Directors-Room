import Link from "next/link";

const destinations = [
  {
    href: "/layers",
    label: "Layers",
    description: "Composite a scene and adjust the position, scale, and rotation of each layer.",
  },
  {
    href: "/presets",
    label: "Presets",
    description: "Turn a visual reference into reusable camera, lighting, grade, and motion DNA.",
  },
  {
    href: "/generate/image",
    label: "Generate image",
    description: "Create a still from a text prompt and use it as a visual starting point.",
  },
  {
    href: "/generate/video",
    label: "Generate video",
    description: "Turn a scene or prompt into a cinematic motion shot.",
  },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-20 text-white lg:px-10">
      <div className="mx-auto max-w-5xl">
        <span className="text-xs uppercase tracking-[0.25em] text-gold">Director&apos;s workspace</span>
        <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight md:text-6xl">
          Choose the next frame.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Move from visual layers to generated footage without leaving the room.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="group rounded-2xl border border-line bg-panel/70 p-6 transition-colors hover:border-accent"
            >
              <h2 className="font-display text-2xl text-white">{destination.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{destination.description}</p>
              <span className="mt-8 inline-block text-xs uppercase tracking-widest text-gold transition-transform group-hover:translate-x-1">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}