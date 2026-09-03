import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return Response.json(await getDb().select().from(documents).where(eq(documents.projectId, Number(id))));
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "File is required" }, { status: 400 });
  const key = `projects/${id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  await env.BUCKET.put(key, file.stream(), { httpMetadata: { contentType: file.type || "application/octet-stream" } });
  const [created] = await getDb().insert(documents).values({
    projectId: Number(id), fileName: file.name, objectKey: key,
    contentType: file.type || "application/octet-stream", documentType: String(form.get("documentType") || "other"),
  }).returning();
  return Response.json(created, { status: 201 });
}
