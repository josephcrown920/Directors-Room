"use client";
import { useState } from "react";
import { useReveal } from "@/lib/hooks/useReveal";
import MediaFrame from "./MediaFrame";

const steps = [
  {
    id: "01",
    label: "Reference",
    title: "Start from an image or script beat",
    desc: "Upload a reference frame, sketch, or written scene description.",
    imageSrc: "/demo/step-reference.jpg",
  },
  {
    id: "02",
    label: "Direct",
    title: "Set camera motion & prompt",
    desc: "Choose roboarm, orbit, dolly, or handheld — dial in intensity and speed.",
    imageSrc: "/demo/step-controls.jpg",
  },
  {
    id: "03",
    label: "Generate",
    title: "Render the shot",
    desc: "Kling and fal providers render your motion in the background.",
    videoSrc: "/demo/step-generate.mp4",
    poster: "/demo/step-generate-poster.jpg",
  },
  {
    id: "04",
    label: "Assemble",
    title: "Drop it into your timeline",
    desc: "The finished shot lands directly in your storyboard, in order.",
    imageSrc: "/demo/step-timeline.jpg",
  },
];

export default function WorkflowShowcase() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);
  const step = steps[active];

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
      <div className={`mb-14 max-w-2xl transition-all duration-700 ${inView ? "opacity-100" : "opacity-0 translate-y-6"}`}>
        <span className="text-xs uppercase tracking-[0.25em] text-gold">Workflow</span>
        <h2 className="font-display text-4xl md:text-5xl text-white mt-3">
          From reference to finished shot.
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="lg:sticky lg:top-24">
          <MediaFrame
            videoSrc={step.videoSrc}
            imageSrc={step.imageSrc}
            poster={step.poster}
            alt={step.title}
            aspect="video"
          />
        </div>

        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`text-left rounded-xl border px-6 py-5 transition-all duration-300 ${
                active === i
                  ? "border-accent bg-panel"
                  : "border-line/60 hover:border-line"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`font-display text-sm ${active === i ? "text-gold" : "text-muted"}`}>
                  {s.id}
                </span>
                <div>
                  <p className={`text-sm uppercase tracking-wider mb-1 ${active === i ? "text-white" : "text-muted"}`}>
                    {s.label}
                  </p>
                  <h4 className="font-display text-lg text-white">{s.title}</h4>
                  {active === i && (
                    <p className="text-sm text-muted mt-2 leading-relaxed">{s.desc}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
