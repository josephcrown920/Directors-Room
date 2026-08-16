"use client";
import { useRef, useState } from "react";
import { useReveal } from "@/lib/hooks/useReveal";

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  title,
  desc,
}: {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  desc: string;
}) {
  const [pos, setPos] = useState(50);
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);
  const hasBeforeImage = !beforeSrc.startsWith("/demo/");
  const hasAfterImage = !afterSrc.startsWith("/demo/");
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);

  function handleMove(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100" : "opacity-0 translate-y-6"}`}>
      <div
        ref={containerRef}
        className="relative aspect-video rounded-2xl overflow-hidden border border-line select-none cursor-ew-resize"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {!hasAfterImage || afterFailed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-panel via-[#20242d] to-ink text-xs uppercase tracking-[0.2em] text-muted">
            After preview
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={afterSrc}
            alt="After"
            onError={() => setAfterFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          {!hasBeforeImage || beforeFailed ? (
            <div className="h-full w-full bg-gradient-to-br from-[#161922] to-[#090a0d] flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted">
              Before preview
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={beforeSrc}
              alt="Before"
              onError={() => setBeforeFailed(true)}
              className="h-full w-full object-cover"
              style={{ width: containerRef.current?.offsetWidth }}
            />
          )}
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-white flex items-center justify-center text-ink text-xs shadow-lg">
            ↔
          </div>
        </div>
      </div>
      <h3 className="font-display text-xl text-white mt-5 mb-1.5">{title}</h3>
      <p className="text-sm text-muted max-w-lg">{desc}</p>
    </div>
  );
}
