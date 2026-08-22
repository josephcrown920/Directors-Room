import PromptForm from "@/components/generation/PromptForm";

export default function GenerateImagePage() {
  return (
    <main className="min-h-screen bg-ink px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-white mb-2">
          Image generator
        </h1>
        <p className="text-sm text-muted mb-6">
          Use fal.ai or Replicate-backed models (wired via /api/image) to create still frames.
        </p>
        <PromptForm mode="image" />
      </div>
    </main>
  );
}
