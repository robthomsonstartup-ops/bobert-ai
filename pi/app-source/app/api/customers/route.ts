import { getDb } from "@/db";
import { customers } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  const rows = await getDb().select().from(customers).orderBy(asc(customers.name));
  return Response.json(rows);
}

// Find-or-create by name. The intake form calls this when the user types
// a customer name that doesn't match an existing one — this keeps names
// unique without a separate "does this exist" round trip.
export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();
  if (!name) return Response.json({ error: "Customer name is required" }, { status: 400 });

  const db = getDb();
  const [existing] = await db.select().from(customers).where(eq(customers.name, name));
  if (existing) return Response.json(existing);

  const [created] = await db.insert(customers).values({ name }).returning();
  return Response.json(created, { status: 201 });
}
