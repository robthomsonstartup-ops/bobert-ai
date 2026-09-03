import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const rows = await getDb().select().from(projects).orderBy(desc(projects.updatedAt));
  return Response.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json() as Record<string, string>;
  if (!body.name?.trim()) return Response.json({ error: "Project name is required" }, { status: 400 });
  const [created] = await getDb().insert(projects).values({
    name: body.name.trim(), location: body.location?.trim() ?? "", customer: body.customer?.trim() ?? "",
    scope: body.scope?.trim() ?? "", bidDueDate: body.bidDueDate ?? "", bidPlatform: body.bidPlatform?.trim() ?? "",
    planDate: body.planDate ?? "", packageStrategy: body.packageStrategy || "alternate",
    quantityMethod: body.quantityMethod || "manual", status: "intake",
  }).returning();
  return Response.json(created, { status: 201 });
}
