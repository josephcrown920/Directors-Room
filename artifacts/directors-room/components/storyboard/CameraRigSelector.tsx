"use client";
import { CameraRig } from "@/lib/types";

const rigs: { id: CameraRig; label: string; icon: string }[] = [
  { id: "static", label: "Static", icon: "▢" },
  { id: "dolly", label: "Dolly", icon: "→" },
  { id: "orbit", label: "Orbit", icon: "↻" },
  { id: "crane", label: "Crane", icon: "⤴" },
  { id: "handheld", label: "Handheld", icon: "≈" },
  { id: "roboarm", label: "Robo-arm", icon: "⌁" },
  { id: "fpv", label: "FPV", icon: "◎" },
];

export default function CameraRigSelector({
  value,
  onChange,
}: {
  value: CameraRig;
  onChange: (rig: CameraRig) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Camera motion" className="flex flex-wrap gap-2">
      {rigs.map((rig) => {
        const selected = value === rig.id;
        return (
          <button
            key={rig.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-pressed={selected}
            aria-label={`Camera motion: ${rig.label}`}
            onClick={() => onChange(rig.id)}
            className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs border transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              selected
                ? "border-accent bg-accent/10 text-white"
                : "border-line text-muted hover:border-white/30"
            }`}
          >
            <span aria-hidden="true">{rig.icon}</span>
            {rig.label}
          </button>
        );
      })}
    </div>
  );
}
