import { Project, Shot } from "@/lib/types";
import { supabaseServer } from "./supabaseServer";

function mapShot(row: any): Shot {
  return {
    id: row.id,
    order: row.order,
    title: row.title,
    prompt: row.prompt,
    referenceImages: row.reference_images ?? [],
    cameraRig: row.camera_rig,
    duration: row.duration,
    resolution: row.resolution,
    aspectRatio: row.aspect_ratio,
    provider: row.provider,
    status: row.status,
    outputUrl: row.output_url ?? undefined,
    continuityNotes: row.continuity_notes ?? undefined,
  };
}

export async function listProjects(): Promise<Project[]> {
  const client = supabaseServer();
  const { data: projectRows, error } = await client
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !projectRows) return [];

  const projects: Project[] = [];
  for (const row of projectRows) {
    const { data: shotRows } = await client
      .from("shots")
      .select("*")
      .eq("project_id", row.id)
      .order("order", { ascending: true });

    projects.push({
      id: row.id,
      title: row.title,
      createdAt: row.created_at,
      shots: (shotRows ?? []).map(mapShot),
    });
  }
  return projects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const client = supabaseServer();
  const { data: row, error } = await client
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !row) return null;

  const { data: shotRows } = await client
    .from("shots")
    .select("*")
    .eq("project_id", id)
    .order("order", { ascending: true });

  return {
    id: row.id,
    title: row.title,
    createdAt: row.created_at,
    shots: (shotRows ?? []).map(mapShot),
  };
}

export async function createProject(title: string, userId: string): Promise<Project> {
  const client = supabaseServer();
  const { data, error } = await client
    .from("projects")
    .insert({ title, user_id: userId })
    .select()
    .single();

  if (error || !data) throw new Error(error?.message || "Failed to create project");

  return { id: data.id, title: data.title, createdAt: data.created_at, shots: [] };
}

export async function updateShot(shotId: string, patch: Partial<Shot>): Promise<void> {
  const client = supabaseServer();
  const dbPatch: Record<string, any> = {};
  if (patch.title !== undefined) dbPatch.title = patch.title;
  if (patch.prompt !== undefined) dbPatch.prompt = patch.prompt;
  if (patch.cameraRig !== undefined) dbPatch.camera_rig = patch.cameraRig;
  if (patch.duration !== undefined) dbPatch.duration = patch.duration;
  if (patch.resolution !== undefined) dbPatch.resolution = patch.resolution;
  if (patch.aspectRatio !== undefined) dbPatch.aspect_ratio = patch.aspectRatio;
  if (patch.status !== undefined) dbPatch.status = patch.status;
  if (patch.outputUrl !== undefined) dbPatch.output_url = patch.outputUrl;
  if (patch.continuityNotes !== undefined) dbPatch.continuity_notes = patch.continuityNotes;

  const { error } = await client.from("shots").update(dbPatch).eq("id", shotId);
  if (error) throw new Error(error.message);
}
