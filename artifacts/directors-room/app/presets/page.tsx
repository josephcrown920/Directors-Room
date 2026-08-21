import PresetStudio from "@/components/presets/PresetStudio";

export const metadata = {
  title: "Presets — Directors Room",
  description: "Reusable camera, lighting, grade, texture, and motion presets for cinematic generation.",
};

export default function PresetsPage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <PresetStudio />
      </div>
    </main>
  );
}