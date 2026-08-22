"use client";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/hooks/useReveal";

interface MediaFrameProps { videoSrc?: string; imageSrc?: string; poster?: string; alt: string; aspect?: "video"|"portrait"|"square"; className?: string; }
const aspectMap={video:"aspect-video",portrait:"aspect-[9/16]",square:"aspect-square"};
export default function MediaFrame({videoSrc,imageSrc,poster,alt,aspect="video",className=""}:MediaFrameProps){
  const {ref,inView}=useReveal<HTMLDivElement>(0.1); const videoRef=useRef<HTMLVideoElement>(null); const [failed,setFailed]=useState(false);
  useEffect(()=>{ if(!videoRef.current) return; if(inView) videoRef.current.play().catch(()=>{}); else videoRef.current.pause(); },[inView]);
  return <div ref={ref} className={"relative overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] "+aspectMap[aspect]+" "+className}>
    {videoSrc&&!failed?<video ref={videoRef} className="h-full w-full object-cover" src={videoSrc} poster={poster} autoPlay muted loop playsInline preload="none" aria-label={alt} onError={()=>setFailed(true)}/>:imageSrc&&!failed?<img src={imageSrc} alt={alt} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" loading="lazy" onError={()=>setFailed(true)}/>:<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-panel via-[#181b22] to-ink px-6 text-center text-xs uppercase tracking-widest text-muted">Visual unavailable</div>}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
  </div>;
}