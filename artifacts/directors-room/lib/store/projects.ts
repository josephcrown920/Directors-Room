import { Project } from "@/lib/types";

const demoProject: Project = {
  id: "demo",
  title: "Demo Sequence",
  createdAt: "2024-01-01T00:00:00.000Z",
  shots: [
    {
      id: "demo-shot-1",
      order: 1,
      title: "Opening frame",
      prompt: "A quiet cinematic opening frame",
      referenceImages: [],
      cameraRig: "static",
      duration: 4,
      resolution: "720p",
      aspectRatio: "16:9",
      provider: "fal",
      status: "draft",
      continuityNotes: "Demo data used until a project is connected.",
    },
  ],
};

export function getProject(id: string): Project | null {
  return id === demoProject.id ? demoProject : null;
}