export interface KlingJob {
  id: string;
  status: "queued" | "processing" | "succeeded" | "failed";
  outputUrl?: string;
  error?: string;
}

// Placeholder; replace with real HTTP calls to the Kling API.
export async function createKlingJob(_: {
  prompt: string;
  duration: number;
  cameraRig: string;
}): Promise<KlingJob> {
  return {
    id: `kling_${Date.now()}`,
    status: "queued",
  };
}

export async function getKlingJob(_: string): Promise<KlingJob> {
  return {
    id: "mock",
    status: "succeeded",
    outputUrl: "/demo/feature-motion.mp4",
  };
}
