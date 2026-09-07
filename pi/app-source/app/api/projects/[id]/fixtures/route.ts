import { getDb } from "@/db";
import { fixtures } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return Response.json(await getDb().select().from(fixtures).where(eq(fixtures.projectId, Number(id))));
}

type FixturePatchBody = {
  fixtureId?: number;
  quantity?: number | null;
  quantitySource?: string;
  reviewStatus?: string;
  alternateManufacturer?: string;
  alternateCatalog?: string;
  family?: string;
  exception?: string;
  outOfScope?: boolean;
  evidenceLabel?: string;
  evidenceUrl?: string;
};

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as FixturePatchBody;
  if (!body.fixtureId) return Response.json({ error: "Fixture is required" }, { status: 400 });
  const updates: Record<string, string | number | boolean> = {};
  if (body.quantity !== undefined && body.quantity !== null) updates.quantity = body.quantity;
  if (body.quantitySource !== undefined) updates.quantitySource = body.quantitySource;
  if (body.reviewStatus !== undefined) updates.reviewStatus = body.reviewStatus;
  if (body.alternateManufacturer !== undefined) updates.alternateManufacturer = body.alternateManufacturer;
  if (body.alternateCatalog !== undefined) updates.alternateCatalog = body.alternateCatalog;
  if (body.family !== undefined) updates.family = body.family;
  if (body.exception !== undefined) updates.exception = body.exception;
  if (body.outOfScope !== undefined) updates.outOfScope = body.outOfScope;
  if (body.evidenceLabel !== undefined) updates.evidenceLabel = body.evidenceLabel;
  if (body.evidenceUrl !== undefined) updates.evidenceUrl = body.evidenceUrl;
  updates.updatedAt = new Date().toISOString();
  const [updated] = await getDb().update(fixtures).set(updates)
    .where(and(eq(fixtures.projectId, Number(id)), eq(fixtures.id, body.fixtureId))).returning();
  if (!updated) return Response.json({ error: "Fixture not found" }, { status: 404 });
  return Response.json(updated);
}

type FixtureInput = Record<string, string | number | boolean | string[] | null | undefined>;

function toFixtureValues(projectId: number, body: FixtureInput) {
  return {
    projectId,
    fixtureType: String(body.fixtureType ?? "").trim(),
    area: body.area === "Exterior" ? "Exterior" : "Interior",
    specifiedManufacturer: String(body.specifiedManufacturer ?? ""),
    specifiedCatalog: String(body.specifiedCatalog ?? ""),
    alternateManufacturer: String(body.alternateManufacturer ?? ""),
    alternateCatalog: String(body.alternateCatalog ?? ""),
    family: String(body.family ?? ""),
    description: String(body.description ?? ""),
    quantity: body.quantity === null || body.quantity === "" || body.quantity === undefined ? null : Number(body.quantity),
    quantitySource: String(body.quantitySource ?? "pending"),
    reviewStatus: String(body.reviewStatus ?? "review"),
    exception: String(body.exception ?? ""),
    requirements: Array.isArray(body.requirements) ? (body.requirements as string[]) : [],
    outOfScope: Boolean(body.outOfScope ?? false),
    evidenceLabel: String(body.evidenceLabel ?? ""),
  };
}

// Accepts either a single fixture object (field-entered "Add fixture") or
// { fixtures: [...] } for a batch (PDF-extraction import of many rows at once).
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const projectId = Number(id);
  const body = (await request.json()) as FixtureInput & { fixtures?: FixtureInput[] };

  if (Array.isArray(body.fixtures)) {
    const rows = body.fixtures.filter((f) => String(f.fixtureType ?? "").trim());
    if (rows.length === 0) return Response.json({ error: "At least one fixture with a type is required" }, { status: 400 });
    const created = await getDb().insert(fixtures).values(rows.map((f) => toFixtureValues(projectId, f))).returning();
    return Response.json(created, { status: 201 });
  }

  if (!String(body.fixtureType ?? "").trim()) return Response.json({ error: "Fixture type is required" }, { status: 400 });
  const [created] = await getDb().insert(fixtures).values(toFixtureValues(projectId, body)).returning();
  return Response.json(created, { status: 201 });
}
