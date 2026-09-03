import { getDb } from "@/db";
import { fixtures } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return Response.json(await getDb().select().from(fixtures).where(eq(fixtures.projectId, Number(id))));
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json() as { fixtureId?: number; quantity?: number | null; reviewStatus?: string };
  if (!body.fixtureId) return Response.json({ error: "Fixture is required" }, { status: 400 });
  const [updated] = await getDb().update(fixtures).set({
    ...(body.quantity !== undefined ? { quantity: body.quantity } : {}),
    ...(body.reviewStatus ? { reviewStatus: body.reviewStatus } : {}),
    updatedAt: new Date().toISOString(),
  }).where(and(eq(fixtures.projectId, Number(id)), eq(fixtures.id, body.fixtureId))).returning();
  return Response.json(updated);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json() as Record<string, string | number | null>;
  if (!String(body.fixtureType ?? "").trim()) return Response.json({ error: "Fixture type is required" }, { status: 400 });
  const [created] = await getDb().insert(fixtures).values({
    projectId: Number(id), fixtureType: String(body.fixtureType).trim(),
    specifiedManufacturer: String(body.specifiedManufacturer ?? ""), specifiedCatalog: String(body.specifiedCatalog ?? ""),
    alternateManufacturer: String(body.alternateManufacturer ?? ""), alternateCatalog: String(body.alternateCatalog ?? ""),
    description: String(body.description ?? ""), quantity: body.quantity === null || body.quantity === "" ? null : Number(body.quantity),
    quantitySource: String(body.quantitySource ?? "pending"), reviewStatus: "unverified",
    evidenceLabel: String(body.evidenceLabel ?? ""),
  }).returning();
  return Response.json(created, { status: 201 });
}
