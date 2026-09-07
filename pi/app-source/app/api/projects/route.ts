import { getDb } from "@/db";
import { projects, customers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const rows = await getDb()
    .select({
      id: projects.id,
      name: projects.name,
      location: projects.location,
      planDate: projects.planDate,
      customerId: projects.customerId,
      customerName: customers.name,
      scope: projects.scope,
      bidDueDate: projects.bidDueDate,
      bidPlatform: projects.bidPlatform,
      packageStrategy: projects.packageStrategy,
      quantityMethod: projects.quantityMethod,
      status: projects.status,
      eyebrow: projects.eyebrow,
      summary: projects.summary,
      defaultSelectedFixtureType: projects.defaultSelectedFixtureType,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .leftJoin(customers, eq(projects.customerId, customers.id))
    .orderBy(desc(projects.updatedAt));
  return Response.json(rows);
}

// Resolves customerName to a customer row, creating one if it doesn't
// exist yet — same find-or-create behavior as POST /api/customers, kept
// inline here so project creation is one round trip instead of two.
async function resolveCustomerId(name: string | undefined): Promise<number | null> {
  const trimmed = name?.trim();
  if (!trimmed) return null;
  const db = getDb();
  const [existing] = await db.select().from(customers).where(eq(customers.name, trimmed));
  if (existing) return existing.id;
  const [created] = await db.insert(customers).values({ name: trimmed }).returning();
  return created.id;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  if (!body.name?.trim()) return Response.json({ error: "Project name is required" }, { status: 400 });
  const customerId = await resolveCustomerId(body.customerName);
  const [created] = await getDb().insert(projects).values({
    name: body.name.trim(), location: body.location?.trim() ?? "", customerId,
    scope: body.scope?.trim() ?? "", bidDueDate: body.bidDueDate ?? "", bidPlatform: body.bidPlatform?.trim() ?? "",
    planDate: body.planDate ?? "", packageStrategy: body.packageStrategy || "alternate",
    quantityMethod: body.quantityMethod || "manual", status: "intake",
    eyebrow: body.eyebrow?.trim() || "FIELD INTAKE",
    summary: body.summary?.trim() ?? "",
    defaultSelectedFixtureType: body.defaultSelectedFixtureType?.trim() ?? "",
  }).returning();
  return Response.json(created, { status: 201 });
}
