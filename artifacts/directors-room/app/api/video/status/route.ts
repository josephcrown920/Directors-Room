import { NextRequest, NextResponse } from "next/server";
import { getFalVideoStatus } from "@/lib/providers/falVideo";

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("jobId");
  const model = req.nextUrl.searchParams.get("model") || undefined;
  if (!jobId) {
    return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
  }

  try {
    const job = await getFalVideoStatus(jobId, model);
    return NextResponse.json(job);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
