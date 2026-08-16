import { falClient } from "./fal";

const IMG_MODEL = process.env.FAL_TXT2IMG_MODEL || "fal-ai/flux-pro/v1.1-ultra";

export async function generateImage(prompt: string): Promise<{ url: string }> {
  if (!falClient) throw new Error("FAL_KEY not configured");

  const result = await falClient.subscribe(IMG_MODEL, {
    input: { prompt },
    logs: false,
  });

  const url = (result.data as any)?.images?.[0]?.url;
  if (!url) throw new Error("No image returned from provider");
  return { url };
}
