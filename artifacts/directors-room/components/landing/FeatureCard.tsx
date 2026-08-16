"use client";
import { useReveal } from "@/lib/hooks/useReveal";
import MediaFrame from "./MediaFrame";

interface FeatureCardProps {
  videoSrc?: string;
  imageSrc?: string;
  poster?: string;
  title: string;
  description: string;
  cta?: string;
  delay?: number;
}

export default function FeatureCard({
  videoSrc,
  imageSrc,
  poster,
  title,
  description,
  cta,
  delay = 0,
}: FeatureCardProps) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group flex flex-col gap-5 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <MediaFrame
        videoSrc={videoSrc}
        imageSrc={imageSrc}
        poster={poster}
        alt={title}
        className="transition-transform duration-500 group-hover:-translate-y-1"
      />
      <div>
        <h3 className="font-display text-xl text-white mb-1.5">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
        {cta && (
          <button className="mt-3 text-sm text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
            {cta} <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </div>
  );
}
