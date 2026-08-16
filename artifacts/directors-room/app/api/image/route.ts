import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/providers/falImage";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { prompt } = body;
  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  try {
    const result = await generateImage(prompt);
    return NextResponse.json({ url: result.url, provider: "fal" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
