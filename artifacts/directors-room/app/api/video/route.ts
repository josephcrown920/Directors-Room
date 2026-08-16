import { NextRequest, NextResponse } from "next/server";
import { submitTextToVideo, submitImageToVideo } from "@/lib/providers/falVideo";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { prompt, duration, imageUrl, aspectRatio } = body;

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  try {
    const job = imageUrl
      ? await submitImageToVideo({ prompt, imageUrl, duration: duration ?? 4 })
      : await submitTextToVideo({ prompt, duration: duration ?? 4, aspectRatio });

    return NextResponse.json({ jobId: job.jobId, provider: "fal", status: job.status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
