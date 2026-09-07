import { getDb } from "@/db";
import { projects, customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const [row] = await getDb().select().from(projects).where(eq(projects.id, Number(id)));
  if (!row) return Response.json({ error: "Project not found" }, { status: 404 });
  return Response.json(row);
}

async function resolveCustomerId(name: string | undefined): Promise<number | null> {
  const trimmed = name?.trim();
  if (!trimmed) return null;
  const db = getDb();
  const [existing] = await db.select().from(customers).where(eq(customers.name, trimmed));
  if (existing) return existing.id;
  const [created] = await db.insert(customers).values({ name: trimmed }).returning();
  return created.id;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as Partial<{
    name: string;
    location: string;
    customerName: string;
    scope: string;
    bidDueDate: string;
    bidPlatform: string;
    packageStrategy: string;
    quantityMethod: string;
    status: string;
    eyebrow: string;
    summary: string;
    defaultSelectedFixtureType: string;
  }>;
  const updates: Record<string, string | number | null> = {};
  for (const key of [
    "name", "location", "scope", "bidDueDate", "bidPlatform",
    "packageStrategy", "quantityMethod", "status", "eyebrow", "summary",
    "defaultSelectedFixtureType",
  ] as const) {
    if (body[key] !== undefined) updates[key] = String(body[key]);
  }
  if (body.customerName !== undefined) {
    updates.customerId = await resolveCustomerId(body.customerName);
  }
  if (Object.keys(updates).length === 0) {
    return Response.json({ error: "No updatable fields provided" }, { status: 400 });
  }
  updates.updatedAt = new Date().toISOString();
  const [updated] = await getDb().update(projects).set(updates).where(eq(projects.id, Number(id))).returning();
  if (!updated) return Response.json({ error: "Project not found" }, { status: 404 });
  return Response.json(updated);
}
