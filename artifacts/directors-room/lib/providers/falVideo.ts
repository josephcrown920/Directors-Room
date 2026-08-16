import { falClient } from "./fal";

export interface FalVideoResult {
  jobId: string;
  status: "queued" | "processing" | "succeeded" | "failed";
  outputUrl?: string;
  error?: string;
}

const T2V_MODEL = process.env.FAL_T2V_MODEL || "fal-ai/bytedance/seedance/v2/text-to-video";
const I2V_MODEL = process.env.FAL_I2V_MODEL || "fal-ai/bytedance/seedance/v1/pro/image-to-video";

export async function submitTextToVideo(params: {
  prompt: string;
  duration: number;
  aspectRatio?: string;
}): Promise<FalVideoResult> {
  if (!falClient) throw new Error("FAL_KEY not configured");

  const { request_id } = await falClient.queue.submit(T2V_MODEL, {
    input: {
      prompt: params.prompt,
      duration: params.duration,
      aspect_ratio: params.aspectRatio ?? "16:9",
    },
  });

  return { jobId: request_id, status: "queued" };
}

export async function submitImageToVideo(params: {
  prompt: string;
  imageUrl: string;
  duration: number;
}): Promise<FalVideoResult> {
  if (!falClient) throw new Error("FAL_KEY not configured");

  const { request_id } = await falClient.queue.submit(I2V_MODEL, {
    input: {
      prompt: params.prompt,
      image_url: params.imageUrl,
      duration: params.duration,
    },
  });

  return { jobId: request_id, status: "queued" };
}

export async function getFalVideoStatus(
  jobId: string,
  model: string = T2V_MODEL
): Promise<FalVideoResult> {
  if (!falClient) throw new Error("FAL_KEY not configured");

  const status = await falClient.queue.status(model, { requestId: jobId, logs: false });

  if (status.status === "COMPLETED") {
    const result = await falClient.queue.result(model, { requestId: jobId });
    const outputUrl =
      (result.data as any)?.video?.url ?? (result.data as any)?.output?.url;
    return { jobId, status: "succeeded", outputUrl };
  }
  if (status.status === "IN_PROGRESS" || status.status === "IN_QUEUE") {
    return { jobId, status: "processing" };
  }
  return { jobId, status: "failed", error: "Generation failed" };
}
