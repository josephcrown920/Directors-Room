import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/db/supabaseServer";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const client = supabaseServer();
  const arrayBuffer = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await client.storage
    .from("media")
    .upload(fileName, arrayBuffer, { contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = client.storage.from("media").getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
}
