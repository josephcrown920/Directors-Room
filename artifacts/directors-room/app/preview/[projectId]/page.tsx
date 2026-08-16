import { notFound } from "next/navigation";
import { getProject } from "@/lib/store/projects";
import PreviewPlayer from "@/components/preview/PreviewPlayer";
import TimelineStrip from "@/components/preview/TimelineStrip";

export default function PreviewPage({ params }: { params: { projectId: string } }) {
  const project = getProject(params.projectId);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-ink px-6 lg:px-10 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-white">
            Preview — {project.title}
          </h1>
          <p className="text-sm text-muted mt-1">
            Plays shots in sequence with their final rendered frames.
          </p>
        </div>
        <PreviewPlayer shots={project.shots} />
        <TimelineStrip shots={project.shots} />
      </div>
    </main>
  );
}
