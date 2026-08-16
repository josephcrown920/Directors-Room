import PromptForm from "@/components/generation/PromptForm";

export default function GenerateVideoPage() {
  return (
    <main className="min-h-screen bg-ink px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-white mb-2">
          Video generator
        </h1>
        <p className="text-sm text-muted mb-6">
          Fire off a Kling or fal.ai motion job via /api/video, then poll /api/video/status.
        </p>
        <PromptForm mode="video" />
      </div>
    </main>
  );
}
