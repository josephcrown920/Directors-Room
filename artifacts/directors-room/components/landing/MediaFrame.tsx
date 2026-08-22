"use client";
import { useState } from "react";
import { useReveal } from "@/lib/hooks/useReveal";

interface MediaFrameProps {
  videoSrc?: string;
  imageSrc?: string;
  poster?: string;
  alt: string;
  aspect?: "video" | "portrait" | "square";
  className?: string;
}

const aspectMap = {
  video: "aspect-video",
  portrait: "aspect-[9/16]",
  square: "aspect-square",
};

export default function MediaFrame({
  videoSrc,
  imageSrc,
  poster,
  alt,
  aspect = "video",
  className = "",
}: MediaFrameProps) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  const [mediaFailed, setMediaFailed] = useState(false);
  const hasVideo = Boolean(videoSrc && !videoSrc.startsWith("/demo/"));
  const hasImage = Boolean(imageSrc && !imageSrc.startsWith("/demo/"));

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ${aspectMap[aspect]} ${className}`}
    >
      {hasVideo && inView && !mediaFailed ? (
        <video
          className="h-full w-full object-cover"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt}
          onError={() => setMediaFailed(true)}
        />
      ) : hasImage && !mediaFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          loading="lazy"
          onError={() => setMediaFailed(true)}
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-panel via-[#181b22] to-ink flex items-center justify-center">
          <span className="text-xs uppercase tracking-widest text-muted">{alt}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
    </div>
  );
}
