const items = ["Kling Motion", "fal.ai", "Replicate", "Supabase Storage", "Cinematic Layers", "Storyboard Engine"];

export default function Marquee() {
  return (
    <div className="border-y border-line bg-panel/50 py-5 overflow-hidden">
      <div className="flex w-max animate-marquee gap-16">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm uppercase tracking-widest text-muted whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
