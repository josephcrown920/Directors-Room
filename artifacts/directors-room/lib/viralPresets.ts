export type ViralPreset = {
  id: string;
  name: string;
  hook: string;
  format: string;
  motion: string;
  edit: string;
  prompt: string;
  image: string;
};

export const VIRAL_PRESETS: ViralPreset[] = [
  {
    id: "walk-in-freeze",
    name: "Walk In / Freeze Frame",
    hook: "The subject enters on beat, then the world locks around them.",
    format: "9:16 · 7–9 seconds",
    motion: "Slow push-in, footstep parallax, hard freeze on the beat drop.",
    edit: "Cut the freeze on a bass hit; add a 2-frame flash and subtle film burn.",
    prompt: "Vertical music-video shot. Subject walks directly toward camera through a practical location, confident performance, background motion continues while the subject freezes perfectly on the beat, slow cinematic push-in, crisp silhouette, high contrast, designed for a seamless loop.",
    image: "/aurora/hero-street.jpg",
  },
  {
    id: "outfit-reveal",
    name: "Outfit Reveal Spin",
    hook: "A masked turn reveals the finished look in one clean movement.",
    format: "9:16 · 6–8 seconds",
    motion: "Orbit 180 degrees with a whip-pan transition into the reveal.",
    edit: "Match the whip to a snare; reverse the first 3 frames for a seamless loop.",
    prompt: "Vertical fashion reveal. Subject stands centered, turns away from camera, fast whip-pan orbit, and lands on the same subject in a transformed statement outfit, controlled studio light, sharp editorial finish, one clean reveal with no identity drift.",
    image: "/aurora/layer-bandana.jpg",
  },
  {
    id: "camera-hand-off",
    name: "Camera Hand-Off",
    hook: "The camera passes from one performer to the next without a visible cut.",
    format: "16:9 or 9:16 · 8 seconds",
    motion: "Handheld lateral move, foreground occlusion, match exit and entrance.",
    edit: "Use a foreground wipe to hide the stitch; preserve screen direction.",
    prompt: "Cinematic camera hand-off between two performers. Handheld lateral tracking move, foreground passerby briefly occludes the lens, camera emerges on a second performer in the same lighting and screen direction, confident music-video energy, natural motion blur, polished transition.",
    image: "/aurora/demo-motion.jpg",
  },
  {
    id: "object-morph",
    name: "Object Morph Loop",
    hook: "A hero prop transforms into the next scene while the frame stays centered.",
    format: "1:1 or 9:16 · 5–7 seconds",
    motion: "Locked macro frame, liquid morph, micro camera shake at the transition.",
    edit: "Loop on the object’s silhouette; add sound design that rises then resets.",
    prompt: "Stylized macro product shot with a centered hero object. Locked camera, tactile surfaces, the object smoothly morphs into a second unexpected form, controlled studio lighting, glossy highlights, precise silhouette continuity, satisfying seamless social loop.",
    image: "/aurora/layer-chains-locked.jpg",
  },
];